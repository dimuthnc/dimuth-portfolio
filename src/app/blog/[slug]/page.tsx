import { loadBlogs, type InternalBlogPost } from "@/lib/content";
import { notFound } from "next/navigation";
import { getMdxPost } from "@/lib/mdx";
import TableOfContents from "@/components/toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

function longDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function isoDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toISOString();
}

function ArticleHead({
  date,
  meta,
  title,
  description,
  tags,
}: {
  date: string;
  meta?: string;
  title: string;
  description?: string;
  tags?: string[];
}) {
  return (
    <header className="mb-10">
      <p className="fx-eyebrow">
        Writing
        <span className="fx-dot" aria-hidden />
        <time dateTime={isoDate(date)}>{longDate(date)}</time>
        {meta ? (
          <>
            <span className="fx-dot" aria-hidden />
            {meta}
          </>
        ) : null}
      </p>
      <h1 className="fx-title">{title}</h1>
      {description ? <p className="fx-lead mt-4">{description}</p> : null}
      {tags?.length ? (
        <div className="fx-cluster mt-5">
          {tags.map((t) => (
            <span key={t} className="fx-tag">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const profile = await loadProfile();
  const mdx = await getMdxPost(params.slug);
  const url = canonical(`/blog/${params.slug}`)
  if (mdx) {
    const { frontmatter, toc, content, readingTimeText } = mdx;

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
      <div className="fx-shell">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="min-w-0">
            <ArticleHead
              date={String(frontmatter.date)}
              meta={readingTimeText || undefined}
              title={frontmatter.title}
              description={frontmatter.description}
              tags={frontmatter.tags}
            />
            <div className="site-article">
              <MDXRemote
                source={content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
              />
            </div>
            <div className="mt-12 border-t border-rule pt-6">
              <Link href="/blog" className="fx-link inline-flex items-center gap-2 text-small">
                <ArrowLeft aria-hidden /> All articles
              </Link>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
          </article>
          <aside className="h-fit lg:sticky lg:top-24">
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </div>
    );
  }

  // Fallback to internal JSON-based minimal page
  const posts = await loadBlogs();
  const post = posts.find((p): p is InternalBlogPost => p.type === "internal" && p.slug === params.slug);
  if (!post) return notFound();

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
    <div className="fx-shell fx-shell--narrow">
      <article>
        <ArticleHead date={post.date} meta={post.source} title={post.title} tags={post.tags} />
        <div className="site-article">
          <p>{post.excerpt}</p>
          <p className="fx-panel__label">Full content coming soon</p>
        </div>
        <div className="mt-12 border-t border-rule pt-6">
          <Link href="/blog" className="fx-link inline-flex items-center gap-2 text-small">
            <ArrowLeft aria-hidden /> All articles
          </Link>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      </article>
    </div>
  );
}
