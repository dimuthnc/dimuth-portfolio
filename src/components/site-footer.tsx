import Link from "next/link"
import { loadBlogs, loadProfile } from "@/lib/content"

function monthYear(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" })
}

/**
 * The persistent status strip. One honest piece of state — when something
 * was last published here — and nothing decorative.
 */
export async function SiteFooter() {
  const [posts, profile] = await Promise.all([loadBlogs(), loadProfile()])
  const latest = posts[0]
  const year = new Date().getFullYear()

  return (
    <footer className="fx-shell mt-16">
      <div className="fx-statusbar">
        <span className="fx-pulse" aria-hidden />
        {latest ? <span>Last published {monthYear(latest.date)}</span> : <span>Online</span>}
        <span className="fx-dot" aria-hidden />
        <Link href="/rss.xml" className="fx-link" target="_blank" rel="noopener noreferrer">
          RSS
        </Link>
        <span className="fx-statusbar__end">
          © {year} {profile.name}
          {profile.city ? ` · ${profile.city}` : null}
        </span>
      </div>
    </footer>
  )
}

export default SiteFooter
