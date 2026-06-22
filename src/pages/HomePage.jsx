import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ShieldCheck, MapPin, Scale, Users, Search, Map, Ruler, FileCheck,
  Wheat, Home, Building2, Factory, TreePine, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import QuickViewModal from '../components/QuickViewModal'
import StatsCounter from '../components/StatsCounter'
import SectionHeader from '../components/SectionHeader'
import TestimonialCard from '../components/TestimonialCard'
import FAQAccordion from '../components/FAQAccordion'
import ContactForm from '../components/ContactForm'
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/ScrollReveal'

import properties from '../data/properties.json'
import categories from '../data/categories.json'
import testimonials from '../data/testimonials.json'
import faqs from '../data/faqs.json'
import { STATS, WHY_CHOOSE_US, SURVEY_SERVICES } from '../utils/constants'

const iconMap = { Wheat, Home, Building2, Factory, TreePine, ShieldCheck, MapPin, Scale, Users, Search, Map, Ruler, FileCheck }

export default function HomePage() {
  const navigate = useNavigate()
  const [heroFilters, setHeroFilters] = useState({ search: '', location: '', type: '' })
  const [quickViewProperty, setQuickViewProperty] = useState(null)

  const featured = properties.filter((p) => p.featured).slice(0, 4)
  const latest = properties.slice(0, 6)

  const handleHeroSearch = () => {
    const params = new URLSearchParams()
    if (heroFilters.search) params.set('search', heroFilters.search)
    if (heroFilters.location) params.set('location', heroFilters.location)
    if (heroFilters.type) params.set('type', heroFilters.type)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
            alt="Gujarat landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>

        <div className="relative container-custom px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-10"
          >
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Gujarat&apos;s #1 Land Survey Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Find Verified Land &amp; Properties in{' '}
              <span className="text-gradient from-accent to-yellow-300">Gujarat</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              Discover premium agricultural land, residential plots, and commercial properties across Gandhinagar, GIFT City, and surrounding areas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:scale-105"
              >
                Explore Properties <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/land-survey"
                className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                Land Survey Services
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SearchBar
              filters={heroFilters}
              onFilterChange={(key, val) => setHeroFilters((f) => ({ ...f, [key]: val }))}
              onSearch={handleHeroSearch}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10"
          >
            {STATS.map((stat) => (
              <StatsCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Featured"
              title="Featured Properties"
              subtitle="Hand-picked verified properties with complete survey documentation across prime Gujarat locations."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((property, i) => (
              <ScrollReveal key={property.id} delay={i * 0.1}>
                <PropertyCard property={property} featured onQuickView={setQuickViewProperty} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link to="/properties" className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all">
              View All Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Categories"
              title="Property Categories"
              subtitle="Browse properties by type to find exactly what you're looking for."
            />
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon]
              return (
                <StaggerItem key={cat.id}>
                  <Link
                    to={`/properties?type=${encodeURIComponent(cat.name)}`}
                    className="group block relative rounded-2xl overflow-hidden aspect-[3/4] hover:scale-[1.03] transition-transform duration-300"
                  >
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
                    <div className="absolute bottom-0 p-4 sm:p-5 text-white">
                      {Icon && <Icon className="w-6 h-6 text-accent mb-2" />}
                      <h3 className="font-bold text-sm sm:text-base">{cat.name}</h3>
                      <p className="text-xs text-white/60 mt-1">{cat.count}+ listings</p>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="section-padding bg-primary">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Why Us"
              title="Why Choose LandSurvey Gujarat"
              subtitle="We combine technology with local expertise to deliver trustworthy property and survey services."
              light
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="glass-dark rounded-2xl p-6 text-center hover:bg-white/10 transition-colors h-full">
                    <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {Icon && <Icon className="w-7 h-7 text-secondary" />}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Survey Services */}
      <section id="services" className="section-padding bg-surface">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Services"
              title="Land Survey Services"
              subtitle="Professional survey and verification services backed by certified surveyors and official records."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SURVEY_SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon]
              return (
                <ScrollReveal key={service.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-secondary/20 transition-all duration-300 h-full group">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                      {Icon && <Icon className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />}
                    </div>
                    <h3 className="font-bold text-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{service.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link to="/land-survey" className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
              Explore Survey Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Properties */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Latest"
              title="Latest Properties"
              subtitle="Recently listed verified properties across Gandhinagar district."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((property, i) => (
              <ScrollReveal key={property.id} delay={i * 0.08}>
                <PropertyCard property={property} onQuickView={setQuickViewProperty} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Testimonials"
              title="What Our Clients Say"
              subtitle="Trusted by property buyers, investors, and landowners across Gujarat."
            />
          </ScrollReveal>
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: '.test-prev', nextEl: '.test-next' }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} className="h-auto">
                  <TestimonialCard testimonial={t} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="test-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-colors hidden lg:flex" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="test-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-colors hidden lg:flex" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about land survey and property buying in Gujarat."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FAQAccordion faqs={faqs} />
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-surface">
        <div className="container-custom">
          <ScrollReveal>
            <SectionHeader
              badge="Contact"
              title="Get In Touch"
              subtitle="Have questions about a property or need survey services? We're here to help."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-primary mb-4">Office Location</h3>
                  <div className="space-y-3 text-sm text-muted">
                    <p className="flex items-start gap-2"><MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Sector-16, Gandhinagar, Gujarat 382016</p>
                    <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-64 lg:h-80 bg-gray-200 relative">
                  <iframe
                    title="Office Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7332.5!2d72.6369!3d23.2156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cbfc5bbefbd9%3A0x901488ac28b0f8f6!2sGandhinagar%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <QuickViewModal
        property={quickViewProperty}
        isOpen={!!quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
      />
    </>
  )
}
