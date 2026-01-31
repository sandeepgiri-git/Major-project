"use client"

import { Card } from "@/components/ui/card"

export function ProfileStats() {
  const stats = [
    {
      label: "Total Interviews",
      value: "24",
      change: "+3 this month",
      icon: "📊",
    },
    {
      label: "Average Score",
      value: "82%",
      change: "+8% improvement",
      icon: "⭐",
    },
    {
      label: "Completion Rate",
      value: "92%",
      change: "20 of 22 completed",
      icon: "✅",
    },
    {
      label: "Current Streak",
      value: "12 days",
      change: "Best: 18 days",
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
