import ImageGenerator from "@/components/image-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "Generate beautiful images using AI",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">AI Image Generator</h1>
          <p className="text-lg text-muted-foreground">Create stunning images with AI using simple text prompts</p>
        </div>
        <ImageGenerator />
      </div>
    </main>
  )
}
