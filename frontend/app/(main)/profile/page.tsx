"use client"

import { SiteHeader } from "@/components/site-header"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { Achievements } from "@/components/profile/achievements"
import { RecentActivity } from "@/components/profile/recent-activity"

export default function ProfilePage() {
  console.log("object")
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <ProfileHeader />
          <ProfileStats />

          <div className="mt-8 grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <RecentActivity />
            </div>
            <div>
              <Achievements />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
