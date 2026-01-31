"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
}

const PREBUILT_RESPONSES: Record<string, string> = {
  "how do interviews work":
    "Our AI interview system works in 3 steps: 1) Pick a role and difficulty level, 2) Answer questions in a timed session with AI guidance, 3) Review detailed feedback and improvement areas. Each interview is tailored to your experience level.",
  "what roles are available":
    "We offer interviews for various roles including Software Engineer, Product Manager, Data Scientist, Frontend Developer, Backend Developer, Full Stack Developer, DevOps Engineer, and many more. You can filter by role and difficulty level.",
  "how is my performance scored":
    "Your performance is scored based on multiple factors: technical accuracy, communication clarity, problem-solving approach, time management, and completeness of answers. You receive a detailed breakdown after each interview.",
  "can i retake interviews":
    "Yes! You can retake any interview to improve your score. We track your progress across attempts and show you improvement trends over time.",
  "what subscription plans do you offer":
    "We offer three plans: Free (limited interviews), Pro ($29/month - unlimited interviews and detailed analytics), and Enterprise (custom pricing for teams).",
  "how do i contact support":
    "You can reach our support team through the contact form on our website, or email us at support@interviewai.com. We typically respond within 24 hours.",
  "is my data secure":
    "Yes, we use industry-standard encryption and security practices. Your interview data is private and only accessible to you.",
  "can i download my results":
    "Yes, you can download your interview results as a PDF from your profile page. This includes questions, answers, scores, and feedback.",
  default:
    'I can help you with questions about interviews, features, pricing, and more. Try asking about "how do interviews work", "what roles are available", or "what subscription plans do you offer".',
}

export function AIChat({ showOnPage }: { showOnPage: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! 👋 I'm here to help. Ask me anything about interviews, features, or pricing!",
    },
  ])
  const [input, setInput] = useState("")

  if (!showOnPage) return null

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    // Find matching response
    const lowerInput = input.toLowerCase()
    let response = PREBUILT_RESPONSES["default"]

    for (const [key, value] of Object.entries(PREBUILT_RESPONSES)) {
      if (key !== "default" && lowerInput.includes(key)) {
        response = value
        break
      }
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: response,
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage])
    }, 500)

    setInput("")
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 max-h-96 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs opacity-90">Ask me anything!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm" onClick={handleSendMessage} className="px-3">
              <Send size={16} />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
