"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Temporary Badge component (replace with shadcn/ui when available)
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${className}`}>
    {children}
  </span>
)

// Styles object for better maintainability
const styles = {
  // Layout
  section: "w-full px-0 py-24",
  container: "w-full",
  
  // Header
  header: "text-center space-y-4 mb-16 px-4",
  title: "text-3xl md:text-4xl font-bold font-mono",
  subtitle: "text-lg text-muted-foreground max-w-2xl mx-auto",
  
  // Grid
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 w-full",
  
  // Project cards
  projectLink: "group relative aspect-square overflow-hidden cursor-pointer block",
  projectImage: "object-cover transition-transform duration-500 group-hover:scale-110",
  
  // Overlay
  overlay: "absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-6 text-center",
  overlayTitle: "text-white text-xl md:text-2xl font-bold mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-mono",
  overlayDescription: "text-white/90 text-sm md:text-base leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75",
  overlayTags: "flex flex-wrap gap-2 mt-4 justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150",
  badge: "text-xs bg-white/20 text-white border-white/30",
  
  // Click indicator
  clickIndicator: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  clickIndicatorBg: "bg-white/20 backdrop-blur-sm rounded-full p-2",
  icon: "h-4 w-4 text-white",
  
  // Footer
  footer: "text-center mt-12 px-4",
  viewAllButton: "ml-2 h-5 w-5"
} as const

// Project data
const projects = [
  {
    id: 1,
    title: "Diabolum in Tabula",
    description: "Board game design using Laser Cutting and Vinyl printing techniques.",
    image: "/Diabolum_1.png",
    tags: ["Laser Cutting", "Digital Fabrication", "Adobe Illustrator"],
    link: "#",
  },
  {
    id: 2,
    title: "Montessori Trolley Problem",
    description: "Children's toy design using 3D modeling, 3D printing, and surfacing techniques.",
    image: "/Trolley_cover.JPG",
    tags: ["3D Printing", "Digital Fabrication", "3D Modeling"],
    link: "#",
  },
  {
    id: 3,
    title: "Eat the Metaballs",
    description: "GLSL shader-based game design with a focus on interactive graphics.",
    image: "/metaball.png",
    tags: ["Game Design", "Interactive Graphics", "GLSL"],
    link: "#",
  },
  {
    id: 4,
    title: "Recursive Raytracing",
    description: "A project focused on advanced rendering techniques using recursive raytracing algorithms.",
    image: "/Raytracing_cover.png",
    tags: ["Rendering", "Raytracing", "Computer Graphics"],
    link: "#",
  },
  {
    id: 5,
    title: "Healthcare Platform",
    description: "Patient portal design for a healthcare platform with focus on usability and patient experience.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Healthcare UX", "Web Design", "User Research"],
    link: "#",
  },
  {
    id: 6,
    title: "Food Delivery App",
    description: "End-to-end design for a food delivery application including user and restaurant interfaces.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Mobile Design", "Multi-sided Platform", "Service Design"],
    link: "#",
  },
] as const

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Work</h2>
          <p className={styles.subtitle}>
            A selection of projects that showcase my approach to solving complex design challenges
          </p>
        </div>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link}
              className={styles.projectLink}
            >
              <Image
                src={project.image || "/Diabolum_1.png"}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.projectImage}
                quality={95}
                priority={project.id <= 3}
                onError={(e) => {
                  console.error(`Failed to load image: ${project.image}`, e);
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "/Diabolum_1.png";
                }}
              />

              {/* Hover Overlay */}
              <div className={styles.overlay}>
                <h3 className={styles.overlayTitle}>
                  {project.title}
                </h3>
                <p className={styles.overlayDescription}>
                  {project.description}
                </p>
                <div className={styles.overlayTags}>
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} className={styles.badge}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Click Indicator */}
              <div className={styles.clickIndicator}>
                <div className={styles.clickIndicatorBg}>
                  <ExternalLink className={styles.icon} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className={styles.footer}>
          <Button variant="outline" size="lg">
            View All Projects
            <ArrowRight className={styles.viewAllButton} />
          </Button>
        </div>
      </div>
    </section>
  )
}
