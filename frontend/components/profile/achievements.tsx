"use client"

import { Card } from "@/components/ui/card"

export function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "First Interview",
      description: "Completed your first interview",
      icon: "🎯",
      unlocked: true,
      date: "Oct 5, 2024",
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Achieved 100% on an interview",
      icon: "💯",
      unlocked: true,
      date: "Oct 18, 2024",
    },
    {
      id: 3,
      title: "Week Warrior",
      description: "Complete 5 interviews in a week",
      icon: "⚡",
      unlocked: true,
      date: "Oct 22, 2024",
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Maintain a 7-day streak",
      icon: "👑",
      unlocked: false,
      progress: "5/7 days",
    },
    {
      id: 5,
      title: "Master Interviewer",
      description: "Complete 50 interviews",
      icon: "🏆",
      unlocked: false,
      progress: "24/50",
    },
    {
      id: 6,
      title: "Speed Demon",
      description: "Complete 3 interviews in one day",
      icon: "🚀",
      unlocked: false,
      progress: "1/3",
    },
  ]

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Achievements</h2>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border transition-all ${
              achievement.unlocked ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30 opacity-60"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{achievement.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked ? (
                  <p className="text-xs text-primary mt-1">✓ Unlocked {achievement.date}</p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">{achievement.progress}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
