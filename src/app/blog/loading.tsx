// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/app/blog/loading.tsx
export default function BlogLoading() {
  return (
    <div className="space-y-6" aria-busy>
      <div>
        <div className="h-7 w-28 bg-muted rounded mb-2" />
        <div className="h-4 w-56 bg-muted/70 rounded" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-5">
            <div className="h-4 w-1/2 bg-muted rounded mb-2" />
            <div className="h-3 w-1/3 bg-muted rounded mb-3" />
            <div className="h-16 w-full bg-muted/60 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

