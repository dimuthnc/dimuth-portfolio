// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/tests/navbar.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders primary nav links", () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );

    ["Home", "Blog", "About", "Portfolio", "Contact"].forEach((name) => {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    });
  });
});

