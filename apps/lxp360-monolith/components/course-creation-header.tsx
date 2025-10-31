"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Share, Eye, Settings, MessageSquare, HelpCircle } from "lucide-react"

export function CourseCreationHeader() {
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 text-sm font-medium">
                Snapshots <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Current Version</DropdownMenuItem>
              <DropdownMenuItem>Version 1.0</DropdownMenuItem>
              <DropdownMenuItem>Version 0.9</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Review
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Publish
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            AI Assistant
          </Button>
          <Button variant="ghost" size="sm">
            Preview
          </Button>
        </div>
      </div>
    </header>
  )
}
