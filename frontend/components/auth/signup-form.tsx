"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/app/contexts/AuthContext"
import { redirect } from "next/navigation"

export function SignupForm() {
  const [loading, setLoading] = useState(false)
  const {signup, checkOtp} = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // console.log(e.currentTarget)
    const formData = new FormData(e.currentTarget)
    console.log(formData)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const otp = formData.get("otp") as string
    console.log(name, email, password);
    if(!otp) {
      const out = await signup(name, email, password);
      if(out) {
        setLoading(false);
        setIsSubmit(true);
      }else{
        setLoading(false);
      }
    }
    else{
      const out = await checkOtp(otp);
      if(out) {
        setLoading(false);
        redirect("/login");
      }
      else{
        setLoading(false);
      }
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md border-border">
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Start practicing with AI-powered interviews.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} noValidate>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input disabled={isSubmit} id="name" name="name" type="text" placeholder="Alex Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input disabled={isSubmit} id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input disabled={isSubmit} id="password" name="password" type="password" placeholder="At least 8 characters" required />
          </div>
          {isSubmit && <div className="grid gap-2">
            <Label htmlFor="otp">OTP</Label>
            <Input id="otp" name="otp" type="Number" placeholder="Enter 6 digit OTP" required />
          </div>}

        </CardContent>
        <CardFooter className="flex mt-5 flex-col items-stretch gap-3">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating account..." : "Sign up"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Log in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
