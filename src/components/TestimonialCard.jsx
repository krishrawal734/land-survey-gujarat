import { Star, Quote } from 'lucide-react'

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 relative h-full flex flex-col">
      <Quote className="w-8 h-8 text-secondary/20 absolute top-6 right-6" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-muted text-sm leading-relaxed mb-6 flex-1">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-primary text-sm">{testimonial.name}</div>
          <div className="text-xs text-muted">{testimonial.role} &middot; {testimonial.location}</div>
        </div>
      </div>
    </div>
  )
}
