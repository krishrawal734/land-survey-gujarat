import { useParams, Link } from 'react-router-dom'
import {
  MapPin, Ruler, BadgeCheck, Phone, Mail, CheckCircle, ArrowLeft, Share2, Heart,
} from 'lucide-react'
import { motion } from 'framer-motion'

import PropertyGallery from '../components/PropertyGallery'
import PropertyCard from '../components/PropertyCard'
import ScrollReveal from '../components/ScrollReveal'
import properties from '../data/properties.json'
import { formatPrice, formatArea, formatDate } from '../utils/formatters'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-28">
        <h1 className="text-2xl font-bold text-primary mb-4">Property Not Found</h1>
        <Link to="/properties" className="text-secondary font-medium hover:underline">
          Back to Properties
        </Link>
      </div>
    )
  }

  const similar = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.location === property.location))
    .slice(0, 3)

  return (
    <>
      <section className="pt-28 pb-8 bg-surface">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-muted hover:text-secondary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Properties
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-secondary uppercase tracking-wide">{property.type}</span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mt-1">{property.title}</h1>
              <p className="flex items-center gap-2 text-muted mt-2">
                <MapPin className="w-4 h-4 text-accent" />
                {property.village}, {property.location}, {property.district}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-white transition-colors" aria-label="Share">
                <Share2 className="w-5 h-5 text-muted" />
              </button>
              <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-white transition-colors" aria-label="Save">
                <Heart className="w-5 h-5 text-muted" />
              </button>
              <div className="text-2xl sm:text-3xl font-bold text-secondary">{formatPrice(property.price)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <PropertyGallery images={property.images} title={property.title} />
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-primary mb-4">Property Overview</h2>
                  <p className="text-muted leading-relaxed mb-6">{property.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Area', value: formatArea(property.area) },
                      { label: 'Status', value: property.status },
                      { label: 'Listed', value: formatDate(property.listedDate) },
                      { label: 'Taluka', value: property.taluka },
                    ].map((item) => (
                      <div key={item.label} className="bg-surface rounded-xl p-4 text-center">
                        <div className="text-xs text-muted mb-1">{item.label}</div>
                        <div className="text-sm font-semibold text-primary">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-primary mb-4">Survey Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Survey Number', value: property.surveyNumber },
                      { label: 'Sub Division', value: property.subDivision },
                      { label: 'Village', value: property.village },
                      { label: 'District', value: property.district },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                        <BadgeCheck className="w-5 h-5 text-secondary shrink-0" />
                        <div>
                          <div className="text-xs text-muted">{item.label}</div>
                          <div className="text-sm font-semibold text-primary">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-primary mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="rounded-2xl overflow-hidden h-72 bg-gray-100">
                  <iframe
                    title="Property Location"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${property.coordinates.lng}!3d${property.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 sticky top-28"
                >
                  <h3 className="font-bold text-lg text-primary mb-4">Owner Details</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-bold">
                      {property.owner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-primary flex items-center gap-2">
                        {property.owner.name}
                        {property.owner.verified && (
                          <BadgeCheck className="w-4 h-4 text-secondary" />
                        )}
                      </div>
                      <div className="text-xs text-muted">Verified Owner</div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <a href={`tel:${property.owner.phone}`} className="flex items-center gap-3 p-3 bg-surface rounded-xl hover:bg-secondary/5 transition-colors">
                      <Phone className="w-4 h-4 text-secondary" />
                      <span className="text-sm">{property.owner.phone}</span>
                    </a>
                    <a href={`mailto:${property.owner.email}`} className="flex items-center gap-3 p-3 bg-surface rounded-xl hover:bg-secondary/5 transition-colors">
                      <Mail className="w-4 h-4 text-secondary" />
                      <span className="text-sm">{property.owner.email}</span>
                    </a>
                  </div>
                  <button className="w-full py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Schedule Visit
                  </button>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-primary mb-3">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted">Price</span><span className="font-semibold">{formatPrice(property.price)}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Area</span><span className="font-semibold flex items-center gap-1"><Ruler className="w-3.5 h-3.5" />{formatArea(property.area)}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Survey No</span><span className="font-semibold">{property.surveyNumber}</span></div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-primary mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
