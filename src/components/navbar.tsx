"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
] as const

const social = [
  { name: "GitHub", label: "Open GitHub in new tab", href: "https://github.com/dimuthnc", Icon: Github },
  { name: "LinkedIn", label: "Open LinkedIn in new tab", href: "https://www.linkedin.com/in/dimuththaraka", Icon: Linkedin },
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when navigating
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href))

  const menuId = "mobile-nav"

  return (
    <header className="site-header">
      {/* Skip to content link for accessibility */}
      <a href="#content" className="site-skiplink">
        Skip to content
      </a>

      <nav aria-label="Main navigation" className="fx-shell">
        <div className="site-header__row">
          <div className="flex items-center gap-6">
            <Link href="/" className="site-wordmark">
              Dimuth Menikgamage
            </Link>

            <ul className="hidden md:flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="site-nav__link"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="site-iconbtn"
                >
                  <Icon aria-hidden />
                </a>
              ))}
            </div>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="site-iconbtn md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls={menuId}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id={menuId} hidden={!open} className="md:hidden pb-4">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("site-nav__link", "site-nav__link--stacked")}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex flex-wrap items-center gap-3 sm:hidden">
              {social.map(({ name, label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={label}
                  className="fx-button fx-button--quiet fx-button--sm"
                >
                  <Icon aria-hidden /> {name}
                </a>
              ))}
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
