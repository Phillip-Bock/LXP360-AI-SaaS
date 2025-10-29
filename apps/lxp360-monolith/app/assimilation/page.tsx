import Image from "next/image"
import { PageNavigation } from "@/components/page-navigation"

export default function AssimilationPage() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#001d3d]">Assimilation</h1>
          <p className="text-[#003066] mt-4">Content coming soon...</p>

          {/* Navigation Arrows at the Bottom */}
          <div className="mt-8">
            <PageNavigation
              previousPage={{ href: "/synthesization", label: "Synthesization" }}
              nextPage={{ href: "/developer-tools", label: "Developer Tools" }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
