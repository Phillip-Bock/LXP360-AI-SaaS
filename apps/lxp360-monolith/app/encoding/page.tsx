import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowForward } from "@/components/icons/arrow-forward"
import { PageNavigation } from "@/components/page-navigation"

export default function EncodingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header with Logo */}
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Image src="/lxp360-logo.png" alt="LXP 360" width={150} height={60} className="h-12 w-auto" priority />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-[#001d3d] mb-2">Encoding</h1>
            <p className="text-[#003066]">Select a tool to begin</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/ITLA-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">ITLA</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">Interactive Theory of Learning Activation</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/NPPM-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">NPPM</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">Neuro-Pedagogical Performance Mapping</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/ILMI-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">ILMI</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">Integrated Learning Modality Interface</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/ICES-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">ICES</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">Intelligent Cognitive Engagement System</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-8">
            <PageNavigation
              previousPage={{ href: "/dashboard", label: "Dashboard" }}
              nextPage={{ href: "/synthesization", label: "Synthesization" }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
