"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Bookmark, Trash2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/contexts/AuthContext"

interface InterviewCardProps {
  _id: string
  title: string
  role: string
  difficulty: string
  date: string
  scheduledDate: Date
  time: string
  duration: number
  scheduledStatus: string
  interviewer?: string
  isBookmarked?: boolean
  onToggleBookmark?: (id: string) => void
}

export function InterviewCard({
  _id,
  title,
  role,
  difficulty,
  date,
  time,
  scheduledDate,
  duration,
  scheduledStatus = "NOT GET",
  interviewer,
  isBookmarked = false,
  onToggleBookmark,
}: InterviewCardProps) {
  const statusColor = {
    scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    active: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  const difficultyColor = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    beginnner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const {startInterview, deleteInterview} = useAuth();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {/* want to add delete buttion here? */}
              
            <Button onClick={() => deleteInterview(_id)} variant="ghost" size="icon" className="h-8 w-8">
              <Trash2
                className={`h-4 w-4 text-red-500 text-muted-foreground"}`}
              />
            </Button>

            <Button onClick={() => onToggleBookmark?.(_id)} variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark
                className={`h-4 w-4 ${isBookmarked ? "fill-blue-500 text-blue-500" : "text-muted-foreground"}`}
              />
            </Button>
            <Badge className={statusColor[scheduledStatus]}>{scheduledStatus}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(scheduledDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {time} • {duration} min
            </span>
          </div>
          {interviewer && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{interviewer}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {scheduledStatus === "scheduled" && (
            <Link href={`/interview-details/${_id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Details
              </Button>
            </Link>
          )}
          {scheduledStatus === "active" && (
            <>
              <Link href={`/interview-details/${_id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Details
                </Button>
              </Link>
              <Link href={`/interview/${_id}`} className="flex-1">
                <Button size="sm" onClick={() => startInterview(_id)} className="w-full">
                  Start Interview
                </Button>
              </Link>
            </>
          )}
          {scheduledStatus === "completed" && (
            <Link href={`/interview-results/${_id}`} className="flex-1">
              <Button size="sm" className="w-full">
                Result
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Calendar, Clock, Users, Bookmark } from "lucide-react"
// import Link from "next/link"

// interface InterviewCardProps {
//   id: string
//   title: string
//   role: string
//   difficulty: "Beginner" | "Intermediate" | "Advanced"
//   date: string
//   time: string
//   duration: number
//   status: "Scheduled" | "Completed" | "In Progress"
//   interviewer?: string
//   isBookmarked?: boolean
//   onToggleBookmark?: (id: string) => void
// }

// export function InterviewCard({
//   id,
//   title,
//   role,
//   difficulty,
//   date,
//   time,
//   duration,
//   status,
//   interviewer,
//   isBookmarked = false,
//   onToggleBookmark,
// }: InterviewCardProps) {
//   const statusColor = {
//     Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
//     "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//     Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//   }

//   const difficultyColor = {
//     Beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//     Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//     Advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
//   }

//   return (
//     <Card className="hover:shadow-md transition-shadow">
//       <CardHeader>
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <CardTitle className="text-lg">{title}</CardTitle>
//             <CardDescription>{role}</CardDescription>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button onClick={() => onToggleBookmark?.(id)} variant="ghost" size="icon" className="h-8 w-8">
//               <Bookmark
//                 className={`h-4 w-4 ${isBookmarked ? "fill-blue-500 text-blue-500" : "text-muted-foreground"}`}
//               />
//             </Button>
//             <Badge className={statusColor[status]}>{status}</Badge>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex flex-wrap gap-2">
//           <Badge variant="outline" className={difficultyColor[difficulty]}>
//             {difficulty}
//           </Badge>
//         </div>

//         <div className="space-y-2 text-sm">
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <Calendar className="h-4 w-4" />
//             <span>{date}</span>
//           </div>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <Clock className="h-4 w-4" />
//             <span>
//               {time} • {duration} min
//             </span>
//           </div>
//           {interviewer && (
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <Users className="h-4 w-4" />
//               <span>{interviewer}</span>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-2 pt-2">
//           {status === "Scheduled" && (
//             <Link href={`/interview-details/${id}`} className="flex-1">
//               <Button variant="outline" size="sm" className="w-full bg-transparent">
//                 View Details
//               </Button>
//             </Link>
//           )}
//           {status === "In Progress" && (
//             <>
//               <Link href={`/interview-details/${id}`} className="flex-1">
//                 <Button variant="outline" size="sm" className="w-full bg-transparent">
//                   View Details
//                 </Button>
//               </Link>
//               <Link href={`/interview/${id}`} className="flex-1">
//                 <Button size="sm" className="w-full">
//                   Start Interview
//                 </Button>
//               </Link>
//             </>
//           )}
//           {status === "Completed" && (
//             <Link href={`/interview-results/${id}`} className="flex-1">
//               <Button size="sm" className="w-full">
//                 Result
//               </Button>
//             </Link>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
