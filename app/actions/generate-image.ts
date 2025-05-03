"use server"

import { experimental_generateImage as generateImageAI } from "ai"
import { deepinfra } from "@ai-sdk/deepinfra"

interface GenerateImageParams {
  prompt: string
  negativePrompt?: string
  size?: string
  style?: string
  model?: string
  seed?: number
  numInferenceSteps?: number
  guidanceScale?: number
}

export async function generateImage({
  prompt,
  negativePrompt,
  size = "1024x1024",
  style = "photorealistic",
  model = "stabilityai/sd3.5",
  seed,
  numInferenceSteps = 30,
  guidanceScale = 7.5,
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

    // Parse dimensions from size string
    const [width, height] = size.split("x").map(Number)

    // Generate the image using the DeepInfra provider
    const result = await generateImageAI({
      model: deepinfra.image(model),
      prompt: enhancedPrompt,
      negativePrompt: negativePrompt,
      aspectRatio: width === height ? "1:1" : width > height ? "16:9" : "9:16",
      providerOptions: {
        deepinfra: {
          num_inference_steps: numInferenceSteps,
          guidance_scale: guidanceScale,
          seed: seed !== undefined ? seed : Math.floor(Math.random() * 1000000),
        },
      },
    })

    // Return the image URL from the result
    return {
      success: true,
      imageUrl: result.image.url,
    }
  } catch (error) {
    console.error("Error generating image:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate image",
    }
  }
}
