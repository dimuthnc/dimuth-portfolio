import { Feed } from "feed";
import { loadBlogs, type BlogPost } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

/**
 * Generates an RSS 2.0 feed for the blog.
 */
export async function GET() {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, "");
  const blogUrl = `${siteUrl}/blog`;

  const feed = new Feed({
    title: "Dimuth Menikgamage – Blog",
    description: "Personal blog posts by Dimuth Menikgamage",
    id: blogUrl,
    link: blogUrl,
    language: "en",
    image: `${siteUrl}/images/avatar.jpg`,
    favicon: `${siteUrl}/icon.svg`,
    copyright: `© ${new Date().getFullYear()} Dimuth Menikgamage`,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
    author: {
      name: "Dimuth Menikgamage",
      email: "dimuthcse@gmail.com",
      link: siteUrl,
    },
  });

  // Load all blog posts and limit to latest 50
  const allPosts = await loadBlogs();
  const posts = allPosts.slice(0, 50);

  for (const post of posts) {
    const postUrl = getPostUrl(post, siteUrl);
    const pubDate = new Date(post.date);

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      date: pubDate,
      published: pubDate,
      author: [
        {
          name: "Dimuth Menikgamage",
          email: "dimuthcse@gmail.com",
          link: siteUrl,
        },
      ],
      category: post.tags.map((tag) => ({ name: tag })),
    });
  }

  const rssXml = feed.rss2();

  return new Response(rssXml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

/**
 * Returns the canonical URL for a blog post.
 * Internal posts use the slug, external posts use their URL directly.
 */
function getPostUrl(post: BlogPost, siteUrl: string): string {
  if (post.type === "internal") {
    return `${siteUrl}/blog/${post.slug}`;
  }
  return post.url;
}

