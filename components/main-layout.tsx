"use client"

import type React from "react"

import { useState } from "react"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
        <Header
          title={title}
          subtitle={subtitle}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          searchPlaceholder={searchPlaceholder}
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
          userInitials={userInitials}
        />
        <div className="min-h-[calc(100vh-80px)]">{children}</div>
      </div>
    </div>
  )
}
