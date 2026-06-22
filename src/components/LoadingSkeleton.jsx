export default function LoadingSkeleton({ className = 'h-48' }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-surface via-gray-200 to-surface bg-[length:200%_100%] rounded-xl ${className}`}
      style={{ animation: 'shimmer 1.5s infinite' }}
    />
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100">
      <LoadingSkeleton className="h-52 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <LoadingSkeleton className="h-4 w-3/4" />
        <LoadingSkeleton className="h-3 w-1/2" />
        <LoadingSkeleton className="h-3 w-2/3" />
        <LoadingSkeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  )
}
