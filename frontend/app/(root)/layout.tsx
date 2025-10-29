"use client"

import { usePathname } from "next/navigation";
import Navbar from "../components/ui/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show navbar on interview pages
  const hideNavbar = pathname?.startsWith('/interviews');

  return (
      <div>
        {!hideNavbar && <Navbar />}
        {children}
      </div>
  );
}