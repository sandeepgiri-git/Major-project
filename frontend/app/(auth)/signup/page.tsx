import { SiteHeader } from "@/components/site-header"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  // const handleSignupSuccess = () => {
  //   // Redirect to onboarding setup after successful signup
  //   window.location.href = "/onboarding-setup"
  // }
  
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <h1 className="mb-2 text-3xl font-semibold tracking-tight text-balance">Sign up</h1>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Create your account to start practicing interviews with AI.
          </p>
        </div>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          After signing up, you'll complete your profile setup.
        </p>
      </main>
    </>
  )
}
