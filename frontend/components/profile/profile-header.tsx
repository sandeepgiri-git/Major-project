"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditProfileModal, type ProfileData } from "./edit-profile-modal"
import { useAuth } from "@/app/contexts/AuthContext"

export function ProfileHeader() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const {user, loading} = useAuth();

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    bio: "",
    experience: "",
    skills: [""],
  })
  
  useEffect(() => {
    if(user) setProfileData({
      name: user.name,
      email: user.email,
      bio: user.targetRoles[0],
      experience: "intermediate",
      skills: user.technicalSkills,
    })
  }, [user])

  // if(loading) {
  //   return (
  //     <PageLoader/>
  //   )
  // }
  const handleSaveProfile = (data: ProfileData) => {
    setProfileData(data)
  }

  return (
    <>
      <Card className="p-6 md:p-8 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
              {profileData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{profileData.name}</h1>
              <p className="text-muted-foreground">{profileData.email}</p>
              <p className="text-sm text-muted-foreground mt-2">{profileData.bio}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Member since Oct 2024
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <Button onClick={() => setIsEditOpen(true)} className="w-full md:w-auto">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />
    </>
  )
}
