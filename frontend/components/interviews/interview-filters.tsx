"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface FilterOptions {
  search: string
  difficulty: string[]
  role: string[]
  date: string
}

interface InterviewFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
}

const difficulties = ["Beginner", "Intermediate", "Advanced"]
const roles = ["Frontend Engineer", "Backend Engineer", "Full Stack Engineer", "DevOps Engineer", "Product Manager"]

export function InterviewFilters({ onFilterChange }: InterviewFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    difficulty: [],
    role: [],
    date: "",
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleDifficultyToggle = (difficulty: string) => {
    const newDifficulty = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter((d) => d !== difficulty)
      : [...filters.difficulty, difficulty]
    const newFilters = { ...filters, difficulty: newDifficulty }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRoleToggle = (role: string) => {
    const newRole = filters.role.includes(role) ? filters.role.filter((r) => r !== role) : [...filters.role, role]
    const newFilters = { ...filters, role: newRole }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const newFilters = { search: "", difficulty: [], role: [], date: "" }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const activeFilterCount = filters.difficulty.length + filters.role.length + (filters.search ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search interviews by title, role..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Filter Toggle */}
      <Button onClick={() => setIsOpen(!isOpen)} variant="outline" className="w-full justify-between">
        <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <Card className="border-2 border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Filter Interviews</CardTitle>
              {activeFilterCount > 0 && (
                <Button onClick={handleClearFilters} variant="ghost" size="sm" className="gap-1 text-xs">
                  <X className="h-3 w-3" />
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Difficulty Filter */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Difficulty</h4>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    onClick={() => handleDifficultyToggle(difficulty)}
                    variant={filters.difficulty.includes(difficulty) ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Role</h4>
              <div className="space-y-2">
                {roles.map((role) => (
                  <label key={role} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.role.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">{role}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
