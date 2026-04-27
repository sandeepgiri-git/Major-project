"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeSelector } from "@/components/theme-selector"
import { User, LogOut } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import { PageLoader } from "./page-loader"

export function SiteHeader() {
  const {isAuth, fetchDone, logout} = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/interviews", label: "Interviews" },
    { href: "/about", label: "About" },
    { href: "/help", label: "Help" },
  ];
  
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        <nav className="hidden items-center gap-1 rounded-full border border-border/40 bg-muted/40 p-1 md:flex "> 
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-md font-medium transition-all px-10 py-1 rounded-full ${
                  isActive 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
