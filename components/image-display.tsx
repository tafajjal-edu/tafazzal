"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Loader2, ImageIcon } from "lucide-react"

interface ImageDisplayProps {
  imageUrl: string | null
  isLoading: boolean
  prompt: string
}

export default function ImageDisplay({ imageUrl, isLoading, prompt }: ImageDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!imageUrl) return

    try {
      setIsDownloading(true)
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `ai-image-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading image:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">Generating your image...</p>
          </div>
        ) : imageUrl ? (
          <div className="flex flex-col w-full h-full">
            <div className="relative flex-1 min-h-[300px] w-full rounded-md overflow-hidden bg-muted">
              <Image src={imageUrl || "/placeholder.svg"} alt={prompt} fill className="object-contain" />
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleDownload} disabled={isDownloading} variant="outline">
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
            <div className="rounded-full bg-muted p-4 mb-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No image generated yet</h3>
            <p className="text-muted-foreground">Enter a prompt and click Generate to create an AI image</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
