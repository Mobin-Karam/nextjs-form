"use client"

import Image from "next/image"
import { Project } from "@/lib/projects"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader>
          <h2 className="text-xl font-semibold">{project.name}</h2>
          <p className="text-sm text-muted-foreground">
            by {project.author}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 flex-1">
          
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-auto flex gap-2">
            <Button asChild variant="outline" className="w-full">
              <a href={project.github} target="_blank">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>

            {project.demo && (
              <Button asChild className="w-full">
                <a href={project.demo} target="_blank">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              </Button>
            )}
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}