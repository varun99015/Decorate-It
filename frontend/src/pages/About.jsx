import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Compass, Shield, Flower2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  return (
    <div className="bg-ivory min-h-screen">
      
      {/* Editorial Header */}
      <section className="relative py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=2000&q=80"
            alt="EVERAFTER Philosophy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-forest/90"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-forest-dark/50 text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The Atelier Ethos</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory mb-6 leading-tight">
            Spatial Choreography, <br />
            <span className="italic font-normal text-gold-gradient">Sacred Reverence &amp; Floral Poetry.</span>
          </h1>

          <p className="text-base sm:text-lg text-champagne/90 font-light max-w-2xl mx-auto leading-relaxed">
            Founded with a conviction that event decoration should never feel manufactured or sterile, EVERAFTER curates living artistic sanctuaries honoring life's most sacred vows.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section with Editorial Layout */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold-dark font-semibold">
              Our Design Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Every arch, candle, and petal is chosen with intention.
            </h2>
            <p className="text-base text-charcoal-muted leading-relaxed font-light">
              In an era dominated by repetitive catalog setups, EVERAFTER approaches every celebration as an architectural canvas. We take the time to study the natural light of your venue, the historical references that resonate with your heritage, and the unspoken emotional tone you wish to create.
            </p>
            <p className="text-sm text-charcoal-muted leading-relaxed font-light">
              We operate not as transactional decorators, but as design partners. We work intimately with families, translating generational rituals into contemporary spatial language that feels noble, organic, and breathtakingly fresh.
            </p>

            <div className="pt-4 border-l-2 border-gold pl-4 text-xs italic text-charcoal font-serif text-lg">
              "We limit our commitments to three weddings monthly. True devotion cannot be mass-produced."
            </div>
          </div>

          {/* Editorial Double Image Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden border border-gold/40 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
                  alt="Traditional Mandap Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-champagne-light/50 border border-champagne/60 text-[11px] text-charcoal-muted">
                Handcrafted floral chandeliers woven on-site using fragrant Mysore mallige and rajnigandha.
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-forest text-champagne text-[11px] border border-gold/40">
                100% bespoke spatial renderings allowing virtual walkthroughs prior to physical fabrication.
              </div>
              <div className="aspect-[3/4] overflow-hidden border border-gold/40 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80"
                  alt="Floral Conditioning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The 4 Principles of Atelier Craft */}
      <section className="py-20 bg-champagne-light/30 border-y border-champagne/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR CORE PRINCIPLES"
            title="The Standards We Uphold"
            subtitle="Artisanal rigor without shortcut or compromise."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 bg-ivory border border-champagne/60 shadow-sm">
              <Compass className="w-6 h-6 text-gold mb-4" />
              <h4 className="font-serif text-lg text-charcoal font-medium mb-2">
                Site-Specific Architecture
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                We never force a templated design onto a venue. Every layout responds naturally to the wind patterns, tree lines, and ceiling heights of the property.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-champagne/60 shadow-sm">
              <Flower2 className="w-6 h-6 text-gold mb-4" />
              <h4 className="font-serif text-lg text-charcoal font-medium mb-2">
                Cold-Chain Conditioning
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                Our blooms travel in temperature-calibrated transport and are conditioned using hydration techniques that keep petals pristine through warm wedding days.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-champagne/60 shadow-sm">
              <Shield className="w-6 h-6 text-gold mb-4" />
              <h4 className="font-serif text-lg text-charcoal font-medium mb-2">
                Certified Rigging Rigour
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                All structural trusses, aerial floral clouds, and overhead lighting canopies are calculated for load capacity and anchored with safety redundancies.
              </p>
            </div>

            <div className="p-6 bg-ivory border border-champagne/60 shadow-sm">
              <Heart className="w-6 h-6 text-gold mb-4" />
              <h4 className="font-serif text-lg text-charcoal font-medium mb-2">
                Sustainable Repurposing
              </h4>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                We champion foam-free mechanics and partner with local community organizations to repurpose post-ceremony floral blooms into natural compost or sacred potpourri.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-burgundy text-ivory text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block">
            Begin The Dialogue
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
            Let's Shape Your Sacred Story Together.
          </h2>
          <p className="text-sm sm:text-base text-champagne/80 font-light max-w-xl mx-auto leading-relaxed">
            We welcome you to our Lavelle Road studio for an unhurried design consultation over tea.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-ivory hover:bg-champagne text-charcoal text-xs font-semibold uppercase tracking-atelier py-4 px-8 shadow-xl transition-all"
            >
              <span>Schedule Atelier Consultation</span>
              <ArrowRight className="w-4 h-4 text-burgundy" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
