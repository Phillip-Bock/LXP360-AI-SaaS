"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NPPMToolsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="border-b border-[#001d3d] bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Image src="/lxp360-logo.png" alt="LXP 360" width={150} height={60} className="h-12 w-auto" priority />
          <div className="flex gap-2">
            <Link href="/encoding">
              <Button variant="outline" size="icon" className="rounded-[10px] border-[#001d3d] bg-transparent">
                <ArrowLeft className="h-4 w-4 text-[#0056b8]" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="rounded-[10px] border-[#001d3d] bg-transparent"
              onClick={() => window.location.reload()}
            >
              <RotateCw className="h-4 w-4 text-[#0056b8]" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#001d3d] mb-4">NPPM Tools</h1>
          <p className="text-[#003066] text-lg">Neuro-Pedagogical Performance Mapping</p>
        </div>
      </main>
    </div>
  )
}
