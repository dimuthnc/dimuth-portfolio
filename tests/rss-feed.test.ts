// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/tests/rss-feed.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the content loader
vi.mock("@/lib/content", () => ({
  loadBlogs: vi.fn(),
}));

// Mock the seo module
vi.mock("@/lib/seo", () => ({
  getSiteUrl: () => new URL("https://dimuthmenikgama.com"),
}));

describe("RSS Feed", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("generates valid RSS XML with correct headers", async () => {
    const { loadBlogs } = await import("@/lib/content");
    (loadBlogs as ReturnType<typeof vi.fn>).mockResolvedValue([
      {
        type: "internal",
        title: "Test Internal Post",
        slug: "test-internal-post",
        source: "dimuthmenikgama.com",
        date: "2025-01-15",
        tags: ["test", "rss"],
        excerpt: "This is a test internal post excerpt.",
      },
      {
        type: "external",
        title: "Test External Post",
        url: "https://medium.com/test-external",
        source: "Medium",
        date: "2025-01-10",
        tags: ["external"],
        excerpt: "This is a test external post excerpt.",
      },
    ]);

    const { GET } = await import("@/app/rss.xml/route");
    const response = await GET();

    // Check response status and headers
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/rss+xml; charset=utf-8");
    expect(response.headers.get("Cache-Control")).toBe(
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    // Check XML content
    const xml = await response.text();

    // Validate RSS structure
    expect(xml).toContain('<?xml version="1.0" encoding="utf-8"?>');
    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");
    expect(xml).toContain("<title>Dimuth Menikgamage – Blog</title>");
    expect(xml).toContain("<link>https://dimuthmenikgama.com/blog</link>");
    expect(xml).toContain("<language>en</language>");

    // Check internal post has correct URL
    expect(xml).toContain("<title><![CDATA[Test Internal Post]]></title>");
    expect(xml).toContain(
      "<link>https://dimuthmenikgama.com/blog/test-internal-post</link>"
    );
    expect(xml).toContain("This is a test internal post excerpt.");

    // Check external post has its original URL
    expect(xml).toContain("<title><![CDATA[Test External Post]]></title>");
    expect(xml).toContain("<link>https://medium.com/test-external</link>");
    expect(xml).toContain("This is a test external post excerpt.");
  });

  it("limits feed items to 50", async () => {
    const { loadBlogs } = await import("@/lib/content");

    // Create 60 mock posts
    const manyPosts = Array.from({ length: 60 }, (_, i) => ({
      type: "internal" as const,
      title: `Post ${i + 1}`,
      slug: `post-${i + 1}`,
      source: "dimuthmenikgama.com",
      date: `2025-01-${String(i + 1).padStart(2, "0")}`,
      tags: ["test"],
      excerpt: `Excerpt for post ${i + 1}`,
    }));

    (loadBlogs as ReturnType<typeof vi.fn>).mockResolvedValue(manyPosts);

    const { GET } = await import("@/app/rss.xml/route");
    const response = await GET();
    const xml = await response.text();

    // Count the number of <item> tags
    const itemMatches = xml.match(/<item>/g);
    expect(itemMatches).toHaveLength(50);
  });

  it("includes RSS feed auto-discovery link in layout metadata", async () => {
    // This test validates that the RSS alternate link is in the layout metadata
    // Since we can't easily import and evaluate the metadata from layout.tsx,
    // we check the file content directly for the expected structure
    const fs = await import("fs/promises");
    const path = await import("path");
    const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");
    const layoutContent = await fs.readFile(layoutPath, "utf-8");

    expect(layoutContent).toContain("application/rss+xml");
    expect(layoutContent).toContain("/rss.xml");
  });
});

