"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Mail, Calendar, Briefcase, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/main-layout"

const tabs = [
  { id: "details", label: "Employee Details & Contact" },
  { id: "status", label: "Employee Status" },
  { id: "remarks", label: "Remarks" },
]

// Form state interface
interface EmployeeFormData {
  // Employee Details
  employeeName: string
  gender: string
  dateOfBirth: string
  aadharNumber: string
  passport: string
  bankAccountNumber: string
  officePhone: string
  emergencyPhone: string

  // Contact Information
  employeeEmail: string
  personalEmail: string
  personalPhone: string
  address: string

  // Employee Status
  dateOfJoining: string
  endOfProbation: string
  dateOfRelieving: string
  jobType: string
  statusOfEmployment: string
  maritalStatus: string
  anniversaryDate: string
  numberOfChildren: string

  // Remarks
  positiveRemarks: string
  negativeRemarks: string
}

const EmployeeProfileCard = () => (
  <motion.div
    className="sticky top-8"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <Card className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        {/* Profile Photo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-38 h-38 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 p-1 shadow-lg">
              <Avatar className="w-full h-full">
                <AvatarImage src="/emp_dummy.png?height=152&width=152" />
                <AvatarFallback className="text-2xl font-bold text-blue-700 bg-gradient-to-br from-blue-100 to-blue-200">
                  SJ
                </AvatarFallback>
              </Avatar>
            </div>
            <motion.div className="absolute -bottom-1 -right-1" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
          <h3 className="font-poppins font-bold text-xl text-gray-900 mt-4">Sarah Johnson</h3>
          <p className="text-sm text-blue-600 font-medium">Senior Software Engineer</p>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employee ID</Label>
                <p className="font-medium text-gray-900">EMP001</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Joining Date</Label>
                <p className="font-medium text-gray-900">March 15, 2022</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reporting Manager</Label>
                <p className="font-medium text-gray-900">Mike Chen</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Position</Label>
                <p className="font-medium text-gray-900">Senior Developer</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Designation</Label>
                <p className="font-medium text-gray-900">Software Engineer III</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
              <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Department</Label>
                <p className="font-medium text-gray-900">Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const EmployeeTabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
  <div className="mb-8">
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-4 px-10 font-medium text-sm transition-all duration-300 ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>
    </div>
  </div>
)

const EmployeeDetailsForm = ({
  formData,
  setFormData,
}: { formData: EmployeeFormData; setFormData: (data: EmployeeFormData) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="space-y-10"
  >
    {/* Employee Details Section */}
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-poppins font-bold text-xl text-gray-900">Employee Details</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employee Name *</Label>
          <Input
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
            <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date of Birth</Label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Aadhar Number</Label>
          <Input
            value={formData.aadharNumber}
            onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Passport</Label>
          <Input
            value={formData.passport}
            onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bank Account Number</Label>
          <Input
            value={formData.bankAccountNumber}
            onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Office Phone</Label>
          <Input
            value={formData.officePhone}
            onChange={(e) => setFormData({ ...formData, officePhone: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Emergency Phone</Label>
          <Input
            value={formData.emergencyPhone}
            onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
      </div>
    </div>

    {/* Contact Information Section */}
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-poppins font-bold text-xl text-gray-900">Contact Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Employee Email *</Label>
          <Input
            value={formData.employeeEmail}
            onChange={(e) => setFormData({ ...formData, employeeEmail: e.target.value })}
            type="email"
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Personal Email *</Label>
          <Input
            value={formData.personalEmail}
            onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
            type="email"
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Office Phone *</Label>
          <Input
            value={formData.officePhone}
            onChange={(e) => setFormData({ ...formData, officePhone: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Personal Phone *</Label>
          <Input
            value={formData.personalPhone}
            onChange={(e) => setFormData({ ...formData, personalPhone: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Emergency Phone *</Label>
          <Input
            value={formData.emergencyPhone}
            onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address *</Label>
          <Textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl min-h-[100px]"
          />
        </div>
      </div>
    </div>
  </motion.div>
)

const EmployeeStatusForm = ({
  formData,
  setFormData,
}: { formData: EmployeeFormData; setFormData: (data: EmployeeFormData) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
        <Briefcase className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-poppins font-bold text-xl text-gray-900">Employee Status</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date of Joining</Label>
        <Input
          type="date"
          value={formData.dateOfJoining}
          onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
          className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">End of Probation</Label>
        <Input
          type="date"
          value={formData.endOfProbation}
          onChange={(e) => setFormData({ ...formData, endOfProbation: e.target.value })}
          className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date of Relieving</Label>
        <Input
          type="date"
          value={formData.dateOfRelieving}
          onChange={(e) => setFormData({ ...formData, dateOfRelieving: e.target.value })}
          className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Type</Label>
        <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
          <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Full Time</SelectItem>
            <SelectItem value="parttime">Part Time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status of Employment</Label>
        <Select
          value={formData.statusOfEmployment}
          onValueChange={(value) => setFormData({ ...formData, statusOfEmployment: value })}
        >
          <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
            <SelectItem value="resigned">Resigned</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Marital Status</Label>
        <Select
          value={formData.maritalStatus}
          onValueChange={(value) => setFormData({ ...formData, maritalStatus: value })}
        >
          <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
            <SelectItem value="divorced">Divorced</SelectItem>
            <SelectItem value="widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Anniversary Date</Label>
        <Input
          type="date"
          value={formData.anniversaryDate}
          onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
          className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Number of Children</Label>
        <Select
          value={formData.numberOfChildren}
          onValueChange={(value) => setFormData({ ...formData, numberOfChildren: value })}
        >
          <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4+">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </motion.div>
)

const EmployeeRemarksForm = ({
  formData,
  setFormData,
}: { formData: EmployeeFormData; setFormData: (data: EmployeeFormData) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center space-x-3 mb-6">
      <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <h3 className="font-poppins font-bold text-xl text-gray-900">Remarks</h3>
    </div>
    <div className="space-y-8">
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Positive Remarks</Label>
        <Textarea
          placeholder="Enter positive feedback, achievements, and strengths..."
          className="bg-white/80 border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl min-h-[150px]"
          value={formData.positiveRemarks}
          onChange={(e) => setFormData({ ...formData, positiveRemarks: e.target.value })}
        />
      </div>
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Negative Remarks</Label>
        <Textarea
          placeholder="Enter areas for improvement and constructive feedback..."
          className="bg-white/80 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl min-h-[150px]"
          value={formData.negativeRemarks}
          onChange={(e) => setFormData({ ...formData, negativeRemarks: e.target.value })}
        />
      </div>
    </div>
  </motion.div>
)

export default function EmployeePage() {
  const [activeTab, setActiveTab] = useState("details")

  // Initialize form data with default values
  const [formData, setFormData] = useState<EmployeeFormData>({
    // Employee Details
    employeeName: "Sarah Johnson",
    gender: "female",
    dateOfBirth: "1990-05-15",
    aadharNumber: "1234 5678 9012",
    passport: "A1234567",
    bankAccountNumber: "1234567890123456",
    officePhone: "+1 (555) 123-4567",
    emergencyPhone: "+1 (555) 456-7890",

    // Contact Information
    employeeEmail: "sarah.johnson@srnr.com",
    personalEmail: "sarah.personal@gmail.com",
    personalPhone: "+1 (555) 987-6543",
    address: "123 Main Street, Apartment 4B, New York, NY 10001",

    // Employee Status
    dateOfJoining: "2022-03-15",
    endOfProbation: "2022-09-15",
    dateOfRelieving: "",
    jobType: "fulltime",
    statusOfEmployment: "active",
    maritalStatus: "single",
    anniversaryDate: "",
    numberOfChildren: "0",

    // Remarks
    positiveRemarks:
      "Excellent performance in Q4 2023. Led the successful implementation of the new customer portal project. Shows great leadership skills and mentors junior developers effectively. Consistently delivers high-quality code and meets all project deadlines.",
    negativeRemarks:
      "Needs to improve time management skills for non-critical tasks. Should work on better communication during cross-team collaborations. Occasionally requires reminders for documentation updates.",
  })

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return <EmployeeDetailsForm formData={formData} setFormData={setFormData} />
      case "status":
        return <EmployeeStatusForm formData={formData} setFormData={setFormData} />
      case "remarks":
        return <EmployeeRemarksForm formData={formData} setFormData={setFormData} />
      default:
        return <EmployeeDetailsForm formData={formData} setFormData={setFormData} />
    }
  }

  return (
    <MainLayout
      title="Employee"
      subtitle="Employee Management"
      searchPlaceholder="Search employees..."
      userName="John Doe"
      userEmail="john.doe@srnr.com"
      userInitials="JD"
    >
      {/* Employee Management Content */}
      <main className="p-8">
        {/* 2-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[calc(100vh-12rem)]">
          {/* Left Panel - Employee Profile (25%) */}
          <div className="lg:col-span-1">
            <EmployeeProfileCard />
          </div>

          {/* Right Panel - Tabbed Content (75%) */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <EmployeeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                  <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
