import { Hero } from '@/components/Hero'
import { FeatureHighlights } from '@/components/FeatureHighlights'
import { DemoSection } from '@/components/DemoSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <DemoSection />
        <FeatureHighlights />
      </main>
    </div>
  )
}

