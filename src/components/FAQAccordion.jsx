import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQAccordion({ faqs }) {
  const [openId, setOpenId] = useState(faqs[0]?.id || null)

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id
        return (
          <div key={faq.id} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-primary text-sm sm:text-base pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-sm text-muted leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
