"use client"

import type React from "react"

import { useState, useRef, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ribbon } from "@/components/ribbon/ribbon"
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  X,
  Star,
  Clock,
  Filter,
  GripVertical,
  Trash2,
  Settings,
  Home,
  BookOpen,
  Layers,
  FileText,
  Gauge,
  BarChart3,
  Code,
  Palette,
  Zap,
  Eye,
  Download,
  Type,
  ImageIcon,
  PieChart,
  Video,
  Gamepad2,
  ClipboardCheck,
  LayoutGrid,
  Sparkles,
  Wrench,
  Menu,
  ArrowLeft,
  ChevronLeft,
} from "lucide-react"

import { TitleOnly } from "@/components/text-blocks/title-only"
import { SubtitleOnly } from "@/components/text-blocks/subtitle-only"
import { TitleWithParagraph } from "@/components/text-blocks/title-with-paragraph"
import { SubtitleWithParagraph } from "@/components/text-blocks/subtitle-with-paragraph"
import ParagraphWithImage from "@/components/text-blocks/paragraph-with-image"
import { PullQuote } from "@/components/text-blocks/pull-quote"
import NumberedList from "@/components/text-blocks/numbered-list"
import BulletedList from "@/components/text-blocks/bulleted-list"
import CheckboxList from "@/components/text-blocks/checkbox-list"
import DefinitionList from "@/components/text-blocks/definition-list"
import StepByStepVertical from "@/components/text-blocks/step-by-step-vertical"
import TimelineVertical from "@/components/text-blocks/timeline-vertical"
import SortableTable from "@/components/text-blocks/sortable-table"
import ComparisonTable from "@/components/text-blocks/comparison-table"
import FAQAccordion from "@/components/text-blocks/faq-accordion"
import { StatementBlock } from "@/components/text-blocks/statement-block"
import { NoteBlock } from "@/components/text-blocks/note-block"
import { CautionBlock } from "@/components/text-blocks/caution-block"
import { WarningBlock } from "@/components/text-blocks/warning-block"
import { SuccessBlock } from "@/components/text-blocks/success-block"
import { DangerBlock } from "@/components/text-blocks/danger-block"
import { CustomCalloutBlock } from "@/components/text-blocks/custom-callout-block"
import { StatisticsDisplay } from "@/components/text-blocks/statistics-display"
import { QuoteLeftAligned } from "@/components/text-blocks/quote-left-aligned"
import { TestimonialBlock } from "@/components/text-blocks/testimonial-block"
import { ExpertInsightBlock } from "@/components/text-blocks/expert-insight-block"
import { PeerReviewBlock } from "@/components/text-blocks/peer-review-block"
import { ReferencesBlock } from "@/components/text-blocks/references-block"
import { AccordionCollapsible } from "@/components/interactive-blocks/accordion-collapsible"
import { TabGroups } from "@/components/interactive-blocks/tab-groups"
import { RevealSpoiler } from "@/components/interactive-blocks/reveal-spoiler"
import { FlipCards } from "@/components/interactive-blocks/flip-cards"
import { HotspotImage } from "@/components/interactive-blocks/hotspot-image"
import { TooltipText } from "@/components/interactive-blocks/tooltip-text"
import { ProgressiveDisclosure } from "@/components/interactive-blocks/progressive-disclosure"
import { ModalTrigger } from "@/components/interactive-blocks/modal-trigger"
import { BlockquoteClassic } from "@/components/text-blocks/blockquote-classic"
import { MultiColumnLayout } from "@/components/text-blocks/multi-column-layout"

import {
  updateLesson,
  addBlockToLesson,
  updateBlock,
  deleteBlock as deleteBlockAction,
  getLesson,
} from "@/lib/actions/lessons"

interface Block {
  id: string
  type: string
  variant: string
  content: string
  seoLabel: string
  seoLevel: string
  isChecked: boolean
  customCode: {
    html: string
    css: string
    java: string
    apiKey: string
  }
}

interface BlockItem {
  name: string
  tooltip: string
  tags: string[]
}

interface MegaCategory {
  groups: Record<string, { items: BlockItem[] }>
}

const renderBlockComponent = (block: Block) => {
  const blockComponents: Record<string, React.ComponentType> = {
    "Title Only": TitleOnly,
    "Subtitle Only": SubtitleOnly,
    "Title with Paragraph": TitleWithParagraph,
    "Subtitle with Paragraph": SubtitleWithParagraph,
    "Paragraph with Image": ParagraphWithImage,
    "Pull Quote": PullQuote,
    "Multi-Column Layout": MultiColumnLayout,
    "Numbered List": NumberedList,
    "Bulleted List": BulletedList,
    "Checkbox List": CheckboxList,
    "Definition List": DefinitionList,
    "Step-by-Step Process": StepByStepVertical,
    "Timeline Block": TimelineVertical,
    Tables: SortableTable,
    "Comparison Table": ComparisonTable,
    "FAQ Accordion": FAQAccordion,
    "Statement Block": StatementBlock,
    "Note Block": NoteBlock,
    "Caution Block": CautionBlock,
    "Warning Block": WarningBlock,
    "Success/Tip Block": SuccessBlock,
    "Info Callout": StatementBlock,
    "Danger Alert": DangerBlock,
    "Custom Callout": CustomCalloutBlock,
    "Statistics Display": StatisticsDisplay,
    "Quote Block": QuoteLeftAligned,
    "Testimonial Block": TestimonialBlock,
    "Expert Insight": ExpertInsightBlock,
    "Peer Review": PeerReviewBlock,
    "Reference Block": ReferencesBlock,
    Accordion: AccordionCollapsible,
    "Tab Groups": TabGroups,
    "Reveal/Spoiler": RevealSpoiler,
    "Flip Cards": FlipCards,
    "Hotspot Text": HotspotImage,
    "Tooltip Text": TooltipText,
    "Progressive Disclosure": ProgressiveDisclosure,
    "Modal Trigger Text": ModalTrigger,
    "Blockquote with Citation": BlockquoteClassic,
  }

  const Component = blockComponents[block.type]

  if (Component) {
    return <Component />
  }

  // Fallback for blocks that don't have components yet
  return (
    <div className="p-8 border-2 border-dashed border-[#001d3d] rounded-lg bg-white">
      <p className="text-[#003066] text-center">
        <strong>{block.type}</strong> component coming soon
      </p>
    </div>
  )
}

export default function LessonPage() {
  const [lessonId, setLessonId] = useState<string | null>(null)
  const [moduleId, setModuleId] = useState<string | null>(null)
  const [courseId, setCourseId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [lessonTitle, setLessonTitle] = useState("Lesson Title")
  const [isBlockLibraryOpen, setIsBlockLibraryOpen] = useState(false)
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)
  const [activeCustomizationTab, setActiveCustomizationTab] = useState("HTML")
  const [selectedBlockType, setSelectedBlockType] = useState<string | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragCounter = useRef(0)

  const [searchQuery, setSearchQuery] = useState("")
  const [expandedMegaCategories, setExpandedMegaCategories] = useState<string[]>(["Text Blocks"])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [activeToolCategory, setActiveToolCategory] = useState<string | null>(null)
  const [isToolbarExpanded, setIsToolbarExpanded] = useState(false)
  const [expandedToolbarCategory, setExpandedToolbarCategory] = useState<string | null>(null)

  useEffect(() => {
    // In a real implementation, get these from URL params
    // For now, we'll create a new lesson on first load
    const initializeLesson = async () => {
      // This would come from URL params: /lesson?courseId=xxx&moduleId=xxx&lessonId=xxx
      const urlParams = new URLSearchParams(window.location.search)
      const urlLessonId = urlParams.get("lessonId")
      const urlModuleId = urlParams.get("moduleId")
      const urlCourseId = urlParams.get("courseId")

      if (urlLessonId && urlModuleId && urlCourseId) {
        setLessonId(urlLessonId)
        setModuleId(urlModuleId)
        setCourseId(urlCourseId)

        // Load existing lesson
        const lesson = await getLesson(urlLessonId)
        if (lesson) {
          setLessonTitle(lesson.title)
          // Load blocks from lesson
          if (lesson.blocks) {
            setBlocks(
              lesson.blocks.map((b: any) => ({
                id: b.id,
                type: b.block_type,
                variant: "default",
                content: b.content?.content || "",
                seoLabel: b.content?.seoLabel || "",
                seoLevel: b.content?.seoLevel || "h2",
                isChecked: false,
                customCode: b.content?.customCode || {
                  html: "",
                  css: "",
                  java: "",
                  apiKey: "",
                },
              })),
            )
          }
        }
      }
    }

    initializeLesson()
  }, [])

  useEffect(() => {
    if (!lessonId || !moduleId || !courseId) return

    const saveTitle = async () => {
      setIsSaving(true)
      await updateLesson(lessonId, { title: lessonTitle })
      setLastSaved(new Date())
      setIsSaving(false)
    }

    const debounce = setTimeout(saveTitle, 1000)
    return () => clearTimeout(debounce)
  }, [lessonTitle, lessonId, moduleId, courseId])

  // This is a development tracker to show which block components we've created
  const builtBlocks = new Set([
    // Basic Text blocks
    "Title Only",
    "Subtitle Only",
    "Title with Paragraph",
    "Subtitle with Paragraph",
    "Paragraph with Image",
    "Pull Quote",
    // Lists & Structured Content blocks
    "Numbered List",
    "Bulleted List",
    "Checkbox List",
    "Definition List",
    "Step-by-Step Process",
    "Timeline Block",
    "Tables",
    "Comparison Table",
    "FAQ Accordion",
    // Emphasis & Alert Blocks
    "Statement Block",
    "Note Block",
    "Caution Block",
    "Warning Block",
    "Success/Tip Block",
    "Info Callout",
    "Danger Alert",
    "Custom Callout",
    "Statistics Display",
    // Quote & Citation blocks
    "Quote Block",
    "Testimonial Block",
    "Expert Insight",
    "Peer Review",
    "Reference Block",
    // Interactive & Expandable blocks
    "Accordion",
    "Tab Groups",
    "Reveal/Spoiler",
    "Flip Cards",
    "Hotspot Text",
    "Tooltip Text",
    "Progressive Disclosure",
    "Modal Trigger Text",
  ])

  const megaCategories: Record<string, MegaCategory> = {
    "Text Blocks": {
      groups: {
        "Basic Text": {
          items: [
            { name: "Title Only", tooltip: "Display a standalone title", tags: ["basic", "text"] },
            { name: "Subtitle Only", tooltip: "Display a standalone subtitle", tags: ["basic", "text"] },
            { name: "Title with Paragraph", tooltip: "Combine title with body text", tags: ["basic", "text"] },
            { name: "Subtitle with Paragraph", tooltip: "Pair subtitle with paragraph", tags: ["basic", "text"] },
            { name: "Multi-Column Layout", tooltip: "2-4 column text layout", tags: ["basic", "text", "layout"] },
            { name: "Paragraph with Image", tooltip: "Text with inline image", tags: ["basic", "text", "image"] },
            { name: "Pull Quote", tooltip: "Highlighted quote block", tags: ["basic", "text"] },
            { name: "Blockquote with Citation", tooltip: "Quote with source", tags: ["basic", "text"] },
          ],
        },
        "Lists & Structured Content": {
          items: [
            { name: "Numbered List", tooltip: "Ordered list", tags: ["list", "text"] },
            { name: "Bulleted List", tooltip: "Unordered list", tags: ["list", "text"] },
            { name: "Checkbox List", tooltip: "Interactive checklist", tags: ["list", "interactive"] },
            { name: "Definition List", tooltip: "Term and definition pairs", tags: ["list", "text"] },
            { name: "Step-by-Step Process", tooltip: "Sequential instructions", tags: ["list", "process"] },
            { name: "Timeline Block", tooltip: "Vertical/horizontal timeline", tags: ["list", "visual"] },
            { name: "Tables", tooltip: "Data tables with sorting", tags: ["list", "data"] },
            { name: "Comparison Table", tooltip: "Side-by-side comparison", tags: ["list", "comparison"] },
            { name: "FAQ Accordion", tooltip: "Collapsible Q&A", tags: ["list", "interactive"] },
          ],
        },
        "Emphasis & Alert Blocks": {
          items: [
            { name: "Statement Block", tooltip: "Important statement", tags: ["emphasis", "text"] },
            { name: "Note Block", tooltip: "Informational note", tags: ["emphasis", "text"] },
            { name: "Caution Block", tooltip: "Warning message", tags: ["emphasis", "alert"] },
            { name: "Warning Block", tooltip: "Critical warning", tags: ["emphasis", "alert"] },
            { name: "Success/Tip Block", tooltip: "Positive message", tags: ["emphasis", "alert"] },
            { name: "Info Callout", tooltip: "Information highlight", tags: ["emphasis", "text"] },
            { name: "Danger Alert", tooltip: "Critical alert", tags: ["emphasis", "alert"] },
            { name: "Custom Callout", tooltip: "Customizable callout", tags: ["emphasis", "custom"] },
            { name: "Statistics Display", tooltip: "Big numbers showcase", tags: ["emphasis", "data"] },
          ],
        },
        "Quote & Citation": {
          items: [
            { name: "Quote Block", tooltip: "Multiple quote styles", tags: ["quote", "text"] },
            { name: "Testimonial Block", tooltip: "Customer testimonial", tags: ["quote", "text"] },
            { name: "Expert Insight", tooltip: "Expert opinion", tags: ["quote", "text"] },
            { name: "Peer Review", tooltip: "Peer feedback", tags: ["quote", "text"] },
            { name: "Source Attribution", tooltip: "Cite sources", tags: ["quote", "citation"] },
            { name: "Footnotes/Citations", tooltip: "Academic citations", tags: ["quote", "citation"] },
            { name: "Reference Block", tooltip: "Reference list", tags: ["quote", "citation"] },
          ],
        },
        "Interactive & Expandable": {
          items: [
            { name: "Accordion", tooltip: "Collapsible content", tags: ["interactive", "text"] },
            { name: "Tab Groups", tooltip: "Tabbed content", tags: ["interactive", "layout"] },
            { name: "Reveal/Spoiler", tooltip: "Hidden content reveal", tags: ["interactive", "text"] },
            { name: "Flip Cards", tooltip: "Front/back flip cards", tags: ["interactive", "visual"] },
            { name: "Hotspot Text", tooltip: "Clickable text areas", tags: ["interactive", "text"] },
            { name: "Tooltip Text", tooltip: "Hover tooltips", tags: ["interactive", "text"] },
            { name: "Progressive Disclosure", tooltip: "Gradual content reveal", tags: ["interactive", "text"] },
            { name: "Modal Trigger Text", tooltip: "Opens modal dialog", tags: ["interactive", "text"] },
          ],
        },
        "Learning Structure": {
          items: [
            { name: "Learning Objectives", tooltip: "Course goals", tags: ["learning", "text"] },
            { name: "Prerequisites", tooltip: "Required knowledge", tags: ["learning", "text"] },
            { name: "Key Takeaways", tooltip: "Main points summary", tags: ["learning", "text"] },
            { name: "Summary Box", tooltip: "Content summary", tags: ["learning", "text"] },
            { name: "Progress Indicator", tooltip: "Learning progress", tags: ["learning", "visual"] },
            { name: "Activity Instructions", tooltip: "Task directions", tags: ["learning", "text"] },
            { name: "Reflection Prompts", tooltip: "Thinking questions", tags: ["learning", "interactive"] },
            { name: "Badge/Achievement Display", tooltip: "Show achievements", tags: ["learning", "gamification"] },
            { name: "Milestone Marker", tooltip: "Progress milestone", tags: ["learning", "visual"] },
            { name: "Knowledge Check Preview", tooltip: "Quick assessment", tags: ["learning", "assessment"] },
          ],
        },
        "Comparison & Analysis": {
          items: [
            { name: "Before/After Text", tooltip: "Compare states", tags: ["comparison", "text"] },
            { name: "Pros & Cons", tooltip: "Advantages/disadvantages", tags: ["comparison", "text"] },
            { name: "This vs That", tooltip: "Direct comparison", tags: ["comparison", "text"] },
            { name: "Feature Comparison", tooltip: "Feature matrix", tags: ["comparison", "data"] },
            { name: "Venn Diagram Text", tooltip: "Overlap visualization", tags: ["comparison", "visual"] },
            { name: "Matrix Comparison", tooltip: "Multi-factor comparison", tags: ["comparison", "data"] },
          ],
        },
        "Technical & Specialized": {
          items: [
            { name: "Code Snippet", tooltip: "Syntax highlighted code", tags: ["technical", "code"] },
            { name: "Math/Formula Block", tooltip: "LaTeX/MathML formulas", tags: ["technical", "math"] },
            { name: "Glossary Term", tooltip: "Term definition", tags: ["technical", "text"] },
            { name: "Transcript Block", tooltip: "Video/audio transcript", tags: ["technical", "text"] },
            { name: "Resource Links", tooltip: "External resources", tags: ["technical", "text"] },
            { name: "API Documentation", tooltip: "API reference", tags: ["technical", "code"] },
            { name: "Technical Specification", tooltip: "Tech specs", tags: ["technical", "text"] },
            { name: "Algorithm Pseudocode", tooltip: "Algorithm description", tags: ["technical", "code"] },
          ],
        },
      },
    },
    "Image Blocks": {
      groups: {
        "Basic Layouts": {
          items: [
            { name: "Image Centered", tooltip: "Centered image", tags: ["image", "basic"] },
            { name: "Image Full Width", tooltip: "Full-width image", tags: ["image", "basic"] },
            { name: "Image with Caption", tooltip: "Image with text", tags: ["image", "text"] },
            { name: "Image & Text Side-by-Side", tooltip: "Image beside text", tags: ["image", "layout"] },
            { name: "Text on Image Overlay", tooltip: "Text over image", tags: ["image", "text"] },
            { name: "Floating Image", tooltip: "Text-wrapped image", tags: ["image", "layout"] },
            { name: "Hero Image", tooltip: "Large hero banner", tags: ["image", "hero"] },
            { name: "Background Image Section", tooltip: "Section background", tags: ["image", "layout"] },
            { name: "Image Card", tooltip: "Card with image", tags: ["image", "card"] },
          ],
        },
        "Grid & Gallery": {
          items: [
            { name: "Two Column Grid", tooltip: "2-column image grid", tags: ["image", "grid"] },
            { name: "Three Column Grid", tooltip: "3-column image grid", tags: ["image", "grid"] },
            { name: "Four Column Grid", tooltip: "4-column image grid", tags: ["image", "grid"] },
            { name: "Masonry Grid", tooltip: "Pinterest-style grid", tags: ["image", "grid"] },
            { name: "Gallery with Lightbox", tooltip: "Expandable gallery", tags: ["image", "interactive"] },
            { name: "Filterable Gallery", tooltip: "Filter by category", tags: ["image", "interactive"] },
            { name: "Lazy-Load Gallery", tooltip: "Performance optimized", tags: ["image", "grid"] },
            { name: "Mosaic Layout", tooltip: "Mixed size layout", tags: ["image", "grid"] },
          ],
        },
        "Sequential & Animated": {
          items: [
            { name: "Carousel/Slideshow", tooltip: "Image slider", tags: ["image", "interactive"] },
            { name: "Auto-Advancing Slideshow", tooltip: "Auto-play slides", tags: ["image", "animated"] },
            { name: "Animated GIF", tooltip: "GIF with controls", tags: ["image", "animated"] },
            { name: "Image Sequence Player", tooltip: "Frame-by-frame", tags: ["image", "interactive"] },
            { name: "Parallax Scroll", tooltip: "Parallax effect", tags: ["image", "animated"] },
            { name: "Ken Burns Effect", tooltip: "Zoom animation", tags: ["image", "animated"] },
            { name: "Fade Transition Gallery", tooltip: "Fade between images", tags: ["image", "animated"] },
            { name: "Cinemagraph", tooltip: "Partial animation", tags: ["image", "animated"] },
          ],
        },
        "Comparison & Sliders": {
          items: [
            { name: "Before/After Slider", tooltip: "50/50 comparison", tags: ["image", "comparison"] },
            { name: "Vertical Slider", tooltip: "Vertical comparison", tags: ["image", "comparison"] },
            { name: "Multi-Point Slider", tooltip: "3+ image compare", tags: ["image", "comparison"] },
            { name: "Side-by-Side Comparison", tooltip: "Static comparison", tags: ["image", "comparison"] },
            { name: "Spot-the-Difference", tooltip: "Find differences", tags: ["image", "interactive"] },
            { name: "Image Morphing", tooltip: "Morph between images", tags: ["image", "animated"] },
            { name: "Overlay Comparison", tooltip: "Overlay images", tags: ["image", "comparison"] },
          ],
        },
        "Labeled & Interactive": {
          items: [
            { name: "Labeled Graphic", tooltip: "Image with labels", tags: ["image", "interactive"] },
            { name: "Reverse Labeled Graphic", tooltip: "Click to reveal labels", tags: ["image", "interactive"] },
            { name: "Hotspot Image", tooltip: "Clickable regions", tags: ["image", "interactive"] },
            { name: "Image Map", tooltip: "Interactive image map", tags: ["image", "interactive"] },
            { name: "Annotated Image", tooltip: "Image annotations", tags: ["image", "text"] },
            { name: "Progressive Reveal Labels", tooltip: "Gradual label reveal", tags: ["image", "interactive"] },
            { name: "Tooltip Image", tooltip: "Hover for info", tags: ["image", "interactive"] },
            { name: "Click-to-Zoom Regions", tooltip: "Zoom specific areas", tags: ["image", "interactive"] },
            { name: "Zoomable High-Res Image", tooltip: "Pan and zoom", tags: ["image", "interactive"] },
          ],
        },
        "Immersive & 360°": {
          items: [
            { name: "360° Photo Sphere", tooltip: "Panellum viewer", tags: ["image", "360", "immersive"] },
            { name: "360° Panorama", tooltip: "Panoramic view", tags: ["image", "360"] },
            { name: "Virtual Tour", tooltip: "Linked spheres", tags: ["image", "360", "interactive"] },
            { name: "Gyroscope 360°", tooltip: "Device motion control", tags: ["image", "360", "mobile"] },
            { name: "VR Image Viewer", tooltip: "A-Frame VR", tags: ["image", "vr"] },
            { name: "3D Object Viewer", tooltip: "3D model display", tags: ["image", "3d"] },
            { name: "AR Preview", tooltip: "Augmented reality", tags: ["image", "ar"] },
            { name: "Cubic Panorama", tooltip: "Cube map view", tags: ["image", "360"] },
            { name: "Little Planet View", tooltip: "Tiny planet effect", tags: ["image", "360"] },
          ],
        },
        "Educational Tools": {
          items: [
            { name: "Multi-Layer Image", tooltip: "Toggle layers", tags: ["image", "educational"] },
            { name: "Cutaway/Cross-Section", tooltip: "Internal view", tags: ["image", "educational"] },
            { name: "Exploded View", tooltip: "Parts separated", tags: ["image", "educational"] },
            { name: "Process Flow Images", tooltip: "Step visualization", tags: ["image", "process"] },
            { name: "Diagram Builder", tooltip: "Create diagrams", tags: ["image", "interactive"] },
            { name: "Blueprint/Technical Drawing", tooltip: "Technical diagrams", tags: ["image", "technical"] },
            { name: "Microscope Simulation", tooltip: "Zoom levels", tags: ["image", "educational"] },
            { name: "Thermal/X-Ray Toggle", tooltip: "View modes", tags: ["image", "educational"] },
          ],
        },
        "Assessment Images": {
          items: [
            { name: "Image-Based Quiz", tooltip: "Quiz with images", tags: ["image", "assessment"] },
            { name: "Label-the-Diagram", tooltip: "Drag labels", tags: ["image", "assessment"] },
            { name: "Image Matching", tooltip: "Match pairs", tags: ["image", "assessment"] },
            { name: "Image-Text Association", tooltip: "Connect items", tags: ["image", "assessment"] },
            { name: "Visual Memory Test", tooltip: "Remember images", tags: ["image", "assessment"] },
            { name: "Image Error Identification", tooltip: "Find mistakes", tags: ["image", "assessment"] },
            { name: "Drag Labels to Image", tooltip: "Place labels", tags: ["image", "assessment"] },
            { name: "Click Correct Area", tooltip: "Click target", tags: ["image", "assessment"] },
          ],
        },
      },
    },
    "Chart & Data Visualization": {
      groups: {
        "Standard Charts": {
          items: [
            { name: "Bar Chart", tooltip: "Vertical/horizontal bars", tags: ["chart", "data"] },
            { name: "Line Chart", tooltip: "Line graph", tags: ["chart", "data"] },
            { name: "Pie Chart", tooltip: "Circular chart", tags: ["chart", "data"] },
            { name: "Donut Chart", tooltip: "Ring chart", tags: ["chart", "data"] },
            { name: "Area Chart", tooltip: "Filled line chart", tags: ["chart", "data"] },
            { name: "Scatter Plot", tooltip: "Point distribution", tags: ["chart", "data"] },
            { name: "Bubble Chart", tooltip: "Sized scatter plot", tags: ["chart", "data"] },
            { name: "Column Chart", tooltip: "Vertical bars", tags: ["chart", "data"] },
          ],
        },
        "Advanced Charts": {
          items: [
            { name: "Combo Chart", tooltip: "Mixed chart types", tags: ["chart", "advanced"] },
            { name: "Stacked Bar/Area", tooltip: "Stacked data", tags: ["chart", "advanced"] },
            { name: "Grouped Bar Chart", tooltip: "Grouped bars", tags: ["chart", "advanced"] },
            { name: "Multi-Line Chart", tooltip: "Multiple lines", tags: ["chart", "advanced"] },
            { name: "Radar/Spider Chart", tooltip: "Radial chart", tags: ["chart", "advanced"] },
            { name: "Heatmap", tooltip: "Color intensity map", tags: ["chart", "advanced"] },
            { name: "Treemap", tooltip: "Hierarchical rectangles", tags: ["chart", "advanced"] },
            { name: "Sunburst Chart", tooltip: "Radial hierarchy", tags: ["chart", "advanced"] },
            { name: "Sankey Diagram", tooltip: "Flow diagram", tags: ["chart", "advanced"] },
            { name: "Chord Diagram", tooltip: "Relationship circle", tags: ["chart", "advanced"] },
          ],
        },
        "Interactive Charts": {
          items: [
            { name: "Zoomable Chart", tooltip: "Zoom and pan", tags: ["chart", "interactive"] },
            { name: "Animated Chart", tooltip: "Progressive reveal", tags: ["chart", "animated"] },
            { name: "Real-Time Data Chart", tooltip: "Live updates", tags: ["chart", "interactive"] },
            { name: "Filterable Chart", tooltip: "Filter data", tags: ["chart", "interactive"] },
            { name: "Drill-Down Chart", tooltip: "Click for details", tags: ["chart", "interactive"] },
            { name: "Comparison Chart", tooltip: "Side-by-side", tags: ["chart", "comparison"] },
            { name: "Chart with Annotations", tooltip: "Labeled points", tags: ["chart", "text"] },
            { name: "Interactive Dashboard", tooltip: "Multi-chart view", tags: ["chart", "interactive"] },
          ],
        },
        "Specialized Visualizations": {
          items: [
            { name: "Gantt Chart", tooltip: "Project timeline", tags: ["chart", "project"] },
            { name: "Organizational Chart", tooltip: "Org structure", tags: ["chart", "organizational"] },
            { name: "Network Graph", tooltip: "Node connections", tags: ["chart", "network"] },
            { name: "Flowchart", tooltip: "Process flow", tags: ["chart", "process"] },
            { name: "Mind Map", tooltip: "Idea connections", tags: ["chart", "brainstorm"] },
            { name: "Decision Tree", tooltip: "Decision paths", tags: ["chart", "decision"] },
            { name: "PERT Chart", tooltip: "Project management", tags: ["chart", "project"] },
            { name: "Swimlane Diagram", tooltip: "Process lanes", tags: ["chart", "process"] },
            { name: "Entity Relationship Diagram", tooltip: "Database schema", tags: ["chart", "technical"] },
          ],
        },
        "Progress & Metrics": {
          items: [
            { name: "Progress Bar", tooltip: "Linear progress", tags: ["chart", "progress"] },
            { name: "Progress Ring/Circle", tooltip: "Circular progress", tags: ["chart", "progress"] },
            { name: "Gauge/Meter", tooltip: "Speedometer style", tags: ["chart", "metric"] },
            { name: "KPI Display", tooltip: "Key metrics", tags: ["chart", "metric"] },
            { name: "Leaderboard", tooltip: "Ranked list", tags: ["chart", "gamification"] },
            { name: "Scorecard", tooltip: "Score display", tags: ["chart", "metric"] },
            { name: "Dashboard Tiles", tooltip: "Metric tiles", tags: ["chart", "dashboard"] },
            { name: "Metric Cards", tooltip: "Card-based metrics", tags: ["chart", "metric"] },
          ],
        },
        Geographic: {
          items: [
            { name: "Choropleth Map", tooltip: "Color-coded regions", tags: ["chart", "map"] },
            { name: "Point Map with Markers", tooltip: "Location pins", tags: ["chart", "map"] },
            { name: "Heat Map Geographic", tooltip: "Density map", tags: ["chart", "map"] },
            { name: "Route Map", tooltip: "Path visualization", tags: ["chart", "map"] },
            { name: "Interactive Globe", tooltip: "3D globe", tags: ["chart", "map", "3d"] },
            { name: "Regional Comparison Map", tooltip: "Compare regions", tags: ["chart", "map"] },
          ],
        },
      },
    },
    "Media Blocks": {
      groups: {
        Video: {
          items: [
            { name: "Video Player", tooltip: "Standard video player", tags: ["video", "media"] },
            { name: "Video with Chapters", tooltip: "Chapter navigation", tags: ["video", "interactive"] },
            { name: "Video with Hotspots", tooltip: "Interactive overlays", tags: ["video", "interactive"] },
            { name: "Video with Branching", tooltip: "Choose your path", tags: ["video", "interactive"] },
            { name: "Video Quiz", tooltip: "Pause for questions", tags: ["video", "assessment"] },
            { name: "360° Video", tooltip: "Panoramic video", tags: ["video", "360"] },
            { name: "VR Video Player", tooltip: "Virtual reality video", tags: ["video", "vr"] },
            { name: "Split-Screen Video", tooltip: "Multiple videos", tags: ["video", "comparison"] },
            { name: "Picture-in-Picture Video", tooltip: "Floating video", tags: ["video", "layout"] },
            { name: "Video Playlist", tooltip: "Sequential videos", tags: ["video", "playlist"] },
            { name: "Live Stream Embed", tooltip: "Live video", tags: ["video", "live"] },
            { name: "Video with Transcript", tooltip: "Synchronized text", tags: ["video", "accessibility"] },
            { name: "Annotated Video", tooltip: "Video annotations", tags: ["video", "text"] },
            { name: "Video Speed Controller", tooltip: "Playback speed", tags: ["video", "control"] },
            { name: "Looping Background Video", tooltip: "Background loop", tags: ["video", "background"] },
          ],
        },
        Audio: {
          items: [
            { name: "Audio Player", tooltip: "Standard audio player", tags: ["audio", "media"] },
            { name: "Podcast Player", tooltip: "Podcast interface", tags: ["audio", "podcast"] },
            { name: "Audio with Waveform", tooltip: "Visual waveform", tags: ["audio", "visual"] },
            { name: "Audio with Synchronized Text", tooltip: "Text follows audio", tags: ["audio", "text"] },
            { name: "Audio Playlist", tooltip: "Multiple tracks", tags: ["audio", "playlist"] },
            { name: "Multi-Track Audio", tooltip: "Switch between tracks", tags: ["audio", "interactive"] },
            { name: "Audio Hotspots", tooltip: "Visual with audio regions", tags: ["audio", "interactive"] },
            { name: "Audio Quiz", tooltip: "Listen and answer", tags: ["audio", "assessment"] },
            { name: "Voice Recorder", tooltip: "Record audio", tags: ["audio", "interactive"] },
            { name: "Audio Comparison Player", tooltip: "Compare audio", tags: ["audio", "comparison"] },
            { name: "Background Audio Layer", tooltip: "Background music", tags: ["audio", "background"] },
            { name: "Spatial Audio", tooltip: "3D audio", tags: ["audio", "3d"] },
          ],
        },
        "Mixed Media": {
          items: [
            { name: "Audio + Image Slideshow", tooltip: "Narrated slides", tags: ["media", "mixed"] },
            { name: "Video + Document Split View", tooltip: "Side-by-side", tags: ["media", "mixed"] },
            { name: "Interactive Media Timeline", tooltip: "Timeline navigation", tags: ["media", "interactive"] },
            { name: "Media Mosaic", tooltip: "Mixed media grid", tags: ["media", "mixed"] },
            { name: "Multimedia Carousel", tooltip: "Mixed content slider", tags: ["media", "mixed"] },
            { name: "Picture-in-Picture with Text", tooltip: "Media with text", tags: ["media", "mixed"] },
            { name: "Media Grid with Filter", tooltip: "Filterable media", tags: ["media", "interactive"] },
            { name: "Story Map", tooltip: "Media + geography", tags: ["media", "map"] },
          ],
        },
        "Embed & External": {
          items: [
            { name: "YouTube/Vimeo Embed", tooltip: "Video embed", tags: ["media", "embed"] },
            { name: "Podcast Embed", tooltip: "Spotify/Apple embed", tags: ["media", "embed"] },
            { name: "Social Media Embed", tooltip: "Twitter/Instagram", tags: ["media", "embed"] },
            { name: "Website Embed", tooltip: "iFrame embed", tags: ["media", "embed"] },
            { name: "Google Maps Embed", tooltip: "Map embed", tags: ["media", "embed", "map"] },
            { name: "Calendar Embed", tooltip: "Calendar widget", tags: ["media", "embed"] },
            { name: "Form Embed", tooltip: "External form", tags: ["media", "embed"] },
            { name: "3rd Party Tool Embed", tooltip: "Tool integration", tags: ["media", "embed"] },
            { name: "PDF Viewer", tooltip: "View PDFs", tags: ["media", "document"] },
            { name: "Document Viewer", tooltip: "Office files", tags: ["media", "document"] },
            { name: "Spreadsheet Embed", tooltip: "Excel/Sheets", tags: ["media", "document"] },
          ],
        },
        "Screen Recording & Demos": {
          items: [
            { name: "Software Simulation", tooltip: "Interactive demo", tags: ["media", "demo"] },
            { name: "Click-Through Demo", tooltip: "Step-by-step demo", tags: ["media", "demo"] },
            { name: "Guided Tour", tooltip: "Feature walkthrough", tags: ["media", "demo"] },
            { name: "Screen Recording Player", tooltip: "Recorded screen", tags: ["media", "video"] },
            { name: "Interactive Tutorial", tooltip: "Hands-on tutorial", tags: ["media", "interactive"] },
            { name: "Step-by-Step Walkthrough", tooltip: "Guided steps", tags: ["media", "tutorial"] },
          ],
        },
      },
    },
    "Interactive & Engagement": {
      groups: {
        "Conversations & Scenarios": {
          items: [
            { name: "Dialogue/Chat Simulation", tooltip: "Chat interface", tags: ["interactive", "scenario"] },
            { name: "Branching Scenario", tooltip: "Choose your path", tags: ["interactive", "scenario"] },
            { name: "Decision Point", tooltip: "Make a choice", tags: ["interactive", "decision"] },
            { name: "Choose Your Path", tooltip: "Story branches", tags: ["interactive", "scenario"] },
            { name: "Role-Play Scenario", tooltip: "Act out roles", tags: ["interactive", "scenario"] },
            { name: "What Would You Do?", tooltip: "Ethical dilemma", tags: ["interactive", "scenario"] },
            { name: "AI Chatbot Conversation", tooltip: "AI interaction", tags: ["interactive", "ai"] },
            { name: "Customer Service Simulator", tooltip: "Practice support", tags: ["interactive", "scenario"] },
            { name: "Negotiation Simulator", tooltip: "Practice negotiation", tags: ["interactive", "scenario"] },
            { name: "Conflict Resolution Scenario", tooltip: "Resolve conflicts", tags: ["interactive", "scenario"] },
            { name: "Interview Simulator", tooltip: "Practice interviews", tags: ["interactive", "scenario"] },
            { name: "Sales Pitch Practice", tooltip: "Practice selling", tags: ["interactive", "scenario"] },
          ],
        },
        Gamification: {
          items: [
            { name: "Challenge Block", tooltip: "Game challenge", tags: ["gamification", "interactive"] },
            { name: "Mystery Reveal", tooltip: "Unlock mystery", tags: ["gamification", "interactive"] },
            { name: "Unlock Content", tooltip: "Earn access", tags: ["gamification", "progress"] },
            { name: "Points/XP Display", tooltip: "Show points", tags: ["gamification", "progress"] },
            { name: "Badge Collection", tooltip: "Earn badges", tags: ["gamification", "achievement"] },
            { name: "Streak Counter", tooltip: "Track streaks", tags: ["gamification", "progress"] },
            { name: "Timer/Countdown", tooltip: "Time challenge", tags: ["gamification", "timer"] },
            { name: "Leaderboard", tooltip: "Rankings", tags: ["gamification", "competition"] },
            { name: "Achievement Unlocked", tooltip: "Achievement popup", tags: ["gamification", "achievement"] },
            { name: "Progress Quest Map", tooltip: "Journey map", tags: ["gamification", "progress"] },
            { name: "Level Indicator", tooltip: "Current level", tags: ["gamification", "progress"] },
            { name: "Reward Animation", tooltip: "Celebration", tags: ["gamification", "visual"] },
          ],
        },
        "Flashcards & Memory": {
          items: [
            { name: "Flashcard Grid", tooltip: "Grid of cards", tags: ["flashcard", "study"] },
            { name: "Flashcard Stack", tooltip: "Swipeable cards", tags: ["flashcard", "study"] },
            { name: "Memory Match Game", tooltip: "Match pairs", tags: ["flashcard", "game"] },
            { name: "Concentration Game", tooltip: "Memory game", tags: ["flashcard", "game"] },
            { name: "Flip & Learn Cards", tooltip: "Flip to reveal", tags: ["flashcard", "study"] },
            { name: "Study Mode Flashcards", tooltip: "Study session", tags: ["flashcard", "study"] },
            { name: "Spaced Repetition Flashcards", tooltip: "Optimized review", tags: ["flashcard", "study"] },
          ],
        },
        "Drag & Drop Interactions": {
          items: [
            { name: "Drag to Categorize", tooltip: "Sort into groups", tags: ["drag-drop", "interactive"] },
            { name: "Drag to Sort/Sequence", tooltip: "Order items", tags: ["drag-drop", "interactive"] },
            { name: "Drag to Match", tooltip: "Match pairs", tags: ["drag-drop", "interactive"] },
            { name: "Drag to Fill in the Blanks", tooltip: "Complete text", tags: ["drag-drop", "interactive"] },
            { name: "Drag to Build", tooltip: "Construct diagram", tags: ["drag-drop", "interactive"] },
            { name: "Drag to Timeline", tooltip: "Place on timeline", tags: ["drag-drop", "interactive"] },
            { name: "Drag Items on Image", tooltip: "Position on image", tags: ["drag-drop", "interactive"] },
            { name: "Drag to Organize", tooltip: "Organize items", tags: ["drag-drop", "interactive"] },
          ],
        },
        "Click & Reveal Interactions": {
          items: [
            { name: "Click to Reveal", tooltip: "Click to show", tags: ["click", "interactive"] },
            { name: "Progressive Click Reveal", tooltip: "Reveal in steps", tags: ["click", "interactive"] },
            { name: "Find the Hotspot", tooltip: "Click target", tags: ["click", "game"] },
            { name: "Click Sequence", tooltip: "Click in order", tags: ["click", "interactive"] },
            { name: "Memory/Concentration", tooltip: "Memory game", tags: ["click", "game"] },
            { name: "Spot the Difference", tooltip: "Find differences", tags: ["click", "game"] },
            { name: "Hidden Object Search", tooltip: "Find objects", tags: ["click", "game"] },
            { name: "Click to Animate", tooltip: "Trigger animation", tags: ["click", "animated"] },
          ],
        },
        "Sorting & Categorization": {
          items: [
            { name: "Sort Cards", tooltip: "Organize cards", tags: ["sorting", "interactive"] },
            { name: "Category Bins", tooltip: "Drop into bins", tags: ["sorting", "interactive"] },
            { name: "Priority Ranking", tooltip: "Rank by priority", tags: ["sorting", "interactive"] },
            { name: "Correct Order Sequencer", tooltip: "Put in order", tags: ["sorting", "interactive"] },
            { name: "Venn Diagram Sorter", tooltip: "Sort into Venn", tags: ["sorting", "interactive"] },
            { name: "Matrix Sorter", tooltip: "2D sorting", tags: ["sorting", "interactive"] },
            { name: "Filter & Sort Table", tooltip: "Interactive table", tags: ["sorting", "data"] },
          ],
        },
        "Simulation & Practice": {
          items: [
            { name: "Equipment Simulator", tooltip: "Virtual equipment", tags: ["simulation", "practice"] },
            { name: "Process Simulator", tooltip: "Practice process", tags: ["simulation", "practice"] },
            { name: "Lab Simulation", tooltip: "Virtual lab", tags: ["simulation", "science"] },
            { name: "Safety Procedure Practice", tooltip: "Safety training", tags: ["simulation", "practice"] },
            { name: "Troubleshooting Simulator", tooltip: "Debug problems", tags: ["simulation", "practice"] },
            { name: "System Navigation Practice", tooltip: "Learn interface", tags: ["simulation", "practice"] },
            { name: "Form Completion Practice", tooltip: "Practice forms", tags: ["simulation", "practice"] },
            { name: "Software Interface Replica", tooltip: "UI practice", tags: ["simulation", "practice"] },
          ],
        },
      },
    },
    "Assessment & Quiz": {
      groups: {
        "Question Types": {
          items: [
            { name: "Multiple Choice", tooltip: "Single answer", tags: ["assessment", "quiz"] },
            { name: "Multiple Select", tooltip: "Multiple answers", tags: ["assessment", "quiz"] },
            { name: "True/False", tooltip: "Binary choice", tags: ["assessment", "quiz"] },
            { name: "Fill in the Blank", tooltip: "Complete text", tags: ["assessment", "quiz"] },
            { name: "Short Answer", tooltip: "Brief response", tags: ["assessment", "quiz"] },
            { name: "Essay/Long Answer", tooltip: "Extended response", tags: ["assessment", "quiz"] },
            { name: "Matching", tooltip: "Match pairs", tags: ["assessment", "quiz"] },
            { name: "Drag & Drop Answer", tooltip: "Drag to answer", tags: ["assessment", "interactive"] },
            { name: "Hotspot Question", tooltip: "Click on image", tags: ["assessment", "interactive"] },
            { name: "Image-Based Question", tooltip: "Image answer", tags: ["assessment", "visual"] },
            { name: "Audio-Based Question", tooltip: "Listen and answer", tags: ["assessment", "audio"] },
            { name: "Video-Based Question", tooltip: "Watch and answer", tags: ["assessment", "video"] },
            { name: "Sequence/Order Question", tooltip: "Put in order", tags: ["assessment", "interactive"] },
            { name: "Matrix/Grid Question", tooltip: "Grid selection", tags: ["assessment", "quiz"] },
          ],
        },
        "Quiz Formats": {
          items: [
            { name: "Pop Quiz", tooltip: "Surprise quiz", tags: ["assessment", "quiz"] },
            { name: "End of Module Quiz", tooltip: "Module assessment", tags: ["assessment", "quiz"] },
            { name: "Pre-Assessment", tooltip: "Before learning", tags: ["assessment", "diagnostic"] },
            { name: "Post-Assessment", tooltip: "After learning", tags: ["assessment", "summative"] },
            { name: "Self-Check Questions", tooltip: "Practice questions", tags: ["assessment", "formative"] },
            { name: "Practice Quiz", tooltip: "No score", tags: ["assessment", "practice"] },
            { name: "Timed Quiz", tooltip: "Time limit", tags: ["assessment", "timed"] },
            { name: "Adaptive Quiz", tooltip: "Adjusts difficulty", tags: ["assessment", "adaptive"] },
            { name: "Randomized Question Pool", tooltip: "Random questions", tags: ["assessment", "quiz"] },
            { name: "Progressive Quiz", tooltip: "Unlock questions", tags: ["assessment", "gamification"] },
            { name: "Challenge Quiz", tooltip: "High difficulty", tags: ["assessment", "challenge"] },
            { name: "Peer Review Quiz", tooltip: "Review peers", tags: ["assessment", "peer"] },
          ],
        },
        "AI-Powered Assessments": {
          items: [
            { name: "AI Adaptive Quiz", tooltip: "AI adjusts difficulty", tags: ["assessment", "ai"] },
            { name: "AI-Generated Questions", tooltip: "Auto-create questions", tags: ["assessment", "ai"] },
            { name: "AI Essay Grader", tooltip: "AI feedback", tags: ["assessment", "ai"] },
            { name: "AI Good-Better-Best Analysis", tooltip: "Answer quality", tags: ["assessment", "ai"] },
            { name: "AI Comprehension Checker", tooltip: "Understanding check", tags: ["assessment", "ai"] },
            { name: "AI Speaking Assessment", tooltip: "Speech analysis", tags: ["assessment", "ai"] },
            { name: "AI Pronunciation Checker", tooltip: "Pronunciation feedback", tags: ["assessment", "ai"] },
            { name: "AI Concept Mastery Detector", tooltip: "Mastery level", tags: ["assessment", "ai"] },
            { name: "AI Personalized Quiz Path", tooltip: "Custom path", tags: ["assessment", "ai"] },
            { name: "AI Question Recommender", tooltip: "Suggest questions", tags: ["assessment", "ai"] },
          ],
        },
        "Feedback & Results": {
          items: [
            { name: "Instant Feedback Block", tooltip: "Immediate feedback", tags: ["assessment", "feedback"] },
            { name: "Detailed Explanation", tooltip: "Answer explanation", tags: ["assessment", "feedback"] },
            { name: "Try Again Option", tooltip: "Retry question", tags: ["assessment", "feedback"] },
            { name: "Hint System", tooltip: "Progressive hints", tags: ["assessment", "help"] },
            { name: "Answer Rationale", tooltip: "Why correct/incorrect", tags: ["assessment", "feedback"] },
            { name: "Performance Dashboard", tooltip: "Results overview", tags: ["assessment", "analytics"] },
            { name: "Skills Gap Analysis", tooltip: "Identify gaps", tags: ["assessment", "analytics"] },
            { name: "Recommendation Engine", tooltip: "Next steps", tags: ["assessment", "ai"] },
            { name: "Certificate Generator", tooltip: "Award certificate", tags: ["assessment", "completion"] },
            { name: "Score Report", tooltip: "Detailed scores", tags: ["assessment", "analytics"] },
          ],
        },
      },
    },
    "Layout & Navigation": {
      groups: {
        "Dividers & Spacers": {
          items: [
            { name: "Simple Divider Line", tooltip: "Horizontal line", tags: ["layout", "divider"] },
            { name: "Styled Divider", tooltip: "With icon/text", tags: ["layout", "divider"] },
            { name: "Numbered Section Divider", tooltip: "Section numbers", tags: ["layout", "divider"] },
            { name: "Spacer", tooltip: "Adjustable height", tags: ["layout", "spacer"] },
            { name: "Chapter Break", tooltip: "Chapter separator", tags: ["layout", "divider"] },
            { name: "Module Separator", tooltip: "Module break", tags: ["layout", "divider"] },
            { name: "Gradient Divider", tooltip: "Gradient line", tags: ["layout", "divider"] },
            { name: "Animated Divider", tooltip: "Animated separator", tags: ["layout", "animated"] },
          ],
        },
        "Buttons & CTAs": {
          items: [
            { name: "Primary Button", tooltip: "Main action", tags: ["button", "cta"] },
            { name: "Secondary Button", tooltip: "Secondary action", tags: ["button", "cta"] },
            { name: "Text Link Button", tooltip: "Link style", tags: ["button", "link"] },
            { name: "Icon Button", tooltip: "Icon only", tags: ["button", "icon"] },
            { name: "Download Button", tooltip: "Download file", tags: ["button", "download"] },
            { name: "External Link Button", tooltip: "Open external", tags: ["button", "link"] },
            { name: "Branching Button", tooltip: "Navigate content", tags: ["button", "navigation"] },
            { name: "Continue Button", tooltip: "Next step", tags: ["button", "navigation"] },
            { name: "Back Button", tooltip: "Previous step", tags: ["button", "navigation"] },
            { name: "Skip Button", tooltip: "Skip section", tags: ["button", "navigation"] },
            { name: "Save Progress Button", tooltip: "Save state", tags: ["button", "save"] },
            { name: "Bookmark Button", tooltip: "Bookmark page", tags: ["button", "bookmark"] },
            { name: "Share Button", tooltip: "Share content", tags: ["button", "social"] },
            { name: "Print Button", tooltip: "Print page", tags: ["button", "print"] },
            { name: "Button Group/Stack", tooltip: "Multiple buttons", tags: ["button", "group"] },
          ],
        },
        "Navigation Elements": {
          items: [
            { name: "Breadcrumb Navigation", tooltip: "Path trail", tags: ["navigation", "breadcrumb"] },
            { name: "Progress Bar", tooltip: "Course progress", tags: ["navigation", "progress"] },
            { name: "Table of Contents", tooltip: "Content outline", tags: ["navigation", "toc"] },
            { name: "Chapter Navigation", tooltip: "Chapter links", tags: ["navigation", "chapter"] },
            { name: "Previous/Next Navigation", tooltip: "Page navigation", tags: ["navigation", "paging"] },
            { name: "Jump to Section Menu", tooltip: "Quick jump", tags: ["navigation", "menu"] },
            { name: "Anchor Links", tooltip: "Page anchors", tags: ["navigation", "anchor"] },
            { name: "Sticky Navigation", tooltip: "Fixed nav", tags: ["navigation", "sticky"] },
            { name: "Side Navigation Panel", tooltip: "Sidebar nav", tags: ["navigation", "sidebar"] },
            { name: "Hamburger Menu", tooltip: "Mobile menu", tags: ["navigation", "mobile"] },
            { name: "Floating Action Button", tooltip: "FAB", tags: ["navigation", "fab"] },
          ],
        },
        "Containers & Layouts": {
          items: [
            { name: "Section Container", tooltip: "Content section", tags: ["layout", "container"] },
            { name: "Card Container", tooltip: "Card layout", tags: ["layout", "card"] },
            { name: "Grid Container", tooltip: "Grid layout", tags: ["layout", "grid"] },
            { name: "Flex Layout", tooltip: "Flexbox layout", tags: ["layout", "flex"] },
            { name: "Sidebar Layout", tooltip: "With sidebar", tags: ["layout", "sidebar"] },
            { name: "Hero Section", tooltip: "Hero banner", tags: ["layout", "hero"] },
            { name: "Feature Block", tooltip: "Feature showcase", tags: ["layout", "feature"] },
            { name: "Column Wrapper", tooltip: "Multi-column", tags: ["layout", "column"] },
            { name: "Tabbed Container", tooltip: "Tab layout", tags: ["layout", "tabs"] },
            { name: "Modal/Dialog Box", tooltip: "Popup dialog", tags: ["layout", "modal"] },
            { name: "Popover", tooltip: "Hover popup", tags: ["layout", "popover"] },
            { name: "Slide-Out Panel", tooltip: "Side panel", tags: ["layout", "panel"] },
            { name: "Collapsible Section", tooltip: "Expandable section", tags: ["layout", "collapsible"] },
          ],
        },
      },
    },
    "AI-Powered Blocks": {
      groups: {
        "AI Content Generation": {
          items: [
            { name: "AI Summary Generator", tooltip: "Auto-summarize", tags: ["ai", "content"] },
            { name: "AI Concept Explainer", tooltip: "Explain concepts", tags: ["ai", "content"] },
            { name: "AI Alternative Examples", tooltip: "Generate examples", tags: ["ai", "content"] },
            { name: "AI Analogy Creator", tooltip: "Create analogies", tags: ["ai", "content"] },
            { name: "AI Translation", tooltip: "Translate content", tags: ["ai", "translation"] },
            { name: "AI Simplification", tooltip: "Adjust reading level", tags: ["ai", "content"] },
            { name: "AI Content Expander", tooltip: "Expand content", tags: ["ai", "content"] },
            { name: "AI Practice Question Generator", tooltip: "Create questions", tags: ["ai", "assessment"] },
            { name: "AI Flashcard Generator", tooltip: "Create flashcards", tags: ["ai", "study"] },
            { name: "AI Study Guide Creator", tooltip: "Generate study guide", tags: ["ai", "study"] },
          ],
        },
        "AI Audio (TTS)": {
          items: [
            { name: "Read Aloud", tooltip: "Text to speech", tags: ["ai", "audio", "tts"] },
            { name: "Audio Narration with Highlight", tooltip: "Follow along", tags: ["ai", "audio"] },
            { name: "Pronunciation Guide", tooltip: "How to pronounce", tags: ["ai", "audio"] },
            { name: "Multi-Language Audio", tooltip: "Multiple languages", tags: ["ai", "audio"] },
            { name: "Dialogue with Different Voices", tooltip: "Character voices", tags: ["ai", "audio"] },
            { name: "Audio Description", tooltip: "Describe visuals", tags: ["ai", "audio", "accessibility"] },
            { name: "Speed-Adjustable Narration", tooltip: "Control speed", tags: ["ai", "audio"] },
            { name: "Audio Summary", tooltip: "Summarize as audio", tags: ["ai", "audio"] },
          ],
        },
        "AI Voice (STT)": {
          items: [
            { name: "Voice Response Input", tooltip: "Speak answers", tags: ["ai", "voice", "stt"] },
            { name: "Pronunciation Practice", tooltip: "Practice speaking", tags: ["ai", "voice"] },
            { name: "Voice Reflection Journal", tooltip: "Voice journal", tags: ["ai", "voice"] },
            { name: "Speak-to-Search", tooltip: "Voice search", tags: ["ai", "voice"] },
            { name: "Voice Commands", tooltip: "Control with voice", tags: ["ai", "voice"] },
            { name: "Verbal Quiz Responses", tooltip: "Speak answers", tags: ["ai", "voice", "assessment"] },
            { name: "Language Practice", tooltip: "Practice language", tags: ["ai", "voice"] },
            { name: "Voice Navigation", tooltip: "Navigate by voice", tags: ["ai", "voice"] },
          ],
        },
        "AI Tutor & Assistance": {
          items: [
            { name: "AI Tutor Chatbot", tooltip: "Chat with AI tutor", tags: ["ai", "tutor"] },
            { name: "Ask AI Anything", tooltip: "Ask questions", tags: ["ai", "tutor"] },
            { name: "AI Homework Helper", tooltip: "Get help", tags: ["ai", "tutor"] },
            { name: "AI Concept Clarifier", tooltip: "Clarify concepts", tags: ["ai", "tutor"] },
            { name: "AI Study Buddy", tooltip: "Study companion", tags: ["ai", "tutor"] },
            { name: "AI Debate Partner", tooltip: "Practice debate", tags: ["ai", "tutor"] },
            { name: "AI Scenario Simulator", tooltip: "Simulate scenarios", tags: ["ai", "simulation"] },
            { name: "AI Feedback Provider", tooltip: "Get feedback", tags: ["ai", "feedback"] },
          ],
        },
        "AI Personalization": {
          items: [
            {
              name: "Adaptive Content Recommendations",
              tooltip: "Personalized content",
              tags: ["ai", "personalization"],
            },
            { name: "Learning Path Optimizer", tooltip: "Optimize path", tags: ["ai", "personalization"] },
            { name: "Difficulty Adjuster", tooltip: "Adjust difficulty", tags: ["ai", "adaptive"] },
            { name: "Interest-Based Content", tooltip: "Match interests", tags: ["ai", "personalization"] },
            { name: "Learning Style Adaptation", tooltip: "Adapt to style", tags: ["ai", "personalization"] },
            { name: "Pace Recommender", tooltip: "Suggest pace", tags: ["ai", "personalization"] },
            { name: "Knowledge Gap Identifier", tooltip: "Find gaps", tags: ["ai", "analytics"] },
            { name: "Smart Review Scheduler", tooltip: "Schedule reviews", tags: ["ai", "spaced-repetition"] },
          ],
        },
      },
    },
    "Developer & Creation Tools": {
      groups: {
        "AI-Assisted Development": {
          items: [
            { name: "AI Magic Import", tooltip: "Smart content import", tags: ["developer", "ai"] },
            { name: "AI Content Analyzer", tooltip: "Analyze and suggest", tags: ["developer", "ai"] },
            { name: "AI Image Generator", tooltip: "Generate images", tags: ["developer", "ai"] },
            { name: "AI TTS Generator", tooltip: "Batch audio", tags: ["developer", "ai"] },
            { name: "AI Alt Text Generator", tooltip: "Auto alt text", tags: ["developer", "ai", "accessibility"] },
            { name: "AI Course Outline Generator", tooltip: "Create outline", tags: ["developer", "ai"] },
            { name: "AI Quiz Generator", tooltip: "Auto-create quizzes", tags: ["developer", "ai"] },
            { name: "AI Translation Pipeline", tooltip: "Bulk translate", tags: ["developer", "ai"] },
            { name: "AI Content Optimizer", tooltip: "Improve engagement", tags: ["developer", "ai"] },
            { name: "AI Accessibility Fixer", tooltip: "Fix a11y issues", tags: ["developer", "ai", "accessibility"] },
          ],
        },
        "Visual Development": {
          items: [
            { name: "WYSIWYG Editor", tooltip: "Visual editor", tags: ["developer", "visual"] },
            { name: "Template Library", tooltip: "Pre-built templates", tags: ["developer", "template"] },
            { name: "Theme Builder", tooltip: "Custom styling", tags: ["developer", "theme"] },
            { name: "Component Library", tooltip: "Reusable components", tags: ["developer", "component"] },
            { name: "Style Guide Generator", tooltip: "Brand guidelines", tags: ["developer", "design"] },
            { name: "Responsive Preview", tooltip: "Test devices", tags: ["developer", "responsive"] },
            { name: "A/B Test Creator", tooltip: "Compare variations", tags: ["developer", "testing"] },
            { name: "Animation Builder", tooltip: "GSAP animations", tags: ["developer", "animation"] },
            { name: "CSS Grid Builder", tooltip: "Visual grid", tags: ["developer", "layout"] },
            { name: "Flexbox Builder", tooltip: "Visual flex", tags: ["developer", "layout"] },
          ],
        },
        "Code & Custom Blocks": {
          items: [
            { name: "Custom HTML/CSS/JS Block", tooltip: "Code custom blocks", tags: ["developer", "code"] },
            { name: "React Component Block", tooltip: "Import React", tags: ["developer", "react"] },
            { name: "Code Sandbox Integration", tooltip: "Test code", tags: ["developer", "code"] },
            { name: "API Connector Block", tooltip: "Connect APIs", tags: ["developer", "api"] },
            { name: "Webhook Trigger", tooltip: "Event integrations", tags: ["developer", "webhook"] },
            { name: "Custom Quiz Logic", tooltip: "Code assessments", tags: ["developer", "assessment"] },
            { name: "Data Transform Block", tooltip: "Process data", tags: ["developer", "data"] },
            { name: "Calculation Engine", tooltip: "Custom calculators", tags: ["developer", "calculator"] },
          ],
        },
        "Accessibility Tools": {
          items: [
            {
              name: "Persona-Based A11y Simulator",
              tooltip: "Experience as users",
              tags: ["developer", "accessibility"],
            },
            { name: "Screen Reader Preview", tooltip: "Hear navigation", tags: ["developer", "accessibility"] },
            { name: "Keyboard Navigation Tester", tooltip: "Tab-through test", tags: ["developer", "accessibility"] },
            { name: "Color Contrast Checker", tooltip: "Check contrast", tags: ["developer", "accessibility"] },
            { name: "Font Readability Analyzer", tooltip: "Typography test", tags: ["developer", "accessibility"] },
            { name: "Alternative Text Reviewer", tooltip: "Check alt text", tags: ["developer", "accessibility"] },
            { name: "Captions Quality Checker", tooltip: "Analyze captions", tags: ["developer", "accessibility"] },
            { name: "WCAG Compliance Scanner", tooltip: "Full audit", tags: ["developer", "accessibility"] },
            { name: "UDL Analyzer", tooltip: "UDL feedback", tags: ["developer", "accessibility"] },
            { name: "Cognitive Load Meter", tooltip: "Measure density", tags: ["developer", "analytics"] },
            { name: "Reading Level Analyzer", tooltip: "Flesch-Kincaid", tags: ["developer", "analytics"] },
            { name: "Dyslexia-Friendly Font Toggle", tooltip: "OpenDyslexic", tags: ["developer", "accessibility"] },
          ],
        },
        "Analytics & Tracking": {
          items: [
            { name: "xAPI Statement Builder", tooltip: "Learning records", tags: ["developer", "analytics"] },
            { name: "Event Tracker Setup", tooltip: "Custom events", tags: ["developer", "analytics"] },
            { name: "Heatmap Integration", tooltip: "Click tracking", tags: ["developer", "analytics"] },
            { name: "Time-on-Task Monitor", tooltip: "Engagement metrics", tags: ["developer", "analytics"] },
            { name: "Drop-off Analysis", tooltip: "Identify exits", tags: ["developer", "analytics"] },
            { name: "Assessment Analytics", tooltip: "Question analysis", tags: ["developer", "analytics"] },
            { name: "Learning Path Visualization", tooltip: "Journey map", tags: ["developer", "analytics"] },
            { name: "Cohort Comparison", tooltip: "Compare groups", tags: ["developer", "analytics"] },
            { name: "A/B Test Results", tooltip: "Statistical testing", tags: ["developer", "analytics"] },
            { name: "Export Analytics Dashboard", tooltip: "Generate reports", tags: ["developer", "analytics"] },
          ],
        },
      },
    },
  }

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    Object.values(megaCategories).forEach((category) => {
      Object.values(category.groups).forEach((group) => {
        group.items.forEach((item) => {
          item.tags.forEach((tag) => tags.add(tag))
        })
      })
    })
    return Array.from(tags).sort()
  }, [megaCategories])

  const filteredMegaCategories = useMemo(() => {
    if (!searchQuery && selectedTags.length === 0) return megaCategories

    const filtered: typeof megaCategories = {}

    Object.entries(megaCategories).forEach(([megaCategoryName, megaCategory]) => {
      const filteredGroups: typeof megaCategory.groups = {}

      Object.entries(megaCategory.groups).forEach(([groupName, group]) => {
        const filteredItems = group.items.filter((item) => {
          const matchesSearch =
            !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tooltip.toLowerCase().includes(searchQuery.toLowerCase())

          const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))

          return matchesSearch && matchesTags
        })

        if (filteredItems.length > 0) {
          filteredGroups[groupName] = { items: filteredItems }
        }
      })

      if (Object.keys(filteredGroups).length > 0) {
        filtered[megaCategoryName] = { groups: filteredGroups }
      }
    })

    return filtered
  }, [searchQuery, selectedTags, megaCategories])

  const toggleFavorite = (itemName: string) => {
    setFavorites((prev) => (prev.includes(itemName) ? prev.filter((f) => f !== itemName) : [...prev, itemName]))
  }

  const addToRecentlyUsed = (itemName: string) => {
    setRecentlyUsed((prev) => {
      const filtered = prev.filter((item) => item !== itemName)
      return [itemName, ...filtered].slice(0, 10)
    })
  }

  const toggleMegaCategory = (categoryName: string) => {
    setExpandedMegaCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName],
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const addBlock = async (blockName: string) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type: blockName,
      variant: "default",
      content: "",
      seoLabel: "",
      seoLevel: "h2",
      isChecked: false,
      customCode: {
        html: "",
        css: "",
        java: "",
        apiKey: "",
      },
    }

    if (lessonId) {
      setIsSaving(true)
      const savedBlock = await addBlockToLesson(lessonId, {
        block_type: blockName,
        content: {
          content: newBlock.content,
          seoLabel: newBlock.seoLabel,
          seoLevel: newBlock.seoLevel,
          customCode: newBlock.customCode,
        },
        order_index: blocks.length,
        cognitive_load_weight: calculateBlockCognitiveLoad(blockName),
        estimated_time_seconds: Math.ceil(blocks.length * 1.5) * 60,
      })

      if (savedBlock) {
        newBlock.id = savedBlock.id
      }
      setLastSaved(new Date())
      setIsSaving(false)
    }

    setBlocks([...blocks, newBlock])
    addToRecentlyUsed(blockName)
  }

  const deleteBlock = async (blockId: string) => {
    if (lessonId) {
      setIsSaving(true)
      await deleteBlockAction(blockId)
      setLastSaved(new Date())
      setIsSaving(false)
    }

    setBlocks(blocks.filter((b) => b.id !== blockId))
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null)
      setIsCustomizationOpen(false)
    }
  }

  const calculateBlockCognitiveLoad = (blockType: string): number => {
    if (blockType.includes("Text") || blockType.includes("Paragraph")) return 3
    if (blockType.includes("Interactive") || blockType.includes("Quiz")) return 8
    if (blockType.includes("Video") || blockType.includes("Image")) return 6
    return 5
  }

  const handleDragStart = (block: Block) => {
    setDraggedBlock(block)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (!draggedBlock) return

    const dragIndex = blocks.findIndex((b) => b.id === draggedBlock.id)
    const newBlocks = [...blocks]
    newBlocks.splice(dragIndex, 1)
    newBlocks.splice(dropIndex, 0, draggedBlock)

    setBlocks(newBlocks)

    if (lessonId) {
      setIsSaving(true)
      // Update all affected blocks with new order
      await Promise.all(newBlocks.map((block, index) => updateBlock(block.id, { order_index: index })))
      setLastSaved(new Date())
      setIsSaving(false)
    }

    setDraggedBlock(null)
    setDragOverIndex(null)
  }

  const toolbarCategories = [
    { name: "Text Blocks", icon: Type, megaCategory: "Text Blocks" },
    { name: "Image Blocks", icon: ImageIcon, megaCategory: "Image Blocks" },
    { name: "Charts & Data", icon: PieChart, megaCategory: "Chart & Data Visualization" },
    { name: "Media Blocks", icon: Video, megaCategory: "Media Blocks" },
    { name: "Interactive", icon: Gamepad2, megaCategory: "Interactive & Engagement" },
    { name: "Assessment", icon: ClipboardCheck, megaCategory: "Assessment & Quiz" },
    { name: "Layout", icon: LayoutGrid, megaCategory: "Layout & Navigation" },
    { name: "AI-Powered", icon: Sparkles, megaCategory: "AI-Powered Blocks" },
    { name: "Developer", icon: Wrench, megaCategory: "Developer & Creation Tools" },
  ]

  const developerTools = [
    {
      name: "AI Tools",
      icon: Zap,
      items: ["AI Magic Import", "AI Content Analyzer", "AI Image Generator", "AI Quiz Generator"],
    },
    {
      name: "Visual Tools",
      icon: Palette,
      items: ["WYSIWYG Editor", "Theme Builder", "Responsive Preview", "Animation Builder"],
    },
    {
      name: "Code Tools",
      icon: Code,
      items: ["Custom HTML/CSS/JS Block", "React Component Block", "API Connector Block", "Code Sandbox Integration"],
    },
    {
      name: "Accessibility",
      icon: Eye,
      items: [
        "Persona-Based A11y Simulator",
        "Screen Reader Preview",
        "Keyboard Navigation Tester",
        "Color Contrast Checker",
      ],
    },
    {
      name: "Analytics",
      icon: BarChart3,
      items: ["xAPI Statement Builder", "Event Tracker Setup", "Heatmap Integration", "Drop-off Analysis"],
    },
    {
      name: "Export",
      icon: Download,
      items: ["xAPI Statement Builder", "Export Analytics Dashboard", "HTML5 Package", "PDF Generator"],
    },
  ]

  const cognitiveLoad = useMemo(() => {
    const baseLoad = blocks.length * 5
    const textBlocks = blocks.filter((b) => b.type.includes("Text") || b.type.includes("Paragraph")).length
    const interactiveBlocks = blocks.filter((b) => b.type.includes("Interactive") || b.type.includes("Quiz")).length
    const mediaBlocks = blocks.filter((b) => b.type.includes("Video") || b.type.includes("Image")).length

    const totalLoad = baseLoad + textBlocks * 3 + interactiveBlocks * 8 + mediaBlocks * 6
    const percentage = Math.min(100, totalLoad)

    return {
      percentage,
      level: percentage < 40 ? "Low" : percentage < 70 ? "Moderate" : "High",
      color: percentage < 40 ? "text-green-600" : percentage < 70 ? "text-yellow-600" : "text-red-600",
    }
  }, [blocks])

  const getFirstBlockFromCategory = (megaCategoryName: string): string | null => {
    const category = megaCategories[megaCategoryName]
    if (!category) return null

    const firstGroup = Object.values(category.groups)[0]
    if (!firstGroup || firstGroup.items.length === 0) return null

    return firstGroup.items[0].name
  }

  const handleToolbarCategoryClick = (megaCategoryName: string) => {
    const firstBlock = getFirstBlockFromCategory(megaCategoryName)
    if (firstBlock) {
      addBlock(firstBlock)
    }
    // Also open the toolbar to show more options
    setIsToolbarExpanded(true)
    setExpandedToolbarCategory(megaCategoryName)
  }

  return (
    // Updated overall layout to be dashboard-style and used specific colors
    <div className="flex h-screen bg-[#F5F5F5] flex-col">
      <header className="bg-[#F5F5F5] border-b border-[#001d3d]">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/course-creation">
              <Button variant="ghost" size="icon" className="hover:bg-[#e3f2fd] rounded-[10px]">
                <ArrowLeft className="w-5 h-5 text-[#003066]" />
              </Button>
            </Link>
            <Image src="/lxp360-logo.png" alt="LXP 360" width={120} height={48} className="h-10 w-auto" priority />

            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/dashboard"
                className="hover:text-[#0072f5] transition-colors flex items-center gap-1 text-[#003066]"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#003066]" />
              <Link
                href="/course-creation"
                className="hover:text-[#0072f5] transition-colors flex items-center gap-1 text-[#003066]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Program Name</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#003066]" />
              <Link
                href="/course-creation"
                className="hover:text-[#0072f5] transition-colors flex items-center gap-1 text-[#003066]"
              >
                <Layers className="w-4 h-4" />
                <span>Course Name</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#003066]" />
              <Link
                href="/course-creation"
                className="hover:text-[#0072f5] transition-colors flex items-center gap-1 text-[#003066]"
              >
                <FileText className="w-4 h-4" />
                <span>Module Name</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-[#003066]" />
              <Input
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="font-semibold text-[#001d3d] border-none focus-visible:ring-1 focus-visible:ring-[#0072f5] px-2 py-0 h-6 w-48 bg-transparent"
                placeholder="Lesson Title"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isSaving && <span className="text-sm text-[#003066]">Saving...</span>}
            {lastSaved && !isSaving && (
              <span className="text-sm text-[#003066]">Saved {lastSaved.toLocaleTimeString()}</span>
            )}
            <div className="bg-[#003066] px-6 py-2 rounded-[10px]">
              <p className="text-white font-medium">Lesson Builder</p>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-[#001d3d] bg-[#F5F5F5]">
        <nav className="flex gap-2 px-6 py-3">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#0072f5] hover:bg-[#0056b8] text-white text-sm font-medium rounded-[10px] transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/course-creation"
            className="px-6 py-3 bg-[#0072f5] hover:bg-[#0056b8] text-white text-sm font-medium rounded-[10px] transition-colors"
          >
            Course Overview
          </Link>
          <Link
            href="/lesson"
            className="px-6 py-3 bg-[#0072f5] hover:bg-[#0056b8] text-white text-sm font-medium rounded-[10px] ring-2 ring-white transition-colors"
          >
            Lesson Builder
          </Link>
          <Link
            href="/analytics"
            className="px-6 py-3 bg-[#0072f5] hover:bg-[#0056b8] text-white text-sm font-medium rounded-[10px] transition-colors"
          >
            Analytics
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 bg-[#0072f5] hover:bg-[#0056b8] text-white text-sm font-medium rounded-[10px] transition-colors"
          >
            Resources
          </Link>
        </nav>
      </div>

      <Ribbon />

      <div className="flex flex-1 overflow-hidden">
        <div className="border-r border-[#001d3d] bg-[#F5F5F5] flex">
          <div className="w-20 bg-[#F5F5F5] p-2 space-y-2 border-r border-[#001d3d]">
            <button
              className="w-full bg-[#4a5568] hover:bg-[#5a6578] rounded-[10px] p-3 flex flex-col items-center gap-1 transition-colors"
              onClick={() => setIsToolbarExpanded(!isToolbarExpanded)}
              title="Toggle Menu"
            >
              <Menu className="w-6 h-6 text-white" />
              <span className="text-white text-[10px] font-medium">Menu</span>
            </button>

            {toolbarCategories.map((category) => (
              <button
                key={category.name}
                className={`w-full rounded-[10px] p-3 flex flex-col items-center gap-1 transition-colors ${
                  expandedToolbarCategory === category.megaCategory
                    ? "bg-[#0072f5] hover:bg-[#0056b8]"
                    : "bg-[#4a5568] hover:bg-[#5a6578]"
                }`}
                onClick={() => handleToolbarCategoryClick(category.megaCategory)}
                title={`Add ${category.name}`}
              >
                <category.icon className="w-6 h-6 text-white" />
                <span className="text-white text-[10px] font-medium text-center leading-tight">{category.name}</span>
              </button>
            ))}
          </div>

          {isToolbarExpanded && (
            <div className="w-96 bg-white flex flex-col border-r border-[#001d3d]">
              <div className="p-4 border-b border-[#001d3d] space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#001d3d]">Block Library</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsToolbarExpanded(false)}
                    className="hover:bg-[#e3f2fd]"
                  >
                    <X className="w-4 h-4 text-[#003066]" />
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003066]" />
                  <Input
                    placeholder="Search blocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-[#001d3d] focus-visible:ring-[#0072f5]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={showFilters ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className={
                      showFilters
                        ? "bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
                        : "border-[#001d3d] text-[#003066] hover:bg-[#e3f2fd] rounded-[10px]"
                    }
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  {selectedTags.length > 0 && (
                    <Badge variant="secondary" className="bg-[#e3f2fd] text-[#0072f5]">
                      {selectedTags.length} active
                    </Badge>
                  )}
                </div>

                {showFilters && (
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer rounded-[10px] ${
                          selectedTags.includes(tag)
                            ? "bg-[#0072f5] hover:bg-[#0056b8] text-white"
                            : "border-[#001d3d] text-[#003066] hover:bg-[#e3f2fd]"
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {favorites.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-[#001d3d]">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      Favorites
                    </h3>
                    <div className="space-y-1">
                      {favorites.map((fav) => (
                        <Button
                          key={fav}
                          variant="ghost"
                          className="w-full justify-start text-sm hover:bg-[#e3f2fd] text-[#003066] rounded-[10px]"
                          onClick={() => addBlock(fav)}
                        >
                          {fav}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {recentlyUsed.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2 text-[#001d3d]">
                      <Clock className="w-4 h-4 text-[#0072f5]" />
                      Recently Used
                    </h3>
                    <div className="space-y-1">
                      {recentlyUsed.map((recent) => (
                        <Button
                          key={recent}
                          variant="ghost"
                          className="w-full justify-start text-sm hover:bg-[#e3f2fd] text-[#003066] rounded-[10px]"
                          onClick={() => addBlock(recent)}
                        >
                          {recent}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {Object.entries(filteredMegaCategories).map(([megaCategoryName, megaCategory]) => (
                  <div key={megaCategoryName} className="space-y-2">
                    <button
                      onClick={() => toggleMegaCategory(megaCategoryName)}
                      className="flex items-center gap-2 w-full text-left font-semibold hover:text-[#0072f5] transition-colors text-[#001d3d]"
                    >
                      {expandedMegaCategories.includes(megaCategoryName) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      {megaCategoryName}
                    </button>

                    {expandedMegaCategories.includes(megaCategoryName) && (
                      <div className="ml-6 space-y-3">
                        {Object.entries(megaCategory.groups).map(([groupName, group]) => (
                          <div key={groupName} className="space-y-1">
                            <p className="text-xs font-medium text-[#003066]">{groupName}</p>
                            {group.items.map((item) => (
                              <div key={item.name} className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  className={`flex-1 justify-start text-sm h-8 hover:bg-[#e3f2fd] rounded-[10px] ${
                                    builtBlocks.has(item.name) ? "text-green-600 font-semibold" : "text-[#003066]"
                                  }`}
                                  onClick={() => addBlock(item.name)}
                                  title={item.tooltip}
                                >
                                  {item.name}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 flex-shrink-0 hover:bg-[#e3f2fd]"
                                  onClick={() => toggleFavorite(item.name)}
                                >
                                  <Star
                                    className={`w-3 h-3 ${
                                      favorites.includes(item.name)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-[#003066]"
                                    }`}
                                  />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Canvas Area */}
          <div className="flex-1 overflow-y-auto p-6 relative">
            <div className="max-w-4xl mx-auto space-y-4">
              {blocks.length === 0 ? (
                <Card className="p-12 text-center border-dashed border-[#001d3d]">
                  <p className="text-[#003066] mb-4">No blocks added yet</p>
                  <Button
                    onClick={() => setIsToolbarExpanded(true)}
                    className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Block
                  </Button>
                </Card>
              ) : (
                blocks.map((block, index) => (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={() => handleDragStart(block)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`relative group cursor-move hover:ring-2 hover:ring-[#0072f5] transition-all rounded-lg ${
                      dragOverIndex === index ? "ring-2 ring-[#0072f5]" : ""
                    }`}
                  >
                    <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-[#001d3d]">
                        <GripVertical className="w-5 h-5 text-[#003066] cursor-grab active:cursor-grabbing" />
                        <span className="text-sm font-medium text-[#001d3d]">{block.type}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-2 shadow-lg border border-[#001d3d]">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedBlock(block)
                            setIsCustomizationOpen(true)
                          }}
                          className="h-8 w-8 hover:bg-[#e3f2fd]"
                        >
                          <Settings className="w-4 h-4 text-[#0072f5]" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteBlock(block.id)}
                          className="h-8 w-8 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="pointer-events-auto">{renderBlockComponent(block)}</div>
                  </div>
                ))
              )}

              <Button
                variant="outline"
                className="w-full border-dashed border-[#001d3d] bg-transparent text-[#0072f5] hover:bg-[#e3f2fd] rounded-[10px]"
                onClick={() => setIsToolbarExpanded(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Block
              </Button>
            </div>

            <div className="fixed bottom-6 left-6 z-40">
              <div className="flex gap-2">
                <Link href="/course-creation">
                  <Button
                    variant="outline"
                    className="bg-white border-[#001d3d] text-[#003066] hover:bg-[#e3f2fd] rounded-[10px] shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Lesson
                  </Button>
                </Link>
                <Link href="/course-creation">
                  <Button className="bg-[#0072f5] hover:bg-[#0056b8] text-white rounded-[10px] shadow-lg">
                    Next Lesson
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Card className="p-4 shadow-lg w-64 border-[#001d3d] bg-white">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#0072f5]" />
                <span className="text-sm font-semibold text-[#001d3d]">Cognitive Load</span>
              </div>
              <Badge
                variant={
                  cognitiveLoad.level === "Low"
                    ? "default"
                    : cognitiveLoad.level === "Moderate"
                      ? "secondary"
                      : "destructive"
                }
                className="rounded-[10px]"
              >
                {cognitiveLoad.level}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#003066]">
                <span>Lesson Complexity</span>
                <span className={cognitiveLoad.color}>{cognitiveLoad.percentage}%</span>
              </div>
              <div className="w-full bg-[#e3f2fd] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    cognitiveLoad.level === "Low"
                      ? "bg-green-600"
                      : cognitiveLoad.level === "Moderate"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${cognitiveLoad.percentage}%` }}
                />
              </div>
            </div>

            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#003066]">Total Blocks:</span>
                <span className="font-medium text-[#001d3d]">{blocks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#003066]">Est. Time:</span>
                <span className="font-medium text-[#001d3d]">{Math.ceil(blocks.length * 1.5)} min</span>
              </div>
            </div>

            {cognitiveLoad.level === "High" && (
              <p className="text-xs text-red-600">⚠️ Consider breaking this lesson into smaller sections</p>
            )}
          </div>
        </Card>
      </div>

      {/* Customization Panel */}
      {isCustomizationOpen && selectedBlock && (
        <div className="w-96 border-l border-[#001d3d] bg-white flex flex-col absolute right-0 top-0 bottom-0 shadow-lg z-40">
          <div className="p-4 border-b border-[#001d3d]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#001d3d]">Customize Block</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCustomizationOpen(false)}
                className="hover:bg-[#e3f2fd]"
              >
                <X className="w-4 h-4 text-[#003066]" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#001d3d]">Block Type</label>
                <p className="text-sm text-[#003066]">{selectedBlock.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#001d3d]">Content</label>
                <Input
                  value={selectedBlock.content}
                  onChange={(e) => setSelectedBlock({ ...selectedBlock, content: e.target.value })}
                  placeholder="Enter content..."
                  className="border-[#001d3d] focus-visible:ring-[#0072f5] rounded-[10px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#001d3d]">SEO Label</label>
                <Input
                  value={selectedBlock.seoLabel}
                  onChange={(e) => setSelectedBlock({ ...selectedBlock, seoLabel: e.target.value })}
                  placeholder="Enter SEO label..."
                  className="border-[#001d3d] focus-visible:ring-[#0072f5] rounded-[10px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
