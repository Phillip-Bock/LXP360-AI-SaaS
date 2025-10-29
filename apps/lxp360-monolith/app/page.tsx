import { HomePage } from "@/components/home-page"

export default async function Home() {
  const defaultData = {
    heroTitle: "Engineering the Future of Learning",
    heroSubtitle: "Transform workforce development with AI-powered learning experiences",
    heroCtaText: "Get Started",
    clientLogosTitle: "Strategic Partners",
    featuresTitle: "Powerful Features for Modern Learning",
    platformTitle: "See LXP360 in Action",
    testimonialsTitle: "What Our Clients Say",
    testimonials: [], // Empty array prevents null reference errors
    features: [
      {
        title: "AI-Powered Content Creation",
        description: "Generate engaging learning content in minutes with our advanced AI engine",
        icon: "Sparkle",
      },
      {
        title: "Unified Learning Ecosystem",
        description: "All your learning tools in one place - authoring, delivery, and analytics",
        icon: "Stack",
      },
      {
        title: "Real-Time Analytics",
        description: "Track learner progress and measure training effectiveness with powerful insights",
        icon: "ChartLine",
      },
    ],
  }

  return <HomePage data={defaultData} />
}
