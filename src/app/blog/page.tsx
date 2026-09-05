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
    <div className="fx-shell">
      <header className="site-pagehead flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="fx-eyebrow">
            Writing <span className="fx-dot" aria-hidden /> {posts.length} articles
          </p>
          <h1 className="fx-title">Notes from building and running things.</h1>
          <p className="fx-lead mt-4">Articles, notes, and references — here and on Medium.</p>
        </div>
        <Link
          href="/rss.xml"
          className="fx-button fx-button--quiet shrink-0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Subscribe via RSS"
        >
          <Rss aria-hidden />
          <span>RSS</span>
        </Link>
      </header>
      <BlogList posts={posts} />
    </div>
  );
}
