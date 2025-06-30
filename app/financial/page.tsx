"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Download,
  History,
  TrendingUp,
  Wallet,
  CreditCard,
  PiggyBank,
  Building,
  FileText,
  DollarSign,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MainLayout } from "@/components/main-layout"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const years = ["2024", "2023", "2022", "2021", "2020"]

// Sample financial data - in real app, this would come from props/API
const financialData = {
  basicPay: "₹45,000",
  hra: "₹18,000",
  engagement: "₹5,000",
  bonus: "₹8,000",
  otherAllowance: "₹3,500",
  medicalAllowance: "₹2,500",
  totalTakeHome: "₹68,200",
  pf: "₹5,400",
  professionalTax: "₹200",
  costToCompany: "₹82,000",
}

const MonthYearSelector = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: {
  selectedMonth: string
  selectedYear: string
  onMonthChange: (month: string) => void
  onYearChange: (year: string) => void
}) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select Month</Label>
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-40 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select Year</Label>
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="w-32 bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
        <History className="w-4 h-4 mr-2" />
        View History
      </Button>
    </motion.div>
  </div>
)

const SalaryBreakdownGrid = ({ data }: { data: typeof financialData }) => {
  const leftColumnItems = [
    { label: "Basic Pay", value: data.basicPay, icon: Wallet, color: "from-blue-500 to-blue-600" },
    { label: "HRA", value: data.hra, icon: Building, color: "from-green-500 to-green-600" },
    { label: "Engagement", value: data.engagement, icon: TrendingUp, color: "from-purple-500 to-purple-600" },
    { label: "Bonus", value: data.bonus, icon: PiggyBank, color: "from-orange-500 to-orange-600" },
    { label: "Other Allowance", value: data.otherAllowance, icon: CreditCard, color: "from-teal-500 to-teal-600" },
  ]

  const rightColumnItems = [
    { label: "Medical Allowance", value: data.medicalAllowance, icon: Heart, color: "from-red-500 to-red-600" },
    {
      label: "Total Take Home",
      value: data.totalTakeHome,
      icon: Wallet,
      color: "from-emerald-500 to-emerald-600",
      highlight: true,
    },
    { label: "PF", value: data.pf, icon: PiggyBank, color: "from-indigo-500 to-indigo-600" },
    { label: "Professional Tax", value: data.professionalTax, icon: FileText, color: "from-gray-500 to-gray-600" },
    {
      label: "Cost to Company",
      value: data.costToCompany,
      icon: Building,
      color: "from-blue-500 to-blue-600",
      highlight: true,
    },
  ]

  const renderColumn = (items: typeof leftColumnItems) => (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative ${item.highlight ? "ring-2 ring-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50" : "bg-white/60"} rounded-xl p-4 shadow-sm`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.label}</Label>
          </div>
          <Input
            value={item.value}
            readOnly
            className={`bg-gray-50/80 border-0 text-lg font-bold ${item.highlight ? "text-blue-700" : "text-gray-800"} shadow-inner rounded-xl cursor-default`}
          />
          {item.highlight && (
            <div className="absolute -top-2 -right-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-2 h-2 text-white" />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {renderColumn(leftColumnItems)}
      {renderColumn(rightColumnItems)}
    </div>
  )
}

const DownloadActions = () => (
  <motion.div
    className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg">
          <Download className="w-5 h-5 mr-3" />
          Download Payslip
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-4 rounded-xl shadow-lg bg-transparent"
        >
          <FileText className="w-5 h-5 mr-3" />
          Download Form 16
        </Button>
      </motion.div>
    </div>
  </motion.div>
)

const FinancialSummaryCard = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  data,
}: {
  selectedMonth: string
  selectedYear: string
  onMonthChange: (month: string) => void
  onYearChange: (year: string) => void
  data: typeof financialData
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="max-w-6xl mx-auto"
  >
    <Card className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-0 shadow-2xl rounded-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="font-poppins font-bold text-2xl">Salary Breakdown</CardTitle>
            <p className="text-blue-100 font-inter">
              {selectedMonth} {selectedYear} • Employee Financial Summary
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <MonthYearSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
        />

        <SalaryBreakdownGrid data={data} />

        <DownloadActions />
      </CardContent>
    </Card>
  </motion.div>
)

export default function FinancialPage() {
  const [selectedMonth, setSelectedMonth] = useState("December")
  const [selectedYear, setSelectedYear] = useState("2024")

  return (
    <MainLayout
      title="My Financial"
      subtitle="Salary and Financial Information"
      searchPlaceholder="Search financial records..."
      userName="Balu Kumar"
      userEmail="balu@domain.in"
      userInitials="BK"
    >
      {/* Financial Content */}
      <main className="p-8">
        <FinancialSummaryCard
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          data={financialData}
        />
      </main>
    </MainLayout>
  )
}
