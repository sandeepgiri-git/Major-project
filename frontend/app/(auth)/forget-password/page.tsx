"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { ArrowLeft, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeSelector } from "@/components/theme-selector"
import { useAuth } from "@/app/contexts/AuthContext"

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {forgetPassword} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    const res = await forgetPassword(email);

    if(res) {
      setIsSubmitted(true)
      toast.success("Forget password link sent to the email")
    }
    
    setIsLoading(false)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeSelector />
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Sending link..." : "Send link"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Check your email</h3>
                <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                  We have sent a password reset link to <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => setIsSubmitted(false)}
              >
                Try the email again
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <Link 
            href="/login" 
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            Don&apos;t have an account?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
