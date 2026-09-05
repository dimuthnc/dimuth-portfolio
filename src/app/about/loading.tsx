export default function AboutLoading() {
  return (
    <div className="fx-shell fx-shell--narrow animate-pulse" aria-busy>
      <div className="site-pagehead">
        <div className="site-skeleton mb-4 h-3 w-16" />
        <div className="site-skeleton mb-5 h-9 w-3/4" />
        <div className="site-skeleton h-5 w-full" />
        <div className="site-skeleton mt-2 h-5 w-5/6" />
        <div className="mt-8 flex gap-3">
          <div className="site-skeleton h-11 w-36" />
          <div className="site-skeleton h-11 w-32" />
        </div>
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="site-section">
          <div className="site-skeleton mb-5 h-6 w-40" />
          <div className="site-skeleton h-24 w-full" />
        </div>
      ))}
    </div>
  )
}
