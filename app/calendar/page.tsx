"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"
import { Clock, Plus, Eye, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { MainLayout } from "@/components/main-layout"

const localizer = momentLocalizer(moment)

const holidays = [
  { date: "Jan 26", name: "Republic Day", color: "bg-red-100 text-red-700" },
  { date: "Mar 8", name: "Holi", color: "bg-pink-100 text-pink-700" },
  { date: "Mar 29", name: "Good Friday", color: "bg-blue-100 text-blue-700" },
  { date: "Apr 14", name: "Baisakhi", color: "bg-yellow-100 text-yellow-700" },
  { date: "May 1", name: "Labour Day", color: "bg-green-100 text-green-700" },
  { date: "Aug 15", name: "Independence Day", color: "bg-orange-100 text-orange-700" },
  { date: "Oct 2", name: "Gandhi Jayanti", color: "bg-indigo-100 text-indigo-700" },
  { date: "Nov 12", name: "Diwali", color: "bg-purple-100 text-purple-700" },
  { date: "Dec 25", name: "Christmas", color: "bg-red-100 text-red-700" },
]

const leaveRequests = [
  {
    duration: "Jan 15 - Jan 17",
    type: "Casual Leave",
    days: 3,
    status: "Approved",
    details: "Family function",
  },
  {
    duration: "Feb 5 - Feb 6",
    type: "Sick Leave",
    days: 2,
    status: "Pending",
    details: "Medical checkup",
  },
  {
    duration: "Mar 10 - Mar 12",
    type: "Casual Leave",
    days: 3,
    status: "Approved",
    details: "Personal work",
  },
  {
    duration: "Apr 2 - Apr 4",
    type: "Holiday Leave",
    days: 3,
    status: "Pending",
    details: "Extended weekend",
  },
]

const todayActivity = [
  { time: "09:15 AM", activity: "Checked In", type: "checkin" },
  { time: "01:00 PM", activity: "Lunch Break", type: "break" },
  { time: "02:00 PM", activity: "Back from Lunch", type: "checkin" },
  { time: "06:30 PM", activity: "Checked Out", type: "checkout" },
]

// Generate calendar events
const generateCalendarEvents = () => {
  const events = []
  const today = new Date()

  // Add some sample events
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i - 15)

    // Work day events
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const loginTime = new Date(date)
      loginTime.setHours(9, 15, 0)

      const logoutTime = new Date(date)
      logoutTime.setHours(18, 30, 0)

      events.push({
        id: `work-${i}`,
        title: "Work Day",
        start: loginTime,
        end: logoutTime,
        resource: {
          type: "work",
          status: Math.random() > 0.8 ? "SL" : Math.random() > 0.9 ? "CL" : "O",
        },
      })
    }

    // Add some leave events
    if (Math.random() > 0.85) {
      events.push({
        id: `leave-${i}`,
        title: "Leave",
        start: new Date(date.setHours(0, 0, 0)),
        end: new Date(date.setHours(23, 59, 59)),
        resource: {
          type: "leave",
          status: Math.random() > 0.5 ? "CL" : "SL",
        },
      })
    }
  }

  return events
}

const HolidayList = () => (
  <Card className="shadow-lg border-0 h-full">
    <CardHeader>
      <CardTitle className="font-poppins text-xl">Upcoming Holidays</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 overflow-y-auto max-h-[500px]">
      {holidays.map((holiday, index) => (
        <motion.div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div>
            <p className="font-inter font-medium text-gray-900">{holiday.date}</p>
            <Badge className={`mt-1 ${holiday.color} border-0`}>{holiday.name}</Badge>
          </div>
        </motion.div>
      ))}
    </CardContent>
  </Card>
)

const DynamicCalendar = ({
  events,
  selectedDate,
  onSelectDate,
}: {
  events: any[]
  selectedDate: Date
  onSelectDate: (date: Date) => void
}) => {
  const eventStyleGetter = (event: any) => {
    let backgroundColor = "#3174ad"
    let borderColor = "#3174ad"

    if (event.resource?.status === "SL") {
      backgroundColor = "#f59e0b"
      borderColor = "#f59e0b"
    } else if (event.resource?.status === "CL") {
      backgroundColor = "#3b82f6"
      borderColor = "#3b82f6"
    } else if (event.resource?.status === "HL") {
      backgroundColor = "#8b5cf6"
      borderColor = "#8b5cf6"
    } else if (event.resource?.status === "A") {
      backgroundColor = "#ef4444"
      borderColor = "#ef4444"
    } else if (event.resource?.status === "O") {
      backgroundColor = "#10b981"
      borderColor = "#10b981"
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "12px",
        padding: "2px 6px",
      },
    }
  }

  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader>
        <CardTitle className="font-poppins text-xl">Calendar View</CardTitle>
      </CardHeader>
      <CardContent className="h-[600px]">
        <div className="h-full">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            eventPropGetter={eventStyleGetter}
            onSelectSlot={({ start }) => onSelectDate(start)}
            onSelectEvent={(event) => onSelectDate(event.start)}
            selectable
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            defaultView={Views.MONTH}
            popup
            className="custom-calendar"
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">On-time (O)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Absent (A)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Sick Leave (SL)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Casual Leave (CL)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Holiday Leave (HL)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const TodayActivityPanel = ({ selectedDate }: { selectedDate: Date }) => (
  <div className="space-y-6">
    {/* Login/Logout Times */}
    <Card className="shadow-lg border-0">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-inter text-sm text-gray-600">Login Time</p>
                <p className="font-poppins font-bold text-lg text-gray-900">09:15 AM</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-inter text-sm text-gray-600">Logout Time</p>
                <p className="font-poppins font-bold text-lg text-gray-900">06:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Today Activity */}
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="font-poppins text-lg">
          Activity for {moment(selectedDate).format("MMM DD, YYYY")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayActivity.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Circle
              className={`w-3 h-3 ${
                activity.type === "checkin"
                  ? "text-green-500 fill-green-500"
                  : activity.type === "checkout"
                    ? "text-red-500 fill-red-500"
                    : "text-yellow-500 fill-yellow-500"
              }`}
            />
            <div className="flex-1">
              <p className="font-inter text-sm text-gray-900">{activity.activity}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    {/* Apply for Leave Button */}
    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl shadow-lg">
      <Plus className="w-4 h-4 mr-2" />
      Apply for Leave
    </Button>
  </div>
)

const LeaveSummaryCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
      <CardContent className="p-6 text-center">
        <h3 className="font-poppins font-bold text-2xl text-purple-700">10</h3>
        <p className="font-inter text-purple-600">Casual Leaves Left</p>
      </CardContent>
    </Card>
    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
      <CardContent className="p-6 text-center">
        <h3 className="font-poppins font-bold text-2xl text-orange-700">8</h3>
        <p className="font-inter text-orange-600">Sick Leaves Left</p>
      </CardContent>
    </Card>
    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
      <CardContent className="p-6 text-center">
        <h3 className="font-poppins font-bold text-2xl text-green-700">5</h3>
        <p className="font-inter text-green-600">Holiday Leaves Left</p>
      </CardContent>
    </Card>
  </div>
)

const LeaveRequestTable = () => (
  <Card className="shadow-lg border-0">
    <CardHeader>
      <CardTitle className="font-poppins text-xl">Leave Requests</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-inter font-medium">Duration</TableHead>
            <TableHead className="font-inter font-medium">Type</TableHead>
            <TableHead className="font-inter font-medium">Days</TableHead>
            <TableHead className="font-inter font-medium">Status</TableHead>
            <TableHead className="font-inter font-medium">Details</TableHead>
            <TableHead className="font-inter font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveRequests.map((request, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{request.duration}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.days}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    request.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.details}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <Eye className="w-4 h-4 mr-1" />
                  See more
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const events = useMemo(() => generateCalendarEvents(), [])

  return (
    <MainLayout
      title="Calendar"
      subtitle="Manage your schedule and leave requests"
      searchPlaceholder="Search calendar..."
      userName="John Doe"
      userEmail="john.doe@srnr.com"
      userInitials="JD"
    >
      {/* Calendar Content */}
      <main className="p-8 space-y-8">
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Holidays List */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HolidayList />
          </motion.div>

          {/* Center Column - Dynamic Calendar */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DynamicCalendar events={events} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </motion.div>

          {/* Right Column - Activity Panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TodayActivityPanel selectedDate={selectedDate} />
          </motion.div>
        </div>

        {/* Leave Balance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <LeaveSummaryCards />
        </motion.div>

        {/* Leave Request Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <LeaveRequestTable />
        </motion.div>
      </main>

      <style jsx global>{`
        .custom-calendar {
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        .custom-calendar .rbc-header {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 12px 8px;
          font-weight: 600;
          color: #374151;
        }
        
        .custom-calendar .rbc-today {
          background-color: #dbeafe;
        }
        
        .custom-calendar .rbc-off-range-bg {
          background-color: #f9fafb;
        }
        
        .custom-calendar .rbc-event {
          border-radius: 6px;
          border: none;
          font-size: 11px;
          padding: 2px 6px;
        }
        
        .custom-calendar .rbc-toolbar {
          margin-bottom: 20px;
        }
        
        .custom-calendar .rbc-toolbar button {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 8px 16px;
          margin: 0 4px;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
        }
        
        .custom-calendar .rbc-toolbar button:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }
        
        .custom-calendar .rbc-toolbar button.rbc-active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: white;
        }
        
        .custom-calendar .rbc-month-view {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .custom-calendar .rbc-date-cell {
          padding: 8px;
          text-align: right;
        }
        
        .custom-calendar .rbc-date-cell > a {
          color: #374151;
          font-weight: 500;
        }
      `}</style>
    </MainLayout>
  )
}
