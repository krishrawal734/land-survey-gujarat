import { X, MapPin, Ruler, BadgeCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatPrice, formatArea } from '../utils/formatters'

export default function QuickViewModal({ property, isOpen, onClose }) {
  if (!property) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img src={property.images[0]} alt={property.title} className="w-full h-48 sm:h-56 object-cover" />
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="absolute bottom-3 left-3 px-3 py-1.5 bg-secondary text-white font-bold rounded-lg">
                  {formatPrice(property.price)}
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-secondary uppercase">{property.type}</span>
                <h3 className="text-xl font-bold text-primary mt-1 mb-4">{property.title}</h3>
                <div className="space-y-2 text-sm text-muted mb-6">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" />{property.location}, {property.village}</div>
                  <div className="flex items-center gap-2"><Ruler className="w-4 h-4 text-accent" />{formatArea(property.area)}</div>
                  <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-accent" />Survey No: {property.surveyNumber}</div>
                </div>
                <p className="text-sm text-muted mb-6 line-clamp-3">{property.description}</p>
                <Link
                  to={`/properties/${property.id}`}
                  onClick={onClose}
                  className="block w-full text-center py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
