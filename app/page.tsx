import { LeadGenScraper } from "@/components/lead-gen-scraper"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          LeadHarvest Pro
        </h1>
        <p className="text-center text-muted-foreground mb-10">
          Intelligent lead generation with advanced 3D visualization
        </p>
        <LeadGenScraper />
      </div>
    </main>
  )
}

