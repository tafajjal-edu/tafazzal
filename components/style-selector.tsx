"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StyleSelectorProps {
  value: string
  onChange: (value: string) => void
}

const styles = [
  { id: "photorealistic", name: "Photorealistic", description: "Realistic photo-like images" },
  { id: "digital-art", name: "Digital Art", description: "Modern digital artwork style" },
  { id: "anime", name: "Anime", description: "Japanese anime and manga style" },
  { id: "painting", name: "Painting", description: "Traditional painting styles" },
  { id: "cinematic", name: "Cinematic", description: "Movie-like scenes with dramatic lighting" },
  { id: "fantasy", name: "Fantasy", description: "Magical and fantastical imagery" },
]

export default function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Image Style</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-2 pt-1">
        {styles.map((style) => (
          <div key={style.id} className="flex items-center space-x-2">
            <RadioGroupItem value={style.id} id={`style-${style.id}`} />
            <Label htmlFor={`style-${style.id}`} className="cursor-pointer text-sm">
              {style.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
