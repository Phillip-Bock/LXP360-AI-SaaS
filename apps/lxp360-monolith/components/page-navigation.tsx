"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface PageNavigationProps {
  previousPage?: {
    href: string
    label: string
  }
  nextPage?: {
    href: string
    label: string
  }
  className?: string
}

export function PageNavigation({ previousPage, nextPage, className = "" }: PageNavigationProps) {
  return (
    <nav className={`flex items-center justify-between gap-4 ${className}`} aria-label="Page navigation">
      <div className="flex-1">
        {previousPage ? (
          <Button
            asChild
            variant="outline"
            className="group hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
          >
            <Link href={previousPage.href} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Previous:</span>
              <span className="font-medium">{previousPage.label}</span>
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextPage ? (
          <Button asChild className="group bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={nextPage.href} className="flex items-center gap-2">
              <span className="font-medium">{nextPage.label}</span>
              <span className="hidden sm:inline">:Next</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
