import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Ruler, BadgeCheck, Eye, Heart } from 'lucide-react'
import { formatPrice, formatArea } from '../utils/formatters'

export default function PropertyCard({ property, onQuickView, featured = false }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {property.verified && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-secondary/90 text-white text-xs font-semibold rounded-full">
            <BadgeCheck className="w-3 h-3" /> Verified
          </span>
        )}

        {featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-accent text-primary text-xs font-bold rounded-full">
            Featured
          </span>
        )}

        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onQuickView?.(property)}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-primary" />
          </button>
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors" aria-label="Save property">
            <Heart className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1.5 bg-white/95 text-primary font-bold text-sm rounded-lg shadow">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wide">{property.type}</span>
        <h3 className="text-lg font-bold text-primary mt-1 mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
          {property.title}
        </h3>

        <div className="space-y-2 text-sm text-muted mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <span>{property.location}, {property.village}</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-accent shrink-0" />
            <span>{formatArea(property.area)}</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-accent shrink-0" />
            <span>Survey No: {property.surveyNumber}</span>
          </div>
        </div>

        <Link
          to={`/properties/${property.id}`}
          className="block w-full text-center py-2.5 border-2 border-secondary text-secondary font-semibold rounded-xl hover:bg-secondary hover:text-white transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  )
}
