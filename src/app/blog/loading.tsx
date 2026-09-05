export default function BlogLoading() {
  return (
    <div className="fx-shell animate-pulse" aria-busy>
      <div className="site-pagehead">
        <div className="site-skeleton mb-4 h-3 w-24" />
        <div className="site-skeleton mb-4 h-9 w-2/3" />
        <div className="site-skeleton h-5 w-80" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="fx-panel">
            <div className="site-skeleton mb-4 h-3 w-1/3" />
            <div className="site-skeleton mb-3 h-6 w-3/4" />
            <div className="site-skeleton h-16 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
