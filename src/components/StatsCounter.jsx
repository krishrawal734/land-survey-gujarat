import { useCounter } from '../hooks/useScrollReveal'

export default function StatsCounter({ value, suffix = '', label }) {
  const { count, ref } = useCounter(value)

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-sm sm:text-base text-white/70 font-medium">{label}</div>
    </div>
  )
}
