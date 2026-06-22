export type Project = {
  name: string
  stack: string[]
  author: string
  image: string
  github: string
  demo?: string
  description: string
}

export const projects: Project[] = [
  {
    name: "AI Dashboard",
    description: "Analytics dashboard powered by AI insights.",
    stack: ["Next.js", "Tailwind", "OpenAI"],
    author: "John Doe",
    image: "/projects/p1.png",
    github: "https://github.com/user/ai-dashboard",
    demo: "https://demo.com",
  },
  {
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce with payments.",
    stack: ["Next.js", "Stripe", "Prisma"],
    author: "John Doe",
    image: "/projects/p2.png",
    github: "https://github.com/user/shop",
  },
]