"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

type Section = 1 | 2 | 3 | 4 | 5

interface ILMISelections {
  primaryModality: string | null
  secondaryModality: string | null
  tools: string[]
}

export default function ILMIToolsPage() {
  const [currentSection, setCurrentSection] = useState<Section>(1)
  const [selections, setSelections] = useState<ILMISelections>({
    primaryModality: null,
    secondaryModality: null,
    tools: [],
  })

  const progressSteps = [
    { num: 1, label: "Review Goals" },
    { num: 2, label: "Primary Modality" },
    { num: 3, label: "Secondary Modality" },
    { num: 4, label: "Tool Mapping" },
    { num: 5, label: "Integration Plan" },
  ]

  const getStepClass = (stepNum: number) => {
    if (stepNum < currentSection) return "bg-[#48bb78] text-white"
    if (stepNum === currentSection) return "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white scale-105"
    return "bg-white/30 text-white/80"
  }

  const modalities = [
    {
      id: "visual",
      icon: "👁️",
      title: "Visual",
      description: "Videos, animations, diagrams, infographics",
      tags: ["Complex concepts", "Spatial learning"],
    },
    {
      id: "auditory",
      icon: "🎧",
      title: "Auditory",
      description: "Podcasts, narrations, interviews, sound cues",
      tags: ["Storytelling", "Instructions"],
    },
    {
      id: "textual",
      icon: "📝",
      title: "Textual",
      description: "Articles, manuals, guides, reference materials",
      tags: ["Procedures", "Reference"],
    },
    {
      id: "kinesthetic",
      icon: "🎮",
      title: "Kinesthetic",
      description: "Simulations, VR/AR, hands-on practice",
      tags: ["Skills training", "Realistic practice"],
    },
    {
      id: "social",
      icon: "👥",
      title: "Social",
      description: "Discussions, peer review, collaborative learning",
      tags: ["Leadership", "Teamwork"],
    },
  ]

  const selectPrimary = (modality: string) => {
    setSelections((prev) => ({ ...prev, primaryModality: modality }))
  }

  const selectSecondary = (modality: string) => {
    setSelections((prev) => ({ ...prev, secondaryModality: modality }))
  }

  const skipSecondary = () => {
    setSelections((prev) => ({ ...prev, secondaryModality: null }))
    setCurrentSection(4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      <div className="max-w-[1400px] mx-auto p-5">
        {/* Header */}
        <Card className="bg-white/98 rounded-[20px] p-8 mb-8 shadow-2xl">
          <h1 className="text-[#667eea] text-4xl font-bold mb-3">🎨 Learning Modality Integrator (ILMI)</h1>
          <p className="text-[#666] text-lg mb-5">
            Strategically select optimal sensory modalities for maximum neural activation
          </p>

          {/* Data Flow Banner */}
          <div className="bg-gradient-to-br from-[#48bb78] to-[#38a169] text-white p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5 opacity-70">✓ ITLA</div>
              <div className="flex items-center gap-2.5 opacity-70">✓ NPPM</div>
              <div className="flex items-center gap-2.5 font-semibold">→ ILMI</div>
              <div className="flex items-center gap-2.5 opacity-70">ICES</div>
            </div>
            <Button className="bg-white text-[#48bb78] px-5 py-2 m-0 hover:bg-white/90">View Journey</Button>
          </div>
        </Card>

        {/* Progress Bar */}
        <div className="bg-white/30 h-[60px] rounded-[30px] p-2.5 mb-8 flex items-center gap-1.5">
          {progressSteps.map((step) => (
            <button
              key={step.num}
              onClick={() => setCurrentSection(step.num as Section)}
              className={`flex-1 h-10 rounded-[20px] flex items-center justify-center font-semibold text-sm px-2.5 transition-all ${getStepClass(step.num)}`}
            >
              {step.num}. {step.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[350px_1fr] gap-8 mb-8">
          {/* Sidebar */}
          <Card className="bg-white/98 rounded-[20px] p-8 shadow-2xl max-h-[700px] overflow-y-auto">
            <h3 className="text-[#667eea] text-xl font-bold mb-5">📊 NPPM Context</h3>

            <Card className="bg-[#f8f9fa] p-4 rounded-xl mb-4">
              <h4 className="text-[#667eea] text-sm font-semibold mb-2.5">Active Strategies</h4>
              <ul className="text-xs space-y-1 list-none p-0">
                <li>✓ Emotional Arousal</li>
                <li>✓ Spaced Repetition</li>
                <li>✓ Retrieval Practice</li>
              </ul>
            </Card>

            <Card className="bg-[#f8f9fa] p-4 rounded-xl mb-4">
              <h4 className="text-[#667eea] text-sm font-semibold mb-2.5">Learning Type</h4>
              <p className="text-xs">High-stakes decision making in VR simulation</p>
            </Card>

            <Card className="bg-[#f8f9fa] p-4 rounded-xl">
              <h4 className="text-[#667eea] text-sm font-semibold mb-2.5">Dual Coding Theory</h4>
              <p className="text-xs">Multiple sensory channels = stronger memory encoding</p>
            </Card>
          </Card>

          {/* Content Area */}
          <Card className="bg-white/98 rounded-[20px] p-8 shadow-2xl min-h-[700px]">
            {/* Section 1: Review Goals */}
            {currentSection === 1 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#667eea] text-2xl font-bold mb-5">Learning Goal & Modality Alignment</h2>

                <div className="bg-gradient-to-br from-[#1a202c] to-[#2d3748] rounded-[20px] p-8 text-white mb-5 h-[250px] relative">
                  <h3 className="text-xl font-bold mb-5">Neural Network Activation Zones</h3>
                  <div className="absolute top-8 left-12 px-4 py-2.5 bg-white/10 border-2 border-white/30 rounded-[30px] text-sm">
                    Visual Cortex
                  </div>
                  <div className="absolute top-8 right-12 px-4 py-2.5 bg-white/10 border-2 border-white/30 rounded-[30px] text-sm">
                    Auditory Cortex
                  </div>
                  <div className="absolute bottom-8 left-12 px-4 py-2.5 bg-white/10 border-2 border-white/30 rounded-[30px] text-sm">
                    Motor Cortex
                  </div>
                  <div className="absolute bottom-8 right-12 px-4 py-2.5 bg-white/10 border-2 border-white/30 rounded-[30px] text-sm">
                    Language Centers
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 bg-white/10 border-2 border-white/30 rounded-[30px] text-sm">
                    Social Networks
                  </div>
                </div>

                <Card className="bg-[#f8f9fa] p-6 rounded-2xl mb-5">
                  <h3 className="text-[#667eea] font-bold mb-4">Your Learning Objectives</h3>
                  <ol className="space-y-3 leading-8">
                    <li>
                      <strong>Primary:</strong> Execute emergency procedures in high-stress scenarios
                    </li>
                    <li>
                      <strong>Secondary:</strong> Differentiate between AR and VR training applications
                    </li>
                    <li>
                      <strong>Supporting:</strong> Collaborate effectively with crew members
                    </li>
                  </ol>
                </Card>

                <Card className="bg-gradient-to-br from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.1)] p-5 rounded-2xl border-l-4 border-[#667eea]">
                  <strong>💡 Recommendation:</strong> Based on your high-stakes scenario training, we suggest{" "}
                  <strong>Kinesthetic</strong> as primary (hands-on interaction) with <strong>Visual</strong> as
                  secondary (spatial awareness).
                </Card>

                <Button
                  onClick={() => setCurrentSection(2)}
                  className="mt-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-[25px] font-semibold hover:shadow-lg transition-all"
                >
                  Select Primary Modality →
                </Button>
              </div>
            )}

            {/* Section 2: Primary Modality */}
            {currentSection === 2 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#667eea] text-2xl font-bold mb-5">Select Your Primary Modality</h2>
                <p className="text-[#666] mb-5">Choose the main sensory channel for content delivery</p>

                <div className="space-y-4">
                  {modalities.map((modality) => (
                    <button
                      key={modality.id}
                      onClick={() => selectPrimary(modality.id)}
                      className={`w-full bg-white border-[3px] rounded-[20px] p-6 cursor-pointer transition-all hover:translate-x-2.5 hover:shadow-lg grid grid-cols-[60px_1fr] gap-5 items-center ${
                        selections.primaryModality === modality.id
                          ? "border-[#667eea] bg-gradient-to-br from-[rgba(102,126,234,0.05)] to-[rgba(118,75,162,0.05)]"
                          : "border-[#e0e0e0]"
                      }`}
                    >
                      <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-full flex items-center justify-center text-3xl">
                        {modality.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold mb-1">{modality.title}</h3>
                        <p className="text-[#666] text-sm mb-2.5">{modality.description}</p>
                        <div className="flex gap-2.5">
                          {modality.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-[20px] bg-[#c6f6d5] text-[#22543d] text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selections.primaryModality === modality.id && (
                        <span className="absolute top-2.5 right-4 px-3 py-1 rounded-2xl bg-[#667eea] text-white text-xs font-semibold uppercase">
                          PRIMARY
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentSection(3)}
                  className="mt-5 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-[25px] font-semibold hover:shadow-lg transition-all"
                >
                  Continue to Secondary →
                </Button>
              </div>
            )}

            {/* Section 3: Secondary Modality */}
            {currentSection === 3 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#667eea] text-2xl font-bold mb-5">Select Supporting Modality (Optional)</h2>
                <p className="text-[#666] mb-5">Add a secondary channel for dual coding benefits</p>

                <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl p-8 text-white text-center mb-8">
                  <h3 className="text-xl font-bold mb-5">🧠 Dual Coding Activation</h3>
                  <p className="mb-5">Combining modalities creates stronger neural pathways</p>
                  <div>
                    <span className="inline-block m-2.5 px-6 py-4 bg-white/20 rounded-[30px] font-semibold animate-[float_3s_ease-in-out_infinite]">
                      Kinesthetic + Visual
                    </span>
                    <span className="inline-block m-2.5 px-6 py-4 bg-white/20 rounded-[30px] font-semibold animate-[float_3s_ease-in-out_infinite]">
                      = 2.3x Retention
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {modalities
                    .filter((m) => m.id !== selections.primaryModality)
                    .map((modality) => (
                      <button
                        key={modality.id}
                        onClick={() => selectSecondary(modality.id)}
                        className={`w-full bg-white border-[3px] rounded-[20px] p-6 cursor-pointer transition-all hover:translate-x-2.5 hover:shadow-lg grid grid-cols-[60px_1fr] gap-5 items-center ${
                          selections.secondaryModality === modality.id
                            ? "border-[#48bb78] bg-gradient-to-br from-[rgba(72,187,120,0.05)] to-[rgba(56,161,105,0.05)]"
                            : "border-[#e0e0e0]"
                        }`}
                      >
                        <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-full flex items-center justify-center text-3xl">
                          {modality.icon}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold mb-1">{modality.title}</h3>
                          <p className="text-[#666] text-sm">Supporting modality for dual coding</p>
                        </div>
                        {selections.secondaryModality === modality.id && (
                          <span className="absolute top-2.5 right-4 px-3 py-1 rounded-2xl bg-[#48bb78] text-white text-xs font-semibold uppercase">
                            SECONDARY
                          </span>
                        )}
                      </button>
                    ))}
                </div>

                <div className="flex gap-4 mt-5">
                  <Button
                    onClick={skipSecondary}
                    className="bg-[#f8f9fa] text-[#667eea] border-2 border-[#667eea] px-8 py-3 rounded-[25px] font-semibold hover:bg-[#667eea] hover:text-white transition-all"
                  >
                    Skip Secondary
                  </Button>
                  <Button
                    onClick={() => setCurrentSection(4)}
                    className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-[25px] font-semibold hover:shadow-lg transition-all"
                  >
                    Continue to Tools →
                  </Button>
                </div>
              </div>
            )}

            {/* Section 4: Tool Mapping */}
            {currentSection === 4 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#667eea] text-2xl font-bold mb-5">Technology & Tool Selection</h2>

                <Card className="bg-[#f8f9fa] rounded-2xl p-5 mb-8">
                  <h3 className="text-[#667eea] font-bold mb-5">Tool Compatibility Matrix</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-[150px_1fr] gap-5 items-center pb-4 border-b border-[#e0e0e0]">
                      <strong>Kinesthetic</strong>
                      <div className="flex gap-2.5">
                        <span className="px-2.5 py-1 rounded-[20px] bg-[#c6f6d5] text-[#22543d] text-xs font-semibold">
                          Unity VR
                        </span>
                        <span className="px-2.5 py-1 rounded-[20px] bg-[#c6f6d5] text-[#22543d] text-xs font-semibold">
                          Storyline 360
                        </span>
                        <span className="px-2.5 py-1 rounded-[20px] bg-[#fed7aa] text-[#7c2d12] text-xs font-semibold">
                          Rise 360
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-[150px_1fr] gap-5 items-center">
                      <strong>Visual</strong>
                      <div className="flex gap-2.5">
                        <span className="px-2.5 py-1 rounded-[20px] bg-[#c6f6d5] text-[#22543d] text-xs font-semibold">
                          Vyond
                        </span>
                        <span className="px-2.5 py-1 rounded-[20px] bg-[#c6f6d5] text-[#22543d] text-xs font-semibold">
                          Synthesia
                        </span>
                        <span className="px-2.5 py-1 rounded-[20px] bg-[#c6f6d5] text-[#22543d] text-xs font-semibold">
                          Canva
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <h3 className="text-[#667eea] font-bold text-xl mb-5">Recommended Tool Stack</h3>

                <div className="space-y-4">
                  {[
                    { icon: "🎮", title: "Unity VR", description: "Primary platform for immersive simulations" },
                    { icon: "📊", title: "Storyline 360", description: "Interactive scenarios and assessments" },
                    { icon: "🎬", title: "Synthesia", description: "AI-powered video explanations" },
                  ].map((tool) => (
                    <div
                      key={tool.title}
                      className="bg-white border-l-4 border-[#667eea] rounded-xl p-4 flex items-center gap-4 transition-all hover:translate-x-1 hover:shadow-lg"
                    >
                      <div className="w-[50px] h-[50px] bg-gradient-to-br from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.1)] rounded-xl flex items-center justify-center text-2xl">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">{tool.title}</h4>
                        <p className="text-[#666] text-sm">{tool.description}</p>
                      </div>
                      <Button className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-5 py-2 rounded-[25px] font-semibold">
                        Configure
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setCurrentSection(5)}
                  className="mt-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-8 py-3 rounded-[25px] font-semibold hover:shadow-lg transition-all"
                >
                  Generate Integration Plan →
                </Button>
              </div>
            )}

            {/* Section 5: Integration Plan */}
            {currentSection === 5 && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-[#667eea] text-2xl font-bold mb-5">Your ILMI Integration Plan</h2>

                <Card className="bg-white border-2 border-[#667eea] rounded-[20px] p-8 mb-5">
                  <h3 className="text-[#667eea] font-bold text-xl mb-5">Modality Strategy Summary</h3>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-[#667eea] font-semibold mb-4">Selected Modalities</h4>
                      <Card className="bg-[#f8f9fa] p-4 rounded-xl mb-2.5">
                        <strong>Primary:</strong> {selections.primaryModality || "Not selected"}
                        <br />
                        <small>Motor cortex & hippocampus activation</small>
                      </Card>
                      <Card className="bg-[#f8f9fa] p-4 rounded-xl">
                        <strong>Secondary:</strong> {selections.secondaryModality || "None"}
                        <br />
                        <small>Visual cortex for spatial processing</small>
                      </Card>
                    </div>

                    <div>
                      <h4 className="text-[#667eea] font-semibold mb-4">Neuroscience Alignment</h4>
                      <ul className="space-y-2 leading-8">
                        <li>✓ Dual Coding Theory applied</li>
                        <li>✓ Multiple memory pathways</li>
                        <li>✓ Enhanced retention (2.3x)</li>
                        <li>✓ Experiential learning activated</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#667eea] font-semibold mb-4">Implementation Checklist</h4>
                    <div className="space-y-2.5">
                      {[
                        "Configure Unity VR environment for kinesthetic interaction",
                        "Create visual support materials in Synthesia",
                        "Design interactive scenarios in Storyline 360",
                        "Set up xAPI tracking for modality effectiveness",
                        "Test dual-coding combinations with pilot group",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center p-2.5 bg-[#f8f9fa] rounded-xl">
                          <Checkbox className="w-5 h-5 mr-4" defaultChecked={index < 2} />
                          <label className="text-sm">{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Card className="mt-8 p-5 bg-gradient-to-br from-[rgba(72,187,120,0.1)] to-[rgba(56,161,105,0.1)] rounded-2xl">
                    <h4 className="text-[#48bb78] font-bold mb-2.5">✨ Ready for ICES!</h4>
                    <p>
                      Your modality selections will now flow into the Cognitive Engagement Spectrum for final
                      calibration.
                    </p>
                  </Card>
                </Card>

                <div className="flex gap-4 justify-center">
                  <Button className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-6 py-2.5 rounded-[25px] font-semibold">
                    📥 Export Modality Plan
                  </Button>
                  <Button className="bg-[#f8f9fa] text-[#667eea] border-2 border-[#667eea] px-6 py-2.5 rounded-[25px] font-semibold">
                    📊 View Analytics
                  </Button>
                  <Button className="bg-[#48bb78] text-white px-6 py-2.5 rounded-[25px] font-semibold hover:shadow-lg">
                    → Continue to ICES
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
