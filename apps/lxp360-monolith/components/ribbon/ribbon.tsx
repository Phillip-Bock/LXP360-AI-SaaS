"use client"

import type React from "react"
import { useState, useCallback } from "react"
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
  Copy,
  Castle as Paste,
  Scissors,
  ChevronDown,
  FileText,
  Table,
  Video,
  Mic,
  Code,
  Settings,
  Heading1,
  Heading2,
  Heading3,
  Subscript,
  Superscript,
  Quote,
  Minus,
  Plus,
  Highlighter,
  Eraser,
  PaintBucket,
  Columns,
  LayoutGrid,
  Shapes,
  PieChart,
  BarChart3,
  LineChart,
  Zap,
  Brain,
  MessageSquare,
  CheckSquare,
  Target,
  Award,
  BookOpen,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface RibbonTab {
  id: string
  label: string
  groups: RibbonGroup[]
}

interface RibbonGroup {
  label: string
  items: RibbonItem[]
}

interface RibbonItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  action?: () => void
  variant?: "default" | "large"
  dropdown?: boolean
  dropdownItems?: { label: string; action: () => void }[]
}

interface RibbonProps {
  onAction?: (action: string, value?: any) => void
}

export function Ribbon({ onAction }: RibbonProps) {
  const [activeTab, setActiveTab] = useState("home")

  const handleAction = useCallback(
    (action: string, value?: any) => {
      console.log("[v0] Ribbon action:", action, value)

      // Execute document.execCommand for text formatting
      switch (action) {
        case "bold":
          document.execCommand("bold", false)
          break
        case "italic":
          document.execCommand("italic", false)
          break
        case "underline":
          document.execCommand("underline", false)
          break
        case "strikethrough":
          document.execCommand("strikeThrough", false)
          break
        case "alignLeft":
          document.execCommand("justifyLeft", false)
          break
        case "alignCenter":
          document.execCommand("justifyCenter", false)
          break
        case "alignRight":
          document.execCommand("justifyRight", false)
          break
        case "alignJustify":
          document.execCommand("justifyFull", false)
          break
        case "bulletList":
          document.execCommand("insertUnorderedList", false)
          break
        case "numberedList":
          document.execCommand("insertOrderedList", false)
          break
        case "undo":
          document.execCommand("undo", false)
          break
        case "redo":
          document.execCommand("redo", false)
          break
        case "heading1":
          document.execCommand("formatBlock", false, "<h1>")
          break
        case "heading2":
          document.execCommand("formatBlock", false, "<h2>")
          break
        case "heading3":
          document.execCommand("formatBlock", false, "<h3>")
          break
        case "subscript":
          document.execCommand("subscript", false)
          break
        case "superscript":
          document.execCommand("superscript", false)
          break
        case "insertLink":
          const url = prompt("Enter URL:")
          if (url) document.execCommand("createLink", false, url)
          break
        case "removeFormat":
          document.execCommand("removeFormat", false)
          break
        default:
          // Pass to parent handler for custom actions
          onAction?.(action, value)
      }
    },
    [onAction],
  )

  const tabs: RibbonTab[] = [
    {
      id: "home",
      label: "Home",
      groups: [
        {
          label: "Clipboard",
          items: [
            {
              icon: Paste,
              label: "Paste",
              variant: "large",
              action: () => handleAction("paste"),
            },
            {
              icon: Scissors,
              label: "Cut",
              variant: "default",
              action: () => handleAction("cut"),
            },
            {
              icon: Copy,
              label: "Copy",
              variant: "default",
              action: () => handleAction("copy"),
            },
          ],
        },
        {
          label: "Font",
          items: [
            {
              icon: Bold,
              label: "Bold",
              variant: "default",
              action: () => handleAction("bold"),
            },
            {
              icon: Italic,
              label: "Italic",
              variant: "default",
              action: () => handleAction("italic"),
            },
            {
              icon: Underline,
              label: "Underline",
              variant: "default",
              action: () => handleAction("underline"),
            },
            {
              icon: Strikethrough,
              label: "Strike",
              variant: "default",
              action: () => handleAction("strikethrough"),
            },
            {
              icon: Subscript,
              label: "Subscript",
              variant: "default",
              action: () => handleAction("subscript"),
            },
            {
              icon: Superscript,
              label: "Superscript",
              variant: "default",
              action: () => handleAction("superscript"),
            },
            {
              icon: Type,
              label: "Font",
              variant: "default",
              dropdown: true,
              dropdownItems: [
                { label: "Arial", action: () => handleAction("fontFamily", "Arial") },
                { label: "Times New Roman", action: () => handleAction("fontFamily", "Times New Roman") },
                { label: "Courier New", action: () => handleAction("fontFamily", "Courier New") },
                { label: "Georgia", action: () => handleAction("fontFamily", "Georgia") },
                { label: "Verdana", action: () => handleAction("fontFamily", "Verdana") },
              ],
            },
            {
              icon: Palette,
              label: "Color",
              variant: "default",
              dropdown: true,
              dropdownItems: [
                { label: "Black", action: () => handleAction("textColor", "#000000") },
                { label: "Red", action: () => handleAction("textColor", "#FF0000") },
                { label: "Blue", action: () => handleAction("textColor", "#0072f5") },
                { label: "Green", action: () => handleAction("textColor", "#00AA00") },
              ],
            },
            {
              icon: Highlighter,
              label: "Highlight",
              variant: "default",
              action: () => handleAction("highlight"),
            },
          ],
        },
        {
          label: "Paragraph",
          items: [
            {
              icon: AlignLeft,
              label: "Left",
              variant: "default",
              action: () => handleAction("alignLeft"),
            },
            {
              icon: AlignCenter,
              label: "Center",
              variant: "default",
              action: () => handleAction("alignCenter"),
            },
            {
              icon: AlignRight,
              label: "Right",
              variant: "default",
              action: () => handleAction("alignRight"),
            },
            {
              icon: AlignJustify,
              label: "Justify",
              variant: "default",
              action: () => handleAction("alignJustify"),
            },
            {
              icon: List,
              label: "Bullets",
              variant: "default",
              action: () => handleAction("bulletList"),
            },
            {
              icon: ListOrdered,
              label: "Numbers",
              variant: "default",
              action: () => handleAction("numberedList"),
            },
            {
              icon: Minus,
              label: "Decrease",
              variant: "default",
              action: () => handleAction("outdent"),
            },
            {
              icon: Plus,
              label: "Increase",
              variant: "default",
              action: () => handleAction("indent"),
            },
          ],
        },
        {
          label: "Styles",
          items: [
            {
              icon: Heading1,
              label: "H1",
              variant: "default",
              action: () => handleAction("heading1"),
            },
            {
              icon: Heading2,
              label: "H2",
              variant: "default",
              action: () => handleAction("heading2"),
            },
            {
              icon: Heading3,
              label: "H3",
              variant: "default",
              action: () => handleAction("heading3"),
            },
            {
              icon: Quote,
              label: "Quote",
              variant: "default",
              action: () => handleAction("blockquote"),
            },
            {
              icon: Eraser,
              label: "Clear",
              variant: "default",
              action: () => handleAction("removeFormat"),
            },
          ],
        },
        {
          label: "Insert",
          items: [
            {
              icon: Link2,
              label: "Link",
              variant: "default",
              action: () => handleAction("insertLink"),
            },
            {
              icon: ImageIcon,
              label: "Image",
              variant: "default",
              action: () => handleAction("insertImage"),
            },
            {
              icon: Table,
              label: "Table",
              variant: "default",
              action: () => handleAction("insertTable"),
            },
          ],
        },
        {
          label: "Editing",
          items: [
            {
              icon: Undo,
              label: "Undo",
              variant: "default",
              action: () => handleAction("undo"),
            },
            {
              icon: Redo,
              label: "Redo",
              variant: "default",
              action: () => handleAction("redo"),
            },
            {
              icon: Sparkles,
              label: "AI Assist",
              variant: "large",
              action: () => handleAction("aiAssist"),
            },
          ],
        },
      ],
    },
    {
      id: "insert",
      label: "Insert",
      groups: [
        {
          label: "Media",
          items: [
            {
              icon: ImageIcon,
              label: "Image",
              variant: "large",
              action: () => handleAction("insertImage"),
            },
            {
              icon: Video,
              label: "Video",
              variant: "large",
              action: () => handleAction("insertVideo"),
            },
            {
              icon: Mic,
              label: "Audio",
              variant: "large",
              action: () => handleAction("insertAudio"),
            },
          ],
        },
        {
          label: "Content",
          items: [
            {
              icon: Table,
              label: "Table",
              variant: "default",
              action: () => handleAction("insertTable"),
            },
            {
              icon: Code,
              label: "Code",
              variant: "default",
              action: () => handleAction("insertCode"),
            },
            {
              icon: FileText,
              label: "Document",
              variant: "default",
              action: () => handleAction("insertDocument"),
            },
            {
              icon: Columns,
              label: "Columns",
              variant: "default",
              action: () => handleAction("insertColumns"),
            },
          ],
        },
        {
          label: "Charts",
          items: [
            {
              icon: BarChart3,
              label: "Bar Chart",
              variant: "default",
              action: () => handleAction("insertBarChart"),
            },
            {
              icon: LineChart,
              label: "Line Chart",
              variant: "default",
              action: () => handleAction("insertLineChart"),
            },
            {
              icon: PieChart,
              label: "Pie Chart",
              variant: "default",
              action: () => handleAction("insertPieChart"),
            },
          ],
        },
      ],
    },
    {
      id: "learning",
      label: "Learning Blocks",
      groups: [
        {
          label: "Structure",
          items: [
            {
              icon: Target,
              label: "Objectives",
              variant: "large",
              action: () => handleAction("insertBlock", "learning-objectives"),
            },
            {
              icon: BookOpen,
              label: "Prerequisites",
              variant: "large",
              action: () => handleAction("insertBlock", "prerequisites"),
            },
            {
              icon: Award,
              label: "Key Takeaways",
              variant: "large",
              action: () => handleAction("insertBlock", "key-takeaways"),
            },
          ],
        },
        {
          label: "Interactive",
          items: [
            {
              icon: CheckSquare,
              label: "Quiz",
              variant: "default",
              action: () => handleAction("insertBlock", "multiple-choice"),
            },
            {
              icon: Zap,
              label: "Hotspot",
              variant: "default",
              action: () => handleAction("insertBlock", "hotspot"),
            },
            {
              icon: Brain,
              label: "Reflection",
              variant: "default",
              action: () => handleAction("insertBlock", "reflection"),
            },
            {
              icon: MessageSquare,
              label: "Discussion",
              variant: "default",
              action: () => handleAction("insertBlock", "discussion"),
            },
          ],
        },
        {
          label: "Progress",
          items: [
            {
              icon: TrendingUp,
              label: "Progress",
              variant: "default",
              action: () => handleAction("insertBlock", "progress-indicator"),
            },
            {
              icon: Clock,
              label: "Milestone",
              variant: "default",
              action: () => handleAction("insertBlock", "milestone"),
            },
            {
              icon: Award,
              label: "Badge",
              variant: "default",
              action: () => handleAction("insertBlock", "badge"),
            },
          ],
        },
      ],
    },
    {
      id: "design",
      label: "Design",
      groups: [
        {
          label: "Themes",
          items: [
            {
              icon: Palette,
              label: "Colors",
              variant: "large",
              action: () => handleAction("changeTheme"),
            },
            {
              icon: Type,
              label: "Fonts",
              variant: "large",
              action: () => handleAction("changeFonts"),
            },
            {
              icon: PaintBucket,
              label: "Background",
              variant: "large",
              action: () => handleAction("changeBackground"),
            },
          ],
        },
        {
          label: "Layout",
          items: [
            {
              icon: LayoutGrid,
              label: "Grid",
              variant: "default",
              action: () => handleAction("layoutGrid"),
            },
            {
              icon: Columns,
              label: "Columns",
              variant: "default",
              action: () => handleAction("layoutColumns"),
            },
            {
              icon: Shapes,
              label: "Shapes",
              variant: "default",
              action: () => handleAction("insertShapes"),
            },
          ],
        },
      ],
    },
    {
      id: "view",
      label: "View",
      groups: [
        {
          label: "Show/Hide",
          items: [
            {
              icon: Settings,
              label: "Options",
              variant: "large",
              action: () => handleAction("viewOptions"),
            },
            {
              icon: LayoutGrid,
              label: "Grid Lines",
              variant: "default",
              action: () => handleAction("toggleGrid"),
            },
            {
              icon: Users,
              label: "Comments",
              variant: "default",
              action: () => handleAction("toggleComments"),
            },
          ],
        },
        {
          label: "Zoom",
          items: [
            {
              icon: Plus,
              label: "Zoom In",
              variant: "default",
              action: () => handleAction("zoomIn"),
            },
            {
              icon: Minus,
              label: "Zoom Out",
              variant: "default",
              action: () => handleAction("zoomOut"),
            },
          ],
        },
      ],
    },
  ]

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="bg-white border-b border-[#d1d5db] shadow-sm">
      {/* Tab Strip */}
      <div className="flex items-center gap-1 px-2 pt-1 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-t-md",
              activeTab === tab.id
                ? "bg-white text-[#0072f5] border-b-2 border-[#0072f5]"
                : "text-[#4b5563] hover:bg-[#f3f4f6]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="flex items-start gap-1 px-4 py-2 bg-[#f9fafb] border-t border-[#e5e7eb]">
        {activeTabData?.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col border-r border-[#e5e7eb] pr-2 last:border-r-0">
            <div className="flex items-center gap-1 pb-2">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon

                if (item.dropdown && item.dropdownItems) {
                  return (
                    <DropdownMenu key={itemIndex}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex flex-col items-center justify-center gap-1 hover:bg-[#e5e7eb] rounded-md transition-colors group",
                            item.variant === "large" ? "px-3 py-2" : "px-2 py-1.5 min-w-[48px]",
                          )}
                          title={item.label}
                        >
                          <Icon
                            className={cn(
                              "text-[#4b5563] group-hover:text-[#0072f5]",
                              item.variant === "large" ? "w-8 h-8" : "w-5 h-5",
                            )}
                          />
                          <span
                            className={cn(
                              "text-[#4b5563] group-hover:text-[#0072f5]",
                              item.variant === "large" ? "text-xs" : "text-[10px] leading-tight text-center",
                            )}
                          >
                            {item.label}
                          </span>
                          <ChevronDown className="w-3 h-3 text-[#4b5563]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.dropdownItems.map((dropdownItem, idx) => (
                          <DropdownMenuItem key={idx} onClick={dropdownItem.action}>
                            {dropdownItem.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                }

                if (item.variant === "large") {
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className="flex flex-col items-center justify-center gap-1 px-3 py-2 hover:bg-[#e5e7eb] rounded-md transition-colors group"
                      title={item.label}
                    >
                      <Icon className="w-8 h-8 text-[#4b5563] group-hover:text-[#0072f5]" />
                      <span className="text-xs text-[#4b5563] group-hover:text-[#0072f5]">{item.label}</span>
                    </button>
                  )
                }
                return (
                  <button
                    key={itemIndex}
                    onClick={item.action}
                    className="flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 hover:bg-[#e5e7eb] rounded-md transition-colors group min-w-[48px]"
                    title={item.label}
                  >
                    <Icon className="w-5 h-5 text-[#4b5563] group-hover:text-[#0072f5]" />
                    <span className="text-[10px] text-[#4b5563] group-hover:text-[#0072f5] leading-tight text-center">
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="text-[10px] text-center text-[#6b7280] font-medium pt-1 border-t border-[#e5e7eb]">
              {group.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
