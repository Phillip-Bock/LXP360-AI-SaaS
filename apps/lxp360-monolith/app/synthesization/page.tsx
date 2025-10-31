import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowForward } from "@/components/icons/arrow-forward"
import { PageNavigation } from "@/components/page-navigation"

export default function SynthesizationPage() {
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
            <h1 className="text-3xl font-bold text-[#001d3d] mb-2">Synthesization</h1>
            <p className="text-[#003066]">Select a tool to begin</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/synthesization/ICL-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">ICL</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">INSPIRE Competency Ladder</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/synthesization/IPMG-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">IPMG</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">INSPIRE Performance Mapping Grid</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/synthesization/ICDT-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">ICDT</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">INSPIRE Cognitive Demand Taxonomy</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/synthesization/ICPF-tools">
              <Card className="border-[#0072f5]/20 hover:border-[#0072f5] transition-all hover:shadow-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-[#001d3d]">ICPF</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-[#003066] mb-4">INSPIRE Capability Progression Framework</p>
                  <div className="flex justify-end">
                    <ArrowForward className="h-6 w-6 text-[#0072f5]" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-8">
            <PageNavigation
              previousPage={{ href: "/encoding", label: "Encoding" }}
              nextPage={{ href: "/assimilation", label: "Assimilation" }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
