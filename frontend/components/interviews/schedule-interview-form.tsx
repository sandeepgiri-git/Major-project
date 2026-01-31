"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ScheduleInterviewForm() {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    difficulty: "",
    date: "",
    time: "",
    interviewer: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Schedule interview form submitted:", formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Manual Interview</CardTitle>
        <CardDescription>Schedule an interview with a human interviewer</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Interview Title</Label>
            <Input
              id="title"
              placeholder="e.g., Senior Frontend Engineer Round 1"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Engineer</SelectItem>
                  <SelectItem value="backend">Backend Engineer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Engineer</SelectItem>
                  <SelectItem value="devops">DevOps Engineer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewer">Interviewer</Label>
            <Select
              value={formData.interviewer}
              onValueChange={(value) => setFormData({ ...formData, interviewer: value })}
            >
              <SelectTrigger id="interviewer">
                <SelectValue placeholder="Select interviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Smith - Senior Engineer</SelectItem>
                <SelectItem value="sarah">Sarah Johnson - Tech Lead</SelectItem>
                <SelectItem value="mike">Mike Chen - Engineering Manager</SelectItem>
                <SelectItem value="emma">Emma Davis - Hiring Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Schedule Interview
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
