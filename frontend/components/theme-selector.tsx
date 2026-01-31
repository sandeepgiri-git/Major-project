"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Monitor, Palette } from "lucide-react"

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [colorTheme, setColorTheme] = useState<string>("blue")

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    const savedColorTheme = localStorage.getItem("colorTheme") || "blue"
    setColorTheme(savedColorTheme)
    document.documentElement.setAttribute("data-color-theme", savedColorTheme)
  }, [])

  const handleColorThemeChange = (newTheme: string) => {
    setColorTheme(newTheme)
    localStorage.setItem("colorTheme", newTheme)
    document.documentElement.setAttribute("data-color-theme", newTheme)
  }

  if (!mounted) {
    return null
  }

  const modes = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "System", value: "system", icon: Monitor },
  ]

  const colorThemes = [
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Purple", value: "purple", color: "bg-purple-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Orange", value: "orange", color: "bg-orange-500" },
    { name: "Red", value: "red", color: "bg-red-500" },
    { name: "Pink", value: "pink", color: "bg-pink-500" },
    { name: "Cyan", value: "cyan", color: "bg-cyan-500" },
    { name: "Indigo", value: "indigo", color: "bg-indigo-500" },
  ]

  const currentMode = modes.find((m) => m.value === theme)
  const CurrentModeIcon = currentMode?.icon || Sun

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CurrentModeIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Mode Selection */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Mode</p>
          {modes.map((m) => {
            const Icon = m.icon
            return (
              <DropdownMenuItem
                key={m.value}
                onClick={() => setTheme(m.value)}
                className={theme === m.value ? "bg-accent" : ""}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{m.name}</span>
              </DropdownMenuItem>
            )
          })}
        </div>

        {/* Divider */}
        <div className="my-1 h-px bg-border" />

        {/* Color Theme Selection */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <Palette className="h-3 w-3" />
            Color Theme
          </p>
          <div className="grid grid-cols-4 gap-2">
            {colorThemes.map((ct) => (
              <button
                key={ct.value}
                onClick={() => handleColorThemeChange(ct.value)}
                className={`h-8 w-8 rounded-md ${ct.color} transition-all ${
                  colorTheme === ct.value ? "ring-2 ring-offset-2 ring-foreground" : ""
                }`}
                title={ct.name}
              />
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
