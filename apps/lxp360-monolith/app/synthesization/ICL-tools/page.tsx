"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, RotateCcw, Download, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

type Section = 1 | 2 | 3 | 4 | 5

interface EncodingData {
  itla: {
    projectType: string
    learningGoal: string
    engagementLevels: string[]
    analysisTypes: string[]
  }
  nppm: {
    strategies: string[]
  }
  ilmi: {
    primaryModality: string
    secondaryModality: string
  }
  ices: {
    engagementLevel: string
  }
}

interface Competency {
  id: string
  verb: string
  skill: string
  context: string
  criteria: string
  domain: string
  level: string
}

export default function ICLToolsPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState<Section>(1)
  const [encodingData, setEncodingData] = useState<EncodingData | null>(null)
  const [competencies, setCompetencies] = useState<Competency[]>([])
  const [currentCompetency, setCurrentCompetency] = useState<Competency>({
    id: "",
    verb: "",
    skill: "",
    context: "",
    criteria: "",
    domain: "Cognitive",
    level: "Foundation",
  })

  const progressSteps = [
    { num: 1, label: "Import Data" },
    { num: 2, label: "Build Competencies" },
    { num: 3, label: "Classify Domains" },
    { num: 4, label: "Set Levels" },
    { num: 5, label: "Export to IPMG" },
  ]

  const domains = [
    "Cognitive",
    "Psychomotor",
    "Affective",
    "Socio-Emotional",
    "Conative",
    "Metacognitive",
    "Existential",
  ]

  const levels = ["Foundation", "Application", "Adaptive Competency", "Strategic Integration", "Mastery", "Innovation"]

  const verbsByDomain = {
    Cognitive: {
      Foundation: ["identify", "define", "recognize", "recall", "list", "describe"],
      Application: ["apply", "execute", "implement", "use", "demonstrate", "perform"],
      "Adaptive Competency": ["analyze", "troubleshoot", "diagnose", "adapt", "solve", "investigate"],
      "Strategic Integration": ["evaluate", "integrate", "synthesize", "coordinate", "strategize"],
      Mastery: ["assess", "validate", "optimize", "refine", "critique"],
      Innovation: ["create", "design", "formulate", "innovate", "pioneer"],
    },
    Psychomotor: {
      Foundation: ["imitate", "position", "grip", "orient", "execute"],
      Application: ["assemble", "adjust", "navigate", "operate", "perform"],
      "Adaptive Competency": ["adapt", "troubleshoot", "recalibrate", "recover", "modify"],
      "Strategic Integration": ["coordinate", "orchestrate", "integrate", "synchronize"],
      Mastery: ["perfect", "master", "refine", "optimize"],
      Innovation: ["innovate", "develop", "create", "pioneer"],
    },
    Affective: {
      Foundation: ["acknowledge", "recognize", "appreciate", "receive"],
      Application: ["respond", "demonstrate", "exhibit", "show"],
      "Adaptive Competency": ["manage", "persevere", "modulate", "recover"],
      "Strategic Integration": ["commit", "advocate", "champion", "influence"],
      Mastery: ["internalize", "embody", "model", "exemplify"],
      Innovation: ["transform", "inspire", "revolutionize", "lead"],
    },
  }

  const getStepClass = (stepNum: number) => {
    if (stepNum < currentSection) return "bg-[#48bb78] text-white"
    if (stepNum === currentSection) return "bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white scale-105"
    return "bg-white/30 text-[#001d3d]/80"
  }

  // Simulate loading encoding data
  useEffect(() => {
    // In production, this would fetch from localStorage or API
    const mockData: EncodingData = {
      itla: {
        projectType: "Simulation/VR",
        learningGoal: "Skill Development",
        engagementLevels: ["active", "immersive"],
        analysisTypes: ["Task Analysis", "Needs Analysis"],
      },
      nppm: {
        strategies: ["Spaced Repetition", "Retrieval Practice", "Emotional Arousal"],
      },
      ilmi: {
        primaryModality: "Kinesthetic",
        secondaryModality: "Visual",
      },
      ices: {
        engagementLevel: "Immersive",
      },
    }
    setEncodingData(mockData)
  }, [])

  const addCompetency = () => {
    if (currentCompetency.verb && currentCompetency.skill) {
      setCompetencies([...competencies, { ...currentCompetency, id: Date.now().toString() }])
      setCurrentCompetency({
        id: "",
        verb: "",
        skill: "",
        context: "",
        criteria: "",
        domain: "Cognitive",
        level: "Foundation",
      })
    }
  }

  const removeCompetency = (id: string) => {
    setCompetencies(competencies.filter((c) => c.id !== id))
  }

  const autoGenerateCompetencies = () => {
    if (!encodingData) return

    const generated: Competency[] = []

    // Generate based on ITLA learning goal
    if (encodingData.itla.learningGoal === "Skill Development") {
      generated.push({
        id: Date.now().toString() + "-1",
        verb: "execute",
        skill: "emergency procedures",
        context: "using AR/VR simulation technology",
        criteria: "within 30 seconds with zero errors",
        domain: "Psychomotor",
        level: "Application",
      })
    }

    // Generate based on ILMI modality
    if (encodingData.ilmi.primaryModality === "Kinesthetic") {
      generated.push({
        id: Date.now().toString() + "-2",
        verb: "perform",
        skill: "hands-on troubleshooting",
        context: "in immersive VR environment",
        criteria: "identifying and resolving 90% of issues",
        domain: "Psychomotor",
        level: "Adaptive Competency",
      })
    }

    // Generate based on engagement level
    if (encodingData.itla.engagementLevels.includes("immersive")) {
      generated.push({
        id: Date.now().toString() + "-3",
        verb: "analyze",
        skill: "complex scenarios",
        context: "under high-pressure simulation conditions",
        criteria: "making correct decisions in 85% of cases",
        domain: "Cognitive",
        level: "Adaptive Competency",
      })
    }

    setCompetencies([...competencies, ...generated])
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto p-5">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => router.push("/encoding")}
            variant="outline"
            className="border-[#001d3d] text-[#001d3d] hover:bg-[#001d3d] hover:text-white rounded-[10px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Encoding
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-[#001d3d] text-[#001d3d] hover:bg-[#001d3d] hover:text-white rounded-[10px]"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Header */}
        <Card className="bg-white rounded-[10px] p-8 mb-8 shadow-lg border-[1.5px] border-[#001d3d]">
          <h1 className="text-[#0056b8] text-4xl font-bold mb-3">INSPIRE Competency Ladder (ICL)</h1>
          <p className="text-[#001d3d] text-lg mb-4">
            Define job-aligned competencies that bridge performance needs with learning experiences
          </p>
          <div className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white p-4 rounded-[10px] flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5 opacity-70">✓ ITLA</div>
              <div className="flex items-center gap-2.5 opacity-70">✓ NPPM</div>
              <div className="flex items-center gap-2.5 opacity-70">✓ ILMI</div>
              <div className="flex items-center gap-2.5 opacity-70">✓ ICES</div>
              <div className="flex items-center gap-2.5 font-semibold">→ ICL (Synthesization)</div>
            </div>
          </div>
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
          <Card className="bg-white rounded-[10px] p-8 shadow-lg border-[1.5px] border-[#001d3d] max-h-[700px] overflow-y-auto">
            <h3 className="text-[#0056b8] text-xl font-bold mb-5">Encoding Data</h3>

            {encodingData && (
              <>
                <Card className="bg-[#F5F5F5] rounded-[10px] p-4 mb-4 border-[1px] border-[#001d3d]">
                  <h4 className="text-[#0056b8] font-semibold mb-2">ITLA Context</h4>
                  <p className="text-sm text-[#001d3d] mb-1">
                    <strong>Type:</strong> {encodingData.itla.projectType}
                  </p>
                  <p className="text-sm text-[#001d3d] mb-1">
                    <strong>Goal:</strong> {encodingData.itla.learningGoal}
                  </p>
                  <p className="text-sm text-[#001d3d]">
                    <strong>Engagement:</strong> {encodingData.itla.engagementLevels.join(", ")}
                  </p>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-4 mb-4 border-[1px] border-[#001d3d]">
                  <h4 className="text-[#0056b8] font-semibold mb-2">NPPM Strategies</h4>
                  <ul className="text-sm text-[#001d3d] space-y-1">
                    {encodingData.nppm.strategies.map((strategy, i) => (
                      <li key={i}>✓ {strategy}</li>
                    ))}
                  </ul>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-4 mb-4 border-[1px] border-[#001d3d]">
                  <h4 className="text-[#0056b8] font-semibold mb-2">ILMI Modalities</h4>
                  <p className="text-sm text-[#001d3d] mb-1">
                    <strong>Primary:</strong> {encodingData.ilmi.primaryModality}
                  </p>
                  <p className="text-sm text-[#001d3d]">
                    <strong>Secondary:</strong> {encodingData.ilmi.secondaryModality}
                  </p>
                </Card>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-4 border-[1px] border-[#001d3d]">
                  <h4 className="text-[#0056b8] font-semibold mb-2">ICES Level</h4>
                  <p className="text-sm text-[#001d3d]">{encodingData.ices.engagementLevel}</p>
                </Card>
              </>
            )}
          </Card>

          {/* Content Area */}
          <Card className="bg-white rounded-[10px] p-8 shadow-lg border-[1.5px] border-[#001d3d] min-h-[700px]">
            {/* Section 1: Import Data */}
            {currentSection === 1 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Import Encoding Phase Data</h2>
                <p className="mb-5 text-[#001d3d]">
                  Your encoding phase data has been successfully imported. Review the context before building
                  competencies.
                </p>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-6 mb-5 border-l-4 border-[#0056b8]">
                  <h3 className="text-[#0056b8] font-bold mb-4">Data Flow Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#48bb78] text-white flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <strong>ITLA:</strong> Learning context and engagement strategy defined
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#48bb78] text-white flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <strong>NPPM:</strong> Neuroscience principles and strategies selected
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#48bb78] text-white flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <strong>ILMI:</strong> Learning modalities and tools identified
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#48bb78] text-white flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <strong>ICES:</strong> Cognitive engagement level calibrated
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-[rgba(0,86,184,0.1)] to-[rgba(1,158,243,0.1)] rounded-[10px] p-5 border-l-4 border-[#0056b8]">
                  <h4 className="text-[#0056b8] font-bold mb-2">What's Next?</h4>
                  <p className="text-[#001d3d]">
                    Based on your encoding data, we'll help you build job-aligned competency statements that translate
                    performance needs into measurable learning outcomes.
                  </p>
                </Card>

                <Button
                  onClick={() => setCurrentSection(2)}
                  className="mt-5 bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Build Competencies
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 2: Build Competencies */}
            {currentSection === 2 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Build Competency Statements</h2>
                <p className="mb-5 text-[#001d3d]">
                  Create competency statements using the format: Verb + Skill + Context + Criteria
                </p>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-6 mb-5 border-[1.5px] border-[#001d3d]">
                  <h3 className="text-[#0056b8] font-bold mb-4">Competency Builder</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#001d3d] mb-2">1. Action Verb</label>
                      <Input
                        value={currentCompetency.verb}
                        onChange={(e) => setCurrentCompetency({ ...currentCompetency, verb: e.target.value })}
                        placeholder="e.g., Execute, Analyze, Demonstrate"
                        className="rounded-[10px] border-[#001d3d]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#001d3d] mb-2">2. Skill/Task</label>
                      <Input
                        value={currentCompetency.skill}
                        onChange={(e) => setCurrentCompetency({ ...currentCompetency, skill: e.target.value })}
                        placeholder="e.g., emergency landing protocol"
                        className="rounded-[10px] border-[#001d3d]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-[#001d3d] mb-2">3. Context/Condition</label>
                    <Input
                      value={currentCompetency.context}
                      onChange={(e) => setCurrentCompetency({ ...currentCompetency, context: e.target.value })}
                      placeholder="e.g., in a VR cockpit simulator"
                      className="rounded-[10px] border-[#001d3d]"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-[#001d3d] mb-2">4. Success Criteria</label>
                    <Input
                      value={currentCompetency.criteria}
                      onChange={(e) => setCurrentCompetency({ ...currentCompetency, criteria: e.target.value })}
                      placeholder="e.g., within 30 seconds with zero errors"
                      className="rounded-[10px] border-[#001d3d]"
                    />
                  </div>

                  <div className="bg-white rounded-[10px] p-4 mb-4 border-[1px] border-[#0056b8]">
                    <strong className="text-[#0056b8]">Preview:</strong>
                    <p className="text-[#001d3d] mt-2">
                      {currentCompetency.verb || "[Verb]"} {currentCompetency.skill || "[Skill]"}{" "}
                      {currentCompetency.context || "[Context]"} {currentCompetency.criteria || "[Criteria]"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={addCompetency}
                      className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-6 py-2 rounded-[10px] font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Competency
                    </Button>
                    <Button
                      onClick={autoGenerateCompetencies}
                      className="bg-[#48bb78] text-white px-6 py-2 rounded-[10px] font-semibold"
                    >
                      Auto-Generate from Encoding Data
                    </Button>
                  </div>
                </Card>

                {/* Competencies List */}
                {competencies.length > 0 && (
                  <Card className="bg-[#F5F5F5] rounded-[10px] p-6 mb-5 border-[1.5px] border-[#001d3d]">
                    <h3 className="text-[#0056b8] font-bold mb-4">Your Competencies ({competencies.length})</h3>
                    <div className="space-y-3">
                      {competencies.map((comp) => (
                        <div
                          key={comp.id}
                          className="bg-white rounded-[10px] p-4 border-[1px] border-[#001d3d] flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <p className="text-[#001d3d] font-medium">
                              {comp.verb} {comp.skill} {comp.context} {comp.criteria}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="px-2 py-1 bg-[#0056b8] text-white text-xs rounded-[10px]">
                                {comp.domain}
                              </span>
                              <span className="px-2 py-1 bg-[#019ef3] text-white text-xs rounded-[10px]">
                                {comp.level}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => removeCompetency(comp.id)}
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Button
                  onClick={() => setCurrentSection(3)}
                  disabled={competencies.length === 0}
                  className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Continue to Domain Classification
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 3: Classify Domains */}
            {currentSection === 3 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Classify Learning Domains</h2>
                <p className="mb-5 text-[#001d3d]">
                  Assign each competency to its primary learning domain. This ensures whole-brain engagement.
                </p>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-6 mb-5 border-l-4 border-[#0056b8]">
                  <h3 className="text-[#0056b8] font-bold mb-4">INSPIRE's 7 Learning Domains</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {domains.map((domain) => (
                      <div key={domain} className="bg-white rounded-[10px] p-3 border-[1px] border-[#001d3d]">
                        <strong className="text-[#0056b8]">{domain}</strong>
                        <p className="text-xs text-[#001d3d] mt-1">
                          {domain === "Cognitive" && "Intellectual skills & knowledge"}
                          {domain === "Psychomotor" && "Physical skills & coordination"}
                          {domain === "Affective" && "Attitudes, emotions & values"}
                          {domain === "Socio-Emotional" && "Interpersonal & social skills"}
                          {domain === "Conative" && "Drive, motivation & persistence"}
                          {domain === "Metacognitive" && "Self-monitoring & learning strategies"}
                          {domain === "Existential" && "Purpose, meaning & identity"}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="space-y-4">
                  {competencies.map((comp, index) => (
                    <Card key={comp.id} className="bg-white rounded-[10px] p-5 border-[1.5px] border-[#001d3d]">
                      <p className="text-[#001d3d] font-medium mb-3">
                        {comp.verb} {comp.skill} {comp.context} {comp.criteria}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {domains.map((domain) => (
                          <button
                            key={domain}
                            onClick={() => {
                              const updated = [...competencies]
                              updated[index].domain = domain
                              setCompetencies(updated)
                            }}
                            className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all ${
                              comp.domain === domain
                                ? "bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white"
                                : "bg-[#F5F5F5] text-[#001d3d] border-[1px] border-[#001d3d] hover:border-[#0056b8]"
                            }`}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentSection(4)}
                  className="mt-5 bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Complexity Levels
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 4: Set Levels */}
            {currentSection === 4 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Set Complexity Levels</h2>
                <p className="mb-5 text-[#001d3d]">
                  Assign the cognitive demand level for each competency. This guides scaffolding and assessment design.
                </p>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-6 mb-5 border-l-4 border-[#0056b8]">
                  <h3 className="text-[#0056b8] font-bold mb-4">INSPIRE's 6 Complexity Levels</h3>
                  <div className="space-y-2">
                    {levels.map((level, i) => (
                      <div key={level} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white flex items-center justify-center font-bold text-sm">
                          {i + 1}
                        </div>
                        <div>
                          <strong className="text-[#0056b8]">{level}</strong>
                          <p className="text-xs text-[#001d3d]">
                            {level === "Foundation" && "Basic knowledge & fundamental skills"}
                            {level === "Application" && "Applied use in familiar contexts"}
                            {level === "Adaptive Competency" && "Adapt & troubleshoot in novel situations"}
                            {level === "Strategic Integration" && "Integrate multiple skills strategically"}
                            {level === "Mastery" && "Expert-level performance & mentorship"}
                            {level === "Innovation" && "Create new approaches & solutions"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="space-y-4">
                  {competencies.map((comp, index) => (
                    <Card key={comp.id} className="bg-white rounded-[10px] p-5 border-[1.5px] border-[#001d3d]">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-[#001d3d] font-medium flex-1">
                          {comp.verb} {comp.skill} {comp.context} {comp.criteria}
                        </p>
                        <span className="px-3 py-1 bg-[#0056b8] text-white text-xs rounded-[10px] ml-3">
                          {comp.domain}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => {
                              const updated = [...competencies]
                              updated[index].level = level
                              setCompetencies(updated)
                            }}
                            className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all ${
                              comp.level === level
                                ? "bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white"
                                : "bg-[#F5F5F5] text-[#001d3d] border-[1px] border-[#001d3d] hover:border-[#0056b8]"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentSection(5)}
                  className="mt-5 bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-8 py-3 rounded-[10px] font-semibold hover:shadow-lg transition-all"
                >
                  Generate ICL Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Section 5: Export */}
            {currentSection === 5 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#0056b8] text-2xl font-bold mb-5">Your Competency Ladder is Complete!</h2>

                <Card className="bg-[#F5F5F5] rounded-[10px] p-6 mb-5 border-l-4 border-[#48bb78]">
                  <h3 className="text-[#48bb78] font-bold mb-4">✓ ICL Framework Ready</h3>
                  <p className="text-[#001d3d] mb-4">
                    You've successfully created {competencies.length} job-aligned competency statements across{" "}
                    {new Set(competencies.map((c) => c.domain)).size} learning domains.
                  </p>

                  <div className="bg-white rounded-[10px] p-4 mb-4">
                    <h4 className="text-[#0056b8] font-semibold mb-3">Competency Summary</h4>
                    <div className="space-y-2">
                      {competencies.map((comp, i) => (
                        <div
                          key={comp.id}
                          className="text-sm text-[#001d3d] pb-2 border-b border-[#001d3d]/20 last:border-0"
                        >
                          <strong>{i + 1}.</strong> {comp.verb} {comp.skill} {comp.context} {comp.criteria}
                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-[#0056b8] text-white text-xs rounded-[10px]">
                              {comp.domain}
                            </span>
                            <span className="px-2 py-0.5 bg-[#019ef3] text-white text-xs rounded-[10px]">
                              {comp.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-[rgba(0,86,184,0.1)] to-[rgba(1,158,243,0.1)] rounded-[10px] p-5 mb-5 border-l-4 border-[#0056b8]">
                  <h4 className="text-[#0056b8] font-bold mb-2">Next: Performance Mapping (IPMG)</h4>
                  <p className="text-[#001d3d] mb-3">
                    Your competencies will now flow into the INSPIRE Performance Mapping Grid where you'll:
                  </p>
                  <ul className="space-y-1 text-sm text-[#001d3d]">
                    <li>→ Map competencies to specific job tasks</li>
                    <li>→ Define learning objectives for each competency</li>
                    <li>→ Set performance criteria and benchmarks</li>
                    <li>→ Align with ICDT cognitive demand levels</li>
                    <li>→ Specify ICPF proficiency targets</li>
                  </ul>
                </Card>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-br from-[#0056b8] to-[#019ef3] text-white px-6 py-2.5 rounded-[10px] font-semibold">
                    <Download className="w-4 h-4 mr-2" />
                    Download ICL Report
                  </Button>
                  <Button
                    onClick={() => router.push("/synthesization/IPMG-tools")}
                    className="bg-[#48bb78] text-white px-6 py-2.5 rounded-[10px] font-semibold hover:shadow-lg"
                  >
                    Continue to IPMG Tool
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
