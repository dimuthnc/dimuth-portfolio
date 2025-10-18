// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/app/about/loading.tsx
export default function AboutLoading() {
  return (
    <div className="space-y-6" aria-busy>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="h-7 w-24 bg-muted rounded mb-2" />
          <div className="h-4 w-64 bg-muted/70 rounded" />
        </div>
        <div className="hidden sm:flex gap-3">
          <div className="h-9 w-40 bg-muted rounded" />
          <div className="h-9 w-40 bg-muted rounded" />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <div className="h-5 w-40 bg-muted rounded mb-3" />
          <div className="h-16 w-full bg-muted/60 rounded" />
        </div>
      ))}
    </div>
  )
}

