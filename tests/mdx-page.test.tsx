// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/tests/mdx-page.test.tsx
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { vi } from "vitest";

vi.mock("@/lib/mdx", () => ({
  getMdxPost: async () => ({
    slug: "test",
    frontmatter: { title: "Hello", date: new Date().toISOString(), tags: ["x"], description: "desc" },
    content: "# Hello\n\nContent",
    toc: [],
    readingTimeText: "1 min",
  }),
}));

vi.mock("@/lib/content", async (orig) => {
  const mod = await (orig as any)();
  return {
    ...mod,
    loadProfile: async () => ({
      name: "Tester",
      title: "Title",
      bio: "Bio",
      email: "test@example.com",
      phone: "+1-234",
      location: "SG",
      links: { linkedin: "#", github: "#" },
    }),
  };
});

// If MDXRemote rendering causes issues in JSDOM, stub it.
vi.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: (props: any) => React.createElement("div", { "data-testid": "mdx" }, props.source),
}));

import BlogPostPage from "@/app/blog/[slug]/page";

describe("MDX Blog page", () => {
  it("renders frontmatter heading", async () => {
    const ui = await BlogPostPage({ params: { slug: "test" } });
    render(ui);
    expect(
      await screen.findByRole("heading", { name: /hello/i, level: 1 })
    ).toBeInTheDocument();
  });
});
