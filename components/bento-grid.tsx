"use client"

import React from "react"
import colors from "tailwindcss/colors"

interface BentoItem {
  id: string
  type: string
  name: string
}

interface BentoGridProps {
  items: BentoItem[]
}

const getTailwindColorNames = () => [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald",
  "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"
]

// safely get a specific shade of a Tailwind color (e.g., 500)
const getColorShade = (colorName: keyof typeof colors, shade: number) => {
  const color = colors[colorName]
  if (typeof color === "object" && shade in color) {
    return color[shade as keyof typeof color]
  }
  return "#000000"
}

export default function BentoGrid({ items }: BentoGridProps) {
  const colorNames = getTailwindColorNames()
  const selectedColorNames = colorNames.slice(0, items.length)

  const gradients = selectedColorNames.map(colorName => ({
    from: getColorShade(colorName as keyof typeof colors, 500),
    to: getColorShade(colorName as keyof typeof colors, 700),
  }))

  return (
    <div className="flex flex-wrap w-full gap-6 justify-between p-4 max-w-6xl mx-auto">
      {items.map((item, index) => {
        const gradient = gradients[index]

        return (
          <div
            key={item.id}
            className="w-[48%] p-6 rounded-3xl shadow-xl text-white relative overflow-hidden transition-transform hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <h5 className="ml-3 text-xl font-semibold capitalize">{item.name}</h5>
            </div>
            <div>
              <a
                href="#"
                className="text-white/90 font-semibold text-sm hover:underline flex items-center"
              >
                Visualizar Grupo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
