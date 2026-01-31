"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecentInterviews() {
  const recentInterviews = [
    {
      id: "1",
      title: "React Fundamentals",
      role: "Frontend Engineer",
      date: "Oct 15, 2025",
      score: 82,
      status: "Completed",
    },
    {
      id: "2",
      title: "JavaScript Algorithms",
      role: "Full Stack Engineer",
      date: "Oct 12, 2025",
      score: 75,
      status: "Completed",
    },
    {
      id: "3",
      title: "System Design",
      role: "Backend Engineer",
      date: "Oct 10, 2025",
      score: 88,
      status: "Completed",
    },
  ]

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Interviews</h2>
        <Link href="/interviews">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {recentInterviews.map((interview) => (
          <div
            key={interview.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium">{interview.title}</p>
              <p className="text-sm text-muted-foreground">
                {interview.role} • {interview.date}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">{interview.score}%</p>
              <p className="text-xs text-muted-foreground">{interview.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
