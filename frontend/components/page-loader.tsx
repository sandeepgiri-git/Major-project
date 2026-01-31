"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Show loader when route changes
    setIsVisible(true);

    // Small delay to show the loader (optional)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]); // 👈 Reacts to route changes automatically

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Outer rotating ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>

          {/* Middle rotating ring (opposite direction) */}
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent border-l-accent animate-spin"
            style={{
              animationDirection: "reverse",
              animationDuration: "1.5s",
            }}
          ></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Loading</p>
          <div className="flex gap-1 justify-center mt-2">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"

// export function PageLoader() {
//   const [isVisible, setIsVisible] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const handleStart = () => setIsVisible(true)
//     const handleStop = () => {
//       setTimeout(() => setIsVisible(false), 500)
//     }

//     // Listen for route changes using router events
//     window.addEventListener("beforeunload", handleStart)

//     // For client-side navigation, we need to detect route changes
//     const originalPush = router.push
//     const originalReplace = router.replace

//     router.push = function (...args) {
//       handleStart()
//       return originalPush.apply(this, args)
//     }

//     router.replace = function (...args) {
//       handleStart()
//       return originalReplace.apply(this, args)
//     }

//     // Stop loader after navigation completes
//     const timer = setTimeout(handleStop, 2000)

//     return () => {
//       window.removeEventListener("beforeunload", handleStart)
//       clearTimeout(timer)
//     }
//   }, [router])

//   if (!isVisible) return null

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
//       <div className="flex flex-col items-center gap-4">
//         {/* Outer rotating ring */}
//         <div className="relative w-16 h-16">
//           <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"></div>

//           {/* Middle rotating ring (opposite direction) */}
//           <div
//             className="absolute inset-2 rounded-full border-4 border-transparent border-b-accent border-l-accent animate-spin"
//             style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
//           ></div>

//           {/* Inner pulsing circle */}
//           <div className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
//         </div>

//         {/* Loading text */}
//         <div className="text-center">
//           <p className="text-sm font-medium text-foreground">Loading</p>
//           <div className="flex gap-1 justify-center mt-2">
//             <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }}></span>
//             <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></span>
//             <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
