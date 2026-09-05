export default function RootLoading() {
  return (
    <div className="fx-shell animate-pulse" aria-busy>
      <div className="fx-split py-6 sm:py-10">
        <div>
          <div className="site-skeleton mb-4 h-3 w-40" />
          <div className="site-skeleton mb-3 h-12 w-full" />
          <div className="site-skeleton mb-6 h-12 w-3/4" />
          <div className="site-skeleton h-5 w-full" />
          <div className="site-skeleton mt-2 h-5 w-5/6" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="site-avatar site-skeleton border-0" />
          <div className="site-skeleton h-24 w-full" />
          <div className="site-skeleton h-24 w-full" />
        </div>
      </div>
    </div>
  )
}
