"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Plus, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { MainLayout } from "@/components/main-layout"
import LeaveApplication from "@/components/LeaveApplication"
import { addMonths, subMonths, format } from "date-fns"

// Leave Details Modal Component
function LeaveDetailsModal({ 
  request, 
  onClose 
}: { 
  request: any; 
  onClose: () => void; 
}) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Leave Request Details</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Start Date:
              </label>
              <p className="text-sm text-gray-900 font-medium">1 Jan, 2024</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                End Date:
              </label>
              <p className="text-sm text-gray-900 font-medium">3 Jan, 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Type:
              </label>
              <p className="text-sm text-gray-900 font-medium">{request.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Days:
              </label>
              <p className="text-sm text-gray-900 font-medium">{request.days} days</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Description:
            </label>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Subject: Sick leave application for office fever
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                I am writing to seek leave from work due to a severe fever. (mention the specific symptoms of fever). Accordingly, consulting with a doctor, I have been advised to take rest for a day to recover. So, I request you to kindly approve my leave application for [date], and I will join the office from the next day.
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Status:
            </label>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
              {request.status}
            </span>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Holiday data
  const holidays = [
    { date: 'Jan 26', name: 'Republic Day' },
    { date: 'Mar 8', name: 'Holi' },
    { date: 'Mar 29', name: 'Good Friday' },
    { date: 'Apr 14', name: 'Baisakhi' },
    { date: 'May 1', name: 'Labour Day' },
    { date: 'Aug 15', name: 'Independence Day' },
    { date: 'Oct 2', name: 'Gandhi Jayanti' },
    { date: 'Nov 12', name: 'Diwali' },
    { date: 'Dec 25', name: 'Christmas' },
  ];

  // Leave data
  const leaveData = {
    casualLeavesLeft: 10,
    sickLeavesLeft: 8,
    holidayLeavesLeft: 5
  };

  // Activity data
  const activities = [
    { time: '09:15 AM', activity: 'Checked In' },
    { time: '01:00 PM', activity: 'Lunch Break' },
    { time: '02:00 PM', activity: 'Back from Lunch' },
    { time: '06:30 PM', activity: 'Checked Out' },
  ];

  // Leave requests data
  const leaveRequests = [
    {
      duration: 'Jan 15 - Jan 17',
      type: 'Casual Leave',
      days: 3,
      status: 'Approved',
      details: 'Family function',
      action: 'See more'
    },
    {
      duration: 'Feb 5 - Feb 6',
      type: 'Sick Leave',
      days: 2,
      status: 'Pending',
      details: 'Medical checkup',
      action: 'See more'
    },
    {
      duration: 'Mar 10 - Mar 12',
      type: 'Casual Leave',
      days: 3,
      status: 'Approved',
      details: 'Personal work',
      action: 'See more'
    },
    {
      duration: 'Apr 2 - Apr 4',
      type: 'Holiday Leave',
      days: 3,
      status: 'Pending',
      details: 'Extended weekend',
      action: 'See more'
    },
  ];

  // Enhanced calendar events with multiple events per day
  const calendarEvents: Record<string, Array<{
    type: string;
    label: string;
    status: string;
    color: string;
  }>> = {
    '2025-01-02': [
      { type: 'holiday', label: 'New Year Holiday', status: 'Holiday', color: 'bg-purple-500' }
    ],
    '2025-01-15': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' }
    ],
    '2025-01-16': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' }
    ],
    '2025-01-17': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' }
    ],
    '2025-01-20': [
      { type: 'sick', label: 'Sick Leave', status: 'Sick Leave', color: 'bg-yellow-500' }
    ],
    '2025-01-26': [
      { type: 'holiday', label: 'Republic Day', status: 'Holiday', color: 'bg-purple-500' }
    ],
    '2025-01-28': [
      { type: 'present', label: 'On Time', status: 'Present', color: 'bg-green-500' }
    ],
    '2025-01-29': [
      { type: 'absent', label: 'Absent', status: 'Absent', color: 'bg-red-500' }
    ],
    '2025-02-05': [
      { type: 'sick', label: 'Sick Leave', status: 'Sick Leave', color: 'bg-yellow-500' }
    ],
    '2025-02-06': [
      { type: 'sick', label: 'Sick Leave', status: 'Sick Leave', color: 'bg-yellow-500' }
    ],
    '2025-02-14': [
      { type: 'holidayleave', label: 'Holiday Leave', status: 'Holiday Leave', color: 'bg-indigo-500' }
    ],
    '2025-03-08': [
      { type: 'holiday', label: 'Holi', status: 'Holiday', color: 'bg-purple-500' }
    ],
    '2025-03-10': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' }
    ],
    '2025-03-11': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' }
    ],
    '2025-03-12': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' }
    ],
    '2025-06-15': [
      { type: 'casual', label: 'Casual Leave', status: 'Casual Leave', color: 'bg-blue-500' },
      { type: 'meeting', label: 'Team Meeting', status: 'Meeting', color: 'bg-orange-500' }
    ],
    '2025-06-20': [
      { type: 'sick', label: 'Sick Leave', status: 'Sick Leave', color: 'bg-yellow-500' }
    ],
    '2025-06-25': [
      { type: 'holidayleave', label: 'Holiday Leave', status: 'Holiday Leave', color: 'bg-indigo-500' }
    ],
    '2025-06-30': [
      { type: 'present', label: 'Present', status: 'Present', color: 'bg-green-500' }
    ],
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents[dateStr] || [];
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSeeMore = (request: any) => {
    setSelectedRequest(request);
  };

  // Navigation functions
  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  };

  const goToPreviousMonth = () => {
    const previousMonth = subMonths(currentMonth, 1);
    setCurrentMonth(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };

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
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 w-full">
        <div className="max-w-full space-y-4 sm:space-y-6">
          {/* Mobile: Single column, Desktop: 4-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Holidays Sidebar - Order 3 on mobile (bottom), Order 1 on desktop (left) */}
            <div className="lg:col-span-1 order-3 lg:order-1">
              <Card className="shadow-sm h-fit">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg font-semibold">Upcoming Holidays</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 max-h-64 lg:max-h-none overflow-y-auto">
                  {holidays.slice(0, 6).map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-50 last:border-b-0">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{holiday.name}</p>
                        <p className="text-xs text-blue-600">{holiday.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Calendar - Order 1 on mobile (top), Order 2 on desktop (center) */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="shadow-sm">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                      <CardTitle className="text-base sm:text-lg font-semibold">
                        Calendar View
                      </CardTitle>
                      <div className="text-sm sm:text-base font-medium text-gray-600">
                        {format(currentMonth, 'MMMM yyyy')}
                      </div>
                    </div>
                    
                    {/* Navigation Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs hover:bg-blue-50 hover:text-blue-600"
                        onClick={goToToday}
                      >
                        Today
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 hover:bg-gray-100"
                          onClick={goToPreviousMonth}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs px-2 hover:bg-gray-100 hidden sm:inline-flex"
                          onClick={goToPreviousMonth}
                        >
                          Back
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs px-2 hover:bg-gray-100 hidden sm:inline-flex"
                          onClick={goToNextMonth}
                        >
                          Next
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2 hover:bg-gray-100"
                          onClick={goToNextMonth}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6">
                  {/* Legend - Mobile responsive */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4 sm:mb-6 p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded flex-shrink-0"></div>
                      <span className="text-xs">Present</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded flex-shrink-0"></div>
                      <span className="text-xs">Absent</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded flex-shrink-0"></div>
                      <span className="text-xs">Sick</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded flex-shrink-0"></div>
                      <span className="text-xs">Casual</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-indigo-500 rounded flex-shrink-0"></div>
                      <span className="text-xs">Holiday</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-500 rounded flex-shrink-0"></div>
                      <span className="text-xs">Official</span>
                    </div>
                  </div>

                  {/* Enhanced Calendar - Mobile responsive */}
                  <div className="w-full overflow-hidden">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      className="rounded-md border bg-white p-2 sm:p-4 w-full"
                      classNames={{
                        months: "flex flex-col space-y-4 w-full",
                        month: "space-y-4 w-full",
                        caption: "flex justify-center pt-1 relative items-center mb-4",
                        caption_label: "text-lg sm:text-xl font-semibold",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-8 w-8 sm:h-10 sm:w-10 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex w-full",
                        head_cell: "text-muted-foreground rounded-md flex-1 h-8 sm:h-12 font-medium text-xs sm:text-sm flex items-center justify-center",
                        row: "flex w-full mt-1 sm:mt-2",
                        cell: "flex-1 h-14 sm:h-20 md:h-24 text-center text-sm p-0.5 sm:p-1 relative focus-within:relative focus-within:z-20 border border-gray-100",
                        day: "h-full w-full p-0.5 sm:p-1 font-normal hover:bg-accent hover:text-accent-foreground rounded-md relative flex flex-col items-start justify-start text-xs sm:text-sm",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground font-semibold",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                      }}
                      components={{
                        DayContent: ({ date }: { date: Date }) => {
                          const events = getEventsForDate(date);
                          return (
                            <div className="relative w-full h-full flex flex-col">
                              <span className="text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">{date.getDate()}</span>
                              <div className="flex-1 space-y-0.5 sm:space-y-1 overflow-hidden">
                                {events.slice(0, 1).map((event, index) => (
                                  <div
                                    key={index}
                                    className={`text-xs px-0.5 sm:px-1 py-0.5 rounded text-white truncate ${event.color}`}
                                    title={event.label}
                                  >
                                    {event.status.length > 4 ? event.status.substring(0, 4) + '...' : event.status}
                                  </div>
                                ))}
                                {events.length > 1 && (
                                  <div className="text-xs text-gray-500 font-medium">
                                    +{events.length - 1}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Order 2 on mobile (middle), Order 3 on desktop (right) */}
            <div className="lg:col-span-1 order-2 lg:order-3 space-y-3 sm:space-y-4">
              {/* Login/Logout Times */}
              <Card className="shadow-sm">
                <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-700">Login Time</p>
                    <p className="text-lg sm:text-xl font-bold text-green-600">09:15 AM</p>
                  </div>
                  <div className="bg-red-50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-700">Logout Time</p>
                    <p className="text-lg sm:text-xl font-bold text-red-600">06:30 PM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Card */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-sm font-semibold">Activity for {selectedDate.toLocaleDateString()}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5 sm:space-y-2 max-h-48 lg:max-h-none overflow-y-auto">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center py-1 sm:py-1.5 border-b border-gray-50 last:border-b-0">
                      <span className="font-medium text-gray-900 text-xs truncate">{activity.activity}</span>
                      <span className="text-xs text-gray-600 flex-shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Apply for Leave - Mobile optimized */}
              <Card className="shadow-sm border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
                <CardContent className="p-3 sm:p-4">
                  <Button 
                    onClick={() => setShowLeaveForm(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg text-sm font-medium h-10 sm:h-11"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Apply for Leave
                  </Button>
                </CardContent>
              </Card>

              {/* Leave Balance Cards - Mobile responsive grid */}
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
                <Card className="bg-green-500 text-white shadow-sm">
                  <CardContent className="p-2.5 sm:p-3 text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">{leaveData.casualLeavesLeft}</p>
                    <p className="text-xs">Casual Leaves Left</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-500 text-white shadow-sm">
                  <CardContent className="p-2.5 sm:p-3 text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">{leaveData.sickLeavesLeft}</p>
                    <p className="text-xs">Sick Leaves Left</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-500 text-white shadow-sm">
                  <CardContent className="p-2.5 sm:p-3 text-center">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold">{leaveData.holidayLeavesLeft}</p>
                    <p className="text-xs">Holiday Leaves Left</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Leave Requests Table - Mobile responsive */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-semibold">Leave Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs min-w-[100px] p-2 sm:p-4">Duration</TableHead>
                      <TableHead className="text-xs min-w-[80px] p-2 sm:p-4">Type</TableHead>
                      <TableHead className="text-xs min-w-[50px] p-2 sm:p-4">Days</TableHead>
                      <TableHead className="text-xs min-w-[70px] p-2 sm:p-4">Status</TableHead>
                      <TableHead className="text-xs min-w-[80px] hidden sm:table-cell p-2 sm:p-4">Details</TableHead>
                      <TableHead className="text-xs min-w-[80px] p-2 sm:p-4">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-xs p-2 sm:p-4">{request.duration}</TableCell>
                        <TableCell className="text-xs p-2 sm:p-4">{request.type}</TableCell>
                        <TableCell className="text-xs p-2 sm:p-4">{request.days}</TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs p-2 sm:p-4 hidden sm:table-cell">{request.details}</TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => handleSeeMore(request)}
                          >
                            <Eye className="w-3 h-3 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">See more</span>
                            <span className="sm:hidden">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Leave Application Modal */}
          {showLeaveForm && (
            <LeaveApplication onClose={() => setShowLeaveForm(false)} />
          )}

          {/* Leave Details Modal */}
          {selectedRequest && (
            <LeaveDetailsModal
              request={selectedRequest}
              onClose={() => setSelectedRequest(null)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  )
}
