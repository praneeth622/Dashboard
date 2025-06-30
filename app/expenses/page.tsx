"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CreditCard, DollarSign, FileTextIcon, Send, UploadCloud, User, Trash2 } from "lucide-react"
import { MainLayout } from "@/components/main-layout"

const claimTypes = [
  "Travel Expenses",
  "Meal Allowance",
  "Accommodation",
  "Medical Expenses",
  "Office Supplies",
  "Training & Development",
  "Communication",
  "Other",
]

interface UploadedFile {
  name: string
  size: string
  type: string
}

const ClaimFormFields = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <User className="w-4 h-4 text-blue-600" />
        <span>Employee ID</span>
      </Label>
      <Input
        value="EMP001"
        readOnly
        className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />
    </div>

    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <User className="w-4 h-4 text-green-600" />
        <span>Name</span>
      </Label>
      <Input
        value="Balu Kumar"
        readOnly
        className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />
    </div>

    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-purple-600" />
        <span>Date</span>
      </Label>
      <Input
        type="date"
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />
    </div>

    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <DollarSign className="w-4 h-4 text-green-600" />
        <span>Amount</span>
      </Label>
      <Input
        type="number"
        placeholder="Enter amount"
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />
    </div>

    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <CreditCard className="w-4 h-4 text-orange-600" />
        <span>Claim Limit</span>
      </Label>
      <Input
        value="₹50,000"
        readOnly
        className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />
    </div>

    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <Receipt className="w-4 h-4 text-indigo-600" />
        <span>Type of Claims</span>
      </Label>
      <Select>
        <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl">
          <SelectValue placeholder="Select claim type" />
        </SelectTrigger>
        <SelectContent>
          {claimTypes.map((type) => (
            <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="md:col-span-2 space-y-2">
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <FileTextIcon className="w-4 h-4 text-teal-600" />
        <span>Description</span>
      </Label>
      <Textarea
        placeholder="Enter detailed description of the expense..."
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl min-h-[120px]"
      />
    </div>
  </motion.div>
)

const FileUploadBox = ({
  uploadedFiles,
  setUploadedFiles,
}: {
  uploadedFiles: UploadedFile[]
  setUploadedFiles: (files: UploadedFile[]) => void
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type,
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      <Label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <UploadCloud className="w-4 h-4 text-blue-600" />
        <span>Upload Supporting Documents</span>
      </Label>

      <div className="border-dashed border-2 border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
              <UploadCloud className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-1">Select a file or drag and drop here</p>
              <p className="text-sm text-gray-500">JPG, PNG, PDF files up to 10MB</p>
            </div>
          </div>
        </label>
      </div>

      {/* File Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{file.size}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

const SubmitButton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="flex justify-end mt-8"
  >
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <Send className="w-5 h-5 mr-3" />
        Submit Claim
      </Button>
    </motion.div>
  </motion.div>
)

export default function ExpensesPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  return (
    <MainLayout
      title="Expenses Claims"
      subtitle="Submit and track your expense claims"
      searchPlaceholder="Search expense claims..."
      userName="Balu Kumar"
      userEmail="balu@domain.in"
      userInitials="BK"
    >
      {/* Expenses Claims Content */}
      <main className="p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-white shadow-xl rounded-md border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-poppins font-bold text-2xl">Submit Expense Claim</CardTitle>
                    <p className="text-blue-100 font-inter">Fill out the form below to submit your expense claim</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <ClaimFormFields />

                <div className="border-t border-gray-200 pt-8">
                  <FileUploadBox uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                </div>

                <SubmitButton />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </MainLayout>
  )
}
