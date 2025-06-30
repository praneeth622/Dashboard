"use client"

import { Bell, Search, MoreHorizontal } from "lucide-react"
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
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 mx-2 rounded-md">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onSidebarToggle} className="p-2">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-poppins font-bold text-2xl text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500 font-inter">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-10 w-80 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Avatar className="w-10 h-10">
                <AvatarImage src={userAvatar || "/emp_dummy.png?height=40&width=40"} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-inter font-medium text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
