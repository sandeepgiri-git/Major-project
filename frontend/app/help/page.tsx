"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { AIChat } from "@/components/ai-chat"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"

const FAQS = [
  {
    category: "Getting Started",
    items: [
      {
        question: "How do I get started?",
        answer:
          "Sign up for an account, complete your profile, and choose your first interview. You can start with a practice interview to get familiar with the platform.",
      },
      {
        question: "Do I need any special equipment?",
        answer:
          "You just need a computer with a webcam and microphone. Make sure you have a stable internet connection for the best experience.",
      },
    ],
  },
  {
    category: "Interviews",
    items: [
      {
        question: "How long does an interview take?",
        answer:
          "Most interviews take 30-60 minutes depending on the role and difficulty level. You can see the estimated duration before starting.",
      },
      {
        question: "Can I pause an interview?",
        answer: "Yes, you can pause and resume interviews. Your progress is saved automatically.",
      },
      {
        question: "What happens if I lose connection?",
        answer: "Your interview is automatically saved. You can resume from where you left off within 24 hours.",
      },
    ],
  },
  {
    category: "Scoring & Feedback",
    items: [
      {
        question: "How is my performance scored?",
        answer:
          "We evaluate technical accuracy, communication, problem-solving, time management, and answer completeness. You get a detailed breakdown after each interview.",
      },
      {
        question: "Can I see my previous interviews?",
        answer:
          "Yes, all your interview history is available in your profile. You can review results, scores, and feedback anytime.",
      },
    ],
  },
  {
    category: "Subscription",
    items: [
      {
        question: "What's included in the Free plan?",
        answer:
          "The Free plan includes 2 interviews per month and basic feedback. Upgrade to Pro for unlimited interviews and advanced analytics.",
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription anytime. No long-term contracts required.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const filteredFaqs = FAQS.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((category) => category.items.length > 0)

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-muted-foreground mb-8">Find answers to common questions or ask our AI assistant</p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-8">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category) => (
                <div key={category.category}>
                  <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                  <div className="space-y-3">
                    {category.items.map((item, idx) => {
                      const itemId = `${category.category}-${idx}`
                      const isExpanded = expandedItems.includes(itemId)

                      return (
                        <Card
                          key={itemId}
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => toggleExpanded(itemId)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-medium text-foreground">{item.question}</h3>
                            <span className={`text-primary transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                              ▼
                            </span>
                          </div>
                          {isExpanded && (
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                          )}
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground">Try asking our AI assistant for help!</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <Card className="mt-12 p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Didn't find what you're looking for?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use the AI chat button in the bottom-right corner to ask questions, or contact our support team at
              support@interviewai.com
            </p>
          </Card>
        </div>
      </main>

      {/* AI Chat */}
      <AIChat showOnPage={true} />
    </>
  )
}
