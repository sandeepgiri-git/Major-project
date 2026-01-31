"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Wifi, Mic, Video, RefreshCw } from "lucide-react"
import { useState } from "react"

interface TechnicalIssue {
  id: string
  title: string
  icon: React.ReactNode
  action: string
}

const issues: TechnicalIssue[] = [
  {
    id: "connection",
    title: "Connection Issues",
    icon: <Wifi className="h-4 w-4" />,
    action: "Check your internet connection",
  },
  {
    id: "microphone",
    title: "Microphone Not Working",
    icon: <Mic className="h-4 w-4" />,
    action: "Check microphone permissions",
  },
  {
    id: "camera",
    title: "Camera Not Working",
    icon: <Video className="h-4 w-4" />,
    action: "Check camera permissions",
  },
]

export function TechnicalSupport() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)

  const handleReconnect = () => {
    alert("Attempting to reconnect... Please wait.")
    setSelectedIssue(null)
  }

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          Technical Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {selectedIssue ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{issues.find((i) => i.id === selectedIssue)?.action}</p>
            <div className="flex gap-2">
              <Button onClick={handleReconnect} className="flex-1 gap-2" size="sm">
                <RefreshCw className="h-4 w-4" />
                Reconnect
              </Button>
              <Button onClick={() => setSelectedIssue(null)} variant="outline" size="sm" className="flex-1">
                Back
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground mb-3">Experiencing technical issues?</p>
            {issues.map((issue) => (
              <Button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                variant="outline"
                className="w-full justify-start gap-2 text-left"
                size="sm"
              >
                {issue.icon}
                <span className="text-xs">{issue.title}</span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
