import type { Metadata } from "next"
import { PublicHeader } from "@/components/public-header"
import { AboutPageContent } from "@/components/about-page-content"
import { PublicFooter } from "@/components/public-footer"

export const metadata: Metadata = {
  title: "About Us | LXD360 - Training the Future for the Future",
  description:
    "Learn about LXD360's mission to transform workforce development through innovative learning experience design and cutting-edge technology.",
}

export default function About() {
  return (
    <>
      <PublicHeader />
      <AboutPageContent />
      <PublicFooter />
    </>
  )
}
