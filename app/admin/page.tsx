"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download
} from "lucide-react"

// Admin dashboard data
const adminStats = {
  totalEmployees: 247,
  activeEmployees: 231,
  pendingApprovals: 12,
  monthlyExpenses: 45280.50,
  leaveRequests: 8,
  newHires: 3,
  upcomingReviews: 15,
  documentsToReview: 6
}

const recentEmployees = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@srnr.com",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2025-06-15",
    status: "Active",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "EMP002", 
    name: "Mike Chen",
    email: "mike.chen@srnr.com",
    department: "Design",
    position: "UX Designer",
    joinDate: "2025-06-10",
    status: "Active",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: "EMP003",
    name: "Emily Davis",
    email: "emily.davis@srnr.com", 
    department: "Marketing",
    position: "Marketing Manager",
    joinDate: "2025-06-08",
    status: "Active",
    avatar: "/placeholder-user.jpg"
  }
]

const pendingApprovals = [
  {
    id: "REQ001",
    type: "Leave Request",
    employee: "Alex Rodriguez",
    department: "Engineering",
    details: "Vacation Leave - July 15-20",
    requestDate: "2025-06-30",
    urgency: "Normal"
  },
  {
    id: "REQ002", 
    type: "Expense Claim",
    employee: "Jennifer Wilson",
    department: "Sales",
    details: "Client Meeting - $245.50",
    requestDate: "2025-07-01",
    urgency: "High"
  },
  {
    id: "REQ003",
    type: "Document Review",
    employee: "David Park",
    department: "HR",
    details: "Employee Handbook Update",
    requestDate: "2025-06-29",
    urgency: "Normal"
  },
  {
    id: "REQ004",
    type: "Leave Request", 
    employee: "Lisa Thompson",
    department: "Finance",
    details: "Sick Leave - July 3-5",
    requestDate: "2025-07-02",
    urgency: "Urgent"
  }
]

const departmentStats = [
  { name: "Engineering", employees: 85, growth: "+12%", color: "bg-blue-500" },
  { name: "Sales", employees: 42, growth: "+8%", color: "bg-green-500" },
  { name: "Marketing", employees: 28, growth: "+15%", color: "bg-purple-500" },
  { name: "HR", employees: 15, growth: "+5%", color: "bg-orange-500" },
  { name: "Finance", employees: 22, growth: "+3%", color: "bg-red-500" },
  { name: "Design", employees: 18, growth: "+20%", color: "bg-pink-500" }
]

const upcomingEvents = [
  {
    date: "July 5",
    time: "10:00 AM",
    title: "Performance Review - Sarah Johnson",
    type: "Review"
  },
  {
    date: "July 8", 
    time: "2:30 PM",
    title: "New Hire Orientation",
    type: "Onboarding"
  },
  {
    date: "July 10",
    time: "9:00 AM", 
    title: "Department Head Meeting",
    type: "Meeting"
  },
  {
    date: "July 12",
    time: "3:00 PM",
    title: "Quarterly Review - Engineering",
    type: "Review"
  }
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "Urgent":
        return <Badge variant="destructive" className="text-xs">{urgency}</Badge>
      case "High":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">{urgency}</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{urgency}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">{status}</Badge>
      case "Inactive":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">{status}</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>
    }
  }

  return (
    <MainLayout
      title="Admin Dashboard"
      subtitle="Comprehensive HR Management & Analytics"
      searchPlaceholder="Search employees, requests, documents..."
      userName="Admin User"
      userEmail="admin@srnr.com"
      userInitials="AU"
    >
      <main className="p-8 space-y-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-poppins font-bold text-3xl text-gray-900 mb-2">
            Welcome back, Admin! 👨‍💼
          </h1>
          <p className="font-inter text-gray-600">
            Here's your organization overview and pending actions.
          </p>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Employees</p>
                  <p className="text-3xl font-bold text-blue-900">{adminStats.totalEmployees}</p>
                  <p className="text-blue-600 text-xs mt-1">
                    {adminStats.activeEmployees} Active • {adminStats.totalEmployees - adminStats.activeEmployees} Inactive
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Pending Approvals</p>
                  <p className="text-3xl font-bold text-green-900">{adminStats.pendingApprovals}</p>
                  <p className="text-green-600 text-xs mt-1">
                    {adminStats.leaveRequests} Leave • 4 Expenses
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Monthly Expenses</p>
                  <p className="text-3xl font-bold text-purple-900">
                    ${adminStats.monthlyExpenses.toLocaleString()}
                  </p>
                  <p className="text-purple-600 text-xs mt-1">
                    +8.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">New Hires</p>
                  <p className="text-3xl font-bold text-orange-900">{adminStats.newHires}</p>
                  <p className="text-orange-600 text-xs mt-1">
                    This month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Pending Approvals - Takes 2 columns */}
          <motion.div
            className="xl:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-poppins font-bold text-xl text-gray-900">
                  Pending Approvals
                </CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div 
                      key={approval.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{approval.type}</h4>
                          {getUrgencyBadge(approval.urgency)}
                        </div>
                        <p className="text-sm text-gray-600">{approval.employee} • {approval.department}</p>
                        <p className="text-xs text-gray-500 mt-1">{approval.details}</p>
                        <p className="text-xs text-gray-400 mt-1">Requested: {approval.requestDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events Sidebar */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="shadow-lg border-0 h-full">
              <CardHeader>
                <CardTitle className="font-poppins font-bold text-xl text-gray-900">
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">{event.date}</span>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <Badge variant="outline" className="text-xs mt-1">{event.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Department Stats & Recent Employees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Department Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0 h-full">
              <CardHeader>
                <CardTitle className="font-poppins font-bold text-xl text-gray-900">
                  Department Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                        <span className="font-medium text-gray-900">{dept.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{dept.employees}</p>
                        <p className="text-xs text-green-600">{dept.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Employees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="shadow-lg border-0 h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-poppins font-bold text-xl text-gray-900">
                  Recent Employees
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                          <p className="text-xs text-gray-500">{employee.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(employee.status)}
                        <div className="flex items-center space-x-1 mt-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="font-poppins font-bold text-xl text-gray-900">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <Users className="w-6 h-6" />
                  <span className="text-xs">Add Employee</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <Calendar className="w-6 h-6" />
                  <span className="text-xs">Schedule Review</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <FileText className="w-6 h-6" />
                  <span className="text-xs">Generate Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <BarChart3 className="w-6 h-6" />
                  <span className="text-xs">Analytics</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <Download className="w-6 h-6" />
                  <span className="text-xs">Export Data</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <Settings className="w-6 h-6" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </MainLayout>
  )
}