import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

const styles = {
  footer: "border-t bg-muted/50 w-full",
  container: "w-full px-4 py-12",
  wrapper: "w-full",
  grid: "grid grid-cols-1 md:grid-cols-4 gap-8",
  profileSection: "md:col-span-2",
  profileHeader: "flex items-center space-x-2 mb-4",
  profileIcon: "h-8 w-8 rounded-full bg-primary",
  profileName: "font-bold text-xl font-mono",
  profileDescription: "text-muted-foreground mb-6 max-w-md",
  socialLinks: "flex space-x-4",
  socialButton: "h-5 w-5",
  sectionTitle: "font-semibold mb-4",
  navList: "space-y-2",
  navLink: "text-muted-foreground hover:text-foreground transition-colors",
  serviceItem: "text-muted-foreground",
  bottomSection: "border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center",
  copyright: "text-muted-foreground text-sm",
  legalLinks: "flex space-x-6 mt-4 md:mt-0",
  legalLink: "text-muted-foreground hover:text-foreground text-sm transition-colors"
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.grid}>
            <div className={styles.profileSection}>
              <div className={styles.profileHeader}>
                <div className={styles.profileIcon}></div>
                <span className={styles.profileName}>Giorgia Giannico</span>
              </div>
              <p className={styles.profileDescription}>
                UI/UX Designer crafting beautiful and functional digital experiences. Let&rsquo;s work together to bring your
                ideas to life.
              </p>
              <div className={styles.socialLinks}>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Twitter">
                    <Twitter className={styles.socialButton} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="LinkedIn">
                    <Linkedin className={styles.socialButton} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="GitHub">
                    <Github className={styles.socialButton} />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#" aria-label="Email">
                    <Mail className={styles.socialButton} />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h3 className={styles.sectionTitle}>Navigation</h3>
              <ul className={styles.navList}>
                <li>
                  <Link href="#work" className={styles.navLink}>
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="#about" className={styles.navLink}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className={styles.navLink}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.navLink}>
                    Resume
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={styles.sectionTitle}>Services</h3>
              <ul className={styles.navList}>
                <li>
                  <span className={styles.serviceItem}>UI/UX Design</span>
                </li>
                <li>
                  <span className={styles.serviceItem}>Prototyping</span>
                </li>
                <li>
                  <span className={styles.serviceItem}>User Research</span>
                </li>
                <li>
                  <span className={styles.serviceItem}>Design Systems</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Giorgia Giannico. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <Link href="#" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link href="#" className={styles.legalLink}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
