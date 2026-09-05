import Link from "next/link"
import type { TocItem } from "@/lib/mdx"

/** An aside, so it takes the blue (thought) bar. */
export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc?.length) return null
  return (
    <nav aria-label="Table of contents" className="fx-panel fx-panel--thought">
      <div className="fx-panel__head">
        <span className="fx-panel__label">On this page</span>
      </div>
      <ul className="site-toc__list">
        {toc.map((item) => (
          <li key={item.id} data-level={item.level}>
            <Link href={`#${item.id}`} className="site-toc__link">
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents
