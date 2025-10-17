"use client"

import { useId, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <section id={id} className="rounded-lg border">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            aria-expanded={open}
            aria-controls={contentId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
            <span className="sr-only">Toggle {title}</span>
          </Button>
        </div>
      </div>
      <div
        id={contentId}
        className={cn(
          "px-4 pb-4 md:block",
          open ? "block" : "hidden md:block"
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default CollapsibleSection

