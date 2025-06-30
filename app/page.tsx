"use client"

import { motion } from "framer-motion"
import { Clock, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MainLayout } from "@/components/main-layout"

const meetings = [
  {
    time: "10:00 AM",
    date: "Today",
    title: "Team Standup",
    type: "Meeting",
    participants: 8,
  },
  {
    time: "02:30 PM",
    date: "Today",
    title: "Product Review",
    type: "Group Discussion",
    participants: 12,
  },
  {
    time: "04:00 PM",
    date: "Tomorrow",
    title: "Client Presentation",
    type: "Meeting",
    participants: 5,
  },
]

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    name: "Mike Chen",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  },
  {
    name: "Alex Rodriguez",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
  },
]

const claims = [
  { id: "EXP001", amount: "$245.50", status: "Pending" },
  { id: "EXP002", amount: "$89.20", status: "Done" },
  { id: "EXP003", amount: "$156.75", status: "Pending" },
  { id: "EXP004", amount: "$320.00", status: "Done" },
]

const tickets = [
  {
    id: "TKT001",
    summary: "Login Issues",
    decision: "In Progress",
    action: "Pending",
  },
  {
    id: "TKT002",
    summary: "Salary Discrepancy",
    decision: "Resolved",
    action: "Closed",
  },
  {
    id: "TKT003",
    summary: "Leave Request",
    decision: "Approved",
    action: "Closed",
  },
]

export default function HRDashboard() {
  return (
    <MainLayout title="Dashboard" subtitle="Your latest activity summary.">
      {/* Dashboard Content */}
      <main className="p-8 space-y-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-poppins font-bold text-3xl text-gray-900 mb-2">Good morning, John! 👋</h1>
          <p className="font-inter text-gray-600">Here's what's happening with your team today.</p>
        </motion.div>

        {/* Time Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-inter text-sm text-green-600 mb-1">Average Login Time</p>
                  <p className="font-poppins font-bold text-2xl text-green-700">09:15 AM</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-inter text-sm text-blue-600 mb-1">Average Logout Time</p>
                  <p className="font-poppins font-bold text-2xl text-blue-700">06:15 PM</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Grid - 4 Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Column 1: Leave Statistics */}
          <motion.div
            className="xl:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 h-full">
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Leave Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                        className="text-blue-600"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-poppins font-bold text-lg text-gray-900">65%</span>
                    </div>
                  </div>
                  <p className="font-inter font-medium text-gray-900 text-sm">Annual Leaves</p>
                  <p className="text-xs text-gray-500">13 of 20 days used</p>
                </div>

                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.3)}`}
                        className="text-green-600"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-poppins font-bold text-lg text-gray-900">30%</span>
                    </div>
                  </div>
                  <p className="font-inter font-medium text-gray-900 text-sm">Sick Leaves</p>
                  <p className="text-xs text-gray-500">3 of 10 days used</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Column 2: Claims & Tickets */}
          <motion.div
            className="xl:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Claims Tracking */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Claims Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-inter font-medium">Expense ID</TableHead>
                      <TableHead className="font-inter font-medium">Amount</TableHead>
                      <TableHead className="font-inter font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={claim.status === "Done" ? "default" : "secondary"}
                            className={
                              claim.status === "Done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {claim.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Support Tickets */}
            <Card className="shadow-lg border-0 py-8">
              <CardHeader className="flex flex-row items-center justify-between py-2">
                <CardTitle className="font-poppins text-xl">Support Tickets</CardTitle>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Raise Ticket
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-inter font-medium">ID</TableHead>
                      <TableHead className="font-inter font-medium">Summary</TableHead>
                      <TableHead className="font-inter font-medium">Decision</TableHead>
                      <TableHead className="font-inter font-medium">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.summary}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              ticket.decision === "Resolved" || ticket.decision === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {ticket.decision}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={ticket.action === "Closed" ? "text-gray-500" : "text-orange-600"}
                          >
                            {ticket.action}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* Column 3: Right Sidebar */}
          <motion.div
            className="xl:col-span-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Upcoming Meetings */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="font-poppins text-lg">Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {meetings.slice(0, 3).map((meeting, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-medium text-gray-900 text-sm truncate">{meeting.title}</p>
                      <p className="text-xs text-gray-500">
                        {meeting.time} • {meeting.date}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {meeting.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Contacts */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="font-poppins text-lg">Team Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.slice(0, 4).map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter font-medium text-gray-900 text-sm truncate">{member.name}</p>
                      <p className="text-xs text-gray-500 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row - Medical & Salary Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Medical Claims */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="font-poppins text-xl">Medical Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="font-poppins font-bold text-2xl text-blue-600">$2,450</p>
                  <p className="text-sm text-gray-500 font-inter">Total Claims</p>
                </div>
                <div className="text-center">
                  <p className="font-poppins font-bold text-2xl text-green-600">$1,890</p>
                  <p className="text-sm text-gray-500 font-inter">Spent Claims</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary Status */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="font-poppins text-xl">Salary Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-gray-600">Successfully Paid</span>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-gray-600">Processing</span>
                  <span className="text-sm font-medium text-yellow-600">10%</span>
                </div>
                <Progress value={10} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-inter text-gray-600">Unpaid</span>
                  <span className="text-sm font-medium text-red-600">5%</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </MainLayout>
  )
}
