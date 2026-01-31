"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateByRole() {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    difficulty: "",
    duration: "60",
    date: "",
    time: "",
    interviewer: "",
    resume: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, resume: file })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Create by role submitted:", {
      ...formData,
      resume: formData.resume?.name,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Interview by Role</CardTitle>
        <CardDescription>Create an interview by selecting a role and uploading your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Interview Title</Label>
            <Input
              id="title"
              placeholder="e.g., Interview for Senior Frontend Engineer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Engineer</SelectItem>
                  <SelectItem value="backend">Backend Engineer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Engineer</SelectItem>
                  <SelectItem value="devops">DevOps Engineer</SelectItem>
                  <SelectItem value="data">Data Scientist</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
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

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">Scheduled Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Scheduled Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interviewer">Select Interviewer</Label>
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

          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume (PDF)</Label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border p-6">
              <div className="text-center">
                <input id="resume" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" required />
                <label htmlFor="resume" className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="text-2xl">📄</div>
                    <div className="text-sm font-medium">
                      {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                    </div>
                    <div className="text-xs text-muted-foreground">PDF files only (max 10MB)</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Interview with Resume
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
