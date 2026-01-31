"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "interview_completed",
      title: "Completed React Fundamentals Interview",
      score: 85,
      date: "Oct 22, 2024",
      time: "2:30 PM",
      role: "Frontend Engineer",
    },
    {
      id: 2,
      type: "achievement_unlocked",
      title: "Unlocked Achievement: Week Warrior",
      description: "Completed 5 interviews in a week",
      date: "Oct 22, 2024",
      time: "1:15 PM",
    },
    {
      id: 3,
      type: "interview_completed",
      title: "Completed JavaScript Algorithms Interview",
      score: 78,
      date: "Oct 21, 2024",
      time: "3:45 PM",
      role: "Full Stack Engineer",
    },
    {
      id: 4,
      type: "streak_milestone",
      title: "Reached 10-day Streak",
      description: "Keep up the momentum!",
      date: "Oct 20, 2024",
      time: "11:00 AM",
    },
    {
      id: 5,
      type: "interview_completed",
      title: "Completed System Design Interview",
      score: 88,
      date: "Oct 19, 2024",
      time: "4:20 PM",
      role: "Backend Engineer",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "interview_completed":
        return "✅"
      case "achievement_unlocked":
        return "🏆"
      case "streak_milestone":
        return "🔥"
      default:
        return "📝"
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Link href="/interviews">
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <span className="text-2xl mt-1">{getActivityIcon(activity.type)}</span>

            <div className="flex-1 min-w-0">
              <p className="font-medium">{activity.title}</p>
              {activity.description && <p className="text-sm text-muted-foreground">{activity.description}</p>}
              {activity.role && <p className="text-sm text-muted-foreground">{activity.role}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                {activity.date} at {activity.time}
              </p>
            </div>

            {activity.score && (
              <div className="text-right">
                <p className="font-semibold text-primary">{activity.score}%</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
