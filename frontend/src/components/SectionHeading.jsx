import React from 'react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  className = ''
}) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] border ${
          light 
            ? 'text-champagne border-champagne/30 bg-forest-dark/40' 
            : 'text-burgundy border-burgundy/20 bg-champagne-light/50'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
          <span>{badge}</span>
        </div>
      )}

      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight mb-4 ${
        light ? 'text-ivory' : 'text-charcoal'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-sm sm:text-base leading-relaxed ${
          light ? 'text-ivory/80 font-light' : 'text-charcoal-muted'
        }`}>
          {subtitle}
        </p>
      )}

      {/* Decorative hairline */}
      <div className={`mt-6 flex items-center gap-3 ${centered ? 'justify-center' : 'justify-start'}`}>
        <div className={`h-[1px] w-12 ${light ? 'bg-gold/40' : 'bg-gold/60'}`}></div>
        <div className="w-1.5 h-1.5 rotate-45 bg-gold"></div>
        <div className={`h-[1px] w-12 ${light ? 'bg-gold/40' : 'bg-gold/60'}`}></div>
      </div>
    </div>
  );
}
