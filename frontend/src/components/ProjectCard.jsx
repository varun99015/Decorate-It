import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Eye } from 'lucide-react';

export default function ProjectCard({
  project,
  onOpenGallery
}) {
  return (
    <div className="group relative flex flex-col bg-ivory border border-champagne/60 hover:border-gold transition-all duration-500 shadow-sm hover:shadow-luxury overflow-hidden">
      
      {/* Image thumbnail with zoom effect */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-charcoal/10">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-forest/90 backdrop-blur-sm text-champagne text-[10px] font-semibold uppercase tracking-atelier py-1 px-2.5 border border-gold/30">
            {project.eventType}
          </span>
        </div>

        {/* Demo Content Pill */}
        {project.demoContent && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-charcoal/80 backdrop-blur-sm text-ivory/90 text-[9px] font-mono tracking-wider py-0.5 px-2 border border-white/20">
              Sample Concept
            </span>
          </div>
        )}

        {/* Gallery Quick Preview Button */}
        {onOpenGallery && project.gallery && project.gallery.length > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenGallery(project.gallery, project.title);
            }}
            className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-ivory/90 text-charcoal hover:bg-gold hover:text-ivory transition-colors shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
            title="Open Fullscreen Gallery Preview"
            aria-label="Preview Gallery"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between bg-ivory">
        <div>
          {/* Location / Venue */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-muted mb-2">
            <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="truncate">{project.locationDescription}</span>
          </div>

          {/* Title */}
          <Link to={`/portfolio/${project.slug}`}>
            <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-burgundy transition-colors line-clamp-1 mb-2.5 font-normal">
              {project.title}
            </h3>
          </Link>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-2 mb-4 font-light">
            {project.summary}
          </p>
        </div>

        {/* Footer / CTA link */}
        <div className="pt-4 border-t border-champagne/40 flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono text-gold-dark tracking-wider">
            {project.guestCount || 'Bespoke Scale'}
          </span>
          <Link
            to={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1 font-semibold uppercase tracking-atelier text-burgundy hover:text-gold transition-colors text-[11px]"
          >
            <span>View Concept Story</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
