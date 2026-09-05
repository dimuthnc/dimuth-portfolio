"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Project } from "@/lib/content"
import { ArrowRight, ExternalLink, Github } from "lucide-react"

const SHOW_EXTERNAL_WARNING = false // toggleable; default off

function uniqueTags(projects: Project[]): string[] {
  const set = new Set<string>()
  projects.forEach(p => p.tags?.forEach(t => set.add(t)))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
}

/**
 * Projects are code, so every panel carries the teal (machine) bar.
 */
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
      <div className="fx-cluster" role="group" aria-label="Filter by tag">
        <span className="fx-panel__label">Filter</span>
        {tags.map(t => (
          <Button
            key={t}
            variant={t === tag ? "default" : "quiet"}
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
        <p className="fx-prose">No projects found for this filter.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={`${p.kind}:${p.title}`} className="fx-panel fx-panel--machine flex flex-col">
              <div className="fx-panel__head">
                <span className="fx-panel__label">{p.kind === "repo" ? "Repository" : "Site"}</span>
                {p.date ? (
                  <span className="fx-panel__count">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </span>
                ) : null}
              </div>

              {p.thumbnail ? (
                <div className="site-media">
                  <Image src={p.thumbnail} alt={`${p.title} thumbnail`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              ) : null}

              <h2 className="site-h3">{p.title}</h2>
              <p className="fx-prose mt-3 line-clamp-3 text-small">{p.description}</p>

              <div className="fx-cluster mt-4">
                {p.tags?.map((t) => (
                  <span key={t} className="fx-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div className="fx-cluster mt-auto pt-5">
                {SHOW_EXTERNAL_WARNING ? (
                  <Button size="sm" onClick={() => openExternal(p.url)} aria-label={p.kind === "repo" ? "View repository" : "View site"}>
                    {p.kind === "repo" ? "View repo" : "View site"} <ExternalLink aria-hidden />
                  </Button>
                ) : (
                  <Button asChild size="sm" aria-label={p.kind === "repo" ? "View repository" : "View site"}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {p.kind === "repo" ? "View repo" : "View site"} <ExternalLink aria-hidden />
                    </a>
                  </Button>
                )}

                {p.kind === "site" && "secondaryUrl" in p && p.secondaryUrl ? (
                  SHOW_EXTERNAL_WARNING ? (
                    <Button size="sm" variant="quiet" onClick={() => openExternal(p.secondaryUrl!)} aria-label="View source on GitHub">
                      Source <Github aria-hidden />
                    </Button>
                  ) : (
                    <Button asChild size="sm" variant="quiet" aria-label="View source on GitHub">
                      <a href={p.secondaryUrl} target="_blank" rel="noopener noreferrer">
                        Source <Github aria-hidden />
                      </a>
                    </Button>
                  )
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog open={!!pendingUrl} onOpenChange={(open) => !open && setPendingUrl(null)}>
        <DialogContent>
          <DialogHeader>
            <p className="fx-eyebrow mb-0">Leaving this site</p>
            <DialogTitle>You are leaving this website</DialogTitle>
            <DialogDescription>Continue to the external site?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="quiet" onClick={() => setPendingUrl(null)} autoFocus>Cancel</Button>
            <Button onClick={() => pendingUrl && window.open(pendingUrl, "_blank", "noopener,noreferrer")}>
              Continue <ArrowRight aria-hidden />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PortfolioGrid
