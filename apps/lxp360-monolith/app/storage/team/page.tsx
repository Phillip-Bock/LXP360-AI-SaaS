import Image from "next/image"
import { PageNavigation } from "@/components/page-navigation"

export default function TeamStoragePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <header className="border-b border-[#001d3d] bg-[#F5F5F5]">
        <div className="container mx-auto px-4 py-4">
          <Image src="/lxp360-logo.png" alt="LXP 360" width={150} height={60} className="h-12 w-auto" priority />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#001d3d] mb-4">Team Storage</h1>
          <p className="text-[#003066] text-lg">Connects to company G-Drive</p>

          <div className="mt-8">
            <PageNavigation
              previousPage={{ href: "/storage/personal", label: "Personal Storage" }}
              nextPage={{ href: "/storage/archive", label: "Archive" }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
