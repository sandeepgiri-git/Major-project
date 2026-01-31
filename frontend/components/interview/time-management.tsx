"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Clock, AlertCircle } from "lucide-react"

interface TimeManagementProps {
  totalTime: number
  onTimeUp?: () => void
}

export function TimeManagement({ totalTime, onTimeUp }: TimeManagementProps) {
  const [timeRemaining, setTimeRemaining] = useState(totalTime)
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onTimeUp])

  useEffect(() => {
    setIsWarning(timeRemaining <= totalTime * 0.2)
  }, [timeRemaining, totalTime])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const percentage = (timeRemaining / totalTime) * 100

  return (
    <Card className={`border-2 ${isWarning ? "border-red-500" : "border-border"}`}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className={`h-4 w-4 ${isWarning ? "text-red-500" : "text-blue-500"}`} />
          Time Remaining
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <div className={`text-3xl font-bold ${isWarning ? "text-red-500" : "text-foreground"}`}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              isWarning ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-blue-500 to-blue-600"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {isWarning && (
          <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded">
            <AlertCircle className="h-3 w-3" />
            Time is running out!
          </div>
        )}
      </CardContent>
    </Card>
  )
}
