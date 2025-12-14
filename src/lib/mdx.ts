import { promises as fs } from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkMdx from "remark-mdx"
import { visit } from "unist-util-visit"
import GithubSlugger from "github-slugger"
import type { Root, Heading, Text, PhrasingContent } from "mdast"

export type TocItem = { id: string; text: string; level: number }

export type MdxFrontmatter = {
  title: string
  date: string
  tags?: string[]
  description?: string
}

export type MdxPost = {
  slug: string
  frontmatter: MdxFrontmatter
  content: string
  toc: TocItem[]
  readingTimeText: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export async function getAllMdxSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(BLOG_DIR)
    return files.filter(f => f.endsWith(".mdx")).map(f => f.replace(/\.mdx$/, ""))
  } catch {
    return []
  }
}

export async function getMdxPost(slug: string): Promise<MdxPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  // Security check: Prevent Path Traversal
  const relative = path.relative(BLOG_DIR, filePath)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return null
  }

  try {
    const raw = await fs.readFile(filePath, "utf-8")
    const { data, content } = matter(raw)
    const fm = data as MdxFrontmatter
    const rt = readingTime(content).text
    const toc = await buildToc(content)
    return { slug, frontmatter: fm, content, toc, readingTimeText: rt }
  } catch {
    return null
  }
}

async function buildToc(markdown: string): Promise<TocItem[]> {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown) as unknown as Root
  const headings: TocItem[] = []
  const slugger = new GithubSlugger()
  visit(tree, "heading", (node) => {
    const h = node as Heading
    const depth: number = h.depth || 0
    if (depth < 2 || depth > 3) return
    const text = collectText(h)
    const id = slugger.slug(text)
    headings.push({ id, text, level: depth })
  })
  return headings
}

function collectText(node: Heading): string {
  let text = ""
  visit(node, "text", (n) => {
    const t = n as Text
    text += t.value
  })
  // include inlineCode content if present
  node.children.forEach((child: PhrasingContent) => {
    if (child.type === "inlineCode") {
      text += child.value
    }
  })
  return text.trim()
}
