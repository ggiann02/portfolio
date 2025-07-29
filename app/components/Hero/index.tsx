import Link from "next/link"
import { Button } from "@/components/ui/button"
import React, { Suspense, useRef } from "react"
import RoomModel from "../room"

const styles = {
  container: "min-h-screen bg-white",
  header: "w-full px-6 py-6 md:px-12 lg:px-16",
  nav: "flex items-center justify-between",
  logo: "text-lg font-medium tracking-wide",
  navLinks: "hidden md:flex items-center space-x-8",
  navLink: "text-sm font-medium hover:opacity-70 transition-opacity",
  resumeButton: "border-2 border-black bg-transparent hover:bg-black hover:text-white transition-colors px-6 py-2 text-sm font-medium tracking-wider",
  main: "px-12 py-12 md:px-20 lg:px-32 xl:px-40",
  row: "flex flex-col lg:flex-row gap-12 lg:gap-16 items-center",
  leftColumn: "w-full lg:w-1/2 space-y-8",
  heading: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight",
  ctaButton: "bg-black text-white hover:bg-gray-800 px-8 py-3 text-sm font-medium tracking-wider rounded-none",
  rightColumn: "w-full lg:w-1/2",
  roomModel: "w-full h-[500px]",
  imagePlaceholder: "aspect-[4/3] bg-gray-300 rounded-2xl w-full",
  mobileNav: "md:hidden fixed bottom-6 left-6 right-6",
  mobileNavContent: "bg-white border border-gray-200 rounded-lg shadow-lg p-4",
  mobileNavLinks: "flex justify-center space-x-8",
  mobileNavLink: "text-sm font-medium hover:opacity-70 transition-opacity"
}

export default function HeroSection() {
  return (
    <div className={styles.container}>
      {/* Navigation Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          {/* Logo/Name */}
          <div className={styles.logo}>Giorgia Giannico</div>

          {/* Navigation Links */}
          <div className={styles.navLinks}>
            <Link href="/work" className={styles.navLink}>
              Work
            </Link>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </div>

          {/* Resume Button */}
          <Link 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className={styles.resumeButton}
            >
              RESUME
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className={styles.main}>
        <div className={styles.row}>
          {/* Left Column - Text Content */}
          <div className={styles.leftColumn}>
            <h1 className={styles.heading}>
              Giorgia
              <br />
              Giannico
            </h1>

            <Button className={styles.ctaButton}>
              VIEW MY WORK
            </Button>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.roomModel}>
              <RoomModel />
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Navigation Menu (Hidden by default, can be toggled) */}
      <div className={styles.mobileNav}>
        <div className={styles.mobileNavContent}>
          <div className={styles.mobileNavLinks}>
            <Link href="/work" className={styles.mobileNavLink}>
              Work
            </Link>
            <Link href="/about" className={styles.mobileNavLink}>
              About
            </Link>
            <Link href="/contact" className={styles.mobileNavLink}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
