import Link from "next/link"
import { getPolicies } from "@/lib/sanity/queries"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { FileText, ChevronRight } from "lucide-react"

export const metadata = {
  title: "Policies & Legal | LXD360",
  description: "Review LXD360's policies, terms of use, privacy policy, and legal information.",
}

export default async function PoliciesPage() {
  const policies = await getPolicies()

  return (
    <div className="min-h-screen bg-[#001D3D]">
      <PublicHeader />

      <main className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#F5F5F5] mb-6 font-[family-name:var(--font-montserrat)]">
            Policies & Legal
          </h1>
          <p className="text-xl text-[#F5F5F5]/70 mb-12 font-[family-name:var(--font-lato)]">
            Review our policies, terms of use, privacy practices, and legal information.
          </p>

          <div className="grid gap-4">
            {policies.map((policy) => (
              <Link
                key={policy._id}
                href={`/policies/${policy.slug.current}`}
                className="group block bg-gradient-to-br from-[#232323]/60 to-[#001D3D]/60 backdrop-blur-xl rounded-2xl p-6 border border-[#7103A0]/30 hover:border-[#0056B8] transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0056B8] to-[#7103A0] flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#F5F5F5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#F5F5F5] mb-1 font-[family-name:var(--font-montserrat)] group-hover:text-[#019EF3] transition-colors">
                        {policy.title}
                      </h3>
                      {policy.lastUpdated && (
                        <p className="text-sm text-[#F5F5F5]/60 font-[family-name:var(--font-lato)]">
                          Last updated:{" "}
                          {new Date(policy.lastUpdated).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#F5F5F5]/60 group-hover:text-[#019EF3] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          {policies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#F5F5F5]/70 font-[family-name:var(--font-lato)]">
                Policy documents are being prepared. Please check back soon.
              </p>
              <p className="text-[#F5F5F5]/50 mt-4 font-[family-name:var(--font-lato)]">
                For immediate assistance, contact:{" "}
                <a href="mailto:Policies_and_Compliance@lxd360.com" className="text-[#019EF3] hover:underline">
                  Policies_and_Compliance@lxd360.com
                </a>
              </p>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-[#7103A0]/30">
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 font-[family-name:var(--font-montserrat)]">
              Questions?
            </h2>
            <p className="text-[#F5F5F5]/70 font-[family-name:var(--font-lato)]">
              For questions about our policies or legal matters, please contact:{" "}
              <a
                href="mailto:Policies_and_Compliance@lxd360.com"
                className="text-[#019EF3] hover:underline"
              >
                Policies_and_Compliance@lxd360.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  )
}
