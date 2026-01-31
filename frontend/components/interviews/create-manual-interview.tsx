"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/app/contexts/AuthContext"
import { toast } from "sonner"

export function CreateManualInterview() {
  const {createInterview} = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
      title: "TCs for Senior Frontend Engineer",
      role: "",
      difficulty: "beginner",
      duration: "10",
      scheduleDate: "",
      interviewer: "",
      jobDescription: "",
      interviewType: "mix",
      questionCount: "5"
    })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Required field check
      if (
        !formData.title ||
        !formData.role ||
        !formData.difficulty ||
        !formData.duration ||
        !formData.scheduleDate ||
        !formData.interviewType
      ) {
        alert("Please fill all the required fields");
        return; // Important
      }

      try {
        setLoading(true);   // Start loader

        // Convert date to ISO
        const isoDate = new Date(formData.scheduleDate + "T00:00:00").toISOString();

        const finalData = {
          ...formData,
          scheduleDate: isoDate,
          questionCount: Number(formData.questionCount),
        };

        const res = await createInterview(finalData);
        console.log(res);
        if(res?.success) {
          // want to nvigate to interview details page
          // window.location.href = `/interview-details/${res.interview._id}`;
          window.location.href = `/interviews`;
          toast.success("Interview created successfully");
        }

      } finally {
        setLoading(false);  // Stop loader
      }
    };



  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Manual Interview</CardTitle>
        <CardDescription>Schedule a manual interview with custom job description and interview details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Interview Title <p className=" text-red-300 text-xl ">*</p></Label>
            <Input
              id="title"
              placeholder="e.g., Senior Frontend Engineer Round 1"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="role">Role <p className=" text-red-300 text-xl ">*</p></Label>
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
              <Label htmlFor="difficulty">Difficulty <p className=" text-red-300 text-xl ">*</p></Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Interview Type <p className=" text-red-300 text-xl ">*</p></Label>
              <Select
                value={formData.interviewType}
                onValueChange={(value) => setFormData({ ...formData, interviewType: value })}
              >
                <SelectTrigger id="interviewType">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="mix">Mix</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes) <p className=" text-red-300 text-xl ">*</p></Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionCount">Question Count </Label>
              <Select value={formData.questionCount} onValueChange={(value) => setFormData({ ...formData, questionCount: value })}>
                <SelectTrigger id="questionCount">
                  <SelectValue placeholder="Select questionCount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="date">ScheduleDate <p className=" text-red-300 text-xl ">*</p></Label>
              <Input
                id="date"
                type="date"
                value={formData.scheduleDate}
                onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div> */}
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

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here. This will help customize the interview questions..."
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              rows={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Interview"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
