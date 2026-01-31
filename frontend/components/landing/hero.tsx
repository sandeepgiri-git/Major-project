"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/contexts/AuthContext"

export function Hero() {
  const {user, fetchDone} = useAuth();
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium text-primary">AI Interview Practice</p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Ace your next interview with real-time AI feedback
          </h1>
          <p className="text-pretty text-muted-foreground md:text-lg leading-relaxed">
            Practice technical and behavioral interviews with smart question generation, structured feedback, and
            personalized improvement plans.
          </p>
          {!user && fetchDone && <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Try Demo</Link>
            </Button>
          </div>}
          {user && fetchDone && <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href="/interviews">Take Interviews</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">Upgrade to Pro</Link>
            </Button>
          </div>
          }

          <p className="text-xs text-muted-foreground">No credit card required.</p>
        </div>

        <div className="relative">
          <img
            src="/ai-interview-dashboard-mockup.jpg"
            alt="AI interview practice dashboard mockup"
            className="w-full rounded-lg border border-border bg-card"
          />
        </div>
      </div>
    </section>
  )
}
