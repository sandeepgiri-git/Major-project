"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface BookmarkedInterview {
  id: string
  title: string
  role: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  date: string
  time: string
  duration: number
}

interface BookmarkedInterviewsProps {
  interviews: BookmarkedInterview[]
  onRemoveBookmark: (id: string) => void
}

export function BookmarkedInterviews({ interviews, onRemoveBookmark }: BookmarkedInterviewsProps) {
  if (interviews.length === 0) {
    return (
      <Card className="border-2 border-dashed border-border">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Bookmark className="h-8 w-8 text-muted-foreground mx-auto opacity-50" />
            <p className="text-sm text-muted-foreground">No bookmarked interviews yet</p>
            <p className="text-xs text-muted-foreground">Bookmark interviews to save them for later</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-blue-500" />
          Bookmarked Interviews ({interviews.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {interviews.map((interview) => (
          <div key={interview.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{interview.title}</h4>
                <p className="text-xs text-muted-foreground">{interview.role}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {interview.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {interview.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {interview.time}
              </span>
            </div>
            <div className="flex gap-2">
              <Link href={`/interview-details/${interview.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                  View
                </Button>
              </Link>
              <Button onClick={() => onRemoveBookmark(interview.id)} variant="ghost" size="sm" className="text-xs">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
