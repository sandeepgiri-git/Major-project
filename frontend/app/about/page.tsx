import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">About Interview AI</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Revolutionizing interview preparation with AI-powered practice and real-time feedback
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16 rounded-lg border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe everyone deserves access to quality interview preparation. Interview AI is built to democratize
            interview coaching by providing personalized, AI-powered feedback that helps candidates succeed. Whether
            you're preparing for your first interview or your hundredth, our platform adapts to your needs and helps you
            perform at your best.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Why Choose Interview AI?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "AI-Powered Feedback",
                description:
                  "Get instant, detailed feedback on your answers, communication style, and technical knowledge from our advanced AI system.",
              },
              {
                title: "Realistic Practice",
                description:
                  "Practice with real interview questions from top companies. Our database includes questions from FAANG and other leading organizations.",
              },
              {
                title: "Personalized Learning",
                description:
                  "Our AI learns your strengths and weaknesses, recommending targeted practice to improve your interview performance.",
              },
              {
                title: "Video Recording",
                description:
                  "Record your practice sessions and review them to see how you come across to interviewers. Improve your body language and delivery.",
              },
              {
                title: "Performance Analytics",
                description:
                  "Track your progress over time with detailed analytics showing improvement in communication, technical skills, and problem-solving.",
              },
              {
                title: "Expert Insights",
                description:
                  "Learn from curated tips and best practices from experienced interviewers and hiring managers.",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">How It Works</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Choose Your Interview",
                description:
                  "Select from hundreds of interview questions across different roles, companies, and difficulty levels.",
              },
              {
                step: "2",
                title: "Practice with AI",
                description:
                  "Answer questions in a realistic interview environment with video recording and real-time monitoring.",
              },
              {
                step: "3",
                title: "Get Instant Feedback",
                description:
                  "Receive detailed AI-powered feedback on your answer quality, communication, and areas for improvement.",
              },
              {
                step: "4",
                title: "Track Progress",
                description:
                  "Monitor your improvement over time with comprehensive analytics and personalized recommendations.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-border bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Ace Your Interviews?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of candidates who have improved their interview skills with Interview AI.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
