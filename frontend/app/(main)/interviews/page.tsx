"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { InterviewCard } from "@/components/interviews/interview-card"
import { InterviewFilters } from "@/components/interviews/interview-filters"
import { BookmarkedInterviews } from "@/components/interviews/bookmarked-interviews"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/app/contexts/AuthContext"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface FilterOptions {
  search: string
  difficulty: string[]
  role: string[]
  date: string
}

export default function InterviewsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming")
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    difficulty: [],
    role: [],
    date: "",
  })
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const { interviews } = useAuth()
  let dummyInterviews = interviews;

  const filterInterviews = (interviews) => {
    return interviews.filter((interview) => {
      const matchesSearch =
        interview.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        interview.role.toLowerCase().includes(filters.search.toLowerCase())

      const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(interview.difficulty)

      const matchesRole = filters.role.length === 0 || filters.role.includes(interview.role)

      return matchesSearch && matchesDifficulty && matchesRole
    })
  }
  // console.log(dummyInterviews);

  const upcomingInterviews = filterInterviews(dummyInterviews?.filter((i) => i.scheduledStatus === "scheduled"))
  const inProgressInterviews = filterInterviews(dummyInterviews?.filter((i) => i.scheduledStatus === "active"))
  const completedInterviews = filterInterviews(dummyInterviews?.filter((i) => i.scheduledStatus === "completed"))
  

  const bookmarkedInterviews = dummyInterviews?
    .filter((i) => bookmarkedIds.includes(i._id))
    .map((i) => ({
        _id: i._id,
        title: i.title,
        role: i.role,
        difficulty: i.difficulty,
        scheduledDate: i.scheduledDate,
        duration: i.duration,
        interviewType: i.interviewType,
        questionCount: i.questionCount,
      }
    )
  )

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]))
  }

  const handleRemoveBookmark = (id: string) => {
    setBookmarkedIds((prev) => prev.filter((bid) => bid !== id))
  }
  

  useEffect(() => {
    dummyInterviews = interviews
  }, [interviews])

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Interviews</h1>
            </div>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Manage your practice and scheduled interviews
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4">
            {/* Sidebar - Filters and Bookmarks - Hidden on mobile, shown on md+ */}
            <div className="hidden md:block md:col-span-1 space-y-6">
              <InterviewFilters onFilterChange={setFilters} />
              <BookmarkedInterviews interviews={bookmarkedInterviews} onRemoveBookmark={handleRemoveBookmark} />
            </div>

            {/* Main Content - Tabs */}
            <div className="col-span-1 md:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
                  <TabsTrigger value="upcoming" className="text-xs md:text-sm">
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="text-xs md:text-sm">
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs md:text-sm">
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="create" className="text-xs md:text-sm">
                    Create
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  <div className="grid gap-4">
                    {upcomingInterviews.length > 0 ? (
                      upcomingInterviews.map((interview) => (
                        <InterviewCard
                          key={interview._id}
                          {...interview}
                          isBookmarked={bookmarkedIds.includes(interview._id)}
                          onToggleBookmark={() => handleToggleBookmark(interview._id)}
                        />
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-border p-6 md:p-8 text-center">
                        <p className="text-sm md:text-base text-muted-foreground">No upcoming interviews found</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="in-progress" className="space-y-4">
                  <div className="grid gap-4">
                    {inProgressInterviews.length > 0 ? (
                      inProgressInterviews.map((interview) => (
                        <InterviewCard
                          key={interview._id}
                          {...interview}
                          isBookmarked={bookmarkedIds.includes(interview._id)}
                          onToggleBookmark={() => handleToggleBookmark(interview._id)}
                        />
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-border p-6 md:p-8 text-center">
                        <p className="text-sm md:text-base text-muted-foreground">No interviews in progress</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  <div className="grid gap-4">
                    {completedInterviews.length > 0 ? (
                      completedInterviews.map((interview) => (
                        <InterviewCard
                          key={interview._id}
                          {...interview}
                          isBookmarked={bookmarkedIds.includes(interview._id)}
                          onToggleBookmark={() => handleToggleBookmark(interview._id)}
                        />
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-border p-6 md:p-8 text-center">
                        <p className="text-sm md:text-base text-muted-foreground">No completed interviews yet</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="create" className="space-y-6">
                  <Card >
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <p className="text-muted-foreground">Create new interviews with advanced options</p>
                        <Button asChild>
                          <Link href="/create-interview">Go to Create Interview Page</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}


// "use client"

// import { useState } from "react"
// import { SiteHeader } from "@/components/site-header"
// import { InterviewCard } from "@/components/interviews/interview-card"
// import { InterviewFilters } from "@/components/interviews/interview-filters"
// import { BookmarkedInterviews } from "@/components/interviews/bookmarked-interviews"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"

// const dummyInterviews = [
//   {
//     id: "1",
//     title: "React Fundamentals",
//     role: "Frontend Engineer",
//     difficulty: "Beginner" as const,
//     date: "Oct 18, 2025",
//     time: "2:00 PM",
//     duration: 60,
//     status: "Scheduled" as const,
//   },
//   {
//     id: "2",
//     title: "System Design - E-commerce",
//     role: "Backend Engineer",
//     difficulty: "Advanced" as const,
//     date: "Oct 20, 2025",
//     time: "10:00 AM",
//     duration: 90,
//     status: "Scheduled" as const,
//     interviewer: "John Smith",
//   },
//   {
//     id: "3",
//     title: "JavaScript Algorithms",
//     role: "Full Stack Engineer",
//     difficulty: "Intermediate" as const,
//     date: "Oct 15, 2025",
//     time: "3:30 PM",
//     duration: 60,
//     status: "Completed" as const,
//   },
//   {
//     id: "4",
//     title: "DevOps & Infrastructure",
//     role: "DevOps Engineer",
//     difficulty: "Advanced" as const,
//     date: "Oct 19, 2025",
//     time: "1:00 PM",
//     duration: 75,
//     status: "In Progress" as const,
//     interviewer: "Sarah Johnson",
//   },
//   {
//     id: "5",
//     title: "Data Structures",
//     role: "Backend Engineer",
//     difficulty: "Intermediate" as const,
//     date: "Oct 22, 2025",
//     time: "11:00 AM",
//     duration: 60,
//     status: "Scheduled" as const,
//   },
//   {
//     id: "6",
//     title: "Product Strategy",
//     role: "Product Manager",
//     difficulty: "Intermediate" as const,
//     date: "Oct 21, 2025",
//     time: "4:00 PM",
//     duration: 45,
//     status: "Scheduled" as const,
//     interviewer: "Emma Davis",
//   },
// ]

// interface FilterOptions {
//   search: string
//   difficulty: string[]
//   role: string[]
//   date: string
// }

// export default function InterviewsPage() {
//   const [activeTab, setActiveTab] = useState("upcoming")
//   const [filters, setFilters] = useState<FilterOptions>({
//     search: "",
//     difficulty: [],
//     role: [],
//     date: "",
//   })
//   const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["1", "3"])

//   const filterInterviews = (interviews: typeof dummyInterviews) => {
//     return interviews.filter((interview) => {
//       const matchesSearch =
//         interview.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         interview.role.toLowerCase().includes(filters.search.toLowerCase())

//       const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(interview.difficulty)

//       const matchesRole = filters.role.length === 0 || filters.role.includes(interview.role)

//       return matchesSearch && matchesDifficulty && matchesRole
//     })
//   }

//   const upcomingInterviews = filterInterviews(dummyInterviews.filter((i) => i.status === "Scheduled"))
//   const inProgressInterviews = filterInterviews(dummyInterviews.filter((i) => i.status === "In Progress"))
//   const completedInterviews = filterInterviews(dummyInterviews.filter((i) => i.status === "Completed"))

//   const bookmarkedInterviews = dummyInterviews
//     .filter((i) => bookmarkedIds.includes(i.id))
//     .map((i) => ({
//       id: i.id,
//       title: i.title,
//       role: i.role,
//       difficulty: i.difficulty,
//       date: i.date,
//       time: i.time,
//       duration: i.duration,
//     }))

//   const handleToggleBookmark = (id: string) => {
//     setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]))
//   }

//   const handleRemoveBookmark = (id: string) => {
//     setBookmarkedIds((prev) => prev.filter((bid) => bid !== id))
//   }

//   return (
//     <>
//       <SiteHeader />
//       <main className="min-h-screen bg-background">
//         <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
//           <div className="mb-6 md:mb-8">
//             <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Interviews</h1>
//             <p className="mt-2 text-sm md:text-base text-muted-foreground">
//               Manage your practice and scheduled interviews
//             </p>
//           </div>

//           <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-4">
//             {/* Sidebar - Filters and Bookmarks - Hidden on mobile, shown on md+ */}
//             <div className="hidden md:block md:col-span-1 space-y-6">
//               <InterviewFilters onFilterChange={setFilters} />
//               <BookmarkedInterviews interviews={bookmarkedInterviews} onRemoveBookmark={handleRemoveBookmark} />
//             </div>

//             {/* Main Content - Tabs */}
//             <div className="col-span-1 md:col-span-3">
//               <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
//                 <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
//                   <TabsTrigger value="upcoming" className="text-xs md:text-sm">
//                     Upcoming
//                   </TabsTrigger>
//                   <TabsTrigger value="in-progress" className="text-xs md:text-sm">
//                     In Progress
//                   </TabsTrigger>
//                   <TabsTrigger value="completed" className="text-xs md:text-sm">
//                     Completed
//                   </TabsTrigger>
//                   <TabsTrigger value="create" className="text-xs md:text-sm">
//                     Create
//                   </TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="upcoming" className="space-y-4">
//                   <div className="grid gap-4">
//                     {upcomingInterviews.length > 0 ? (
//                       upcomingInterviews.map((interview) => (
//                         <InterviewCard
//                           key={interview.id}
//                           {...interview}
//                           isBookmarked={bookmarkedIds.includes(interview.id)}
//                           onToggleBookmark={handleToggleBookmark}
//                         />
//                       ))
//                     ) : (
//                       <div className="rounded-lg border border-dashed border-border p-6 md:p-8 text-center">
//                         <p className="text-sm md:text-base text-muted-foreground">No upcoming interviews found</p>
//                       </div>
//                     )}
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="in-progress" className="space-y-4">
//                   <div className="grid gap-4">
//                     {inProgressInterviews.length > 0 ? (
//                       inProgressInterviews.map((interview) => (
//                         <InterviewCard
//                           key={interview.id}
//                           {...interview}
//                           isBookmarked={bookmarkedIds.includes(interview.id)}
//                           onToggleBookmark={handleToggleBookmark}
//                         />
//                       ))
//                     ) : (
//                       <div className="rounded-lg border border-dashed border-border p-6 md:p-8 text-center">
//                         <p className="text-sm md:text-base text-muted-foreground">No interviews in progress</p>
//                       </div>
//                     )}
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="completed" className="space-y-4">
//                   <div className="grid gap-4">
//                     {completedInterviews.length > 0 ? (
//                       completedInterviews.map((interview) => (
//                         <InterviewCard
//                           key={interview.id}
//                           {...interview}
//                           isBookmarked={bookmarkedIds.includes(interview.id)}
//                           onToggleBookmark={handleToggleBookmark}
//                         />
//                       ))
//                     ) : (
//                       <div className="rounded-lg border border-dashed border-border p-6 md:p-8 text-center">
//                         <p className="text-sm md:text-base text-muted-foreground">No completed interviews yet</p>
//                       </div>
//                     )}
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="create" className="space-y-6">
//                   <Card>
//                     <CardContent className="pt-6">
//                       <div className="text-center space-y-4">
//                         <p className="text-muted-foreground">Create new interviews with advanced options</p>
//                         <Button asChild>
//                           <Link href="/create-interview">Go to Create Interview Page</Link>
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   )
// }