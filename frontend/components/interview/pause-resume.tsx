"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pause, Play, AlertTriangle } from "lucide-react"
import { useState } from "react"

interface PauseResumeProps {
  onPause?: () => void
  onResume?: () => void
}

export function PauseResume({ onPause, onResume }: PauseResumeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handlePause = () => {
    setShowWarning(true)
    setIsPaused(true)
    onPause?.()
  }

  const handleResume = () => {
    setShowWarning(false)
    setIsPaused(false)
    onResume?.()
  }

  if (isPaused) {
    return (
      <Card className="border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Interview Paused</span>
            </div>
            <p className="text-sm text-yellow-600 dark:text-yellow-300">
              Your interview is paused. Resume when you're ready to continue.
            </p>
            <Button onClick={handleResume} className="w-full gap-2 bg-yellow-600 hover:bg-yellow-700">
              <Play className="h-4 w-4" />
              Resume Interview
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Button onClick={handlePause} variant="outline" className="w-full gap-2 border-2 bg-transparent">
      <Pause className="h-4 w-4" />
      Pause Interview
    </Button>
  )
}
