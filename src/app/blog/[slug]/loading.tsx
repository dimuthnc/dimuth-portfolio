export default function BlogPostLoading() {
  return (
    <div className="fx-shell animate-pulse" aria-busy>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article>
          <header className="mb-10">
            <div className="site-skeleton mb-4 h-3 w-48" />
            <div className="site-skeleton mb-3 h-9 w-full" />
            <div className="site-skeleton mb-4 h-9 w-2/3" />
            <div className="site-skeleton h-5 w-5/6" />
            <div className="mt-5 flex gap-2">
              <div className="site-skeleton h-6 w-16" />
              <div className="site-skeleton h-6 w-14" />
              <div className="site-skeleton h-6 w-20" />
            </div>
          </header>
          <div className="space-y-3">
            <div className="site-skeleton h-4 w-5/6" />
            <div className="site-skeleton h-4 w-4/6" />
            <div className="site-skeleton h-4 w-3/5" />
            <div className="site-skeleton h-4 w-2/3" />
          </div>
        </article>
        <aside className="hidden lg:block">
          <div className="fx-panel">
            <div className="site-skeleton mb-4 h-3 w-24" />
            <div className="space-y-2">
              <div className="site-skeleton h-3 w-40" />
              <div className="site-skeleton h-3 w-28" />
              <div className="site-skeleton h-3 w-36" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
