"use client"

import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Undo,
  Redo,
  Sparkles,
  Type,
  Palette,
  Heading2,
} from "lucide-react"

export function RichTextEditorToolbar() {
  return (
    <div className="flex flex-wrap gap-1 bg-[#f8f9fa] border border-[#ced4da] rounded-lg p-2">
      {/* Basic Formatting */}
      <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Bold">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Italic">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Underline">
          <Underline className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </Button>
      </div>

      {/* Font & Style */}
      <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Font">
          <Type className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Heading">
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Text Color">
          <Palette className="w-4 h-4" />
        </Button>
      </div>

      {/* Alignment */}
      <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Left">
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Center">
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Align Right">
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Justify">
          <AlignJustify className="w-4 h-4" />
        </Button>
      </div>

      {/* Lists */}
      <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Bulleted List">
          <List className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Numbered List">
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>

      {/* Media */}
      <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Link">
          <Link2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Image">
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Undo/Redo */}
      <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Undo">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Redo">
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* AI */}
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Re-write with AI">
          <Sparkles className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
