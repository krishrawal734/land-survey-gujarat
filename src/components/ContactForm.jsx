import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
        <p className="text-muted text-sm">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Phone</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary mb-1.5">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none text-sm resize-none"
          placeholder="Tell us about your property requirements..."
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Send className="w-4 h-4" /> Send Message
      </button>
    </form>
  )
}
