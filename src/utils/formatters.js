export function formatPrice(price) {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatArea(sqMeters) {
  const sqYards = sqMeters * 1.19599
  const vigha = sqMeters / 1618.74
  if (sqMeters >= 4046.86) {
    return `${(sqMeters / 4046.86).toFixed(2)} Acres (${Math.round(sqYards)} Sq.Yd)`
  }
  return `${Math.round(sqYards)} Sq.Yd (${sqMeters.toLocaleString('en-IN')} Sq.M)`
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
