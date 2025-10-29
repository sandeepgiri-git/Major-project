"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

import { dummyInterviewQuestions as dummyInterview } from "@/utils/constants/interview";

export default function InterviewPage() {
  const params = useParams();
  const interviewId = params.id as string;
  
  // States
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [transcript, setTranscript] = useState<string>("");
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasMediaAccess, setHasMediaAccess] = useState(false); // New state
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Check browser support on mount
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                            (window as any).webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);
  }, []);

  // Initialize media with proper error handling
  const initializeMedia = async () => {
    try {
      setMediaError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      // Store the stream
      mediaStreamRef.current = stream;
      setHasMediaAccess(true); // New state to track successful access
      
      // Setup video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log("Video play error:", e));
      }
      
      setIsCameraOn(true);
      setIsMicOn(true);
      
      // Setup MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') 
        ? 'video/webm;codecs=vp9' 
        : 'video/webm';
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setMediaError('Recording error occurred');
      };

      // Setup Speech Recognition
      if (isSpeechSupported) {
        const SpeechRecognition = (window as any).SpeechRecognition || 
                                (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const currentTranscript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join(' ');
          setTranscript(currentTranscript);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'not-allowed') {
            setMediaError('Microphone access denied.');
          }
        };
        
        recognitionRef.current = recognition;
      }
    } catch (err: any) {
      console.error("Media access error:", err);
      setHasMediaAccess(false);
      
      if (err.name === 'NotAllowedError') {
        setMediaError('Camera/microphone access denied. Please enable permissions.');
      } else if (err.name === 'NotFoundError') {
        setMediaError('No camera or microphone found.');
      } else if (err.name === 'NotReadableError') {
        setMediaError('Could not access camera/microphone. Another app might be using it.');
      } else {
        setMediaError('Failed to access camera/microphone: ' + (err.message || err.name));
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Initialize media on component mount
  useEffect(() => {
    initializeMedia();
  }, []);

  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn;
        setIsCameraOn(!isCameraOn);
      }
    }
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      if (mediaRecorderRef.current) {
        try {
          mediaRecorderRef.current.start();
          setIsRecording(true);
          setRecordedChunks([]);
          
          if (recognitionRef.current && isSpeechSupported) {
            recognitionRef.current.start();
          }
        } catch (err) {
          console.error('Failed to start recording:', err);
          setMediaError('Failed to start recording');
        }
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        
        if (recognitionRef.current && isSpeechSupported) {
          recognitionRef.current.stop();
        }
      }
    }
  };

  const downloadRecording = () => {
    if (recordedChunks.length === 0) return;
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `interview-${interviewId}-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < dummyInterview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTranscript("");
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTranscript("");
    }
  };

  const currentQuestion = dummyInterview.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error Banner */}
      {mediaError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{mediaError}</p>
              <button
                onClick={initializeMedia}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Recording Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Video</h2>
            
            {/* Video Preview - FIXED */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-4">
              {hasMediaAccess ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onLoadedData={() => {
                    // Ensure video is playing
                    if (videoRef.current && videoRef.current.paused) {
                      videoRef.current.play().catch(e => console.log("Auto-play failed:", e));
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm">
                      {mediaError ? 'Click "Try Again" above' : 'Camera preview will appear here'}
                    </p>
                  </div>
                </div>
              )}
              
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-white text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={toggleCamera}
                disabled={!hasMediaAccess}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  isCameraOn 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!hasMediaAccess ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isCameraOn ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  )}
                </svg>
                {isCameraOn ? 'Camera Off' : 'Camera On'}
              </button>
              
              <button
                onClick={toggleMic}
                disabled={!hasMediaAccess}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  isMicOn 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${!hasMediaAccess ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMicOn ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  )}
                </svg>
                {isMicOn ? 'Mic Off' : 'Mic On'}
              </button>
              
              <button
                onClick={toggleRecording}
                disabled={!hasMediaAccess}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } ${!hasMediaAccess ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isRecording ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9v-5z" />
                  )}
                </svg>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              
              {recordedChunks.length > 0 && (
                <button
                  onClick={downloadRecording}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              )}
            </div>
            
            {/* Transcript */}
            {(transcript || isSpeechSupported === false) && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {isSpeechSupported ? 'Live Transcript' : 'Transcript (Chrome/Edge only)'}
                </h3>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 min-h-[60px]">
                  {transcript ? (
                    <p className="text-gray-700">{transcript}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      {isSpeechSupported 
                        ? 'Speak to see transcription...' 
                        : 'Speech recognition only works in Chrome and Edge browsers'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Question Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-medium text-gray-900">Question</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {currentQuestion.type === 'technical' ? 'Technical' : 'Behavioral'}
              </span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-800 text-lg">{currentQuestion.text}</p>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Previous Question
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex === dummyInterview.questions.length - 1}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentQuestionIndex === dummyInterview.questions.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Next Question
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Instructions</h3>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Use Chrome or Edge for best experience</li>
                <li>Allow camera and microphone permissions when prompted</li>
                <li>Click "Start Recording" when ready to answer</li>
                <li>Speak clearly for better transcription</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Submit Interview
          </button>
        </div>
      </div>
    </div>
  );
}