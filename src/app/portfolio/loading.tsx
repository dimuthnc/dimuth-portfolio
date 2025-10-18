// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/app/portfolio/loading.tsx
export default function PortfolioLoading() {
  return (
    <div className="space-y-6" aria-busy>
      <div>
        <div className="h-7 w-32 bg-muted rounded mb-2" />
        <div className="h-4 w-72 bg-muted/70 rounded" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-5">
            <div className="h-40 w-full bg-muted rounded mb-3" />
            <div className="h-4 w-1/2 bg-muted rounded mb-2" />
            <div className="h-3 w-2/3 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

