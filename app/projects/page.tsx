"use client"

import { ProjectFilters } from "@/features/projects/ProjectFilters"
import { ProjectGrid } from "@/features/projects/ProjectGrid"
import { projects } from "@/features/projects/projects"
import { ProjectSearch } from "@/features/projects/ProjectSearch"
import { useMemo, useState } from "react"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  // get all stacks
  const allStacks = useMemo(() => {
    return Array.from(new Set(projects.flatMap((p) => p.stack)))
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase())

      const matchesFilter =
        filter === "all" || p.stack.includes(filter)

      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <main className="container mx-auto py-10 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          My work and experiments
        </p>
      </div>

      {/* Search */}
      <ProjectSearch value={search} onChange={setSearch} />

      {/* Filters */}
      <ProjectFilters
        stacks={allStacks}
        active={filter}
        onChange={setFilter}
      />

      {/* Grid */}
      <ProjectGrid projects={filtered} />

    </main>
  )
}