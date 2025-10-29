"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

type Section = 1 | 2 | 3 | 4 | 5

interface UserSelections {
  projectType: string | null
  learningGoal: string | null
  audienceDescription: string
  engagementLevels: string[]
  analysisTypes: string[]
}

export default function ITLAToolsPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState<Section>(1)
  const [selections, setSelections] = useState<UserSelections>({
    projectType: null,
    learningGoal: null,
    audienceDescription: "",
    engagementLevels: [],
    analysisTypes: [],
  })

  const progressSteps = [
    { num: 1, label: "Context" },
    { num: 2, label: "Engagement" },
    { num: 3, label: "Analysis" },
    { num: 4, label: "Design" },
    { num: 5, label: "Export" },
  ]

  const getStepClass = (stepNum: number) => {
    if (stepNum < currentSection) return "bg-[#48bb78] text-white"
    if (stepNum === currentSection) return "bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white scale-105"
    return "bg-white/30 text-[#001d3d]/80"
  }

  const selectOption = (category: keyof UserSelections, value: string) => {
    setSelections((prev) => ({ ...prev, [category]: value }))
  }

  const toggleEngagement = (level: string) => {
    setSelections((prev) => ({
      ...prev,
      engagementLevels: prev.engagementLevels.includes(level)
        ? prev.engagementLevels.filter((l) => l !== level)
        : [...prev.engagementLevels, level],
    }))
  }

  const toggleAnalysis = (type: string) => {
    setSelections((prev) => ({
      ...prev,
      analysisTypes: prev.analysisTypes.includes(type)
        ? prev.analysisTypes.filter((t) => t !== type)
        : [...prev.analysisTypes, type],
    }))
  }

  const engagementCards = [
    {
      id: "passive",
      emoji: "😌",
      title: "Passive",
      description: "Minimal cognitive load - awareness & familiarity",
      load: "Low",
    },
    {
      id: "reflective",
      emoji: "🤔",
      title: "Reflective",
      description: "Metacognition & personal insight through guided reflection",
      load: "Low-Medium",
    },
    {
      id: "active",
      emoji: "⚡",
      title: "Active",
      description: "Applied understanding through direct interaction",
      load: "Medium",
    },
    {
      id: "collaborative",
      emoji: "👥",
      title: "Collaborative",
      description: "Social cognition & team problem-solving",
      load: "Medium-High",
    },
    {
      id: "exploratory",
      emoji: "🔍",
      title: "Exploratory",
      description: "Autonomous discovery & investigative learning",
      load: "High",
    },
    {
      id: "immersive",
      emoji: "🎮",
      title: "Immersive",
      description: "Full engagement through realistic simulations",
      load: "Very High",
    },
  ]

  const analysisTypes = [
    { id: "needs", title: "Needs Analysis", description: "Identify performance gaps" },
    { id: "learner", title: "Learner Analysis", description: "Understand audience" },
    { id: "context", title: "Context Analysis", description: "Assess environment" },
    { id: "task", title: "Task Analysis", description: "Break down job roles" },
    { id: "content", title: "Content Analysis", description: "Audit existing materials" },
    { id: "realtime", title: "Real-Time Analytics", description: "Live behavior tracking" },
    { id: "predictive", title: "Predictive Analytics", description: "Forecast outcomes" },
    { id: "social", title: "Social Analytics", description: "Peer interactions" },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-[#001d3d] text-[#001d3d] hover:bg-[#001d3d] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-[#001d3d] text-[#001d3d] hover:bg-[#001d3d] hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Header */}
        <Card className="bg-white rounded-[10px] p-8 mb-8 shadow-lg border-[1.5px] border-[#001d3d]">
          <h1 className="text-[#0056b8] text-4xl font-bold mb-3">INSPIRE Theory of Learning Activation (ITLA)</h1>
          <p className="text-[#001d3d] text-lg">
            Design neuroscience-based learning experiences that optimize adult learning and performance
          </p>
        </Card>

        {/* Progress Bar */}
        <div className="bg-white border-[1px] border-[#001d3d] h-[60px] rounded-[10px] p-2.5 mb-8 flex items-center gap-1.5">
          {progressSteps.map((step) => (
            <button
              key={step.num}
              onClick={() => setCurrentSection(step.num as Section)}
              className={`flex-1 h-10 rounded-[10px] flex items-center justify-center font-semibold text-sm px-2.5 transition-all ${getStepClass(step.num)}`}
            >
              {step.num}. {step.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[350px_1fr] gap-8 mb-8">
          {/* Sidebar */}
          <Card className="bg-white rounded-[10px] p-8 shadow-lg border-[1.5px] border-[#001d3d] max-h-[600px] overflow-y-auto">
            <h3 className="text-[#0056b8] text-xl font-bold mb-5">Quick Reference</h3>
            <SidebarContent section={currentSection} />
          </Card>

          {/* Content Area */}
          <Card className="bg-white rounded-[10px] p-8 shadow-lg border-[1.5px] border-[#001d3d] min-h-[600px]">
            {/* Section 1: Context Discovery */}
            {currentSection === 1 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Let's understand your learning context</h2>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 mb-5 border-[1px] border-[#001d3d]">
                  <h3 className="text-[#0056b8] font-semibold mb-4">
                    What type of learning experience are you designing?
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: "🎯", title: "Custom Course", desc: "New training from scratch" },
                      { icon: "🔧", title: "Course Update", desc: "Refreshing existing content" },
                      { icon: "🚀", title: "Simulation/VR", desc: "Immersive experience" },
                      { icon: "📱", title: "Microlearning", desc: "Bite-sized modules" },
                    ].map((option) => (
                      <button
                        key={option.title}
                        onClick={() => selectOption("projectType", option.title)}
                        className={`p-4 bg-white border-2 rounded-[10px] text-left transition-all hover:border-[#0056b8] hover:bg-[#0056b8]/10 ${
                          selections.projectType === option.title
                            ? "border-[#0056b8] bg-[#0056b8] text-white"
                            : "border-[#001d3d]/20"
                        }`}
                      >
                        <strong>
                          {option.icon} {option.title}
                        </strong>
                        <br />
                        <small className={selections.projectType === option.title ? "opacity-90" : ""}>
                          {option.desc}
                        </small>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 mb-5 border-[1px] border-[#001d3d]">
                  <h3 className="text-[#0056b8] font-semibold mb-4">What's your primary learning goal?</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: "💡", title: "Knowledge Transfer", desc: "Teaching concepts & theory" },
                      { icon: "⚡", title: "Skill Development", desc: "Building practical abilities" },
                      { icon: "🎭", title: "Behavior Change", desc: "Shifting mindsets & actions" },
                      { icon: "📊", title: "Performance Improvement", desc: "Enhancing job outcomes" },
                    ].map((option) => (
                      <button
                        key={option.title}
                        onClick={() => selectOption("learningGoal", option.title)}
                        className={`p-4 bg-white border-2 rounded-[10px] text-left transition-all hover:border-[#0056b8] hover:bg-[#0056b8]/10 ${
                          selections.learningGoal === option.title
                            ? "border-[#0056b8] bg-[#0056b8] text-white"
                            : "border-[#001d3d]/20"
                        }`}
                      >
                        <strong>
                          {option.icon} {option.title}
                        </strong>
                        <br />
                        <small className={selections.learningGoal === option.title ? "opacity-90" : ""}>
                          {option.desc}
                        </small>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 mb-5 border-[1px] border-[#001d3d]">
                  <h3 className="text-[#0056b8] font-semibold mb-4">Describe your learner audience (optional)</h3>
                  <Textarea
                    value={selections.audienceDescription}
                    onChange={(e) => setSelections((prev) => ({ ...prev, audienceDescription: e.target.value }))}
                    placeholder="e.g., New pilots learning VR simulation, Sales team needing product knowledge..."
                    className="w-full h-20 p-2.5 border-2 border-[#001d3d]/20 rounded-[10px]"
                  />
                </Card>

                <Button
                  onClick={() => setCurrentSection(2)}
                  className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Engagement Mapping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 2: Cognitive Engagement Spectrum */}
            {currentSection === 2 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Map Your Cognitive Engagement Strategy</h2>
                <p className="mb-5 text-[#001d3d]">
                  Select the engagement levels needed for your learning experience. You can choose multiple levels to
                  create a varied learning journey.
                </p>

                <div className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] rounded-[10px] p-8 text-white mb-8">
                  <h3 className="text-xl font-bold mb-3">Neural Activation Preview</h3>
                  <p>
                    {selections.engagementLevels.length > 0
                      ? `Active brain regions: ${selections.engagementLevels.join(", ")}`
                      : "Select engagement levels to see which brain regions activate..."}
                  </p>
                </div>

                <div className="space-y-4">
                  {engagementCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => toggleEngagement(card.id)}
                      className={`w-full bg-white rounded-[10px] p-5 cursor-pointer transition-all hover:translate-x-2.5 hover:shadow-lg border-[3px] ${
                        selections.engagementLevels.includes(card.id)
                          ? "border-[#0056b8] bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white"
                          : "border-[#001d3d]/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{card.emoji}</span>
                        <div className="flex-1 text-left">
                          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                          <p className={`text-sm ${selections.engagementLevels.includes(card.id) ? "opacity-90" : ""}`}>
                            {card.description}
                          </p>
                          <span className="inline-block mt-2.5 px-2.5 py-1 rounded-[10px] bg-white/30 text-xs font-semibold">
                            Load: {card.load}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentSection(3)}
                  className="mt-5 bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Analysis Selection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 3: Analysis Selection */}
            {currentSection === 3 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Select Your Analysis Framework</h2>
                <p className="mb-5 text-[#001d3d]">
                  Based on your context, we recommend these analysis types. Select all that apply:
                </p>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 border-l-4 border-[#0056b8]">
                  <h3 className="text-[#0056b8] font-bold mb-5">Recommended Analysis Types</h3>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                    {analysisTypes.map((analysis) => (
                      <button
                        key={analysis.id}
                        onClick={() => toggleAnalysis(analysis.title)}
                        className={`bg-white rounded-[10px] p-4 border-2 cursor-pointer transition-all hover:border-[#0056b8] hover:-translate-y-1 hover:shadow-lg ${
                          selections.analysisTypes.includes(analysis.title)
                            ? "bg-[#0056b8] text-white border-[#0056b8]"
                            : "border-[#001d3d]/20"
                        }`}
                      >
                        <h4 className="font-bold mb-1">{analysis.title}</h4>
                        <small className={selections.analysisTypes.includes(analysis.title) ? "opacity-90" : ""}>
                          {analysis.description}
                        </small>
                      </button>
                    ))}
                  </div>
                </Card>

                <Button
                  onClick={() => setCurrentSection(4)}
                  className="mt-5 bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Design Blueprint
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 4: Design Blueprint */}
            {currentSection === 4 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Your ITLA Design Blueprint</h2>
                <p className="mb-5 text-[#001d3d]">
                  Based on your selections, here's your neuroscience-aligned learning design framework:
                </p>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 border-l-4 border-[#0056b8] mb-5">
                  <h3 className="text-[#0056b8] font-bold mb-4">Learning Design Summary</h3>
                  <ul className="space-y-2 list-disc list-inside text-[#001d3d]">
                    <li>
                      <strong>Project Type:</strong> {selections.projectType || "Not selected"}
                    </li>
                    <li>
                      <strong>Learning Goal:</strong> {selections.learningGoal || "Not selected"}
                    </li>
                    <li>
                      <strong>Engagement Levels:</strong>{" "}
                      {selections.engagementLevels.length > 0
                        ? selections.engagementLevels.join(", ")
                        : "None selected"}
                    </li>
                    <li>
                      <strong>Analysis Types:</strong>{" "}
                      {selections.analysisTypes.length > 0 ? selections.analysisTypes.join(", ") : "None selected"}
                    </li>
                  </ul>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 border-l-4 border-[#0056b8]">
                  <h3 className="text-[#0056b8] font-bold mb-4">Implementation Checklist</h3>
                  <div className="space-y-2.5">
                    {[
                      "Define specific learning objectives aligned with cognitive engagement levels",
                      "Map content to appropriate sensory modalities",
                      "Design assessment strategies for each engagement level",
                      "Establish data collection points for selected analytics",
                      "Create reinforcement schedule based on neuroscience principles",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center p-2.5 bg-white rounded-[10px]">
                        <Checkbox className="w-5 h-5 mr-4" />
                        <label className="text-sm text-[#001d3d]">{item}</label>
                      </div>
                    ))}
                  </div>
                </Card>

                <Button
                  onClick={() => setCurrentSection(5)}
                  className="mt-5 bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Generate ITLA Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 5: Export */}
            {currentSection === 5 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Your ITLA Framework is Ready!</h2>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 border-l-4 border-[#0056b8] mb-5">
                  <h3 className="text-[#0056b8] font-bold mb-4">Export Options</h3>
                  <p className="mb-5 text-[#001d3d]">
                    Your ITLA design has been saved and is ready to flow into the next INSPIRE tool.
                  </p>

                  <div className="flex gap-4">
                    <Button className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-6 py-2.5 rounded-[10px] font-semibold">
                      Download ITLA Report
                    </Button>
                    <Button className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-6 py-2.5 rounded-[10px] font-semibold">
                      View Analytics Plan
                    </Button>
                    <Button
                      onClick={() => router.push("/NPPM-tools")}
                      className="bg-[#48bb78] text-white px-6 py-2.5 rounded-[10px] font-semibold hover:shadow-lg"
                    >
                      Continue to NPPM Tool
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-5 border-l-4 border-[#0056b8]">
                  <h3 className="text-[#0056b8] font-bold mb-4">Next Steps</h3>
                  <p className="mb-4 text-[#001d3d]">Your ITLA framework will automatically flow into:</p>
                  <ul className="space-y-2 leading-8 text-[#001d3d]">
                    <li>
                      <strong>NPPM:</strong> Match neuroscience principles with design tactics
                    </li>
                    <li>
                      <strong>ILMI:</strong> Select optimal learning modalities
                    </li>
                    <li>
                      <strong>ICES:</strong> Finalize cognitive engagement strategies
                    </li>
                  </ul>
                </Card>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

function SidebarContent({ section }: { section: Section }) {
  const content = {
    1: (
      <>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] mb-4 border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Why Context Matters</h4>
          <p className="text-sm leading-relaxed text-[#001d3d]">
            Understanding your learning context ensures neuroscience principles align with practical constraints and
            goals.
          </p>
        </Card>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Key Considerations</h4>
          <ul className="text-sm space-y-2 list-none p-0 text-[#001d3d]">
            <li>✓ Learner prior knowledge</li>
            <li>✓ Available technology</li>
            <li>✓ Time constraints</li>
            <li>✓ Performance metrics</li>
          </ul>
        </Card>
      </>
    ),
    2: (
      <>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] mb-4 border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Engagement = Encoding</h4>
          <p className="text-sm leading-relaxed text-[#001d3d]">
            Higher cognitive engagement creates stronger neural pathways and better retention.
          </p>
        </Card>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Pro Tips</h4>
          <ul className="text-sm space-y-2 list-none p-0 text-[#001d3d]">
            <li>🎯 Start with lower levels for foundations</li>
            <li>📈 Progress to higher levels gradually</li>
            <li>🔄 Mix levels for variety</li>
            <li>⚡ Match complexity to content criticality</li>
          </ul>
        </Card>
      </>
    ),
    3: (
      <>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] mb-4 border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Analysis = Evidence</h4>
          <p className="text-sm leading-relaxed text-[#001d3d]">
            Proper analysis ensures your design decisions are data-driven and measurable.
          </p>
        </Card>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Data Collection Tips</h4>
          <ul className="text-sm space-y-2 list-none p-0 text-[#001d3d]">
            <li>📊 Use xAPI for detailed tracking</li>
            <li>🎯 Focus on actionable metrics</li>
            <li>⏱️ Plan collection points early</li>
            <li>🔒 Consider privacy requirements</li>
          </ul>
        </Card>
      </>
    ),
    4: (
      <>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] mb-4 border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Blueprint Benefits</h4>
          <p className="text-sm leading-relaxed text-[#001d3d]">
            Your ITLA blueprint ensures consistent, science-based design decisions throughout development.
          </p>
        </Card>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">Implementation Keys</h4>
          <ul className="text-sm space-y-2 list-none p-0 text-[#001d3d]">
            <li>🧠 Align with brain science</li>
            <li>📐 Be specific and measurable</li>
            <li>🔄 Iterate based on data</li>
            <li>✅ Document decisions</li>
          </ul>
        </Card>
      </>
    ),
    5: (
      <>
        <Card className="bg-[#48bb78] p-4 rounded-[10px] mb-4 text-white border-[1px] border-[#48bb78]">
          <h4 className="font-semibold mb-2.5">Success!</h4>
          <p className="text-sm leading-relaxed">
            Your ITLA framework is complete and ready to power your learning design.
          </p>
        </Card>
        <Card className="bg-[#F5F5F5] p-4 rounded-[10px] border-[1px] border-[#001d3d]">
          <h4 className="text-[#0056b8] font-semibold mb-2.5">What's Next?</h4>
          <p className="text-sm mb-2.5 text-[#001d3d]">Your selections will automatically flow into:</p>
          <ul className="text-sm space-y-2 list-none p-0 text-[#001d3d]">
            <li>→ NPPM Tool</li>
            <li>→ ILMI Tool</li>
            <li>→ ICES Tool</li>
            <li>→ Your authoring platform</li>
          </ul>
        </Card>
      </>
    ),
  }

  return <>{content[section]}</>
}
