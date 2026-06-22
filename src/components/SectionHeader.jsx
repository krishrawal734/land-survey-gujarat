export default function SectionHeader({ badge, title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${
          light ? 'bg-white/10 text-accent' : 'bg-secondary/10 text-secondary'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
