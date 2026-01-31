import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PageLoader } from "@/components/page-loader"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { Mona_Sans as Monasans } from "next/font/google"
import { AuthProvider, useAuth } from "./contexts/AuthContext"

const monasans = Monasans({ subsets: ["latin"] })
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Interview System",
  description: "Practice interviews with AI-powered feedback",
  generator: "v0.app",
  icons: {
    icon: "/chat-bot.png", 
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const {user} = useAuth();
 
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${monasans.className} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageLoader />
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
