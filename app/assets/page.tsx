"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Laptop,
  Monitor,
  Keyboard,
  Mouse,
  Cable,
  Shield,
  FileText,
  HardDrive,
  Filter,
  Grid3X3,
  List,
  Send,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/main-layout"

const assetCategories = [
  { id: "all", label: "All Assets", count: 8 },
  { id: "hardware", label: "Hardware", count: 6 },
  { id: "software", label: "Software", count: 2 },
  { id: "licenses", label: "Licenses", count: 0 },
]

const assetsData = [
  {
    id: "AST001",
    name: 'MacBook Pro 16"',
    category: "hardware",
    type: "Laptop",
    icon: Laptop,
    status: "assigned",
    assignedDate: "2024-01-15",
    condition: "excellent",
    value: "₹2,50,000",
  },
  {
    id: "AST002",
    name: 'Dell UltraSharp 27"',
    category: "hardware",
    type: "Monitor",
    icon: Monitor,
    status: "assigned",
    assignedDate: "2024-01-15",
    condition: "good",
    value: "₹45,000",
  },
  {
    id: "AST003",
    name: "Mechanical Keyboard",
    category: "hardware",
    type: "Keyboard",
    icon: Keyboard,
    status: "assigned",
    assignedDate: "2024-01-15",
    condition: "excellent",
    value: "₹8,500",
  },
  {
    id: "AST004",
    name: "Wireless Mouse",
    category: "hardware",
    type: "Mouse",
    icon: Mouse,
    status: "assigned",
    assignedDate: "2024-01-15",
    condition: "good",
    value: "₹3,200",
  },
  {
    id: "AST005",
    name: "HDMI Cable 4K",
    category: "hardware",
    type: "Cable",
    icon: Cable,
    status: "assigned",
    assignedDate: "2024-01-15",
    condition: "excellent",
    value: "₹1,500",
  },
  {
    id: "AST006",
    name: "Adobe Creative Suite",
    category: "software",
    type: "License",
    icon: Shield,
    status: "active",
    assignedDate: "2024-01-01",
    condition: "active",
    value: "₹52,000/year",
  },
  {
    id: "AST007",
    name: "Microsoft Office 365",
    category: "software",
    type: "License",
    icon: FileText,
    status: "active",
    assignedDate: "2024-01-01",
    condition: "active",
    value: "₹8,400/year",
  },
  {
    id: "AST009",
    name: "External SSD 1TB",
    category: "hardware",
    type: "Storage",
    icon: HardDrive,
    status: "assigned",
    assignedDate: "2024-02-01",
    condition: "excellent",
    value: "₹12,000",
  },
]

const AssetCard = ({ asset, index }: { asset: (typeof assetsData)[0]; index: number }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-green-100 text-green-700 border-green-200"
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "shared":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "active":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group cursor-pointer"
    >
      <Card className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group-hover:ring-2 group-hover:ring-blue-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Asset Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
              <asset.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
            </div>

            {/* Asset Info */}
            <div className="text-center space-y-2 w-full">
              <h3 className="font-poppins font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                {asset.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{asset.type}</p>

              {/* Asset ID */}
              <div className="bg-gray-50 rounded-lg px-3 py-1 inline-block">
                <span className="text-xs font-mono text-gray-600">{asset.id}</span>
              </div>
            </div>

            {/* Status and Condition */}
            <div className="flex items-center justify-between w-full">
              <Badge className={`${getStatusColor(asset.status)} border font-medium capitalize`}>{asset.status}</Badge>
              <span className={`text-xs font-semibold ${getConditionColor(asset.condition)} capitalize`}>
                {asset.condition}
              </span>
            </div>

            {/* Value and Date */}
            <div className="w-full space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Value:</span>
                <span className="text-sm font-bold text-gray-900">{asset.value}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Assigned:</span>
                <span className="text-xs text-gray-700">{asset.assignedDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const AssetsGrid = ({
  assets,
  viewMode,
}: {
  assets: (typeof assetsData)[]
  viewMode: "grid" | "list"
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-green-100 text-green-700 border-green-200"
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "shared":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "active":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="p-6 flex items-center space-x-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <asset.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-500">{asset.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{asset.type}</p>
                  <p className="text-xs text-gray-500">{asset.category}</p>
                </div>
                <div>
                  <Badge className={`${getStatusColor(asset.status)} border font-medium capitalize`}>
                    {asset.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{asset.value}</p>
                  <p className="text-xs text-gray-500">{asset.assignedDate}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${getConditionColor(asset.condition)} capitalize`}>
                    {asset.condition}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset, index) => (
        <AssetCard key={asset.id} asset={asset} index={index} />
      ))}
    </div>
  )
}

const SubmitButton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.5 }}
    className="fixed bottom-8 right-8 z-20"
  >
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <Send className="w-5 h-5 mr-3" />
        Submit Request
      </Button>
    </motion.div>
  </motion.div>
)

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAssets = assetsData.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout
      title="Assets"
      subtitle={`${assetsData.length} Total Assets`}
      searchPlaceholder="Search assets..."
      userName="Balu Kumar"
      userEmail="balu@domain.in"
      userInitials="BK"
    >
      {/* Assets Content */}
      <main className="p-8 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                  <TabsList className="bg-gray-100 rounded-xl p-1">
                    {assetCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="rounded-lg px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      >
                        {category.label}
                        <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">{category.count}</Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              <div className="flex items-center space-x-4">
                <Select>
                  <SelectTrigger className="w-48 rounded-xl border-gray-200">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="shared">Shared</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-lg"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-lg"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Assets Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AssetsGrid assets={filteredAssets} viewMode={viewMode} />
          </motion.div>

          {/* Empty State */}
          {filteredAssets.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">No Assets Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </main>

      <SubmitButton />
    </MainLayout>
  )
}
