"use server"

import { experimental_generateImage as generateImageAI } from "ai"
import { openai } from "@ai-sdk/openai"

interface GenerateImageParams {
  prompt: string
  negativePrompt?: string
  size?: string
  style?: string
  seed?: number
}

export async function generateImage({
  prompt,
  negativePrompt,
  size = "1024x1024",
  style = "photorealistic",
  seed,
}: GenerateImageParams) {
  try {
    // Enhance the prompt based on the selected style
    let enhancedPrompt = prompt

    switch (style) {
      case "photorealistic":
        enhancedPrompt = `Photorealistic, high detail, 8k: ${prompt}`
        break
      case "digital-art":
        enhancedPrompt = `Digital art, vibrant colors, detailed: ${prompt}`
        break
      case "anime":
        enhancedPrompt = `Anime style, manga-inspired, detailed: ${prompt}`
        break
      case "painting":
        enhancedPrompt = `Oil painting, artistic, detailed brushwork: ${prompt}`
        break
      case "cinematic":
        enhancedPrompt = `Cinematic, dramatic lighting, movie scene: ${prompt}`
        break
      case "fantasy":
        enhancedPrompt = `Fantasy art, magical, ethereal, detailed: ${prompt}`
        break
    }

    // Add negative prompt if provided
    if (negativePrompt) {
      enhancedPrompt += ` || Negative prompt: ${negativePrompt}`
    }

    // Generate the image using the AI SDK
    const result = await generateImageAI({
      model: openai.image("dall-e-3"),
      prompt: enhancedPrompt,
      size: size,
      ...(seed !== undefined ? { seed } : {}),
    })

    // Return the image URL from the result
    return {
      success: true,
      imageUrl: result.images[0].base64,
    }
  } catch (error) {
    console.error("Error generating image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate image",
    }
  }
}
