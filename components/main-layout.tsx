"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
  searchPlaceholder?: string
  userName?: string
  userEmail?: string
  userAvatar?: string
  userInitials?: string
}

export function MainLayout({
  children,
  title,
  subtitle,
  searchPlaceholder,
  userName,
  userEmail,
  userAvatar,
  userInitials,
}: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // On mobile, sidebar should be collapsed (hidden) by default
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className={`
        min-h-screen
        ${isMobile 
          ? "ml-0 w-full" 
          : sidebarCollapsed 
            ? "ml-20" 
            : "ml-72"
        }
      `}>
        <Header
          title={title}
          subtitle={subtitle}
          onSidebarToggle={handleSidebarToggle}
          searchPlaceholder={searchPlaceholder}
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          userInitials={userInitials}
        />
        <main className="min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  )
}
