import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin, Phone } from 'lucide-react'
import { SITE_NAME, NAV_LINKS } from '../utils/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navBg = !isHome || scrolled ? 'glass shadow-md py-2' : 'bg-transparent py-4'

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('/#')) return false
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}
    >
      <nav className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-primary leading-tight block">{SITE_NAME}</span>
            <span className="text-[10px] text-muted font-medium tracking-wider uppercase hidden sm:block">Real Estate & Survey</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive(link.path) ? 'text-secondary' : 'text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+917912345678" className="flex items-center gap-2 text-sm text-muted hover:text-secondary transition-colors">
            <Phone className="w-4 h-4" />
            +91 79 1234 5678
          </a>
          <Link
            to="/properties"
            className="px-5 py-2.5 bg-secondary text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all hover:scale-105"
          >
            Browse Properties
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-100"
          >
            <div className="container-custom px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/properties"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 bg-secondary text-white font-semibold rounded-xl"
              >
                Browse Properties
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
