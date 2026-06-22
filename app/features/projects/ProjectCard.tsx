"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "./projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:border-primary/30 transition-all">
        {/* IMAGE */}
        <div className="relative h-48 w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>

        {/* HEADER */}
        <CardHeader className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">
            {project.name}
          </h2>
          <p className="text-sm text-muted-foreground">by {project.author}</p>
        </CardHeader>

        {/* BODY */}
        <CardContent className="flex flex-col gap-3 flex-1">
          <p className="text-sm text-muted-foreground">{project.description}</p>

          {/* STACK */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-muted text-muted-foreground hover:bg-muted/70"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="mt-auto flex gap-2">
            <Button asChild variant="outline" className="w-full">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Code
              </a>
            </Button>

            {project.demo && (
              <Button asChild className="w-full">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
