"use client"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { CTASection } from "@/components/landing/cta"
import { AIChat } from "@/components/ai-chat"
import { useAuth } from "./contexts/AuthContext"
import { redirect } from "next/navigation"

export default function Page() {
  const {user, isAuth} = useAuth();
    if(user && !user.isOnboarded) {
      redirect('/onboarding-setup');
    }
    return (
    <>
      <SiteHeader/>
      <main>
        <Hero />
        <Features />
        {!user && <CTASection />}
        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm md:text-base">1. Pick a role</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Choose your interview type and seniority. We'll tailor the question set and difficulty.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm md:text-base">2. Practice with AI</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Answer questions in a timed session while receiving guidance and structure prompts.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm md:text-base">3. Improve fast</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Review feedback and a personalized plan to strengthen weak spots quickly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:py-8 text-xs md:text-sm text-muted-foreground flex-col md:flex-row gap-4">
          <p>© {new Date().getFullYear()} Interview AI</p>
          <nav className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </footer>

      <AIChat showOnPage={true} />
    </>
  )
}
