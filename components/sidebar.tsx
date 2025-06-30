"use client"

import { usePathname } from "next/navigation"
import { Home, User, Calendar, DollarSign, Heart, Receipt, Package, FolderOpen, LogOut, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

    const NavigationButton = ({ item }: { item: typeof sidebarItems[0] }) => {
        const buttonContent = (
            <div className="w-full">
                <Link href={item.href}>
                    <Button
                        variant="ghost"
                        className={`
                            w-full
                            ${collapsed 
                                ? "h-12 w-12 p-0 rounded-xl justify-center" 
                                : "justify-start space-x-3 px-4 py-3 h-auto rounded-xl"
                            }
                            ${isActive(item.href)
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }
                        `}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                            <span className="font-medium whitespace-nowrap overflow-hidden">
                                {item.label}
                            </span>
                        )}
                    </Button>
                </Link>
            </div>
        )

        if (collapsed) {
            return (
                <TooltipProvider>
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                            {buttonContent}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {item.label}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        }

        return buttonContent
    }

    return (
        <>
            {/* Mobile Backdrop */}
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 shadow-xl
                    ${collapsed ? "w-20" : "w-72"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header with Logo and Toggle */}
                    <div className={`px-3 pt-4 pb-5 border-b border-gray-100 ${collapsed ? "px-2" : "px-3"}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 min-w-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <img
                                        src="/srnr_logo.jpeg"
                                        alt="Company Logo"
                                        className="w-11 h-11 object-contain"
                                    />
                                </div>
                                {!collapsed && (
                                    <div className="min-w-0 overflow-hidden">
                                        <h1 className="font-bold text-xl text-gray-900 truncate">
                                            SRNR IT Solutions
                                        </h1>
                                        <p className="text-sm text-gray-500 truncate">
                                            Premium Technologies
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Toggle/Close Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onToggle}
                                className="p-2 rounded-lg hover:bg-gray-100 w-8 h-8"
                            >
                                {collapsed ? (
                                    <ChevronRight className="w-4 h-4" />
                                ) : (
                                    <>
                                        <ChevronLeft className="w-4 h-4 hidden md:block" />
                                        <X className="w-4 h-4 md:hidden" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 overflow-y-auto ${collapsed ? "p-2" : "p-6"} space-y-2`}>
                        {sidebarItems.map((item) => (
                            <div key={item.label} className={collapsed ? "flex justify-center" : ""}>
                                <NavigationButton item={item} />
                            </div>
                        ))}
                    </nav>

                    {/* Logout Section */}
                    <div className={`border-t border-gray-100 ${collapsed ? "p-2" : "p-4"}`}>
                        {collapsed ? (
                            <TooltipProvider>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                        <Link href="/logout">
                                            <button className="w-12 h-12 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-xl mx-auto">
                                                <LogOut className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Logout
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : (
                            <Link href="/logout">
                                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl">
                                    <LogOut className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">
                                        Logout
                                    </span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Desktop Resize Handle */}
                <div 
                    className="absolute right-0 top-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500/20 hidden md:block"
                    onDoubleClick={onToggle}
                />
            </aside>
        </>
    )
}
