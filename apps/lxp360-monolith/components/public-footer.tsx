"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Shield,
} from "lucide-react"

export function PublicFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription logic
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

  const complianceItems = [
    { name: "SOC Type II", icon: Shield },
    { name: "GDPR", icon: Shield },
    { name: "HIPAA", icon: Shield },
    { name: "CCPA/CPRA", icon: Shield },
    { name: "ISO 27001", icon: Shield },
    { name: "SEC", icon: Shield },
    { name: "FINRA", icon: Shield },
  ]

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "X", icon: Twitter, href: "#" },
    { name: "Reddit", icon: Twitter, href: "#" },
    { name: "Medium", icon: Twitter, href: "#" },
    { name: "Vimeo", icon: Mail, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Spotify", icon: Twitter, href: "#" },
    { name: "Amazon", icon: Twitter, href: "#" },
    { name: "Pinterest", icon: Twitter, href: "#" },
  ]

  const supportLinks = [
    { name: "Help Center", href: "mailto:Customer_Support@lxd360.com" },
    { name: "Contact", href: "mailto:Administration@lxd360.com" },
    { name: "Careers", href: "mailto:Careers@lxd360.com" },
  ]

  const policyLinks = [
    { name: "Accessibility", href: "/policies/accessibility" },
    { name: "AI Disclosure", href: "/policies/ai-disclosure" },
    { name: "Cookie Policy", href: "/policies/cookie-policy" },
    { name: "Data Retention & Deletion", href: "/policies/data-retention-deletion" },
    { name: "Terms Of Use", href: "/policies/terms-of-use" },
    { name: "Service Agreement", href: "/policies/service-agreement" },
    { name: "Privacy Policy", href: "/policies/privacy-policy" },
  ]

  const contactEmails = [
    { label: "Administration", email: "Administration@lxd360.com" },
    { label: "Social Media", email: "Social_Media@lxd360.com" },
    { label: "Careers", email: "Careers@lxd360.com" },
    { label: "B2B Sales", email: "B2B_Sales@lxd360.com" },
    { label: "Customer Support", email: "Customer_Support@lxd360.com" },
    { label: "IT Support", email: "IT_Support@lxd360.com" },
    { label: "Policies & Compliance", email: "Policies_and_Compliance@lxd360.com" },
    { label: "Vendor Support", email: "Vendor_Support@lxd360.com" },
    { label: "Learner Support", email: "Learner_Support@lxd360.com" },
  ]

  return (
    <footer className="bg-[#001D3D] border-t border-[#7103A0]/30 text-[#F5F5F5]">
      {/* Newsletter & Compliance Section */}
      <div className="border-b border-[#7103A0]/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-montserrat text-[#F5F5F5]">Subscribe to Our Newsletter</h3>
              <p className="text-[#F5F5F5]/70 font-lato">
                Stay updated with the latest in learning experience design and AI-powered training solutions.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#F5F5F5]/10 border-[#7103A0]/50 text-[#F5F5F5] placeholder:text-[#F5F5F5]/50 focus:border-[#019EF3] font-lato"
                />
                <Button
                  type="submit"
                  className="bg-[#00438F] text-[#F5F5F5] border-[1.5px] border-[#7103A0] rounded-[10px] hover:bg-[#0056B8] shadow-[0_2px_10px_0_rgba(113,3,160,0.75)] font-montserrat font-semibold whitespace-nowrap"
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" weight="duotone" />
                      Subscribed!
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </div>

            {/* Compliance Badges */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold font-montserrat text-[#F5F5F5]">Compliance & Security</h4>
              <div className="flex flex-wrap gap-4">
                {complianceItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5]/5 border border-[#7103A0]/30 rounded-lg hover:border-[#019EF3]/50 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-[#019EF3]" weight="duotone" />
                    <span className="text-sm font-medium font-lato">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-[#7103A0]/20 blur-xl rounded-full" />
                <Image
                  src="/lxd360-logo.png"
                  alt="LXD 360"
                  width={160}
                  height={64}
                  className="h-auto w-auto max-h-12 relative z-10"
                />
              </div>
            </Link>
            <p className="text-sm font-semibold font-montserrat text-[#019EF3]">Training the Future for the Future</p>
            <p className="text-sm text-[#F5F5F5]/70 font-lato leading-relaxed">
              Transforming learning experiences through innovative instructional design and AI-powered solutions.
            </p>
          </div>

          {/* Support Menu */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-montserrat text-[#F5F5F5]">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5F5F5]/70 hover:text-[#019EF3] transition-colors font-lato"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Menu */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-montserrat text-[#F5F5F5]">Policies</h4>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5F5F5]/70 hover:text-[#019EF3] transition-colors font-lato"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold font-montserrat text-[#F5F5F5]">Contact</h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#019EF3] flex-shrink-0 mt-0.5" weight="duotone" />
                <div className="text-sm text-[#F5F5F5]/70 font-lato">
                  <p>United States Corporation Agents, Inc.</p>
                  <p>600 Boulevard South SW Suite 104J</p>
                  <p>Huntsville, AL 35802</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-[#019EF3] flex-shrink-0 mt-0.5" weight="duotone" />
                <div className="text-sm text-[#F5F5F5]/70 font-lato">
                  <p className="font-semibold text-[#F5F5F5]">Office Hours</p>
                  <p>Live Support: M-F 0800 - 2000 CST</p>
                  <p>AI/Email Support: After Hours</p>
                </div>
              </div>

              {/* Key Emails */}
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-[#019EF3] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#F5F5F5]/70 font-lato space-y-1">
                  <a href="mailto:Customer_Support@lxd360.com" className="block hover:text-[#019EF3] transition-colors">
                    Customer_Support@lxd360.com
                  </a>
                  <a href="mailto:B2B_Sales@lxd360.com" className="block hover:text-[#019EF3] transition-colors">
                    B2B_Sales@lxd360.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Social & Copyright */}
      <div className="border-t border-[#7103A0]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-[#F5F5F5]/5 border border-[#7103A0]/30 rounded-lg hover:border-[#019EF3] hover:bg-[#019EF3]/10 transition-all group"
                  aria-label={social.name}
                >
                  <social.icon
                    className="w-5 h-5 text-[#F5F5F5]/70 group-hover:text-[#019EF3] transition-colors"
                    weight="duotone"
                  />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-[#F5F5F5]/50 font-lato text-center md:text-right">
              © {new Date().getFullYear()} LXD360. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
