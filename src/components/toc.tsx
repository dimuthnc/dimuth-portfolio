import Link from "next/link"
import type { TocItem } from "@/lib/mdx"

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc?.length) return null
  return (
    <nav aria-label="Table of contents" className="rounded-lg border p-4 text-sm">
      <div className="mb-2 font-medium">On this page</div>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : undefined}>
            <Link
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents

