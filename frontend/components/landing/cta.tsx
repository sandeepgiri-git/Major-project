import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="pricing" className="border-t border-border bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center md:py-20">
        <h3 className="text-balance text-2xl font-semibold md:text-3xl">Be interview-ready in days, not weeks</h3>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          Start practicing for free and upgrade when you’re ready for advanced analytics and custom question banks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/signup">Create your account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">I already have an account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
