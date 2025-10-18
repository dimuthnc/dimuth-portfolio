"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Project } from "@/lib/content"
import { ExternalLink, Github } from "lucide-react"

const SHOW_EXTERNAL_WARNING = false // toggleable; default off

function uniqueTags(projects: Project[]): string[] {
  const set = new Set<string>()
  projects.forEach(p => p.tags?.forEach(t => set.add(t)))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [tag, setTag] = useState<string>("All")
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)

  const tags = useMemo(() => ["All", ...uniqueTags(projects)], [projects])

  const filtered = useMemo(() => {
    if (tag === "All") return projects
    return projects.filter(p => p.tags?.includes(tag))
  }, [projects, tag])

  const openExternal = (url: string) => {
    if (SHOW_EXTERNAL_WARNING) setPendingUrl(url)
    else window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {tags.map(t => (
          <Button
            key={t}
            variant={t === tag ? "secondary" : "outline"}
            size="sm"
            aria-pressed={t === tag}
            onClick={() => setTag(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects found for this filter.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={`${p.kind}:${p.title}`} className="rounded-lg border bg-card text-card-foreground overflow-hidden">
              {p.thumbnail ? (
                <div className="relative h-40 w-full">
                  <Image src={p.thumbnail} alt={`${p.title} thumbnail`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              ) : (
                <div className="h-2 w-full bg-accent" aria-hidden />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
                  <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground capitalize">{p.kind}</span>
                </div>
                {p.date ? (
                  <div className="mt-1 text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}</div>
                ) : null}
                <p className="mt-3 text-sm text-muted-foreground/90 line-clamp-3">{p.description}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.tags?.map((t) => (
                    <span key={t} className="rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {SHOW_EXTERNAL_WARNING ? (
                    <Button size="sm" variant="secondary" onClick={() => openExternal(p.url)} aria-label={p.kind === "repo" ? "View repository" : "View site"}>
                      {p.kind === "repo" ? "View repo" : "View site"} <ExternalLink className="size-3.5" />
                    </Button>
                  ) : (
                    <Button asChild size="sm" variant="secondary" aria-label={p.kind === "repo" ? "View repository" : "View site"}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        {p.kind === "repo" ? "View repo" : "View site"} <ExternalLink className="size-3.5" />
                      </a>
                    </Button>
                  )}

                  {p.kind === "site" && "secondaryUrl" in p && p.secondaryUrl ? (
                    SHOW_EXTERNAL_WARNING ? (
                      <Button size="sm" variant="outline" onClick={() => openExternal(p.secondaryUrl!)} aria-label="View source on GitHub">
                        Source <Github className="size-3.5" />
                      </Button>
                    ) : (
                      <Button asChild size="sm" variant="outline" aria-label="View source on GitHub">
                        <a href={p.secondaryUrl} target="_blank" rel="noopener noreferrer">
                          Source <Github className="size-3.5" />
                        </a>
                      </Button>
                    )
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog open={!!pendingUrl} onOpenChange={(open) => !open && setPendingUrl(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are leaving this website</DialogTitle>
            <DialogDescription>Continue to the external site?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setPendingUrl(null)}>Cancel</Button>
            <Button onClick={() => pendingUrl && window.open(pendingUrl, "_blank", "noopener,noreferrer")}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PortfolioGrid
