"use client"

import { useState } from "react"
import { X, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface LeaveApplicationProps {
  onClose: () => void
}

export default function LeaveApplication({ onClose }: LeaveApplicationProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    leaveType: '',
    reason: '',
    description: ''
  })
  const [showDropdown, setShowDropdown] = useState(false)

  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { value: 'sick', label: 'Sick Leave', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { value: 'holiday', label: 'Holiday Leave', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { value: 'emergency', label: 'Emergency Leave', color: 'text-red-600', bgColor: 'bg-red-50' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Leave application submitted:', formData)
    onClose()
  }

  const handleLeaveTypeSelect = (type: any) => {
    setFormData({ ...formData, leaveType: type.value })
    setShowDropdown(false)
  }

  const selectedLeaveType = leaveTypes.find(type => type.value === formData.leaveType)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Apply for Leave</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Start Date
                </Label>
                <div className="relative">
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <div className="relative">
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Leave Type
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`w-full p-3 text-left border rounded-lg transition-all duration-200 ${
                    selectedLeaveType 
                      ? `${selectedLeaveType.bgColor} border-gray-300` 
                      : 'bg-white border-gray-300 hover:border-blue-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <div className="flex items-center justify-between">
                    {selectedLeaveType ? (
                      <span className={`font-medium ${selectedLeaveType.color}`}>
                        {selectedLeaveType.label}
                      </span>
                    ) : (
                      <span className="text-gray-500">Select leave type</span>
                    )}
                    <ChevronDown 
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                        showDropdown ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                
                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden">
                    {leaveTypes.map((type, index) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleLeaveTypeSelect(type)}
                        className={`w-full p-3 text-left hover:${type.bgColor} transition-all duration-150 ${
                          index !== leaveTypes.length - 1 ? 'border-b border-gray-100' : ''
                        } ${type.color} font-medium`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                Reason (Brief)
              </Label>
              <Input
                id="reason"
                type="text"
                placeholder="e.g., Family function, Medical checkup..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Provide additional details about your leave request..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
