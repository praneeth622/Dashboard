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
      />

      {/* Main Content */}
      <div className={`
        ${sidebarCollapsed 
          ? "md:ml-20" 
          : "md:ml-72"
        }
        ${isMobile ? "ml-0" : ""}
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
        <div className="min-h-[calc(100vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  )
}
