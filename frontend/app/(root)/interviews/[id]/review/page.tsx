"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Dummy interview data with AI analysis
import { dummyInterviewReview as dummyInterviewData } from "@/utils/constants/interview";

// Performance metrics data
const performanceMetrics = [
  { label: "Communication Clarity", score: 88, color: "bg-green-500" },
  { label: "Technical Accuracy", score: 82, color: "bg-green-500" },
  { label: "Problem Solving", score: 79, color: "bg-yellow-500" },
  { label: "Confidence", score: 91, color: "bg-green-500" },
  { label: "Structure & Organization", score: 85, color: "bg-green-500" }
];

export default function InterviewReviewPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.id as string;
  
  const [interviewData, setInterviewData] = useState<any>(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Simulate API call to fetch interview data
  useEffect(() => {
    // In real app: fetch(`/api/interviews/${interviewId}/review`)
    setInterviewData(dummyInterviewData);
  }, [interviewId]);

  if (!interviewData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interview results...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = interviewData.questions[activeQuestion];
  const aiFeedback = currentQuestion.aiFeedback;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  const downloadReport = () => {
    // In real app, this would generate and download a PDF report
    alert("Interview report downloaded successfully!");
    setShowDownloadModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{interviewData.title}</h1>
              <p className="text-gray-600 mt-1">{interviewData.company}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>Completed on {new Date(interviewData.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>Duration: {interviewData.duration}</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button
                onClick={() => setShowDownloadModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Report
              </button>
              <Link
                href="/interviews"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Back to Interviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Overall Score Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Overall Performance</h2>
              <p className="text-gray-600 mt-1">AI-powered analysis of your interview</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-baseline">
                <span className={`text-4xl font-bold ${getScoreColor(interviewData.overallScore)}`}>
                  {interviewData.overallScore}
                </span>
                <span className="ml-2 text-gray-500">/ 100</span>
              </div>
              <div className="mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(interviewData.overallScore)} ${getScoreColor(interviewData.overallScore)}`}>
                  {interviewData.overallScore >= 80 ? 'Excellent' : 
                   interviewData.overallScore >= 70 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            {/* className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 h-[600px] flex flex-col" */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[500px] flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 mb-4 shrink-0">
                  Questions
                </h3>

                {/* Scrollable section */}
                <div className="space-y-3 overflow-y-auto overflow-x-hidden flex-1 pr-2 custom-scrollbar">
                  {interviewData.questions.map((question: any, index: number) => (
                    <button
                      key={question.id}
                      
                      onClick={() => setActiveQuestion(index)}
                      className={`w-full text-left p-3 rounded-md border transition-colors duration-200 ${
                        activeQuestion === index
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Link href={"#question"}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Q{index + 1}</span>
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded-full ${getScoreBgColor(
                              question.aiFeedback.score
                            )} ${getScoreColor(question.aiFeedback.score)}`}
                          >
                            {question.aiFeedback.score}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {question.question}
                        </p>

                        <div className="mt-2 flex items-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {question.type === 'technical' ? 'Technical' : 'Behavioral'}
                          </span>
                        </div>
                      </Link>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{metric.label}</span>
                      <span className="font-medium text-gray-900">{metric.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${metric.color}`}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Question Details */}
          <section id="question" className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Question {activeQuestion + 1}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                    {currentQuestion.type === 'technical' ? 'Technical' : 'Behavioral'}
                  </span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getScoreBgColor(aiFeedback.score)} ${getScoreColor(aiFeedback.score)}`}>
                  Score: {aiFeedback.score}/100
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Question</h4>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-md border border-gray-200">
                  {currentQuestion.question}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Your Answer</h4>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-gray-800">{currentQuestion.answerTranscript}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">AI Feedback</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Strengths
                    </h5>
                    <ul className="space-y-2">
                      {aiFeedback.strengths.map((strength: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Areas for Improvement
                    </h5>
                    <ul className="space-y-2">
                      {aiFeedback.improvements.map((improvement: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Feedback */}
            {activeQuestion === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Interview Feedback</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Strengths
                    </h4>
                    <ul className="space-y-2">
                      {interviewData.overallFeedback.strengths.map((strength: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {interviewData.overallFeedback.areasForImprovement.map((area: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Recommendation</h4>
                    <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-md border border-blue-200">
                      {interviewData.overallFeedback.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => router.push('/interviews')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Back to Interviews
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Practice Again
          </button>
        </div>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Download Interview Report</h3>
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option>PDF Report</option>
                    <option>CSV Data</option>
                    <option>JSON Raw Data</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Include detailed transcript</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Include AI feedback</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={downloadReport}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}