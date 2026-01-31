"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { UserInfoForm } from "@/components/onboarding/user-info-form"
import { useAuth } from "@/app/contexts/AuthContext"
import { redirect, useRouter } from "next/navigation"

export default function OnboardingSetupPage() {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false)
  const {onboarding, fetchDone, user} = useAuth();
  const [loading, setLoading] = useState(false);

  if(fetchDone && !user) {
      router.push('/');
  }

  const handleComplete = async (formData: any) => {
    setLoading(true);
    // Redirect to profile or interviews page after 2 seconds
    console.log(formData);
    const res = await onboarding(formData);

    if(res) {
      setLoading(false);
      setIsComplete(true)
      redirect('/onboarding');
    }else{
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        {!isComplete ? (
          <>
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-semibold tracking-tight text-balance">Complete Your Profile</h1>
              <p className="text-muted-foreground leading-relaxed">
                Help us personalize your interview experience by sharing a bit more about yourself.
              </p>
            </div>
            <UserInfoForm onComplete={handleComplete} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-primary/5 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-semibold">Profile Complete!</h2>
            <p className="mb-6 text-muted-foreground">Redirecting to your profile...</p>
          </div>
        )}
      </main>
    </>
  )
}
