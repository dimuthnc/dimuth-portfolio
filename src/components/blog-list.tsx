"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BlogPost } from "@/lib/content"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
}

/**
 * Articles are things I wrote, so every panel carries the amber (human) bar.
 * Source and date live in the mono head row; the title is the only ink.
 */
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
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post) => {
        const key = post.type === "internal" ? post.slug : post.url
        return (
          <article key={key} className="fx-panel fx-panel--human flex flex-col">
            <div className="fx-panel__head">
              <span className="fx-panel__label">{post.source}</span>
              <span className="fx-panel__count">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
            </div>

            <h2 className="site-h3">
              {/* Title as button to handle external/internal */}
              <button
                type="button"
                onClick={() => onCardClick(post)}
                className="site-titlelink text-left"
                aria-label={`Open ${post.title}`}
              >
                {post.title}
              </button>
            </h2>

            <p className="fx-prose mt-3 line-clamp-3 text-small">{post.excerpt}</p>

            <div className="fx-cluster mt-4">
              {post.tags.map((t) => (
                <span key={t} className="fx-tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-5">
              {post.type === "internal" ? (
                <Button asChild size="sm" aria-label="Read post">
                  <Link href={`/blog/${post.slug}`}>
                    Read <ArrowRight aria-hidden />
                  </Link>
                </Button>
              ) : (
                <Button size="sm" aria-label="Read post (external)" onClick={() => onCardClick(post)}>
                  Read on {post.source} <ExternalLink aria-hidden />
                </Button>
              )}
            </div>
          </article>
        )
      })}

      <Dialog open={!!pendingUrl} onOpenChange={(open) => !open && setPendingUrl(null)}>
        <DialogContent>
          <DialogHeader>
            <p className="fx-eyebrow mb-0">Leaving this site</p>
            <DialogTitle>You are leaving this website</DialogTitle>
            <DialogDescription>
              You are about to open an external link. Continue to the external site?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="quiet" onClick={() => setPendingUrl(null)} autoFocus>Cancel</Button>
            <Button onClick={confirmNavigate}>Continue <ArrowRight aria-hidden /></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BlogList
