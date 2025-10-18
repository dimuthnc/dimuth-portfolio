"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/lib/content"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)

  const onCardClick = (post: BlogPost) => {
    if (post.type === "external") {
      setPendingUrl(post.url)
    } else {
      router.push(`/blog/${post.slug}`)
    }
  }

  const confirmNavigate = () => {
    if (pendingUrl) {
      // Navigate in the same tab after confirming
      window.location.href = pendingUrl
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => {
        const key = post.type === "internal" ? post.slug : post.url
        return (
          <article key={key} className="rounded-lg border bg-card text-card-foreground p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold leading-snug">
                {/* Title as button to handle external/internal */}
                <button
                  onClick={() => onCardClick(post)}
                  className="text-left hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  aria-label={`Open ${post.title}`}
                >
                  {post.title}
                </button>
              </h2>
              <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                {post.source}
              </span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{formatDate(post.date)}</div>
            <p className="mt-3 text-sm text-muted-foreground/90 line-clamp-3">{post.excerpt}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              {post.type === "internal" ? (
                <Button asChild variant="secondary" size="sm" aria-label="Read post">
                  <Link href={`/blog/${post.slug}`}>Read</Link>
                </Button>
              ) : (
                <Button variant="secondary" size="sm" aria-label="Read post (external)" onClick={() => onCardClick(post)}>
                  Read externally <ExternalLink className="size-3.5" aria-hidden />
                </Button>
              )}
            </div>
          </article>
        )
      })}

      <Dialog open={!!pendingUrl} onOpenChange={(open) => !open && setPendingUrl(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are leaving this website</DialogTitle>
            <DialogDescription>
              You are about to open an external link. Continue to the external site?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setPendingUrl(null)} autoFocus>Cancel</Button>
            <Button onClick={confirmNavigate}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BlogList
