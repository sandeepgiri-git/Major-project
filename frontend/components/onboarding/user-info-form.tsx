"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  fullName: string
  experience: string
  targetRoles: string[]
  skills: string[]
  interviewType: string
  availability: string
  goal: string
}

const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Lead/Manager"]
const TARGET_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Product Manager",
  "QA Engineer",
  "Other",
]
const SKILLS_OPTIONS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Docker",
  "Git",
  "REST APIs",
  "GraphQL",
]
const INTERVIEW_TYPES = ["Technical", "Behavioral", "System Design", "All"]
const AVAILABILITY_OPTIONS = ["Flexible", "Weekdays", "Weekends", "Evenings"]
const GOALS = ["Get a new job", "Prepare for promotion", "Improve skills", "Practice for interviews", "Career change"]

export function UserInfoForm({ onComplete }: { onComplete: (formData: any) => any }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    experience: "",
    targetRoles: [],
    skills: [],
    interviewType: "",
    availability: "",
    goal: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.experience) newErrors.experience = "Please select your experience level"
    } else if (currentStep === 2) {
      if (formData.targetRoles.length === 0) newErrors.targetRoles = "Please select at least one target role"
      if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill"
    } else if (currentStep === 3) {
      if (!formData.interviewType) newErrors.interviewType = "Please select interview type"
      if (!formData.availability) newErrors.availability = "Please select your availability"
      if (!formData.goal) newErrors.goal = "Please select your goal"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    if (validateStep(step)) {
      // console.log("Form submitted:", formData)
      onComplete(formData)
    }
  }

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    setFormData({ ...formData, [field]: newArray })
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Let's start with the basics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
              />
              {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">Experience Level</label>
              <div className="grid grid-cols-2 gap-3">
                {EXPERIENCE_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, experience: level })}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      formData.experience === level
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {errors.experience && <p className="mt-2 text-sm text-destructive">{errors.experience}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Roles & Skills */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Roles & Skills</CardTitle>
            <CardDescription>What are you interested in?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Target Roles</label>
              <div className="grid grid-cols-2 gap-2">
                {TARGET_ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => toggleArrayField("targetRoles", role)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      formData.targetRoles.includes(role)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              {errors.targetRoles && <p className="mt-2 text-sm text-destructive">{errors.targetRoles}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">Technical Skills</label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {SKILLS_OPTIONS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleArrayField("skills", skill)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      formData.skills.includes(skill)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {errors.skills && <p className="mt-2 text-sm text-destructive">{errors.skills}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preferences */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Interview Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Interview Type</label>
              <div className="grid grid-cols-2 gap-3">
                {INTERVIEW_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, interviewType: type })}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      formData.interviewType === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.interviewType && <p className="mt-2 text-sm text-destructive">{errors.interviewType}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">Availability</label>
              <div className="grid grid-cols-2 gap-3">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, availability: option })}
                    className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                      formData.availability === option
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {errors.availability && <p className="mt-2 text-sm text-destructive">{errors.availability}</p>}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">What's Your Goal?</label>
              <div className="space-y-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({ ...formData, goal })}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      formData.goal === goal
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              {errors.goal && <p className="mt-2 text-sm text-destructive">{errors.goal}</p>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {step > 1 && (
          <Button variant="outline" onClick={handlePrevious} className="flex-1 bg-transparent">
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} className="flex-1">
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="flex-1">
            Complete Profile
          </Button>
        )}
      </div>
    </div>
  )
}
