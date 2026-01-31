"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Video, VideoOff, Copy, ChevronRight, Pause, Play, CloudFog } from "lucide-react"
import { redirect, useParams } from "next/navigation"
import { PageLoader } from "@/components/page-loader"
import { toast } from "sonner"
import { useAuth } from "@/app/contexts/AuthContext"


export default function InterviewSessionPage({ params }: { params: { id: string } }) {
  const p = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState(true)
  const [interviewData, setInterviewData] = useState(null)
  const [error, setError] = useState(false)
  const [isSpeechRecording, setIsSpeechRecording] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { interviews, generateSummary, submitInterview,checkAnswer,isStarting } = useAuth()

  // Recording refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream>(null)
  const mediaRecorderRef = useRef<MediaRecorder>(null)
  const chunksRef = useRef<Blob[]>([])
  const recordedVideoRef = useRef<string>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        if (!interviewData) return
        
        const currentQ = interviewData.questions[currentQuestionIndex]
        if (!currentQ) return

        let interimTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setAnswers((prev) => ({
              ...prev,
              [currentQ.id]: (prev[currentQ.id] || "") + transcript + " ",
            }))
          } else {
            interimTranscript += transcript
          }
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        if (event.error === "network") {
          console.warn("Network error in speech recognition. Make sure microphone is available.")
        }
        setIsSpeechRecording(false)
      }

      recognitionRef.current.onend = () => {
        setIsSpeechRecording(false)
      }
    }

    return () => {
      if (recognitionRef.current && recognitionRef.current.state === "listening") {
        recognitionRef.current.abort()
      }
    }
  }, [interviewData, currentQuestionIndex])

  useEffect(() => {
    if (interviews === undefined || interviews === null) return

    if (interviews.length === 0) {
      setInterviewData(null)
      setLoading(false)
      return
    }

    const res = interviews.find((i) => i._id === p.id)
    if (!res) {
      setError(true)
      setLoading(false)
      return
    }

    if(res.endTime && new Date(res.endTime).getTime() < Date.now()) {
      toast.error("This interview session has ended.");
      if(res.summary) redirect(`/interview-result/${p.id}`);
      else redirect(`/interviews`); 
    }

    const questions = res.responses?.map((resp, idx) => ({
      id: idx.toString(),
      score: resp.score,
      questionId: resp._id,
      text: resp.question || "Question not available",
      type: resp.difficulty ? "technical" : "behavioral",
      timeLimit: 120,
    })) || []
    
    const remainingMs = new Date(res.endTime).getTime() - Date.now();
    const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));

    const data = {
      id: res._id,
      title: res.title,
      role: res.role,
      difficulty: res.difficulty,
      totalQuestions: res.questionCount || questions.length,
      questions,
      endTime: res.endTime,
      duration: remainingSeconds,
    }

    setInterviewData(data)
    setTimeRemaining(remainingSeconds)
    setLoading(false)
  }, [interviews, p.id])

  // Handle interview completion
  const handleInterviewCompletion = async () => {
    if (isSubmitting) return
      setIsSubmitting(true)
    try {
      toast.success("Interview completed! Your responses have been recorded.")
      await submitInterview(p.id)
      toast.loading("Generating summary...")
      const data = await generateSummary(p.id)
      toast.dismiss()
      if (data.success) {
        window.location.href = `/interview-results/${p.id}`
      } else {
        toast.error("Failed to generate summary. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error completing interview:", error)
      toast.error("There was an error completing the interview. Please try again.")
      setIsSubmitting(false)
    }
  }

  // Countdown timer
  useEffect(() => {
    if (!interviewData || loading || timeRemaining === 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          clearInterval(timer)
          alert("Interview time is up!")
          handleInterviewCompletion()
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [interviewData, loading])

  // Initialize video stream
  useEffect(() => {
    const initializeStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isVideoOn ? { width: { ideal: 1280 }, height: { ideal: 720 } } : false,
          audio: isMicOn,
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing media devices:", err)
      }
    }

    if (isVideoOn || isMicOn) {
      initializeStream()
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isVideoOn, isMicOn])

  // Handle recording toggle
  useEffect(() => {
    if (!streamRef.current) return

    if (isRecording && !mediaRecorderRef.current) {
      try {
        const mediaRecorder = new MediaRecorder(streamRef.current, {
          mimeType: "video/webm",
        })

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" })
          recordedVideoRef.current = URL.createObjectURL(blob)
          chunksRef.current = []
        }

        mediaRecorder.start()
        mediaRecorderRef.current = mediaRecorder
      } catch (err) {
        console.error("Error starting recording:", err)
      }
    } else if (!isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop()
      }
    }
  }, [isRecording])

  useEffect(() => {
    if (!interviewData || !interviewData.questions) return;

    const nextIndex = interviewData.questions.findIndex(
      q => q.score === -1
    );

    if (nextIndex !== -1) {
      setCurrentQuestionIndex(nextIndex);
    }

  }, [interviewData]);

  if (loading) {
    return <PageLoader />
  }

  if (error || !interviewData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Interview not found</p>
      </div>
    )
  }

  if(isStarting) {
    return <PageLoader/>
  }
  

  const currentQuestion = interviewData.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === interviewData.questions.length - 1
  const progress = ((currentQuestionIndex + 1) / interviewData.totalQuestions) * 100

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [currentQuestion.questionId]: e.target.value,
    })
  }

  const handleNextQuestion = async (id: string) => {
    if(!answers[id]) answers[id] = "_";
    const data = {
      questionId: id,
      userAnswer: answers[id]
    }

    const res = await checkAnswer(data, p.id);
    
    if (!isLastQuestion && res.success) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      if(res.success) {  
        await handleInterviewCompletion()
      }else{
        toast.error("There was an error submitting your answer. Please try again.")
      }
    }
  }

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const handleToggleSpeechRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (isSpeechRecording) {
      recognitionRef.current.stop()
      setIsSpeechRecording(false)
    } else {
      recognitionRef.current.start()
      setIsSpeechRecording(true)
    }
  }

  const handleCopyQuestion = () => {
    navigator.clipboard.writeText(currentQuestion.text)
  }

  const handleToggleVideo = async () => {
    if (isVideoOn) {
      streamRef.current?.getVideoTracks().forEach((track) => track.stop())
      setIsVideoOn(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        })
        const videoTrack = stream.getVideoTracks()[0]
        streamRef.current?.addTrack(videoTrack)
        setIsVideoOn(true)
      } catch (err) {
        console.error("Error enabling video:", err)
      }
    }
  }

  const handleToggleMic = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled
      })
      setIsMicOn(!isMicOn)
    }
  }

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const timerColor = timeRemaining <= 60 ? "text-red-600" : "text-blue-600"
  const isTimerValid = timeRemaining > 0 && !isNaN(timeRemaining)

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col overflow-hidden">
      {/* Header - Compact */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 py-2 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold truncate">{interviewData.title}</h1>
            <p className="text-xs text-muted-foreground">
              {interviewData.role} • {interviewData.difficulty}
            </p>
          </div>

          {/* Progress and Timer */}
          <div className="flex items-center gap-30 shrink-0">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Q{currentQuestionIndex + 1}/{interviewData.totalQuestions}
              </p>
              <div className="h-1 w-24 overflow-hidden rounded-full bg-muted mt-1">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xl font-bold ${timerColor}`}>
                {isTimerValid ? `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : "00:00"}
              </p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-hidden px-4 py-0 flex gap-3">
        {/* Left: Video Area - 50% */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Card className="overflow-hidden border-2 border-border flex flex-col">
            <div className="h-115 bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center relative shrink-0">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <VideoOff className="h-10 w-10 mb-2" />
                  <p className="text-xs font-medium">Camera Off</p>
                </div>
              )}

              {isRecording && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 px-2 py-1 rounded">
                  <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-white">Recording</span>
                </div>
              )}

              {/* Compact Media Controls */}
              <div className="absolute bottom-2 left-2 right-2 flex gap-1 justify-center">
                <Button
                  size="sm"
                  variant={isVideoOn ? "default" : "outline"}
                  onClick={handleToggleVideo}
                  className="h-7 px-2 text-xs gap-1"
                >
                  {isVideoOn ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant={isMicOn ? "default" : "outline"}
                  onClick={handleToggleMic}
                  className="h-7 px-2 text-xs gap-1"
                >
                  {isMicOn ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                </Button>
                <Button
                  size="sm"
                  variant={isPaused ? "outline" : "default"}
                  onClick={() => setIsPaused(!isPaused)}
                  className="h-7 px-2 text-xs gap-1"
                >
                  {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Answer Section */}
            <CardContent className="flex-1 overflow-y-auto px-3 space-y-1">
              {/* Your Answer */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">Your Answer</p>
                <textarea
                  ref={textareaRef}
                  value={answers[currentQuestion.questionId] || ""}
                  onChange={handleAnswerChange}
                  placeholder="Type your answer here or use speech-to-text..."
                  className="w-full rounded border border-input bg-background text-foreground px-2 py-1.5 text-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 resize-none h-15"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleToggleRecording}
                  className="h-7 text-xs gap-1"
                >
                  {isRecording ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                  {isRecording ? "Stop" : "Record"}
                </Button>
                <Button
                  variant={isSpeechRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleToggleSpeechRecording}
                  className="h-7 text-xs gap-1"
                >
                  {isSpeechRecording ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                  {isSpeechRecording ? "Stop Listening" : "Speech-to-Text"}
                </Button>
                {isRecording && <span className="text-xs text-red-600 font-semibold">🔴 Recording</span>}
                {isSpeechRecording && <span className="text-xs text-green-600 font-semibold">🎤 Listening</span>}
                <Button
                  onClick={() => handleNextQuestion(currentQuestion.questionId)}
                  className="ml-auto h-7 text-xs gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  {isLastQuestion ? "Complete" : "Next Question"}
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle: Questions Panel */}
        <div className="w-80 shrink-0">
          <Card className="border-2 border-border h-full flex flex-col overflow-hidden">
            <CardHeader className="pb-2 border-b border-border">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <Badge className="mb-1 text-xs" variant="outline">
                    {currentQuestion.type === "technical" ? "Technical" : "Behavioral"}
                  </Badge>

                  <CardTitle className="text-sm leading-tight break-words">
                    {currentQuestion.text}
                  </CardTitle>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyQuestion}
                  className="shrink-0 h-6 w-6"
                  title="Copy question"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-2 space-y-2">
              {/* Tips */}
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded p-2 border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1">💡 Tips</p>
                <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-0.5">
                  <li>• Understand the question</li>
                  <li>• Structure your answer</li>
                  <li>• Provide examples</li>
                </ul>
              </div>

              {/* Question List */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">All Questions</p>
                <div className="space-y-1">
                  {interviewData.questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`p-1.5 rounded text-xs transition-colors cursor-pointer font-medium ${
                        idx === currentQuestionIndex
                          ? "bg-primary/10 border border-primary text-primary"
                          : answers[q.id]
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Q{idx + 1}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
