"use client"

import { Bell, Search, MoreHorizontal, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  title: string
  subtitle?: string
  onSidebarToggle: () => void
  searchPlaceholder?: string
  userName?: string
  userEmail?: string
  userAvatar?: string
  userInitials?: string
}

export function Header({
  title,
  subtitle,
  onSidebarToggle,
  searchPlaceholder = "Search anything...",
  userName = "John Doe",
  userEmail = "john.doe@srnr.com",
  userAvatar,
  userInitials = "JD",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSidebarToggle} 
              className="p-2 md:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSidebarToggle} 
              className="p-2 hidden md:block"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            <div className="min-w-0">
              <h1 className="font-poppins font-bold text-lg sm:text-xl md:text-2xl text-gray-900 truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-gray-500 font-inter truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search - Hidden on small mobile */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-10 w-48 md:w-64 lg:w-80 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Search icon for mobile */}
            <Button variant="ghost" size="sm" className="p-2 sm:hidden">
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarImage src={userAvatar || "/emp_dummy.png?height=40&width=40"} />
                <AvatarFallback className="text-xs sm:text-sm">{userInitials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block min-w-0">
                <p className="font-inter font-medium text-gray-900 text-sm truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
