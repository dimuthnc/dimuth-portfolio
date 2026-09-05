"use client"

import { useId, useState, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A titled section separated by a rule. Collapsible on small screens only;
 * on wider screens the content is always shown.
 */
export function CollapsibleSection({
  title,
  children,
  id,
  defaultOpen = true,
}: {
  title: string
  id?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const contentId = useId()
  const [open, setOpen] = useState(defaultOpen)

  // On mount, ensure sections start open on larger screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      if ("matches" in e) setOpen(e.matches)
    }
    handler(mq)
    const listener = (e: MediaQueryListEvent) => handler(e)
    mq.addEventListener("change", listener)
    return () => mq.removeEventListener("change", listener)
  }, [])

  return (
    <section id={id} className="site-section">
      <div className="site-section__head">
        <h2 className="site-section__title">{title}</h2>
        <button
          type="button"
          className="site-iconbtn md:hidden"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <ChevronDown aria-hidden /> : <ChevronRight aria-hidden />}
          <span className="sr-only">Toggle {title}</span>
        </button>
      </div>
      <div
        id={contentId}
        className={cn("md:block", open ? "block" : "hidden md:block")}
      >
        {children}
      </div>
    </section>
  )
}

export default CollapsibleSection
