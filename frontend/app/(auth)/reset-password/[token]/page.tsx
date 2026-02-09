"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft, Check, Lock, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeSelector } from "@/components/theme-selector"
import { useAuth } from "@/app/contexts/AuthContext"

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  // Unwrap params using React.use() or await in async component
  // Since this is a client component, we can access params promise prop
  // However, traditionally params are props. For Next 15, params is a Promise.
  // We'll use the 'use' hook to unwrap it if we need the token immediately, 
  // or just wait for it if we were in a server component.
  // Given "use client", let's handle it as a Promise prop.
  
  // NOTE: In strict Next.js 15 client components receiving params:
  const resolvedParams = use(params)
  const token = resolvedParams.token

  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {resetPassword} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    // Simulate API call using the token
    console.log("Resetting password with token:", token)
     
    const res = await resetPassword(token, password);

    if(res) {
      setIsSubmitted(true)
      toast.success("Password reset successfully")
      
      // Optional: Redirect after delay
      setIsLoading(false)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
    setIsLoading(false);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeSelector />
      </div>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {password && confirmPassword && (
                    <div className="flex items-center gap-2 text-xs">
                        {password === confirmPassword ? (
                            <span className="text-green-600 flex items-center gap-1">
                                <Check className="h-3 w-3" /> Passwords match
                            </span>
                        ) : (
                            <span className="text-red-600 flex items-center gap-1">
                                <X className="h-3 w-3" /> Passwords do not match
                            </span>
                        )}
                    </div>
                )}
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Resetting password..." : "Reset password"}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Password reset complete</h3>
                <p className="text-sm text-muted-foreground">
                  Your password has been successfully reset. You will be redirected to the login page shortly.
                </p>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => router.push("/login")}
              >
                Continue to Login
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link 
            href="/login" 
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
