// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/tests/blog-external-link.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogList } from "@/components/blog-list";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const posts = [
  {
    type: "external" as const,
    title: "External Post",
    source: "Medium",
    date: new Date().toISOString(),
    tags: ["test"],
    excerpt: "Excerpt",
    url: "https://example.com",
  },
];

describe("BlogList external link warning", () => {
  it("shows confirm dialog when clicking external post action", async () => {
    render(<BlogList posts={posts} />);

    await userEvent.click(
      screen.getByRole("button", { name: /read post \(external\)/i })
    );

    expect(
      await screen.findByText(/you are leaving this website/i)
    ).toBeInTheDocument();
  });
});
