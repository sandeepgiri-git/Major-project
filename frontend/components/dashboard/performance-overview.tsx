"use client"

import { Card } from "@/components/ui/card"

export function PerformanceOverview() {
  const skills = [
    { name: "Communication", score: 82, color: "bg-blue-500" },
    { name: "Technical Skills", score: 78, color: "bg-purple-500" },
    { name: "Problem Solving", score: 85, color: "bg-green-500" },
    { name: "Time Management", score: 72, color: "bg-orange-500" },
  ]

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Performance Overview</h2>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{skill.name}</p>
              <p className="text-sm font-semibold">{skill.score}%</p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${skill.color} transition-all`} style={{ width: `${skill.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Your strongest area is <span className="font-semibold text-foreground">Problem Solving</span>. Keep practicing
          communication skills to improve further.
        </p>
      </div>
    </Card>
  )
}
