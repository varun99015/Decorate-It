import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function ServiceCard({ service }) {
  return (
    <div className="group bg-ivory border border-champagne/60 hover:border-gold transition-all duration-500 shadow-sm hover:shadow-luxury flex flex-col justify-between overflow-hidden">
      
      {/* Header Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal/10">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-50"></div>
        
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[10px] tracking-widest uppercase text-champagne bg-burgundy/80 backdrop-blur-sm px-2.5 py-1 inline-block border border-gold/30">
            {service.eventSuitability}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-serif text-2xl text-charcoal group-hover:text-burgundy transition-colors font-normal mb-1">
            {service.title}
          </h3>

          <p className="font-serif italic text-sm text-gold-dark mb-4">
            "{service.tagline}"
          </p>

          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-light">
            {service.shortDescription}
          </p>

          {/* Features / Inclusions Checklist */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-2.5 mb-6 pt-4 border-t border-champagne/40">
              <span className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block">
                Signature Inclusions:
              </span>
              {service.features.slice(0, 3).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-charcoal/80">
                  <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-champagne/40 flex items-center justify-between">
          <Link
            to={`/contact?service=${encodeURIComponent(service.title)}`}
            className="w-full text-center inline-flex items-center justify-center gap-2 bg-champagne-light hover:bg-forest hover:text-ivory text-charcoal py-2.5 px-4 text-xs font-semibold uppercase tracking-atelier transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Enquire For This Discipline</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

    </div>
  );
}
