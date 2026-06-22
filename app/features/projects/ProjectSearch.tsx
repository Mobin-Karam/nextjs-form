"use client"

import { Input } from "@/components/ui/input"

export function ProjectSearch({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <Input
      placeholder="Search projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}