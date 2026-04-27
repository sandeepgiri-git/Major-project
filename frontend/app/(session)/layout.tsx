"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { redirect } from 'next/navigation';

const layout = ({children} : {children: ReactNode}) => {
    const {user, fetchDone} = useAuth();

    const [Auth, setAuth] = useState(null);
    const [FD, setFD] = useState(false);

    useEffect(() => {
      if(user) setAuth(user);
      if(fetchDone) setFD(true);
    }, [user, fetchDone])

    if(fetchDone && !user) {
      // console.log("redirect")
      redirect("/login");
    }

    if(user && !user.isOnboarded) {
      redirect('/onboarding-setup');
    }
    
  return (
    <>
      {children}
    </>
  )
}

export default layout
