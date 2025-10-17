import { loadBlogs, type InternalBlogPost } from "@/lib/content";
import { notFound } from "next/navigation";
import { getAllMdxSlugs, getMdxPost } from "@/lib/mdx";
import TableOfContents from "@/components/toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await loadBlogs();
  const jsonSlugs = posts
    .filter((p): p is InternalBlogPost => p.type === "internal")
    .map((p) => ({ slug: p.slug }));
  const mdxSlugs = (await getAllMdxSlugs()).map((s) => ({ slug: s }));
  const merged = new Map<string, { slug: string }>();
  for (const s of [...jsonSlugs, ...mdxSlugs]) merged.set(s.slug, s);
  return Array.from(merged.values());
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const mdx = await getMdxPost(params.slug);
  if (mdx) {
    const { frontmatter, toc, content, readingTimeText } = mdx;
    const date = new Date(frontmatter.date);
    const dateStr = isNaN(date.getTime())
      ? frontmatter.date
      : date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

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
    </article>
  );
}
