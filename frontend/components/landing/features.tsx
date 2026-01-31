import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Smart questions",
    description: "Adaptive question generation across domains and difficulty levels to mirror real interview flows.",
  },
  {
    title: "Real-time feedback",
    description: "Get instant, objective feedback on clarity, structure, and technical correctness as you respond.",
  },
  {
    title: "Behavioral insights",
    description: "Practice STAR responses and receive suggestions to strengthen impact and concision.",
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl text-balance">
          Everything you need to prepare
        </h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          A focused toolkit designed to help you practice smarter and interview with confidence.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">{f.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
