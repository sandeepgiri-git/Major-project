"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/page-loader';

const Layout = ({children}: {children: ReactNode}) => {
    const { user, fetchDone } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (fetchDone && user && user.isOnboarded) {
            router.push('/'); // Use router.push instead of redirect
        }
        setIsChecking(false);
    }, [fetchDone, user, router]);

    // Show loader while checking auth
    if (!fetchDone || isChecking) {
        return <PageLoader />;
    }

    // If user exists and fetch is done, don't render children
    // (the useEffect will handle redirect)
    // if (user && fetchDone) {
    //     return <PageLoader />; // Or null while redirecting
    // }

    return <>{children}</>;
}

export default Layout;

// import React, { ReactNode } from 'react'
// import { useAuth } from '../contexts/AuthContext'
// import { redirect } from 'next/navigation';
// import { PageLoader } from '@/components/page-loader';

// const layout = ({children} : {children: ReactNode}) => {
//     const {user} = useAuth();
//     const {fetchDone} = useAuth();

//     if(!fetchDone) {
//         return (
//             <PageLoader/>
//         )
//     }
    
//     if(user && fetchDone) {
//         redirect('/');
//     }
//   return (
//     <>
//       {children}
//     </>
//   )
// }

// export default layout
