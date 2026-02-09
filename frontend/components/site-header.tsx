"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"
import { User } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import { PageLoader } from "./page-loader"
import { LogOut } from "lucide-react"

export function SiteHeader() {
  const {isAuth, fetchDone, logout} = useAuth();
  
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          {/* <span className="inline-block h-8 w-8 rounded-md bg-primary" aria-hidden="true" /> */}
          <img
            src="/chat-bot.png"
            alt="Logo"
            className="inline-block h-8 w-8 rounded-md bg-transparent"
          />
          <span className="font-medium text-2xl">Interview AI</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <Link href="/interviews" className="text-2sm text-muted-foreground hover:text-foreground transition-colors">
            Interviews
          </Link>
          <Link href="/pricing" className="text-2sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-2sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/help" className="text-2sm text-muted-foreground hover:text-foreground transition-colors">
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSelector />
          {(isAuth && <Button variant="ghost" size="icon" asChild>
            <Link href="/profile" title="Profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>)}

          {(isAuth && <Button onClick={() => logout()} variant="ghost" size="icon" asChild>
            {/* want to style logout icon same as link */}
            <Link href="/logout" title="logout">
              <LogOut className="h-5 w-5"/>
            </Link>
          </Button>)}
          
          {(!isAuth && fetchDone) && (<Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>)}
          {(!isAuth && fetchDone) && (<Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>)}
        </div>
      </div>
    </header>
  )
}
