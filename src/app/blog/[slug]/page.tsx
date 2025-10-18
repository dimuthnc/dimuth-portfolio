import { loadBlogs, type InternalBlogPost } from "@/lib/content";
import { notFound } from "next/navigation";
import { getMdxPost } from "@/lib/mdx";
import TableOfContents from "@/components/toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";
import { loadProfile } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const mdx = await getMdxPost(params.slug);
  const base = canonical(`/blog/${params.slug}`)
  if (mdx) {
    const { frontmatter } = mdx
    const title = frontmatter.title
    const description = frontmatter.description || `Article by Dimuth Menikgamage on ${new Date(frontmatter.date).toDateString()}`
    return {
      title,
      description,
      alternates: { canonical: base },
      openGraph: {
        title,
        description,
        url: base,
        type: "article",
        publishedTime: new Date(frontmatter.date).toISOString(),
        tags: frontmatter.tags,
        images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${title} — Article` }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [defaultOgImage],
      },
    }
  }
  const posts = await loadBlogs();
  const post = posts.find((p): p is InternalBlogPost => p.type === "internal" && p.slug === params.slug)
  if (!post) return {}
  const title = post.title
  const description = post.excerpt
  return {
    title,
    description,
    alternates: { canonical: base },
    openGraph: {
      title,
      description,
      url: base,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${title} — Article` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const profile = await loadProfile();
  const mdx = await getMdxPost(params.slug);
  const url = canonical(`/blog/${params.slug}`)
  if (mdx) {
    const { frontmatter, toc, content, readingTimeText } = mdx;
    const date = new Date(frontmatter.date);
    const dateStr = isNaN(date.getTime())
      ? frontmatter.date
      : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: frontmatter.title,
      description: frontmatter.description || undefined,
      datePublished: new Date(frontmatter.date).toISOString(),
      author: { "@type": "Person", name: profile.name },
      mainEntityOfPage: url,
      image: [defaultOgImage],
      keywords: frontmatter.tags || [],
    }

    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <article>
          <header className="mb-6 space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">{frontmatter.title}</h1>
            <p className="text-sm text-muted-foreground">
              {dateStr}
              {readingTimeText ? <> • {readingTimeText}</> : null}
            </p>
            {frontmatter.tags?.length ? (
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((t) => (
                  <span key={t} className="rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </header>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
            />
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        </article>
        <aside className="lg:sticky lg:top-24 h-fit">
          <TableOfContents toc={toc} />
        </aside>
      </div>
    );
  }

  // Fallback to internal JSON-based minimal page
  const posts = await loadBlogs();
  const post = posts.find((p): p is InternalBlogPost => p.type === "internal" && p.slug === params.slug);
  if (!post) return notFound();

  const date = new Date(post.date);
  const dateStr = isNaN(date.getTime()) ? post.date : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Person", name: profile.name },
    mainEntityOfPage: url,
    image: [defaultOgImage],
    keywords: post.tags || [],
  }

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">{post.title}</h1>
      <p className="text-sm text-muted-foreground">{dateStr} • {post.source}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">{t}</span>
        ))}
      </div>
      <hr className="my-6" />
      <p className="text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <p className="mt-4 text-sm text-muted-foreground">Full content coming soon…</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </article>
  );
}
