"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/contexts/AuthContext"
import { useParams } from "next/navigation"
import { PageLoader } from "@/components/page-loader"

// Dummy interview results data
// const interviewResultsData = {
//   id: "3",
//   title: "JavaScript Algorithms",
//   role: "Full Stack Engineer",
//   difficulty: "Intermediate",
//   date: "Oct 15, 2025",
//   time: "3:30 PM",
//   duration: 60,
//   completedAt: "Oct 15, 2025 at 4:30 PM",
//   overallScore: 78,
//   totalQuestions: 5,
//   correctAnswers: 4,
//   partialAnswers: 1,
//   incorrectAnswers: 0,
//   averageResponseTime: "2m 15s",
//   communicationScore: 82,
//   technicalScore: 75,
//   problemSolvingScore: 76,
//   questions: [
//     {
//       id: 1,
//       question: "Explain the difference between var, let, and const in JavaScript",
//       userAnswer:
//         "var is function-scoped and can be redeclared, let is block-scoped and cannot be redeclared, const is also block-scoped and cannot be reassigned.",
//       expectedAnswer:
//         "var is function-scoped and hoisted, let and const are block-scoped. let can be reassigned but not redeclared, const cannot be reassigned or redeclared.",
//       score: 85,
//       feedback: "Good understanding of scoping. You could have mentioned hoisting for var.",
//       responseTime: "1m 30s",
//     },
//     {
//       id: 2,
//       question: "Write a function to reverse a string without using built-in reverse method",
//       userAnswer:
//         "function reverseString(str) { let result = ''; for(let i = str.length - 1; i >= 0; i--) { result += str[i]; } return result; }",
//       expectedAnswer:
//         "function reverseString(str) { return str.split('').reverse().join(''); } or using a loop as shown",
//       score: 90,
//       feedback: "Excellent solution! Your loop-based approach is efficient and well-structured.",
//       responseTime: "3m 45s",
//     },
//     {
//       id: 3,
//       question: "What is the time complexity of binary search?",
//       userAnswer: "O(log n) because we divide the search space in half each time",
//       expectedAnswer: "O(log n) - logarithmic time complexity due to halving the search space",
//       score: 95,
//       feedback: "Perfect! You clearly understand logarithmic complexity.",
//       responseTime: "45s",
//     },
//     {
//       id: 4,
//       question: "Explain event delegation in JavaScript",
//       userAnswer:
//         "Event delegation is when you attach an event listener to a parent element instead of individual child elements. The event bubbles up and you can check the target.",
//       expectedAnswer:
//         "Event delegation uses event bubbling to handle events on parent elements. You attach one listener to a parent and use event.target to identify which child triggered it.",
//       score: 70,
//       feedback: "Good concept understanding. You could have explained event bubbling more clearly.",
//       responseTime: "2m 10s",
//     },
//     {
//       id: 5,
//       question: "What are closures and provide an example",
//       userAnswer:
//         "Closures are functions that have access to variables from their outer scope even after the outer function has returned. Example: function outer() { let count = 0; return function() { count++; return count; } }",
//       expectedAnswer:
//         "Closures are functions that retain access to their lexical scope. They allow data encapsulation and are commonly used in callbacks and event handlers.",
//       score: 80,
//       feedback: "Great example! Your understanding is solid. Consider mentioning practical use cases.",
//       responseTime: "2m 30s",
//     },
//   ],
//   areasOfImprovement: [
//     {
//       area: "Event Handling",
//       description: "Strengthen your understanding of event bubbling and delegation patterns",
//       priority: "High",
//     },
//     {
//       area: "Practical Examples",
//       description: "Provide more real-world use cases when explaining concepts",
//       priority: "Medium",
//     },
//     {
//       area: "Time Complexity Analysis",
//       description: "Continue practicing algorithm complexity analysis",
//       priority: "Low",
//     },
//   ],
//   strengths: [
//     "Strong problem-solving approach",
//     "Clear code implementation",
//     "Good understanding of core concepts",
//     "Efficient algorithm solutions",
//   ],
// }


export default function InterviewResultsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const {getSummary} = useAuth();
  const [interview, setInterview] = useState({});
  const [summary, setSummary] = useState({});
  const [isFetch, setIsFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // want to get params
  const p = useParams();
  
  let totalScore = 0;
  for(let i=0; i<interview?.responses?.length; i++) {
    totalScore += interview.responses[i].score / interview.responses.length;
  }

  // only want integer 
  totalScore = Math.round(totalScore);
    
  let result;

  if(summary && interview && isFetch) {
    result = {
      id: summary?._id,
      title: interview?.title,
      role: interview?.role || "NA",
      date: interview?.scheduledDate,
      difficulty: interview?.difficulty,
      duration: interview?.duration,
      completedAt: interview?.endTime,
      overallScore: totalScore,
      totalQuestions: interview?.responses?.length,

      correctAnswers: summary?.answerDistribution?.completeAnsCount,
      partialAnswers: summary?.answerDistribution?.partialAnsCount,
      incorrectAnswers: summary?.answerDistribution?.incorrectAnsCount,
      
      communicationScore: summary?.communicationScore * 10,
      technicalScore: summary?.technicalScore * 10,
      problemSolvingScore: summary?.problemSolvingScore * 10,
      
      questions: interview?.responses || [],
      areasOfImprovement: summary?.areasOfImprovement ,
      strengths: summary?.strength || [],

      interviewSummary: summary?.interviewSummary,
      overallFeedback: summary?.overallFeedback,
      overallPerformance: summary?.overallPerformance,
      keyTakeaways: summary?.keyTakeaways,
      recommendedNextSteps: summary?.recommendedNextSteps

    }
  }
  // console.log(result)

  let data = result || null;
  // console.log(summary)

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const out = await getSummary(p.id);
      // console.log(out)
      console.log(out)
      setInterview(out.interview);
      setSummary(out.summary);
      setIsFetch(true);
      setLoading(false);
    }

    getData();
  }, [p.id]);

  if(loading || !isFetch || !data) {
    return (
      <PageLoader/>
    )
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const scoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400"
    if (score >= 70) return "text-blue-600 dark:text-blue-400"
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const scoreBgColor = (score: number) => {
    if (score >= 85) return "bg-green-50 dark:bg-green-950"
    if (score >= 70) return "bg-blue-50 dark:bg-blue-950"
    if (score >= 50) return "bg-yellow-50 dark:bg-yellow-950"
    return "bg-red-50 dark:bg-red-950"
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <Link href="/interviews">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Interviews
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
              <div className="flex flex-row gap-2 h-1 mt-2 text-muted-foreground">
                <p>{data.role}</p> • 
                <p>{data.difficulty}</p> • 
                <p>Completed {formatDate(data.completedAt)}</p>
              </div>
            </div>
          </div>

          {/* Overall Score Card */}
          <Card className={`mb-8 border-2 ${scoreBgColor(data.overallScore)}`}>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${scoreColor(data.overallScore)}`}>{data.overallScore}</div>
                  <p className="mt-2 text-sm text-foreground">Overall Score</p>
                </div>
                <div className="flex flex-col justify-center border-l border-border pl-6">
                  <div className="text-2xl font-semibold text-foreground">
                    {data.correctAnswers}/{data.totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                </div>
                {/* <div className="flex flex-col justify-center border-l border-border pl-6">
                  <div className="text-2xl font-semibold text-foreground">{data.averageResponseTime}</div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div> */}
                <div className="flex flex-col justify-center border-l border-border pl-6">
                  <div className="text-2xl font-semibold text-foreground">{data.duration} min</div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
                <div className="flex flex-col justify-center border-l border-border pl-6">
                  <div className="text-2xl font-semibold text-foreground">{data.totalQuestions}</div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-green-600 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Areas of Improvement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      Areas of Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {data.areasOfImprovement.map((area, idx) => (
                      <div key={idx} className="rounded-lg border border-border p-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-sm">{area.topic}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{area.feedback}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              area.level === "High"
                                ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
                                : area.level === "Medium"
                                  ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-200"
                                  : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200"
                            }
                          >
                            {area.level}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Questions & Answers Tab */}
            <TabsContent value="questions" className="space-y-6">
              {data.questions.map((q, idx) => (
                <Card key={q._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">
                          Question {idx + 1}: {q.question}
                        </CardTitle>
                      </div>
                      <div
                        className={`rounded-lg px-3 py-1 text-sm font-semibold ${scoreColor(q.score)} ${scoreBgColor(q.score)}`}
                      >
                        {q.score}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</p>
                      <div className="rounded-lg bg-muted p-3 text-sm">{q.userAnswer}</div>
                    </div>

                    {q.expectedAnswer?.length > 0 && (<div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Expected Answer:</p>
                      <div className="rounded-lg bg-muted p-3 text-sm">{q.expectedAnswer}</div>
                    </div>)}

                    <div className="grid gap-4 md:grid-cols-1">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Feedback:</p>
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm dark:border-blue-900 dark:bg-blue-950">
                          {q.feedback}
                        </div>
                      </div>
                      {/* <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Response Time:</p>
                        <div className="rounded-lg border border-border p-3 text-sm font-medium">{q.responseTime}</div>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Communication Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Communication Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-4">
                      <div className={`text-4xl font-bold ${scoreColor(data.communicationScore)}`}>
                        {data.communicationScore}
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${data.communicationScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Clarity and articulation of ideas</p>
                  </CardContent>
                </Card>

                {/* Technical Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Technical Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-4">
                      <div className={`text-4xl font-bold ${scoreColor(data.technicalScore)}`}>
                        {data.technicalScore}
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-purple-600"
                            style={{ width: `${data.technicalScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Knowledge and accuracy</p>
                  </CardContent>
                </Card>

                {/* Problem Solving Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Problem Solving Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-4">
                      <div className={`text-4xl font-bold ${scoreColor(data.problemSolvingScore)}`}>
                        {data.problemSolvingScore}
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-orange-600"
                            style={{ width: `${data.problemSolvingScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Approach and logic</p>
                  </CardContent>
                </Card>
              </div>

              {/* Answer Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Answer Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Correct Answers</span>
                        <span className="text-sm font-semibold text-green-600">{data.correctAnswers}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-green-600"
                          style={{ width: `${(data.correctAnswers / data.totalQuestions) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Partial Answers</span>
                        <span className="text-sm font-semibold text-yellow-600">{data.partialAnswers}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-yellow-600"
                          style={{ width: `${(data.partialAnswers / data.totalQuestions) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Incorrect Answers</span>
                        <span className="text-sm font-semibold text-red-600">{data.incorrectAnswers}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-red-600"
                          style={{ width: `${(data.incorrectAnswers / data.totalQuestions) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Summary</CardTitle>
                  <CardDescription>Detailed feedback and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Overall Performance</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {data.overallPerformance}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Key Takeaways</h3>
                    <ul className="space-y-2">
                      {/* want to use map funtion */}
                      {/* {data.keyTakeaways.strengths.map((val, idx) => (
                        <li id={idx} className="flex gap-3 text-sm">
                          <span className="text-green-600 font-bold">✓</span>
                          <span className="text-foreground">{val}</span>
                        </li>
                      )} */}
                      {data.keyTakeaways?.strengths.map((val: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="text-green-600 font-bold">✓</span>
                          <span className="text-foreground">{val}</span>
                        </li>
                      ))}

                      {data.keyTakeaways?.improvements.map((val: string, idx: number) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="text-yellow-600 font-bold">→</span>
                          <span className="text-foreground">{val}</span>
                        </li>
                      ))}
                      
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-foreground">Recommended Next Steps</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {data.recommendedNextSteps?.map((step: string, idx: number) => (
                        <li key={idx} className="list-decimal list-inside">
                          {step}
                        </li>
                      ))}
                      
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <Link href="/interviews">
              <Button variant="outline">Back to Interviews</Button>
            </Link>
            <Button>Schedule Another Interview</Button>
          </div>
        </div>
      </main>
    </>
  )
}
// "use client"

// import { useEffect, useState } from "react"
// import { SiteHeader } from "@/components/site-header"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ArrowLeft, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
// import Link from "next/link"
// import { useAuth } from "@/app/contexts/AuthContext"
// import { useParams } from "next/navigation"

// // Dummy interview results data
// const interviewResultsData = {
//   id: "3",
//   title: "JavaScript Algorithms",
//   role: "Full Stack Engineer",
//   difficulty: "Intermediate",
//   date: "Oct 15, 2025",
//   time: "3:30 PM",
//   duration: 60,
//   completedAt: "Oct 15, 2025 at 4:30 PM",
//   overallScore: 78,
//   totalQuestions: 5,
//   correctAnswers: 4,
//   partialAnswers: 1,
//   incorrectAnswers: 0,
//   averageResponseTime: "2m 15s",
//   communicationScore: 82,
//   technicalScore: 75,
//   problemSolvingScore: 76,
//   questions: [
//     {
//       id: 1,
//       question: "Explain the difference between var, let, and const in JavaScript",
//       userAnswer:
//         "var is function-scoped and can be redeclared, let is block-scoped and cannot be redeclared, const is also block-scoped and cannot be reassigned.",
//       expectedAnswer:
//         "var is function-scoped and hoisted, let and const are block-scoped. let can be reassigned but not redeclared, const cannot be reassigned or redeclared.",
//       score: 85,
//       feedback: "Good understanding of scoping. You could have mentioned hoisting for var.",
//       responseTime: "1m 30s",
//     },
//     {
//       id: 2,
//       question: "Write a function to reverse a string without using built-in reverse method",
//       userAnswer:
//         "function reverseString(str) { let result = ''; for(let i = str.length - 1; i >= 0; i--) { result += str[i]; } return result; }",
//       expectedAnswer:
//         "function reverseString(str) { return str.split('').reverse().join(''); } or using a loop as shown",
//       score: 90,
//       feedback: "Excellent solution! Your loop-based approach is efficient and well-structured.",
//       responseTime: "3m 45s",
//     },
//     {
//       id: 3,
//       question: "What is the time complexity of binary search?",
//       userAnswer: "O(log n) because we divide the search space in half each time",
//       expectedAnswer: "O(log n) - logarithmic time complexity due to halving the search space",
//       score: 95,
//       feedback: "Perfect! You clearly understand logarithmic complexity.",
//       responseTime: "45s",
//     },
//     {
//       id: 4,
//       question: "Explain event delegation in JavaScript",
//       userAnswer:
//         "Event delegation is when you attach an event listener to a parent element instead of individual child elements. The event bubbles up and you can check the target.",
//       expectedAnswer:
//         "Event delegation uses event bubbling to handle events on parent elements. You attach one listener to a parent and use event.target to identify which child triggered it.",
//       score: 70,
//       feedback: "Good concept understanding. You could have explained event bubbling more clearly.",
//       responseTime: "2m 10s",
//     },
//     {
//       id: 5,
//       question: "What are closures and provide an example",
//       userAnswer:
//         "Closures are functions that have access to variables from their outer scope even after the outer function has returned. Example: function outer() { let count = 0; return function() { count++; return count; } }",
//       expectedAnswer:
//         "Closures are functions that retain access to their lexical scope. They allow data encapsulation and are commonly used in callbacks and event handlers.",
//       score: 80,
//       feedback: "Great example! Your understanding is solid. Consider mentioning practical use cases.",
//       responseTime: "2m 30s",
//     },
//   ],
//   areasOfImprovement: [
//     {
//       area: "Event Handling",
//       description: "Strengthen your understanding of event bubbling and delegation patterns",
//       priority: "High",
//     },
//     {
//       area: "Practical Examples",
//       description: "Provide more real-world use cases when explaining concepts",
//       priority: "Medium",
//     },
//     {
//       area: "Time Complexity Analysis",
//       description: "Continue practicing algorithm complexity analysis",
//       priority: "Low",
//     },
//   ],
//   strengths: [
//     "Strong problem-solving approach",
//     "Clear code implementation",
//     "Good understanding of core concepts",
//     "Efficient algorithm solutions",
//   ],
// }

// export default function InterviewResultsPage({ params }: { params: { id: string } }) {
//   const [activeTab, setActiveTab] = useState("overview")
//   const data = interviewResultsData;
//   const {getSummary} = useAuth();

//   // want to get params
//   const p = useParams();
//   // console.log(p.id)
//   let summary = getSummary(p.id);

//   const scoreColor = (score: number) => {
//     if (score >= 85) return "text-green-600 dark:text-green-400"
//     if (score >= 70) return "text-blue-600 dark:text-blue-400"
//     if (score >= 50) return "text-yellow-600 dark:text-yellow-400"
//     return "text-red-600 dark:text-red-400"
//   }

//   const scoreBgColor = (score: number) => {
//     if (score >= 85) return "bg-green-50 dark:bg-green-950"
//     if (score >= 70) return "bg-blue-50 dark:bg-blue-950"
//     if (score >= 50) return "bg-yellow-50 dark:bg-yellow-950"
//     return "bg-red-50 dark:bg-red-950"
//   }


//   return (
//     <>
//       <SiteHeader />
//       <main className="min-h-screen bg-background">
//         <div className="mx-auto max-w-6xl px-4 py-8">
//           {/* Header */}
//           <div className="mb-8 flex items-start justify-between">
//             <div>
//               <Link href="/interviews">
//                 <Button variant="ghost" size="sm" className="mb-4">
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back to Interviews
//                 </Button>
//               </Link>
//               <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
//               <p className="mt-2 text-muted-foreground">
//                 {data.role} • {data.difficulty} • Completed {data.completedAt}
//               </p>
//             </div>
//           </div>

//           {/* Overall Score Card */}
//           <Card className={`mb-8 border-2 ${scoreBgColor(data.overallScore)}`}>
//             <CardContent className="pt-6">
//               <div className="grid gap-6 md:grid-cols-5">
//                 <div className="text-center">
//                   <div className={`text-5xl font-bold ${scoreColor(data.overallScore)}`}>{data.overallScore}</div>
//                   <p className="mt-2 text-sm text-foreground">Overall Score</p>
//                 </div>
//                 <div className="flex flex-col justify-center border-l border-border pl-6">
//                   <div className="text-2xl font-semibold text-foreground">
//                     {data.correctAnswers}/{data.totalQuestions}
//                   </div>
//                   <p className="text-sm text-muted-foreground">Correct Answers</p>
//                 </div>
//                 <div className="flex flex-col justify-center border-l border-border pl-6">
//                   <div className="text-2xl font-semibold text-foreground">{data.averageResponseTime}</div>
//                   <p className="text-sm text-muted-foreground">Avg Response Time</p>
//                 </div>
//                 <div className="flex flex-col justify-center border-l border-border pl-6">
//                   <div className="text-2xl font-semibold text-foreground">{data.duration} min</div>
//                   <p className="text-sm text-muted-foreground">Duration</p>
//                 </div>
//                 <div className="flex flex-col justify-center border-l border-border pl-6">
//                   <div className="text-2xl font-semibold text-foreground">{data.totalQuestions}</div>
//                   <p className="text-sm text-muted-foreground">Total Questions</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Tabs */}
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
//               <TabsTrigger value="analytics">Analytics</TabsTrigger>
//               <TabsTrigger value="feedback">Feedback</TabsTrigger>
//             </TabsList>

//             {/* Overview Tab */}
//             <TabsContent value="overview" className="space-y-6">
//               <div className="grid gap-6 md:grid-cols-2">
//                 {/* Strengths */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <CheckCircle2 className="h-5 w-5 text-green-600" />
//                       Strengths
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-3">
//                       {data.strengths.map((strength, idx) => (
//                         <li key={idx} className="flex items-start gap-3">
//                           <div className="mt-1 h-2 w-2 rounded-full bg-green-600 flex-shrink-0" />
//                           <span className="text-sm">{strength}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>

//                 {/* Areas of Improvement */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <AlertCircle className="h-5 w-5 text-yellow-600" />
//                       Areas of Improvement
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {data.areasOfImprovement.map((area, idx) => (
//                       <div key={idx} className="rounded-lg border border-border p-3">
//                         <div className="flex items-start justify-between">
//                           <div>
//                             <p className="font-medium text-sm">{area.area}</p>
//                             <p className="mt-1 text-xs text-muted-foreground">{area.description}</p>
//                           </div>
//                           <Badge
//                             variant="outline"
//                             className={
//                               area.priority === "High"
//                                 ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
//                                 : area.priority === "Medium"
//                                   ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-200"
//                                   : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200"
//                             }
//                           >
//                             {area.priority}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             {/* Questions & Answers Tab */}
//             <TabsContent value="questions" className="space-y-6">
//               {data.questions.map((q, idx) => (
//                 <Card key={q.id}>
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <CardTitle className="text-base">
//                           Question {idx + 1}: {q.question}
//                         </CardTitle>
//                       </div>
//                       <div
//                         className={`rounded-lg px-3 py-1 text-sm font-semibold ${scoreColor(q.score)} ${scoreBgColor(q.score)}`}
//                       >
//                         {q.score}%
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</p>
//                       <div className="rounded-lg bg-muted p-3 text-sm">{q.userAnswer}</div>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground mb-2">Expected Answer:</p>
//                       <div className="rounded-lg bg-muted p-3 text-sm">{q.expectedAnswer}</div>
//                     </div>

//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div>
//                         <p className="text-sm font-medium text-muted-foreground mb-2">Feedback:</p>
//                         <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm dark:border-blue-900 dark:bg-blue-950">
//                           {q.feedback}
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-muted-foreground mb-2">Response Time:</p>
//                         <div className="rounded-lg border border-border p-3 text-sm font-medium">{q.responseTime}</div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </TabsContent>

//             {/* Analytics Tab */}
//             <TabsContent value="analytics" className="space-y-6">
//               <div className="grid gap-6 md:grid-cols-3">
//                 {/* Communication Score */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm">Communication Score</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-end gap-4">
//                       <div className={`text-4xl font-bold ${scoreColor(data.communicationScore)}`}>
//                         {data.communicationScore}
//                       </div>
//                       <div className="flex-1">
//                         <div className="h-2 w-full rounded-full bg-muted">
//                           <div
//                             className="h-full rounded-full bg-blue-600"
//                             style={{ width: `${data.communicationScore}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <p className="mt-3 text-xs text-muted-foreground">Clarity and articulation of ideas</p>
//                   </CardContent>
//                 </Card>

//                 {/* Technical Score */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm">Technical Score</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-end gap-4">
//                       <div className={`text-4xl font-bold ${scoreColor(data.technicalScore)}`}>
//                         {data.technicalScore}
//                       </div>
//                       <div className="flex-1">
//                         <div className="h-2 w-full rounded-full bg-muted">
//                           <div
//                             className="h-full rounded-full bg-purple-600"
//                             style={{ width: `${data.technicalScore}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <p className="mt-3 text-xs text-muted-foreground">Knowledge and accuracy</p>
//                   </CardContent>
//                 </Card>

//                 {/* Problem Solving Score */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-sm">Problem Solving Score</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-end gap-4">
//                       <div className={`text-4xl font-bold ${scoreColor(data.problemSolvingScore)}`}>
//                         {data.problemSolvingScore}
//                       </div>
//                       <div className="flex-1">
//                         <div className="h-2 w-full rounded-full bg-muted">
//                           <div
//                             className="h-full rounded-full bg-orange-600"
//                             style={{ width: `${data.problemSolvingScore}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <p className="mt-3 text-xs text-muted-foreground">Approach and logic</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Answer Distribution */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <TrendingUp className="h-5 w-5" />
//                     Answer Distribution
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium">Correct Answers</span>
//                         <span className="text-sm font-semibold text-green-600">{data.correctAnswers}</span>
//                       </div>
//                       <div className="h-2 w-full rounded-full bg-muted">
//                         <div
//                           className="h-full rounded-full bg-green-600"
//                           style={{ width: `${(data.correctAnswers / data.totalQuestions) * 100}%` }}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium">Partial Answers</span>
//                         <span className="text-sm font-semibold text-yellow-600">{data.partialAnswers}</span>
//                       </div>
//                       <div className="h-2 w-full rounded-full bg-muted">
//                         <div
//                           className="h-full rounded-full bg-yellow-600"
//                           style={{ width: `${(data.partialAnswers / data.totalQuestions) * 100}%` }}
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium">Incorrect Answers</span>
//                         <span className="text-sm font-semibold text-red-600">{data.incorrectAnswers}</span>
//                       </div>
//                       <div className="h-2 w-full rounded-full bg-muted">
//                         <div
//                           className="h-full rounded-full bg-red-600"
//                           style={{ width: `${(data.incorrectAnswers / data.totalQuestions) * 100}%` }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Feedback Tab */}
//             <TabsContent value="feedback" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Interview Summary</CardTitle>
//                   <CardDescription>Detailed feedback and recommendations</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <h3 className="font-semibold mb-3 text-foreground">Overall Performance</h3>
//                     <p className="text-sm text-muted-foreground leading-relaxed">
//                       You demonstrated a solid understanding of JavaScript fundamentals with a score of{" "}
//                       {data.overallScore}%. Your approach to problem-solving was methodical and your code
//                       implementations were clean and efficient. Focus on deepening your knowledge of advanced concepts
//                       and real-world applications.
//                     </p>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold mb-3 text-foreground">Key Takeaways</h3>
//                     <ul className="space-y-2">
//                       <li className="flex gap-3 text-sm">
//                         <span className="text-green-600 font-bold">✓</span>
//                         <span className="text-foreground">Strong grasp of core JavaScript concepts and syntax</span>
//                       </li>
//                       <li className="flex gap-3 text-sm">
//                         <span className="text-green-600 font-bold">✓</span>
//                         <span className="text-foreground">
//                           Ability to write efficient algorithms and optimize solutions
//                         </span>
//                       </li>
//                       <li className="flex gap-3 text-sm">
//                         <span className="text-yellow-600 font-bold">→</span>
//                         <span className="text-foreground">
//                           Improve explanation of event handling and DOM manipulation
//                         </span>
//                       </li>
//                       <li className="flex gap-3 text-sm">
//                         <span className="text-yellow-600 font-bold">→</span>
//                         <span className="text-foreground">Practice explaining concepts with real-world use cases</span>
//                       </li>
//                     </ul>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold mb-3 text-foreground">Recommended Next Steps</h3>
//                     <ol className="space-y-2 text-sm text-muted-foreground">
//                       <li>1. Review event delegation patterns and practice DOM manipulation</li>
//                       <li>2. Study advanced JavaScript concepts like async/await and Promises</li>
//                       <li>3. Practice system design questions for backend roles</li>
//                       <li>4. Record yourself explaining concepts to improve communication</li>
//                     </ol>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>

//           {/* Action Buttons */}
//           <div className="mt-8 flex gap-4">
//             <Link href="/interviews">
//               <Button variant="outline">Back to Interviews</Button>
//             </Link>
//             <Button>Schedule Another Interview</Button>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }
