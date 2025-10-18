// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/app/loading.tsx
export default function RootLoading() {
  return (
    <div className="space-y-6" aria-busy>
      <div>
        <div className="h-7 w-40 bg-muted rounded mb-2" />
        <div className="h-4 w-64 bg-muted/70 rounded" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-5">
            <div className="h-4 w-1/2 bg-muted rounded mb-2" />
            <div className="h-3 w-2/3 bg-muted/70 rounded mb-4" />
            <div className="h-16 w-full bg-muted/50 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

