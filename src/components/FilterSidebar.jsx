import { RotateCcw } from 'lucide-react'
import { LOCATIONS, PROPERTY_TYPES } from '../utils/constants'

export default function FilterSidebar({ filters, onFilterChange, onReset, totalResults }) {
  return (
    <aside className="glass rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-primary">Filters</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-sm text-secondary hover:text-blue-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <p className="text-sm text-muted">{totalResults} properties found</p>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Location</label>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Property Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
        >
          <option value="">All Types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Price Range (₹)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Area Range (Sq.M)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minArea}
            onChange={(e) => onFilterChange('minArea', e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxArea}
            onChange={(e) => onFilterChange('maxArea', e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="area-asc">Area: Small to Large</option>
          <option value="area-desc">Area: Large to Small</option>
        </select>
      </div>
    </aside>
  )
}
