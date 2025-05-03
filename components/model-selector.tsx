"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface ModelSelectorProps {
  value: string
  onChange: (value: string) => void
}

const models = [
  {
    id: "stabilityai/sd3.5",
    name: "Stable Diffusion 3.5",
    description: "Premium quality base model, 8B parameters",
  },
  {
    id: "stabilityai/sd3.5-medium",
    name: "Stable Diffusion 3.5 Medium",
    description: "Balanced 2.5B parameter model",
  },
  {
    id: "black-forest-labs/FLUX-1.1-pro",
    name: "FLUX 1.1 Pro",
    description: "Latest state-of-art model with superior prompt following",
  },
  {
    id: "black-forest-labs/FLUX-1-schnell",
    name: "FLUX 1 Schnell",
    description: "Fast generation in 1-4 steps",
  },
  {
    id: "black-forest-labs/FLUX-1-dev",
    name: "FLUX 1 Dev",
    description: "Optimized for anatomical accuracy",
  },
  {
    id: "black-forest-labs/FLUX-pro",
    name: "FLUX Pro",
    description: "Flagship Flux model",
  },
  {
    id: "stabilityai/sdxl-turbo",
    name: "SDXL Turbo",
    description: "Optimized for fast generation",
  },
]

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor="model">AI Model</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-80">
              <p>Different models have different strengths and capabilities.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="model">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex flex-col">
                <span>{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
