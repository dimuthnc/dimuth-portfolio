export default function ContactLoading() {
  return (
    <div className="fx-shell fx-shell--narrow animate-pulse" aria-busy>
      <div className="site-pagehead">
        <div className="site-skeleton mb-4 h-3 w-24" />
        <div className="site-skeleton mb-4 h-9 w-48" />
        <div className="site-skeleton h-5 w-96 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="fx-panel">
          <div className="site-skeleton mb-3 h-3 w-16" />
          <div className="site-skeleton h-5 w-2/3" />
        </div>
        <div className="fx-panel">
          <div className="site-skeleton mb-3 h-3 w-16" />
          <div className="site-skeleton h-5 w-1/2" />
        </div>
      </div>
      <div className="fx-panel mt-6">
        <div className="site-skeleton mb-6 h-6 w-40" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="site-skeleton h-12 w-full" />
          <div className="site-skeleton h-12 w-full" />
        </div>
        <div className="site-skeleton mt-5 h-24 w-full" />
        <div className="site-skeleton mt-6 h-11 w-40" />
      </div>
    </div>
  )
}
