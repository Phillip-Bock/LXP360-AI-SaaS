"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play } from "@phosphor-icons/react"

export function AboutPageContent() {
  const [activeValue, setActiveValue] = useState(0)

  return (
    <main className="min-h-screen bg-[#001D3D]">
      {/* Section 1: Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001D3D] via-[#0056B8]/20 to-[#001D3D]" />

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7103A0] rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#019EF3] rounded-full blur-[128px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-[#7103A0] text-[#F5F5F5] bg-[#7103A0]/10 backdrop-blur-sm px-6 py-2 text-sm font-semibold animate-fade-in"
          >
            Transformative Learning Driving True Behavioral Change
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-[#F5F5F5] mb-6 animate-fade-in-up font-[family-name:var(--font-montserrat)]">
            Get to know LXD360
          </h1>

          <p className="text-2xl md:text-3xl text-[#019EF3] font-semibold mb-12 animate-fade-in-up delay-200 font-[family-name:var(--font-montserrat)]">
            Training the Future for the Future
          </p>

          {/* Placeholder for Sanity image */}
          <div className="mt-12 max-w-4xl mx-auto animate-fade-in-up delay-400">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#7103A0] shadow-[0_0_50px_rgba(113,3,160,0.3)]">
              <Image src="/modern-learning-technology-workspace.jpg" alt="LXD360 Workspace" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About / Our Story */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <Badge
                variant="outline"
                className="border-[#019EF3] text-[#F5F5F5] bg-[#019EF3]/10 backdrop-blur-sm px-6 py-2 text-sm font-semibold"
              >
                Our Story
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] font-[family-name:var(--font-montserrat)]">
                Get to know LXD360
              </h2>

              <p className="text-lg text-[#F5F5F5]/80 leading-relaxed font-[family-name:var(--font-lato)]">
                At LXD360, we believe training should be more than a checkbox—it should be a catalyst for growth. Our
                mission is to future-proof your talent by blending innovative technology with proven learning science.
                We design transformative, measurable experiences that boost workforce performance and prepare your
                organization for whatever comes next.
              </p>

              <p className="text-lg text-[#F5F5F5]/80 leading-relaxed font-[family-name:var(--font-lato)]">
                Our vision is a world where learning is a continuous, integrated part of work, empowering every
                individual to adapt and excel. From day one, we bring a 360-degree approach to learning experience
                design, creating dynamic, data-driven, and deeply human solutions that unlock true potential.
              </p>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#7103A0] shadow-[0_0_50px_rgba(113,3,160,0.3)]">
                <Image src="/diverse-team-collaboration-learning.jpg" alt="LXD360 Team" fill className="object-cover" />
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#7103A0] rounded-full blur-[64px] opacity-50 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Logo Defined */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F5] text-center mb-16 font-[family-name:var(--font-montserrat)]">
            LXD360: The Story Behind the Name
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: 3D Rotating Logo */}
            <div className="relative flex items-center justify-center animate-fade-in-left">
              <div className="relative w-full max-w-md aspect-square">
                {/* Rotating logo container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 animate-spin-slow">
                    <Image
                      src="/lxd360-3d-logo.jpg"
                      alt="LXD360 3D Logo"
                      fill
                      className="object-contain drop-shadow-[0_0_30px_rgba(113,3,160,0.6)]"
                    />
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#7103A0] rounded-full blur-[100px] opacity-30 animate-pulse" />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="space-y-6 animate-fade-in-right">
              <p className="text-lg text-[#F5F5F5]/90 leading-relaxed font-[family-name:var(--font-lato)]">
                Our founder is passionate about bridging the gap between the science of how people learn and the
                powerful new tools of technology. He envisioned a company that could transform workforce development,
                rejecting the status quo, and turning training into a true engine for lasting impact. This foundational
                drive is our fundamental "why."
              </p>

              <p className="text-lg text-[#F5F5F5]/90 leading-relaxed font-[family-name:var(--font-lato)]">
                The name <span className="text-[#019EF3] font-semibold">LXD360</span> reflects this holistic view:
                <span className="text-[#019EF3] font-semibold"> LXD (Learning Experience Design)</span> combined with a{" "}
                <span className="text-[#019EF3] font-semibold">360-degree approach</span>. It ensures we consider every
                angle of how people learn and grow, empowering individuals to thrive amid constant change.
              </p>

              <p className="text-lg text-[#F5F5F5]/90 leading-relaxed font-[family-name:var(--font-lato)]">
                Our mission is a promise to our clients, partners, and ourselves: to never stop striving for excellence,
                never stop pushing the boundaries of what's possible, and always empower every person to unlock their
                full potential. This purpose guides us as we help build a future of work where learning is truly at the
                center of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Values - LEARN */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#001D3D] to-[#001D3D]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-6xl md:text-8xl font-bold text-[#F5F5F5] tracking-[0.2em] font-[family-name:var(--font-montserrat)]">
              L E A R N
            </h2>
            <p className="text-xl text-[#F5F5F5]/80 max-w-3xl mx-auto leading-relaxed font-[family-name:var(--font-lato)]">
              Our culture and approach are grounded in five core values, captured in the acronym LEARN. These principles
              guide every decision and reflect who we are and how we work:
            </p>
            <Button
              variant="outline"
              className="mt-6 border-[#7103A0] text-[#F5F5F5] hover:bg-[#7103A0] hover:text-[#F5F5F5] px-8 py-6 text-lg bg-transparent"
            >
              Let's LEARN Together
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Sticky scroll values */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mt-20">
            {/* Left: Value cards that stick */}
            <div className="space-y-12">
              {[
                {
                  letter: "L",
                  title: "Lifelong Learning",
                  description:
                    "We believe learning never stops. Growth and curiosity drive us – both in our team and in the solutions we create. This commitment ensures we stay at the forefront of industry knowledge and inspire the same in our learners.",
                },
                {
                  letter: "E",
                  title: "Excellence",
                  description:
                    'We are committed to the highest standards in everything we do. From instructional design to client service, we refuse to settle for "good enough." Every program we deliver is crafted with quality, rigor, and attention to detail.',
                },
                {
                  letter: "A",
                  title: "Adaptability",
                  description:
                    "In the fast-paced world of technology and workforce needs, we stay agile and embrace change. Adaptability means we tailor our solutions to each client's unique context and pivot quickly as needs evolve.",
                },
                {
                  letter: "R",
                  title: "Results Driven",
                  description:
                    "We focus on delivering real, measurable impact. The success of a training program isn't just in its launch but in the results it achieves. We set clear objectives and KPIs for learning initiatives and hold ourselves accountable to them. This value ensures that business outcomes and learner success remain at the heart of everything we do.",
                },
                {
                  letter: "N",
                  title: "Next Generation Thinking",
                  description:
                    'We innovate boldly and look to the future. Next-Gen Thinking means we are always exploring cutting-edge technologies (AI, AR/VR, adaptive learning platforms) and creative methodologies to push the boundaries of learning. We don\'t do "status quo" – we strive to reimagine training for the modern era.',
                },
              ].map((value, index) => (
                <div
                  key={value.letter}
                  className={`group relative p-8 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    activeValue === index
                      ? "border-[#7103A0] bg-[#7103A0]/10 shadow-[0_0_50px_rgba(113,3,160,0.3)]"
                      : "border-[#019EF3]/30 bg-[#001D3D]/50 hover:border-[#019EF3] hover:bg-[#019EF3]/5"
                  }`}
                  onMouseEnter={() => setActiveValue(index)}
                >
                  <h3 className="text-3xl font-bold text-[#F5F5F5] mb-4 font-[family-name:var(--font-montserrat)]">
                    {value.title}
                  </h3>
                  <p className="text-lg text-[#F5F5F5]/80 leading-relaxed font-[family-name:var(--font-lato)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Letter images that change */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#7103A0] shadow-[0_0_50px_rgba(113,3,160,0.3)] bg-gradient-to-br from-[#0056B8]/20 to-[#7103A0]/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[20rem] font-bold text-[#7103A0] opacity-20 font-[family-name:var(--font-montserrat)]">
                    {["L", "E", "A", "R", "N"][activeValue]}
                  </span>
                </div>
                <Image
                  src={`/letter-.jpg?height=800&width=800&query=letter ${["L", "E", "A", "R", "N"][activeValue]} artistic design`}
                  alt={`Letter ${["L", "E", "A", "R", "N"][activeValue]}`}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Founder */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Split image (photo + iframe) */}
            <div className="space-y-6 animate-fade-in-left">
              {/* Founder photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#7103A0] shadow-[0_0_50px_rgba(113,3,160,0.3)]">
                <Image src="/professional-business-portrait-phillip-bock.jpg" alt="Phillip Bock, Ph.D." fill className="object-cover" />
              </div>

              {/* Magazine iframe */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#019EF3] shadow-[0_0_30px_rgba(1,158,243,0.3)] bg-[#001D3D]">
                <iframe
                  src="https://incirclexec.com/valerie-kiffin-lewis-fall-magazine-2025/"
                  title="Continental Who's Who Inner Circle Magazine"
                  className="w-full h-full"
                  allow="fullscreen"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#001D3D]/90 backdrop-blur-sm p-4 rounded-lg border border-[#019EF3]/30">
                  <p className="text-sm text-[#F5F5F5]/80 font-[family-name:var(--font-lato)]">
                    Featured on page 170 and bio on page 238 - Continental Who's Who Inner Circle Magazine
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Bio content */}
            <div className="space-y-6 animate-fade-in-right">
              <h3 className="text-4xl font-bold text-[#F5F5F5] font-[family-name:var(--font-montserrat)]">
                Phillip Bock, Ph.D.
              </h3>

              <div className="space-y-4 text-lg text-[#F5F5F5]/90 leading-relaxed font-[family-name:var(--font-lato)]">
                <p>
                  LXD360 was founded on a deep belief that corporate learning can be better – more engaging, more
                  effective, and more attuned to the demands of a changing world. Phillip Bock is a service-disabled
                  veteran and seasoned and industry recognized Learning Experience Designer with a Ph.D. in
                  Instructional Theory and Technology with a Master's degree in Human Performance Technology and a
                  Master's degree in Instructional Design. He also minored in cognitive learning.
                </p>

                <p>
                  He saw first-hand how traditional training often failed to truly empower people or translate into
                  performance. His experiences in high-stakes environments taught him that effective learning can save
                  time, resources, and even lives – but only if it's done right.
                </p>

                <p>
                  With a passion for advancing learning experiences using research-backed methods and emerging
                  technologies, he envisioned a company that could bridge the gap between the science of how people
                  learn and the new tools of technology, bringing a 360-degree approach to workforce development.
                </p>
              </div>

              {/* Decorative badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7103A0]/10 border border-[#7103A0] backdrop-blur-sm">
                <span className="text-[#019EF3] font-semibold font-[family-name:var(--font-lato)]">
                  Continental Who's Who Inner Circle Magazine Inductee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Demo Request CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#7103A0]/30 via-[#0056B8]/20 to-transparent" />

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7103A0] rounded-full blur-[200px] animate-pulse" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold text-[#F5F5F5] leading-tight font-[family-name:var(--font-montserrat)]">
              Stop Training.
              <br />
              <span className="text-[#019EF3]">Start Transforming.</span>
            </h2>

            <p className="text-xl md:text-2xl text-[#F5F5F5]/80 leading-relaxed max-w-3xl mx-auto font-[family-name:var(--font-lato)]">
              Your organization deserves a learning partner that builds measurable, future-proof talent. If you are
              ready to move beyond the checklist and implement a powerful, 360-degree strategy that acts as a true
              catalyst for growth, let's connect. Request a demo below and let us show you what's possible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-[#0056B8] hover:bg-[#0056B8]/90 text-[#F5F5F5] border-2 border-[#7103A0] shadow-[0_0_30px_rgba(113,3,160,0.5)] px-8 py-6 text-lg font-semibold"
              >
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#019EF3] text-[#F5F5F5] hover:bg-[#019EF3]/10 px-8 py-6 text-lg font-semibold bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" weight="fill" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
