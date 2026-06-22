"use client"

import { Button } from "@/components/ui/button"

export function ProjectFilters({
  stacks,
  active,
  onChange,
}: {
  stacks: string[]
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={active === "all" ? "default" : "outline"}
        onClick={() => onChange("all")}
      >
        All
      </Button>

      {stacks.map((stack) => (
        <Button
          key={stack}
          variant={active === stack ? "default" : "outline"}
          onClick={() => onChange(stack)}
        >
          {stack}
        </Button>
      ))}
    </div>
  )
}