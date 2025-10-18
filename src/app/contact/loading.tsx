// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/app/contact/loading.tsx
export default function ContactLoading() {
  return (
    <div className="space-y-8" aria-busy>
      <div className="space-y-2">
        <div className="h-7 w-28 bg-muted rounded" />
        <div className="h-4 w-80 bg-muted/70 rounded" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-16 w-full bg-muted rounded" />
        <div className="h-16 w-full bg-muted rounded" />
      </div>
      <div>
        <div className="h-5 w-40 bg-muted rounded mb-3" />
        <div className="rounded-lg border p-4 space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-9 w-full bg-muted rounded" />
            <div className="h-9 w-full bg-muted rounded" />
          </div>
          <div className="h-24 w-full bg-muted rounded" />
          <div className="h-9 w-32 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}

