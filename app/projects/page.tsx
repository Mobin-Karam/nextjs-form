"use client";

import { useMemo, useState } from "react";
import { projects } from "@/features/projects/projects";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectGrid } from "@/features/projects/ProjectGrid";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const allStacks = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.stack))),
    [],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "all" || p.stack.includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main dir="rtl" className="container mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">پروژه‌ها</h1>
      </div>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو..."
          />

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="فیلتر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              {allStacks.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
          >
            پاک‌سازی
          </Button>

          <div className="text-sm">{filtered.length} پروژه</div>
        </CardContent>
      </Card>

      {filtered.length ? (
        <ProjectGrid projects={filtered} />
      ) : (
        <p>پروژه‌ای پیدا نشد</p>
      )}
    </main>
  );
}
