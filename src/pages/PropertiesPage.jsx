import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import PropertyCard from '../components/PropertyCard'
import QuickViewModal from '../components/QuickViewModal'
import ScrollReveal from '../components/ScrollReveal'
import { PropertyCardSkeleton } from '../components/LoadingSkeleton'
import { usePropertyFilters } from '../hooks/usePropertyFilters'
import properties from '../data/properties.json'

export default function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [quickViewProperty, setQuickViewProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const initialFilters = {
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
  }

  const {
    filters,
    paginated,
    page,
    setPage,
    totalPages,
    updateFilter,
    resetFilters,
    totalResults,
  } = usePropertyFilters(properties, initialFilters)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (searchParams.get('search')) updateFilter('search', searchParams.get('search'))
    if (searchParams.get('location')) updateFilter('location', searchParams.get('location'))
    if (searchParams.get('type')) updateFilter('type', searchParams.get('type'))
  }, [searchParams])

  return (
    <>
      <section className="pt-28 pb-12 bg-gradient-to-b from-surface to-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Property Listings</h1>
            <p className="text-muted mb-8">Browse verified land and properties across Gujarat</p>
            <SearchBar
              filters={filters}
              onFilterChange={updateFilter}
              compact
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <p className="text-sm text-muted">{totalResults} properties</p>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={updateFilter}
                  onReset={resetFilters}
                  totalResults={totalResults}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted"><span className="font-semibold text-primary">{totalResults}</span> properties found</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <PropertyCardSkeleton key={i} />
                  ))}
                </div>
              ) : paginated.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl font-semibold text-primary mb-2">No properties found</p>
                  <p className="text-muted mb-6">Try adjusting your filters</p>
                  <button onClick={resetFilters} className="px-6 py-2.5 bg-secondary text-white rounded-xl font-medium">
                    Reset Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  key={page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {paginated.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      featured={property.featured}
                      onQuickView={setQuickViewProperty}
                    />
                  ))}
                </motion.div>
              )}

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-surface transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        page === i + 1 ? 'bg-secondary text-white' : 'border border-gray-200 hover:bg-surface'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-surface transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary/50" onClick={() => setShowMobileFilters(false)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} aria-label="Close filters">
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFilter}
              onReset={resetFilters}
              totalResults={totalResults}
            />
          </motion.div>
        </div>
      )}

      <QuickViewModal
        property={quickViewProperty}
        isOpen={!!quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
      />
    </>
  )
}
