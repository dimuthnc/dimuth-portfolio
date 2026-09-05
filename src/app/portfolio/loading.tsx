export default function PortfolioLoading() {
  return (
    <div className="fx-shell animate-pulse" aria-busy>
      <div className="site-pagehead">
        <div className="site-skeleton mb-4 h-3 w-28" />
        <div className="site-skeleton mb-4 h-9 w-1/2" />
        <div className="site-skeleton h-5 w-72" />
      </div>
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="site-skeleton h-8 w-20" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="fx-panel">
            <div className="site-skeleton mb-4 h-3 w-1/3" />
            <div className="site-skeleton mb-4 aspect-video w-full" />
            <div className="site-skeleton mb-2 h-6 w-2/3" />
            <div className="site-skeleton h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
