"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Heart, FileText, Shield, Activity, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/main-layout"

const DownloadCard = ({
  title,
  icon: Icon,
  delay = 0,
}: {
  title: string
  icon: React.ElementType
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02, y: -2 }}
    className="group"
  >
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-200 hover:border-blue-300 hover:ring-2 hover:ring-blue-100 hover:shadow-lg transition-all duration-300 rounded-2xl cursor-pointer">
      <CardContent className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
            <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
          </div>
          <div>
            <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-blue-500 group-hover:text-blue-700 font-medium transition-colors duration-300">
              Download file here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const SectionActionButton = ({
  title,
  icon: Icon,
  delay = 0,
}: {
  title: string
  icon: React.ElementType
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex justify-center mt-8"
  >
    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <Icon className="w-5 h-5 mr-3" />
      {title}
    </Button>
  </motion.div>
)

const MedicalSection = ({
  title,
  icon: Icon,
  cards,
  actionTitle,
  actionIcon: ActionIcon,
  delay = 0,
  gradientFrom,
  gradientTo,
}: {
  title: string
  icon: React.ElementType
  cards: Array<{ title: string; icon: React.ElementType }>
  actionTitle: string
  actionIcon: React.ElementType
  delay?: number
  gradientFrom: string
  gradientTo: string
}) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6 }}>
    <Card className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-0 shadow-xl rounded-md overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-5`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="font-poppins font-bold text-xl">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {cards.map((card, index) => (
            <DownloadCard key={card.title} title={card.title} icon={card.icon} delay={delay + 0.2 + index * 0.1} />
          ))}
        </div>

        <SectionActionButton title={actionTitle} icon={ActionIcon} delay={delay + 0.5} />
      </CardContent>
    </Card>
  </motion.div>
)

export default function MedicalPage() {
  const insuranceCards = [
    { title: "Insurance Form", icon: FileText },
    { title: "Insurance Card", icon: Shield },
  ]

  const esiCards = [
    { title: "ESI Form", icon: FileText },
    { title: "ESI Card", icon: Activity },
  ]

  return (
    <MainLayout
      title="Medical"
      subtitle="Medical Insurance and ESI Information"
      searchPlaceholder="Search medical records..."
      userName="Balu Kumar"
      userEmail="balu@domain.in"
      userInitials="BK"
    >
      {/* Medical Content */}
      <main className="p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Insurance Details Section */}
          <MedicalSection
            title="Insurance Details"
            icon={Shield}
            cards={insuranceCards}
            actionTitle="Avail Insurance"
            actionIcon={Plus}
            delay={0.2}
            gradientFrom="from-blue-600"
            gradientTo="to-blue-700"
          />

          {/* ESI Details Section */}
          <MedicalSection
            title="ESI Details"
            icon={Heart}
            cards={esiCards}
            actionTitle="Avail ESI"
            actionIcon={Plus}
            delay={0.6}
            gradientFrom="from-green-600"
            gradientTo="to-green-700"
          />
        </div>
      </main>
    </MainLayout>
  )
}
