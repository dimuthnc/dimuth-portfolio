// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/app/blog/[slug]/loading.tsx
export default function BlogPostLoading() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]" aria-busy>
      <article>
        <header className="mb-6 space-y-2">
          <div className="h-7 w-48 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted/70 rounded" />
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-16 bg-muted rounded" />
            <div className="h-5 w-14 bg-muted rounded" />
            <div className="h-5 w-20 bg-muted rounded" />
          </div>
        </header>
        <div className="space-y-3">
          <div className="h-4 w-5/6 bg-muted/60 rounded" />
          <div className="h-4 w-4/6 bg-muted/60 rounded" />
          <div className="h-4 w-3/5 bg-muted/60 rounded" />
          <div className="h-4 w-2/3 bg-muted/60 rounded" />
        </div>
      </article>
      <aside className="hidden lg:block">
        <div className="h-5 w-32 bg-muted rounded mb-3" />
        <div className="space-y-2">
          <div className="h-3 w-40 bg-muted/70 rounded" />
          <div className="h-3 w-28 bg-muted/70 rounded" />
          <div className="h-3 w-36 bg-muted/70 rounded" />
        </div>
      </aside>
    </div>
  )
}

