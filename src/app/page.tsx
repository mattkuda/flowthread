import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { FeatureHighlights } from '@/components/FeatureHighlights'
import { DemoSection } from '@/components/DemoSection'
import { Footer } from '@/components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <DemoSection />
        <FeatureHighlights />
      </main>
      <Footer />
    </div>
  )
}

