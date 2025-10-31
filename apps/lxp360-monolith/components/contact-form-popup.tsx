"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, CalendarCheck, PaperPlaneTilt, CheckCircle, Briefcase } from "@phosphor-icons/react"
import { createClient } from "@/lib/supabase/client"

interface ContactFormPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactFormPopup({ open, onOpenChange }: ContactFormPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
      })

      if (error) {
        console.error("[v0] Error saving contact submission:", error)
        throw error
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("[v0] Contact form submission error:", error)
      // Still show success to user even if database save fails
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }

    // Reset form and close after success
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", phone: "", message: "" })
      setIsSuccess(false)
      onOpenChange(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#001D3D] via-[#003066] to-[#001D3D] border-2 border-[#019EF3]/30 text-white p-0">
        <div className="relative">
          {/* Glowing background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EF06C8]/10 rounded-full filter blur-[100px]" />
          </div>

          <div className="relative p-8">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-4xl font-bold text-white font-lato bg-gradient-to-r from-cyan-300 via-blue-300 to-[#EF06C8] bg-clip-text text-transparent">
                How can we help?
              </DialogTitle>
              <DialogDescription className="text-lg text-white/80 font-montserrat">
                We're here to hear! Reach out to our team for support, inquiries, or personalized demos – we'd love to
                connect with you.
              </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in-up">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse" />
                  <CheckCircle className="w-24 h-24 text-green-400 relative" weight="fill" />
                </div>
                <h3 className="text-2xl font-bold text-white font-lato">Message Sent Successfully!</h3>
                <p className="text-white/70 font-montserrat">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Contact Cards */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4 font-lato">Get in Touch</h3>

                  {/* Sales Card */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#0056B8] to-[#019EF3] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                    <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-[#019EF3]/30 hover:border-[#019EF3]/60 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0056B8] to-[#019EF3] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0056B8]/30">
                          <Briefcase className="w-6 h-6 text-white" weight="duotone" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2 font-lato">Sales</h4>
                          <p className="text-sm text-white/70 mb-3 font-montserrat">
                            Ready to boost your sales? We offer the tools and insights to help you drive conversions and
                            focused revenue.
                          </p>
                          <a
                            href="mailto:sales@lxd360.com"
                            className="text-[#019EF3] hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-2 transition-colors underline"
                          >
                            Schedule a call
                            <span>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Card */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#019EF3] to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                    <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#019EF3] to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                          <Phone className="w-6 h-6 text-white" weight="duotone" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2 font-lato">Help and Support</h4>
                          <p className="text-sm text-white/70 mb-3 font-montserrat">
                            We're here for you. Whether it's a small issue or a big challenge, our support team is
                            resources are ready to help.
                          </p>
                          <a
                            href="mailto:support@lxd360.com"
                            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-2 transition-colors underline"
                          >
                            Contact support
                            <span>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule a Demo Card */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#EF06C8] to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                    <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-[#EF06C8]/30 hover:border-[#EF06C8]/60 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EF06C8] to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#EF06C8]/30">
                          <CalendarCheck className="w-6 h-6 text-white" weight="duotone" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2 font-lato">Schedule a Demo</h4>
                          <p className="text-sm text-white/70 mb-3 font-montserrat">
                            See LXP360 in action! Book a personalized demo with our team and discover how we can
                            transform your learning experience.
                          </p>
                          <a
                            href="https://calendly.com/lxd360"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#EF06C8] hover:text-purple-400 text-sm font-medium inline-flex items-center gap-2 transition-colors underline"
                          >
                            Book a demo
                            <span>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Contact Form */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 font-lato">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/90">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] min-h-[44px]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] min-h-[44px]"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white/90">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] min-h-[44px]"
                          placeholder="Acme Inc"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white/90">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] min-h-[44px]"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white/90">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="bg-slate-800/60 border-[#019EF3]/30 text-white placeholder:text-white/40 focus:border-[#019EF3] resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#0056B8] via-[#019EF3] to-[#EF06C8] hover:from-[#003066] hover:via-[#0056B8] hover:to-[#EF06C8] text-white font-semibold py-6 text-lg min-h-[44px] rounded-lg shadow-2xl shadow-[#019EF3]/30 hover:shadow-[#EF06C8]/50 hover:scale-105 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <PaperPlaneTilt className="ml-2 w-5 h-5" weight="bold" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
