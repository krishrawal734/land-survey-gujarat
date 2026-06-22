import { MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { LOCATIONS, PROPERTY_TYPES } from '../utils/constants'

export default function SearchBar({ filters = {}, onFilterChange, onSearch, compact = false }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.()
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by location, survey number..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange?.('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
          />
        </div>
        <button type="submit" className="px-5 py-2.5 bg-secondary text-white rounded-xl font-medium hover:bg-secondary/90 transition-colors text-sm">
          Search
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 sm:p-6 shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="relative lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Keyword, Survey No..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange?.('search', e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200/50 bg-white/80 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <select
            value={filters.location || ''}
            onChange={(e) => onFilterChange?.('location', e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200/50 bg-white/80 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm appearance-none cursor-pointer"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <select
            value={filters.type || ''}
            onChange={(e) => onFilterChange?.('type', e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200/50 bg-white/80 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm appearance-none cursor-pointer"
          >
            <option value="">Property Type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-secondary hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-secondary/25"
        >
          Search Properties
        </button>
      </div>
    </form>
  )
}
