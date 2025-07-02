"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Download,
  Plus,
  FileText,
  ImageIcon,
  File,
  Award,
  Trophy,
  Target,
  Paperclip,
  Upload,
  Calendar,
  FolderOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/main-layout"

const documentTabs = [
  {
    id: "training",
    label: "Training Certification",
    icon: Award,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: "appreciation",
    label: "Appreciation Certification",
    icon: Trophy,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    id: "milestone",
    label: "Milestone Certification",
    icon: Target,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    id: "attachments",
    label: "Attachments",
    icon: Paperclip,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
]

const attachmentFiles = [
  {
    id: 1,
    name: "Employee Handbook 2024.pdf",
    size: "2.4 MB",
    date: "15 Dec, 2024",
    type: "pdf",
    icon: FileText,
  },
  {
    id: 2,
    name: "Profile Photo.jpg",
    size: "313 KB",
    date: "31 Aug, 2022",
    type: "image",
    icon: ImageIcon,
  },
  {
    id: 3,
    name: "Resume_Updated.pdf",
    size: "1.2 MB",
    date: "22 Nov, 2024",
    type: "pdf",
    icon: FileText,
  },
  {
    id: 4,
    name: "ID_Card_Copy.jpg",
    size: "856 KB",
    date: "10 Oct, 2024",
    type: "image",
    icon: ImageIcon,
  },
  {
    id: 5,
    name: "Tax_Documents.pdf",
    size: "3.1 MB",
    date: "05 Sep, 2024",
    type: "pdf",
    icon: FileText,
  },
  {
    id: 6,
    name: "Emergency_Contact.docx",
    size: "45 KB",
    date: "18 Jul, 2024",
    type: "document",
    icon: File,
  },
]

const CertificationUploadBox = ({
  number,
  tabColor,
  delay = 0,
}: {
  number: number
  tabColor: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.01, y: -1 }}
    className="group cursor-pointer"
  >
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-2 border-dashed border-gray-200 hover:border-blue-300 group-hover:ring-1 group-hover:ring-blue-100 h-full">
      <CardContent className="p-4 text-center h-full flex flex-col justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${tabColor} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
          >
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-base text-gray-900 mb-1">Certification {number}</h3>
            <div className="flex items-center justify-center space-x-1 text-blue-600 group-hover:text-blue-700 transition-colors">
              <Download className="w-3 h-3" />
              <span className="text-xs font-medium">Download file here</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const CertificationGrid = ({ tabColor }: { tabColor: string }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }, (_, i) => (
        <CertificationUploadBox key={i + 1} number={i + 1} tabColor={tabColor} delay={i * 0.03} />
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex justify-center pt-6"
    >
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          Submit Certifications
        </Button>
      </motion.div>
    </motion.div>
  </div>
)

const AttachmentItem = ({ file, index }: { file: (typeof attachmentFiles)[0]; index: number }) => {
  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-600"
      case "image":
        return "bg-green-100 text-green-600"
      case "document":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.01, x: 4 }}
      className="group"
    >
      <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${getFileTypeColor(file.type)} rounded-xl flex items-center justify-center`}>
              <file.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{file.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <span>{file.size}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{file.date}</span>
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl"
              >
                <Download className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const AttachmentsTab = () => (
  <div className="space-y-6">
    {/* Add New File Button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center"
    >
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-5 h-5 mr-3" />
          Add a new file
        </Button>
      </motion.div>
    </motion.div>

    {/* Files List */}
    <div className="space-y-4">
      {attachmentFiles.map((file, index) => (
        <AttachmentItem key={file.id} file={file} index={index} />
      ))}
    </div>

    {/* Empty State for when no files */}
    {attachmentFiles.length === 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FolderOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">No Files Uploaded</h3>
        <p className="text-gray-500 mb-6">Start by uploading your first document</p>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          Upload First File
        </Button>
      </motion.div>
    )}
  </div>
)

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("training")

  const getCurrentTabData = () => {
    return documentTabs.find((tab) => tab.id === activeTab) || documentTabs[0]
  }

  return (
    <MainLayout
      title="Other Documents"
      subtitle="Document Management"
      searchPlaceholder="Search documents..."
      userName="Balu Kumar"
      userEmail="balu@domain.in"
      userInitials="BK"
    >
      {/* Documents Content */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
                <TabsList className="grid w-full grid-cols-4 bg-transparent gap-1 h-auto">
                  {documentTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 transition-all duration-200 h-auto min-h-[3rem] border-0"
                    >
                      <tab.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium text-sm hidden lg:inline truncate">{tab.label}</span>
                      <span className="font-medium text-sm lg:hidden truncate">{tab.label.split(" ")[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Tab Header */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${getCurrentTabData().color} rounded-xl flex items-center justify-center`}
                        >
                          {(() => {
                            const IconComponent = getCurrentTabData().icon
                            return <IconComponent className="w-6 h-6 text-white" />
                          })()}
                        </div>
                        <div>
                          <h2 className="font-poppins font-bold text-2xl text-gray-900">{getCurrentTabData().label}</h2>
                          <p className="text-gray-500">
                            {activeTab === "attachments"
                              ? "Manage your document attachments"
                              : "Upload and manage your certifications"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tab Content */}
                    <TabsContent value="training" className="mt-0">
                      <CertificationGrid tabColor={documentTabs[0].color} />
                    </TabsContent>

                    <TabsContent value="appreciation" className="mt-0">
                      <CertificationGrid tabColor={documentTabs[1].color} />
                    </TabsContent>

                    <TabsContent value="milestone" className="mt-0">
                      <CertificationGrid tabColor={documentTabs[2].color} />
                    </TabsContent>

                    <TabsContent value="attachments" className="mt-0">
                      <AttachmentsTab />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </MainLayout>
  )
}
