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
  Indent,
  Outdent,
  Link2,
  ImageIcon,
  Video,
  Table,
  Smile,
  Code,
  Maximize,
  Search,
  SpellCheck,
  Undo,
  Redo,
  Sparkles,
  Type,
  Palette,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  maxChars?: number
  placeholder?: string
}

export function RichTextEditor({ value, onChange, maxChars = 5000, placeholder }: RichTextEditorProps) {
  const charCount = (value || "").length

  return (
    <div className="border border-[#ced4da] rounded-lg overflow-hidden">
      {/* RTE Toolbar */}
      <div className="flex flex-wrap gap-1 bg-[#f8f9fa] border-b border-[#dee2e6] p-2">
        {/* Basic Formatting Group */}
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

        {/* Font & Style Group */}
        <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Font">
            <Type className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Text Color">
            <Palette className="w-4 h-4" />
          </Button>
        </div>

        {/* Headings Group */}
        <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Heading 1">
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Heading 2">
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Heading 3">
            <Heading3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Heading 4">
            <Heading4 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Heading 5">
            <Heading5 className="w-4 h-4" />
          </Button>
        </div>

        {/* Alignment Group */}
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

        {/* Lists Group */}
        <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Bulleted List">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Indent">
            <Indent className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Outdent">
            <Outdent className="w-4 h-4" />
          </Button>
        </div>

        {/* Media Group */}
        <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Link">
            <Link2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Image">
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Video">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Table">
            <Table className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Insert Emoji">
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        {/* Tools Group */}
        <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Source Code">
            <Code className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Full Screen">
            <Maximize className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Find & Replace">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Spell Check">
            <SpellCheck className="w-4 h-4" />
          </Button>
        </div>

        {/* Undo/Redo Group */}
        <div className="flex gap-1 pr-2 border-r border-[#dee2e6]">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Undo">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Redo">
            <Redo className="w-4 h-4" />
          </Button>
        </div>

        {/* AI Group */}
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Re-write with AI">
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div
        contentEditable
        className="min-h-[150px] p-4 outline-none focus:ring-2 focus:ring-[#667eea] focus:ring-inset"
        onInput={(e) => {
          const text = e.currentTarget.textContent || ""
          if (text.length <= maxChars) {
            onChange(text)
          }
        }}
        suppressContentEditableWarning
      >
        {value || placeholder}
      </div>

      {/* Character Counter */}
      <div className="px-4 py-2 bg-[#f8f9fa] border-t border-[#dee2e6] text-right text-sm">
        <span className={charCount >= maxChars ? "text-red-600" : "text-[#606770]"}>
          {charCount} / {maxChars}
        </span>
      </div>
    </div>
  )
}
