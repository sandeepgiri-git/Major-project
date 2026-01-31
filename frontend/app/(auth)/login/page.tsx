import { SiteHeader } from "@/components/site-header"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-balance">Log in</h1>
          <p className="mb-6 text-muted-foreground leading-relaxed">Welcome back! Enter your details to continue.</p>
        </div>
        <LoginForm />
      </main>
    </>
  )
}
