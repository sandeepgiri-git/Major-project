"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateManualInterview } from "@/components/interviews/create-manual-interview"
import { CreateByRole } from "@/components/interviews/create-by-role"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function CreateInterviewPage() {
  const [activeTab, setActiveTab] = useState("manual")
  const router = useRouter()

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-6 md:py-8">
          <div className="mb-8 flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create Interview</h1>
              <p className="mt-2 text-muted-foreground">Choose how you'd like to create your interview session</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Interview</TabsTrigger>
              <TabsTrigger value="by-role">Create by Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-6">
              <CreateManualInterview />
            </TabsContent>

            <TabsContent value="by-role" className="space-y-6">
              <CreateByRole />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  )
}
