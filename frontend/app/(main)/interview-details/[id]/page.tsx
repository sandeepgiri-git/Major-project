"use client"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Users, FileText, Briefcase } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import { PageLoader } from "@/components/page-loader"

// const interviewDetails = {
//   "1": {
//     id: "1",
//     title: "React Fundamentals",
//     role: "Frontend Engineer",
//     difficulty: "Beginner",
//     date: "Oct 18, 2025",
//     time: "2:00 PM",
//     duration: 60,
//     status: "Scheduled",
//     description:
//       "This interview focuses on core React concepts including components, hooks, state management, and lifecycle methods. You'll be asked to explain fundamental concepts and solve practical coding problems.",
//     topics: ["Components", "Hooks", "State Management", "Props", "Lifecycle Methods", "JSX"],
//     requirements: [
//       "Basic JavaScript knowledge",
//       "Understanding of ES6+ syntax",
//       "Familiarity with React documentation",
//     ],
//     format: "Technical Interview - 60 minutes",
//   },
//   "2": {
//     id: "2",
//     title: "System Design - E-commerce",
//     role: "Backend Engineer",
//     difficulty: "Advanced",
//     date: "Oct 20, 2025",
//     time: "10:00 AM",
//     duration: 90,
//     status: "Scheduled",
//     interviewer: "John Smith",
//     description:
//       "Design a scalable e-commerce system from scratch. You'll need to discuss architecture, database design, caching strategies, and handling high traffic scenarios.",
//     topics: ["System Architecture", "Database Design", "Caching", "Load Balancing", "Microservices", "API Design"],
//     requirements: [
//       "Strong backend fundamentals",
//       "Experience with distributed systems",
//       "Knowledge of database optimization",
//     ],
//     format: "System Design Interview - 90 minutes",
//   },
//   "3": {
//     id: "3",
//     title: "JavaScript Algorithms",
//     role: "Full Stack Engineer",
//     difficulty: "Intermediate",
//     date: "Oct 15, 2025",
//     time: "3:30 PM",
//     duration: 60,
//     status: "Completed",
//     description:
//       "Solve algorithmic problems using JavaScript. Focus on problem-solving approach, code optimization, and explaining your thought process.",
//     topics: ["Arrays", "Strings", "Trees", "Graphs", "Dynamic Programming", "Sorting"],
//     requirements: ["JavaScript proficiency", "Algorithm knowledge", "Problem-solving skills"],
//     format: "Coding Interview - 60 minutes",
//   },
//   "4": {
//     id: "4",
//     title: "DevOps & Infrastructure",
//     role: "DevOps Engineer",
//     difficulty: "Advanced",
//     date: "Oct 19, 2025",
//     time: "1:00 PM",
//     duration: 75,
//     status: "In Progress",
//     interviewer: "Sarah Johnson",
//     description:
//       "Discuss DevOps practices, CI/CD pipelines, containerization, and infrastructure as code. You'll be asked about your experience with deployment and monitoring.",
//     topics: ["Docker", "Kubernetes", "CI/CD", "Infrastructure as Code", "Monitoring", "Logging"],
//     requirements: ["DevOps experience", "Container knowledge", "Cloud platform familiarity"],
//     format: "Technical Interview - 75 minutes",
//   },
//   "5": {
//     id: "5",
//     title: "Data Structures",
//     role: "Backend Engineer",
//     difficulty: "Intermediate",
//     date: "Oct 22, 2025",
//     time: "11:00 AM",
//     duration: 60,
//     status: "Scheduled",
//     description:
//       "Deep dive into data structures including arrays, linked lists, stacks, queues, trees, and graphs. Implement and optimize various data structures.",
//     topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Hash Tables"],
//     requirements: ["Programming fundamentals", "Algorithm knowledge", "Data structure concepts"],
//     format: "Coding Interview - 60 minutes",
//   },
//   "6": {
//     id: "6",
//     title: "Product Strategy",
//     role: "Product Manager",
//     difficulty: "Intermediate",
//     date: "Oct 21, 2025",
//     time: "4:00 PM",
//     duration: 45,
//     status: "Scheduled",
//     interviewer: "Emma Davis",
//     description:
//       "Discuss product strategy, market analysis, and feature prioritization. You'll be asked to analyze a product problem and propose solutions.",
//     topics: ["Product Strategy", "Market Analysis", "User Research", "Prioritization", "Metrics"],
//     requirements: ["Product thinking", "Business acumen", "Communication skills"],
//     format: "Product Interview - 45 minutes",
//   },
// }

export default function InterviewDetailsPage({ params }: { params: { id: string } }) {
  const { interviews, fetchDone } = useAuth();
  const p = useParams()
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(interviews)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!interviews || !p.id) return;
    // console.log(interviews)
    const res = interviews.find((i) => i._id === p.id);
    // const idx = interviews.findIndex((i) => i._id === p.id);
    // console.log(interviews[idx]);

    if (res) {
      setInterview({
        id: res._id,
        title: res.title,
        role: res.role,
        difficulty: res.difficulty,
        date: res.scheduledDate,
        duration: res.duration,
        status: res.scheduledStatus,
        // status: "scheduled",
        time: res.scheduleTime || "",
        description: res.description || "Not Provided",
        topics: res.topics || ["Not Provided"],
        requirements: res.requirements || ["Not Provided"],
        format: res.format || "Not Provided",
      });
      // console.log(res)
    }
    setLoading(false);
    
  }, [p.id, interviews]);


  if (!interview) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">Interview not found</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (loading && !fetchDone) {
    return (
      <PageLoader/>
    )
  }

  const difficultyColor = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  const statusColor = {
    scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    active: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Back Button */}
          <Link href="/interviews">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Interviews
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">{interview.title}</h1>
                <p className="mt-2 text-lg text-muted-foreground">{interview.role}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={statusColor[interview.status]}>{interview.status}</Badge>
                <Badge className={difficultyColor[interview.difficulty]}>{interview.difficulty}</Badge>
              </div>
            </div>
          </div>

          {/* Interview Info Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="flex items-center py-2 gap-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div >
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{formatDate(interview.date)}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 py-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time & Duration</p>
                  <p className="font-semibold">
                    {interview.time} • {interview.duration} min
                  </p>
                </div>
              </CardContent>
            </Card>
            {interview.interviewer && (
              <Card>
                <CardContent className="flex items-center gap-4 py-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Interviewer</p>
                    <p className="font-semibold">{interview.interviewer}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardContent className="flex items-center gap-4 py-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="font-semibold">{interview.format}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                About This Interview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{interview.description}</p>
            </CardContent>
          </Card>

          {/* Topics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Topics Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {interview.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {interview.requirements.map((req) => (
                  <li key={req} className="flex flex-row items-center gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {interview.status === "Scheduled" && (
              <Link href={`/interview/${interview.id}`} className="flex-1">
                <Button size="lg" className="w-full">
                  Start Interview
                </Button>
              </Link>
            )}
            {interview.status === "Completed" && (
              <Link href={`/interview-results/${interview.id}`} className="flex-1">
                <Button size="lg" className="w-full">
                  View Results
                </Button>
              </Link>
            )}
            <Link href="/interviews" className="flex-1">
              <Button size="lg" variant="outline" className="w-full bg-transparent">
                Back to List
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
