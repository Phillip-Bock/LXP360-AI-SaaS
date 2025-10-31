import { notFound } from "next/navigation"
import { getPolicyBySlug, getPolicies } from "@/lib/sanity/queries"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { PortableText } from "@portabletext/react"

export async function generateStaticParams() {
  const policies = await getPolicies()
  return policies.map((policy) => ({
    slug: policy.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const policy = await getPolicyBySlug(params.slug)

  if (!policy) {
    return {
      title: "Policy Not Found | LXD360",
    }
  }

  return {
    title: `${policy.title} | LXD360`,
    description: `${policy.title} - LXD360 Learning Experience Design`,
  }
}

export default async function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = await getPolicyBySlug(params.slug)

  if (!policy) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#001D3D]">
      <PublicHeader />

      <main className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-[#F5F5F5] mb-4 font-[family-name:var(--font-montserrat)]">
            {policy.title}
          </h1>

          {policy.lastUpdated && (
            <p className="text-[#F5F5F5]/60 mb-12 font-[family-name:var(--font-lato)]">
              Last Updated: {new Date(policy.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-[#F5F5F5]/80 font-[family-name:var(--font-lato)] space-y-6">
              {policy.content && (
                <PortableText
                  value={policy.content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="mb-4 leading-relaxed">{children}</p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-4xl font-bold text-[#F5F5F5] mt-12 mb-6 font-[family-name:var(--font-montserrat)]">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-3xl font-bold text-[#F5F5F5] mt-10 mb-5 font-[family-name:var(--font-montserrat)]">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-2xl font-bold text-[#F5F5F5] mt-8 mb-4 font-[family-name:var(--font-montserrat)]">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-xl font-bold text-[#F5F5F5] mt-6 mb-3 font-[family-name:var(--font-montserrat)]">
                          {children}
                        </h4>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-[#0056B8] pl-6 my-6 italic text-[#F5F5F5]/90">
                          {children}
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
                      ),
                    },
                    listItem: {
                      bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
                      number: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="font-bold text-[#F5F5F5]">{children}</strong>
                      ),
                      em: ({ children }) => <em className="italic">{children}</em>,
                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          className="text-[#019EF3] hover:text-[#0056B8] underline transition-colors"
                          target={value?.href?.startsWith("http") ? "_blank" : undefined}
                          rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              )}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#7103A0]/30">
            <p className="text-[#F5F5F5]/70 font-[family-name:var(--font-lato)]">
              For questions about this policy, please contact:{" "}
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
