// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/tests/theme-toggle.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

describe("ThemeToggle", () => {
  it("toggles and persists theme", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const darkBtn = screen.getByRole("button", { name: /set dark theme/i });
    await userEvent.click(darkBtn);

    await waitFor(() => {
      expect(document.documentElement).toHaveClass("dark");
    });

    // next-themes stores preference in localStorage under key 'theme'
    expect(window.localStorage.getItem("theme")).toBe("dark");

    const lightBtn = screen.getByRole("button", { name: /set light theme/i });
    await userEvent.click(lightBtn);

    await waitFor(() => {
      expect(document.documentElement).not.toHaveClass("dark");
    });
  });
});

