"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, ImageIcon } from "lucide-react"
import { generateImage } from "@/app/actions/generate-image"
import ImageDisplay from "./image-display"
import StyleSelector from "./style-selector"

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [size, setSize] = useState("1024x1024")
  const [style, setStyle] = useState("photorealistic")
  const [seed, setSeed] = useState<number | null>(null)
  const [useSeed, setUseSeed] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateImage({
        prompt,
        negativePrompt: negativePrompt || undefined,
        size,
        style,
        seed: useSeed && seed !== null ? seed : undefined,
      })

      if (result.success) {
        setGeneratedImage(result.imageUrl)
      } else {
        setError(result.error || "Failed to generate image")
      }
    } catch (err) {
      setError("An error occurred while generating the image")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="A futuristic cityscape at sunset with flying cars..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32"
              />
            </div>

            <div>
              <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
              <Textarea
                id="negative-prompt"
                placeholder="Low quality, blurry, distorted..."
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="size">Image Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512x512">512 x 512</SelectItem>
                  <SelectItem value="768x768">768 x 768</SelectItem>
                  <SelectItem value="1024x1024">1024 x 1024</SelectItem>
                  <SelectItem value="1024x768">1024 x 768 (Landscape)</SelectItem>
                  <SelectItem value="768x1024">768 x 1024 (Portrait)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <StyleSelector value={style} onChange={setStyle} />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="use-seed">Use Seed</Label>
                <Switch id="use-seed" checked={useSeed} onCheckedChange={setUseSeed} />
              </div>

              {useSeed && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={seed !== null ? seed : ""}
                      onChange={(e) => setSeed(e.target.value ? Number.parseInt(e.target.value) : null)}
                      placeholder="Seed value"
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleRandomSeed}>
                      Random
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Using the same seed will produce similar results for the same prompt
                  </p>
                </div>
              )}
            </div>

            {error && <div className="text-sm font-medium text-destructive">{error}</div>}

            <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ImageDisplay imageUrl={generatedImage} isLoading={isGenerating} prompt={prompt} />
    </div>
  )
}
