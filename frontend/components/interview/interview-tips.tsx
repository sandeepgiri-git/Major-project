"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface InterviewTip {
  id: string
  title: string
  description: string
  category: "communication" | "technical" | "general"
}

const tips: InterviewTip[] = [
  {
    id: "1",
    title: "Speak Clearly",
    description: "Articulate your words clearly and maintain a steady pace. Avoid filler words like 'um' and 'uh'.",
    category: "communication",
  },
  {
    id: "2",
    title: "Structure Your Answer",
    description: "Start with a brief overview, then dive into details. Use examples to support your points.",
    category: "general",
  },
  {
    id: "3",
    title: "Ask Clarifying Questions",
    description: "If a question is unclear, ask for clarification before answering. It shows critical thinking.",
    category: "communication",
  },
  {
    id: "4",
    title: "Think Out Loud",
    description: "For technical questions, explain your thought process as you work through the problem.",
    category: "technical",
  },
]

export function InterviewTips() {
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          Interview Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tips.map((tip) => (
          <div key={tip.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
              className="w-full p-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-2 flex-1">
                <Badge variant="outline" className="text-xs">
                  {tip.category}
                </Badge>
                <span className="text-sm font-medium">{tip.title}</span>
              </div>
              {expandedTip === tip.id ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedTip === tip.id && (
              <div className="px-3 py-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
                {tip.description}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
