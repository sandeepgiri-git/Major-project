"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type OnboardingStep = "welcome" | "tour" | "sample" | "complete"

export function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome")

  const handleNext = () => {
    const steps: OnboardingStep[] = ["welcome", "tour", "sample", "complete"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleSkip = () => {
    setCurrentStep("complete")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {currentStep === "welcome" && <WelcomeStep onNext={handleNext} onSkip={handleSkip} />}
        {currentStep === "tour" && <TourStep onNext={handleNext} onSkip={handleSkip} />}
        {currentStep === "sample" && <SampleStep onNext={handleNext} onSkip={handleSkip} />}
        {currentStep === "complete" && <CompleteStep />}
      </div>
    </div>
  )
}

function WelcomeStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <Card className="border-0 shadow-lg p-8 md:p-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-balance">Welcome to InterviewAI</h1>
        <p className="text-lg text-muted-foreground">Master your interview skills with AI-powered practice</p>
      </div>

      <div className="space-y-4 py-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-semibold text-primary">1</span>
          </div>
          <div>
            <h3 className="font-semibold">Practice with AI Interviews</h3>
            <p className="text-sm text-muted-foreground">Get instant feedback on your responses</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-semibold text-primary">2</span>
          </div>
          <div>
            <h3 className="font-semibold">Track Your Progress</h3>
            <p className="text-sm text-muted-foreground">Monitor improvements across multiple interviews</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-semibold text-primary">3</span>
          </div>
          <div>
            <h3 className="font-semibold">Get Personalized Recommendations</h3>
            <p className="text-sm text-muted-foreground">Improve weak areas with targeted practice</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onSkip} className="flex-1 bg-transparent">
          Skip Tour
        </Button>
        <Button onClick={onNext} className="flex-1">
          Next
        </Button>
      </div>
    </Card>
  )
}

function TourStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  const [activeTour, setActiveTour] = useState(0)

  const tours = [
    {
      title: "Dashboard Overview",
      description: "Your dashboard shows recent interviews, upcoming sessions, and performance stats at a glance.",
      icon: "📊",
    },
    {
      title: "Interview Library",
      description:
        "Browse and select from hundreds of interview questions across different roles and difficulty levels.",
      icon: "📚",
    },
    {
      title: "Live Interview Session",
      description:
        "Practice with video, real-time questions, and AI feedback. Record your answers and review transcripts.",
      icon: "🎥",
    },
    {
      title: "Performance Analytics",
      description: "Detailed insights into your communication, technical skills, and problem-solving abilities.",
      icon: "📈",
    },
  ]

  return (
    <Card className="border-0 shadow-lg p-8 md:p-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Tour</h1>
        <p className="text-muted-foreground">Learn about key features</p>
      </div>

      <div className="space-y-6 py-6">
        <div className="text-6xl text-center">{tours[activeTour].icon}</div>
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold">{tours[activeTour].title}</h3>
          <p className="text-muted-foreground leading-relaxed">{tours[activeTour].description}</p>
        </div>
      </div>

      <div className="flex gap-2 justify-center py-4">
        {tours.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTour(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === activeTour ? "bg-primary w-8" : "bg-border"}`}
            aria-label={`Go to tour step ${index + 1}`}
          />
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onSkip} className="flex-1 bg-transparent">
          Skip
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveTour(Math.max(0, activeTour - 1))}
          disabled={activeTour === 0}
          className="flex-1"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (activeTour === tours.length - 1) {
              onNext()
            } else {
              setActiveTour(activeTour + 1)
            }
          }}
          className="flex-1"
        >
          {activeTour === tours.length - 1 ? "Next" : "Continue"}
        </Button>
      </div>
    </Card>
  )
}

function SampleStep({ onNext, onSkip }: { onNext: () => void; onSkip: () => void }) {
  return (
    <Card className="border-0 shadow-lg p-8 md:p-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Try a Sample Interview</h1>
        <p className="text-muted-foreground">Get a feel for the interview experience</p>
      </div>

      <div className="space-y-4 py-6">
        <div className="rounded-lg border border-border p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <span className="text-lg">💼</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Frontend Engineer - React Basics</h3>
              <p className="text-sm text-muted-foreground mt-1">Beginner • 15 minutes</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This sample interview includes 3 questions about React fundamentals. You'll experience the full interview
            flow including video setup, question display, and answer recording.
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-medium">What you'll learn:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>How to navigate through interview questions</li>
              <li>How to record and review your answers</li>
              <li>How to view your performance feedback</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onSkip} className="flex-1 bg-transparent">
          Skip Sample
        </Button>
        <Button onClick={onNext} className="flex-1">
          Start Sample Interview
        </Button>
      </div>
    </Card>
  )
}

function CompleteStep() {
  return (
    <Card className="border-0 shadow-lg p-8 md:p-12 space-y-6">
      <div className="space-y-2 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold tracking-tight">You're All Set!</h1>
        <p className="text-muted-foreground">Ready to start your interview journey</p>
      </div>

      <div className="space-y-4 py-6">
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
          <p className="font-semibold text-sm">Quick Tips:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Start with beginner interviews to build confidence</li>
            <li>• Review your feedback after each interview</li>
            <li>• Practice regularly to see improvement</li>
            <li>• Use the analytics to track your progress</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Link href="/interviews" className="flex-1">
          <Button className="w-full">Go to Interviews</Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            View Dashboard
          </Button>
        </Link>
      </div>
    </Card>
  )
}
