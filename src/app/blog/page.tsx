import { loadBlogs } from "@/lib/content";
import { BlogList } from "@/components/blog-list";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";
import Link from "next/link";
import { Rss } from "lucide-react";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog";
  const description = "Articles, notes, and references.";
  const url = canonical("/blog");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${title} — Dimuth Menikgamage` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [defaultOgImage] },
  };
}

export default async function BlogIndexPage() {
  const posts = await loadBlogs();
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
          <p className="text-sm text-muted-foreground">Articles, notes, and references.</p>
        </div>
        <Link
          href="/rss.xml"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Subscribe via RSS"
        >
          <Rss className="h-4 w-4" />
          <span>Subscribe via RSS</span>
        </Link>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
