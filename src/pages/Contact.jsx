import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import SectionHeader from '../components/SectionHeader'

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'info@landsurveygujarat.com',
      link: 'mailto:info@landsurveygujarat.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 79 1234 5678',
      link: 'tel:+917912345678'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Sector-16, Gandhinagar, Gujarat 382016',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="contact-page min-h-screen py-12 md:py-20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Header Section */}
      <SectionHeader 
        title="Get In Touch" 
        subtitle="We'd love to hear from you. Contact us today for any inquiries about properties and land surveys in Gujarat."
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, idx) => {
            const Icon = info.icon
            return (
              <motion.a
                key={idx}
                variants={itemVariants}
                href={info.link}
                className="group glass rounded-2xl p-6 hover:bg-secondary/10 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-all"
                  >
                    <Icon className="w-6 h-6 text-secondary" />
                  </motion.div>
                  <h3 className="text-sm font-semibold text-primary">{info.title}</h3>
                  <p className="text-xs sm:text-sm text-muted group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Form and Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Send us a Message</h2>
              <p className="text-muted mb-8">Fill out the form below and we'll respond as soon as possible</p>
              <ContactForm />
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-primary">Why Choose Us?</h3>
              <ul className="space-y-3 text-sm text-muted">
                {[
                  'Expert land surveyors with 20+ years experience',
                  'Fast and accurate property assessments',
                  '100% customer satisfaction guaranteed',
                  'Transparent pricing with no hidden costs',
                  '24/7 customer support available'
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-2 items-start"
                  >
                    <span className="text-secondary font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 bg-gradient-to-br from-secondary/10 to-blue-400/10 border border-secondary/20"
            >
              <h3 className="text-lg font-bold text-primary mb-3">Quick Response</h3>
              <p className="text-sm text-muted mb-4">
                Our team typically responds within 2 hours during business hours
              </p>
              <div className="flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-green-500 mt-1"
                />
                <span className="text-xs text-green-600 font-semibold">Available Now</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
