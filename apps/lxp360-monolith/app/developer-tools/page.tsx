"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ImageIcon, Eye, Palette, Type } from "lucide-react"

const tools = [
  {
    id: "alt-text-generator",
    title: "Alt Text Generator",
    description: "Generate accessible alt text for images with AI-powered analysis",
    icon: ImageIcon,
    href: "/developer-tools/alt-text-generator",
    color: "from-[#0072f5] to-[#0056b8]",
  },
  {
    id: "accessibility-simulator",
    title: "Accessibility Simulator",
    description: "Test content with visual, motor, and cognitive impairment simulations",
    icon: Eye,
    href: "#",
    color: "from-[#1f87ff] to-[#0072f5]",
    comingSoon: true,
  },
  {
    id: "color-contrast-checker",
    title: "Color Contrast Checker",
    description: "Validate text and background color combinations for WCAG compliance",
    icon: Palette,
    href: "#",
    color: "from-[#479dff] to-[#1f87ff]",
    comingSoon: true,
  },
  {
    id: "typography-analyzer",
    title: "Typography Analyzer",
    description: "Analyze and optimize typography for readability and accessibility",
    icon: Type,
    href: "#",
    color: "from-[#0056b8] to-[#00438f]",
    comingSoon: true,
  },
]

export default function DeveloperToolsPage() {
  return (
    <div className="min-h-screen bg-[#001d3d]">
      <header className="bg-[#001d3d] border-b border-[#003066]">
        <div className="flex items-center justify-between px-6 py-3">
          <Image src="/lxp360-logo.png" alt="LXP 360" width={120} height={48} className="h-10 w-auto" priority />
          <div className="bg-[#003066] px-6 py-2 rounded-[10px]">
            <p className="text-white font-medium">Welcome back, Phillip</p>
          </div>
        </div>
      </header>

      <nav className="bg-[#001d3d] border-b border-[#003066]">
        <div className="flex px-6">
          <Link href="/dashboard" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Project
          </Link>
          <Link href="/encoding" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Encoding
          </Link>
          <Link
            href="/synthesization"
            className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]"
          >
            Synthesization
          </Link>
          <Link href="/assimilation" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Assimilation
          </Link>
          <Link
            href="/developer-tools"
            className="px-6 py-3 bg-[#003066] text-white font-medium rounded-t-[10px] border-t border-x border-[#0056b8]"
          >
            Developer Tools
          </Link>
          <Link href="#" className="px-6 py-3 bg-[#00438f]/50 text-white/80 font-medium hover:bg-[#00438f]">
            Profile
          </Link>
        </div>
      </nav>

      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Developer Tools</h1>
            <p className="text-white/70">Accessibility-first tools to help you create inclusive learning experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.id} href={tool.href} className={tool.comingSoon ? "pointer-events-none" : ""}>
                  <Card
                    className={`bg-gradient-to-br ${tool.color} rounded-[10px] p-6 h-full hover:shadow-xl transition-all cursor-pointer relative overflow-hidden ${
                      tool.comingSoon ? "opacity-60" : ""
                    }`}
                  >
                    {tool.comingSoon && (
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-[10px]">
                        <span className="text-white text-xs font-medium">Coming Soon</span>
                      </div>
                    )}
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                      <p className="text-white/80 text-sm">{tool.description}</p>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
