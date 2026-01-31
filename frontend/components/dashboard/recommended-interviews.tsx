"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecommendedInterviews() {
  const recommendations = [
    {
      id: "1",
      title: "Advanced React Patterns",
      role: "Frontend Engineer",
      difficulty: "Advanced",
      reason: "Based on your recent performance",
      icon: "📈",
    },
    {
      id: "2",
      title: "Communication Skills",
      role: "General",
      difficulty: "Intermediate",
      reason: "Area for improvement",
      icon: "💬",
    },
    {
      id: "3",
      title: "System Design Deep Dive",
      role: "Backend Engineer",
      difficulty: "Advanced",
      reason: "You're ready for this",
      icon: "🏗️",
    },
  ]

  return (
    <Card className="p-6 space-y-4 sticky top-8">
      <h2 className="text-lg font-semibold">Recommended For You</h2>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-3 rounded-lg border border-border space-y-2 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">{rec.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{rec.title}</p>
                <p className="text-xs text-muted-foreground">{rec.difficulty}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{rec.reason}</p>
          </div>
        ))}
      </div>

      <Link href="/interviews" className="block">
        <Button className="w-full" size="sm">
          Browse All Interviews
        </Button>
      </Link>
    </Card>
  )
}
