import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  Palette,
  CheckCircle2
} from 'lucide-react';
import Lightbox from '../components/Lightbox';
import ProjectCard from '../components/ProjectCard';
import { fetchProjectBySlug } from '../services/api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchProjectBySlug(slug);
        if (!result || !result.data) {
          setError('Project could not be found.');
        } else {
          setProject(result.data);
          setRelated(result.related || []);
        }
      } catch (err) {
        console.error('Error loading project detail:', err);
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="font-serif italic text-charcoal-muted text-sm">Loading celebration narrative...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[70vh] bg-ivory flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-serif text-3xl text-charcoal mb-4">Project Not Found</h2>
        <p className="text-sm text-charcoal-muted mb-8 max-w-md">
          The requested portfolio project could not be located in our atelier archives.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 bg-burgundy text-ivory text-xs uppercase tracking-widest py-3 px-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Portfolio Archive</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      
      {/* Editorial Breadcrumb / Top Bar */}
      <div className="bg-ivory border-b border-champagne/40 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-charcoal-muted hover:text-burgundy transition-colors tracking-wide font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <span className="text-[11px] font-mono text-gold-dark uppercase tracking-widest hidden sm:inline">
            Case Study: {project.eventType}
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[420px] max-h-[700px] overflow-hidden bg-charcoal">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"></div>

        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-12 lg:p-16 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] bg-burgundy/90 text-champagne border border-gold/40">
            <span>{project.eventType}</span>
            <span>&bull;</span>
            <span>{project.locationDescription}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory max-w-4xl leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-champagne/90 max-w-2xl font-light leading-relaxed">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Project Meta Bar */}
      <section className="border-b border-champagne/40 bg-champagne-light/30 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-muted block font-mono mb-1">
                Venue Location
              </span>
              <div className="flex items-center gap-1 text-charcoal font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="truncate">{project.locationDescription}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-muted block font-mono mb-1">
                Guest Scale
              </span>
              <div className="flex items-center gap-1 text-charcoal font-medium">
                <Users className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{project.guestCount || 'Bespoke Scale'}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-muted block font-mono mb-1">
                Season &amp; Timing
              </span>
              <div className="flex items-center gap-1 text-charcoal font-medium">
                <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span>{project.season || 'Custom Season'}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-charcoal-muted block font-mono mb-1">
                Concept Type
              </span>
              <div className="flex items-center gap-1 text-gold-dark font-medium">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Sample Atelier Concept</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & Design Concept */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Concept Story */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border-l-2 border-gold pl-6 py-2">
              <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold font-mono block mb-2">
                Spatial Narrative &amp; Artistic Direction
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-light leading-snug">
                The Creative Concept
              </h2>
            </div>

            <p className="text-base sm:text-lg text-charcoal leading-relaxed font-light">
              {project.designConcept}
            </p>

            {project.highlight && (
              <div className="p-6 bg-champagne-light/40 border border-gold/30 mt-8">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-lg text-charcoal font-medium mb-1">
                      Signature Architectural Highlight
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                      {project.highlight}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Visual Gallery Grid */}
            <div className="pt-10">
              <h3 className="font-serif text-2xl text-charcoal font-normal mb-6 flex items-center justify-between">
                <span>Visual Gallery ({project.gallery?.length || 0} Frames)</span>
                <span className="text-xs text-charcoal-muted font-sans font-light">
                  Click any frame to expand
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery?.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="group relative aspect-[4/3] overflow-hidden bg-charcoal/10 cursor-pointer border border-champagne/60 hover:border-gold transition-colors"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} gallery frame ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-3 rounded-full bg-ivory/90 text-charcoal shadow-lg">
                        <Eye className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Palette, Enquire Card */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Color Palette Card */}
            {project.colorPalette && project.colorPalette.length > 0 && (
              <div className="p-6 bg-ivory border border-champagne/60 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4 text-gold" />
                  <h4 className="font-serif text-lg text-charcoal font-medium">
                    Curated Color Palette
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {project.colorPalette.map((col, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2 bg-champagne-light/30 border border-champagne/40">
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 flex-shrink-0 shadow-inner"
                        style={{ backgroundColor: col.hex }}
                      ></span>
                      <div className="min-w-0">
                        <span className="text-[11px] font-medium text-charcoal block truncate">
                          {col.name}
                        </span>
                        <span className="text-[10px] font-mono text-charcoal-muted uppercase">
                          {col.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Enquiry Box */}
            <div className="p-8 bg-forest text-ivory border border-gold/40 shadow-luxury space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-gold font-mono block">
                Inspired By This Style?
              </span>
              <h4 className="font-serif text-2xl text-ivory font-light leading-snug">
                Request a bespoke celebration in this aesthetic.
              </h4>
              <p className="text-xs text-champagne/80 font-light leading-relaxed">
                Our atelier team will adapt this spatial concept to your venue geometry, guest count, and floral seasonal availability.
              </p>

              <div className="pt-2">
                <Link
                  to={`/contact?service=${encodeURIComponent(project.eventType)}&style=${encodeURIComponent(project.title)}`}
                  className="w-full text-center inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-charcoal py-3 px-6 text-xs font-semibold uppercase tracking-atelier transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enquire For Similar Style</span>
                </Link>
              </div>
            </div>

            {/* Atelier Policy Notice */}
            <div className="p-6 bg-champagne-light/20 border border-champagne/40 text-xs text-charcoal-muted space-y-2">
              <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px] block">
                Atelier Commitment
              </span>
              <p className="font-light leading-relaxed">
                We never replicate a previous wedding identically. Every spatial concept is reinvented to honor your unique family story and venue terroir.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-16 sm:py-24 bg-champagne-light/30 border-t border-champagne/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-light">
                Related {project.eventType} Concepts
              </h3>
              <Link
                to="/portfolio"
                className="text-xs font-semibold uppercase tracking-widest text-burgundy hover:text-gold transition-colors flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox for gallery images */}
      <Lightbox
        isOpen={lightboxOpen}
        images={project.gallery || []}
        currentIndex={lightboxIndex}
        title={project.title}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : (project.gallery?.length || 1) - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < (project.gallery?.length || 1) - 1 ? prev + 1 : 0))}
      />

    </div>
  );
}
