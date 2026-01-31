"use client"

import { Card } from "@/components/ui/card"

export function DashboardStats() {
  const stats = [
    {
      label: "Total Interviews",
      value: "12",
      change: "+2 this week",
      icon: "📊",
    },
    {
      label: "Average Score",
      value: "78%",
      change: "+5% from last week",
      icon: "⭐",
    },
    {
      label: "Interviews Completed",
      value: "8",
      change: "67% completion rate",
      icon: "✅",
    },
    {
      label: "Streak",
      value: "5 days",
      change: "Keep it up!",
      icon: "🔥",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
