import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Lightbox from '../components/Lightbox';
import { fetchPortfolio } from '../services/api';

const CATEGORIES = [
  'All',
  'Weddings',
  'Reception stages',
  'Floral installations',
  'Haldi and mehendi',
  'Intimate celebrations',
  'Corporate events'
];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      try {
        const data = await fetchPortfolio(selectedCategory);
        setProjects(data);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, [selectedCategory]);

  const openGallery = (images, title) => {
    setLightboxImages(images);
    setLightboxTitle(title);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-ivory min-h-screen">
      
      {/* Header */}
      <section className="relative py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="EVERAFTER Portfolio Archive"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-forest/85"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-forest-dark/50 text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The Curated Visual Archive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory mb-6 leading-tight">
            An Editorial Gallery of <br />
            <span className="italic font-normal text-gold-gradient">Timeless Celebrations.</span>
          </h1>

          <p className="text-base sm:text-lg text-champagne/90 font-light max-w-2xl mx-auto leading-relaxed">
            Every project represents a singular dialogue between the venue's natural topography, cultural sacredness, and the couple's personal aesthetic heritage.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 bg-charcoal/60 backdrop-blur-sm border border-champagne/20 py-1.5 px-4 text-xs text-champagne/80 font-mono">
            <Info className="w-3.5 h-3.5 text-gold" />
            <span>Artistic sample concept projects presented for event studio evaluation.</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[69px] z-30 bg-ivory/95 backdrop-blur-md border-b border-champagne/40 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto gap-2 sm:gap-3 py-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-none ${
                  selectedCategory === cat
                    ? 'bg-burgundy text-ivory border border-burgundy shadow-sm'
                    : 'bg-champagne/20 hover:bg-champagne/50 text-charcoal border border-champagne/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 bg-champagne/20 animate-pulse border border-champagne/40"></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-champagne-light/20 border border-champagne/40 p-8">
            <h3 className="font-serif text-2xl text-charcoal mb-2">No projects found in this category</h3>
            <p className="text-xs text-charcoal-muted mb-6">Select 'All' to view our complete portfolio archive.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="bg-burgundy text-ivory text-xs uppercase tracking-widest px-6 py-2.5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={openGallery}
              />
            ))}
          </div>
        )}

      </section>

      {/* Lightbox for gallery preview */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        title={lightboxTitle}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />

    </div>
  );
}
