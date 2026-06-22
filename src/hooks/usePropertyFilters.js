import { useState, useMemo } from 'react'
import { ITEMS_PER_PAGE } from '../utils/constants'

export function usePropertyFilters(properties, initialFilters = {}) {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    sortBy: 'newest',
    ...initialFilters,
  })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...properties]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.surveyNumber.toLowerCase().includes(q) ||
          p.village.toLowerCase().includes(q)
      )
    }

    if (filters.location) {
      result = result.filter((p) => p.location === filters.location)
    }

    if (filters.type) {
      result = result.filter((p) => p.type === filters.type)
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice))
    }

    if (filters.minArea) {
      result = result.filter((p) => p.area >= Number(filters.minArea))
    }

    if (filters.maxArea) {
      result = result.filter((p) => p.area <= Number(filters.maxArea))
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'area-asc':
        result.sort((a, b) => a.area - b.area)
        break
      case 'area-desc':
        result.sort((a, b) => b.area - a.area)
        break
      default:
        result.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate))
    }

    return result
  }, [properties, filters])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      sortBy: 'newest',
    })
    setPage(1)
  }

  return {
    filters,
    filtered,
    paginated,
    page,
    setPage,
    totalPages,
    updateFilter,
    resetFilters,
    totalResults: filtered.length,
  }
}
