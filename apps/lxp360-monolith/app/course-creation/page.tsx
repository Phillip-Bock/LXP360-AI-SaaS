import Image from "next/image"
import { CourseEditor } from "@/components/course-editor"
import { PageNavigation } from "@/components/page-navigation"

export default function CourseCreationPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Image src="/lxp360-logo.png" alt="LXP 360" width={150} height={60} className="h-12 w-auto" priority />
        </div>
      </header>
      <CourseEditor />

      <div className="container mx-auto px-4 py-8">
        <PageNavigation
          previousPage={{ href: "/dashboard", label: "Dashboard" }}
          nextPage={{ href: "/lesson", label: "Lesson" }}
        />
      </div>
    </div>
  )
}
