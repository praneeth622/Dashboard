"use client"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Home, User, Calendar, DollarSign, Heart, Receipt, Package, FolderOpen, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: User, label: "Employee", href: "/employee" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: DollarSign, label: "My Financial", href: "/financial" },
  { icon: Heart, label: "Medical", href: "/medical" },
  { icon: Receipt, label: "Expenses Claims", href: "/expenses" },
  { icon: Package, label: "Assets", href: "/assets" },
  { icon: FolderOpen, label: "Other Documents", href: "/documents" },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="px-3 pt-4 pb-5 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-poppins font-bold text-xl text-gray-900">SRNR IT Solutions</h1>
                <p className="text-sm text-gray-500 font-inter">Premium Technogies</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 m-2 space-y-2">
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start space-x-3 px-4 py-3 h-auto rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span className="font-inter font-medium">{item.label}</span>}
                </Button>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <Link href="/logout">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
              <LogOut className="w-5 h-5" />
              {!collapsed && <span className="font-inter font-medium">Logout</span>}
            </button>
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}
