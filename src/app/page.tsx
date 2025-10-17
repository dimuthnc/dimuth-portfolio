import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="space-y-8">
      <header className="flex items-center justify-between">
        <h1>Dimuth Portfolio</h1>
        <ThemeToggle />
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground p-6">
          <h2 className="mb-2">Themed Card</h2>
          <p className="text-muted-foreground">
            Toggle the theme to see background, foreground and border update.
          </p>
          <div className="mt-4">
            <Button>Sample Button</Button>
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="mb-2">Typography</h2>
          <p>
            This UI uses a monospaced font (JetBrains Mono) for an IDE-like feel.
          </p>
          <pre className="mt-4">
            <code>{"const hello = \"world\""}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
