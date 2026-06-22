"use client";

import { Input } from "@/components/ui/input";

export function ProjectSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      placeholder="Search projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-background border-border focus-visible:ring-2 focus-visible:ring-primary/30"
    />
  );
}
