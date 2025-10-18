import { loadBlogs } from "@/lib/content";
import { BlogList } from "@/components/blog-list";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";

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
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="text-sm text-muted-foreground">Articles, notes, and references.</p>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
