import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "5 practice interviews per month",
        "Basic AI feedback",
        "Video recording",
        "Performance tracking",
        "Access to 50+ interview questions",
        "Community support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "For serious interview prep",
      features: [
        "Unlimited practice interviews",
        "Advanced AI feedback with detailed analysis",
        "Video recording and playback",
        "Comprehensive performance analytics",
        "Access to 500+ interview questions",
        "Priority email support",
        "Personalized learning paths",
        "Interview tips and best practices",
        "Monthly progress reports",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management dashboard",
        "Custom interview questions",
        "Advanced analytics and reporting",
        "Dedicated account manager",
        "Priority support (24/7)",
        "Custom integrations",
        "Bulk user licenses",
        "Training and onboarding",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your interview preparation needs
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="mb-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg border p-8 transition-all ${
                plan.highlighted ? "border-primary bg-card shadow-lg scale-105" : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>

              <div className="my-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>

              <Button className="w-full mb-8" variant={plan.highlighted ? "default" : "outline"} asChild>
                <Link href="/signup">{plan.cta}</Link>
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "Is there a free trial for Pro?",
                answer: "Yes, we offer a 7-day free trial for the Pro plan. No credit card required to start.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "You can cancel your subscription anytime. Your access continues until the end of your billing period.",
              },
              {
                question: "Is there a discount for annual billing?",
                answer: "Yes, we offer 20% off when you choose annual billing instead of monthly.",
              },
            ].map((item, index) => (
              <div key={index} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-border bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Interview Prep?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of candidates who have successfully prepared for their dream jobs.
          </p>
          <Button asChild size="lg">
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}
