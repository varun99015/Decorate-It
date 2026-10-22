import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Compass,
  Layers,
  Flower2,
  Shield,
  Star,
  CheckCircle2,
  Clock
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import Lightbox from '../components/Lightbox';
import { fetchServices, fetchPortfolio } from '../services/api';

export default function Home() {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesData, portfolioData] = await Promise.all([
          fetchServices(),
          fetchPortfolio()
        ]);
        setFeaturedServices(servicesData.slice(0, 4));
        setFeaturedProjects(portfolioData.filter(p => p.featured).slice(0, 4));
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openGallery = (images, title) => {
    setLightboxImages(images);
    setLightboxTitle(title);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="overflow-hidden">

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-charcoal text-ivory px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">

        {/* Background Image with subtle cinematic zoom */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
            alt="EVERAFTER Luxury Wedding Mandap and Floral Artistry"
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite] duration-1000 opacity-40"
          />
          {/* Multi-layered editorial gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal"></div>
          <div className="absolute inset-0 bg-radial-vignette opacity-50"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">

          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-charcoal/70 backdrop-blur-md text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
            <span>Bengaluru's Premier Wedding &amp; Event Atelier</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] text-ivory mb-6 max-w-4xl">
            We Design Moments <br className="hidden sm:inline" />
            <span className="italic font-normal text-gold-gradient">
              That Stay Forever.
            </span>
          </h1>

          {/* Supporting Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-champagne/90 font-light max-w-2xl leading-relaxed mb-10">
            A boutique spatial design studio curating architectural mandaps, rare seasonal botanicals, and bespoke visual atmospheres across Bengaluru and India's most celebrated heritage venues.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-atelier py-4 px-8 border border-gold/40 shadow-xl hover:shadow-glow-gold transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>Plan Your Celebration</span>
            </Link>

            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-ivory/10 hover:bg-ivory/20 text-ivory text-xs font-semibold uppercase tracking-atelier py-4 px-8 border border-white/30 backdrop-blur-sm transition-all duration-300"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4 text-champagne" />
            </Link>
          </div>

          {/* Discreet Atelier Commitments Indicator */}
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] tracking-widest uppercase text-champagne/70 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>Max 3 Celebrations Monthly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>100% Bespoke Spatial Renders</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span>Cold-Chain Conditioned Florals</span>
            </div>
          </div>

        </div>

      </section>

      {/* 2. BRAND INTRODUCTION & EDITORIAL ETHOS */}
      <section className="py-20 sm:py-28 bg-ivory border-b border-champagne/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Imagery composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-gold/40 shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80"
                  alt="Artisanal Mandap Details"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Secondary floating offset card */}
              <div className="hidden sm:block absolute -bottom-8 -right-8 w-60 aspect-square border border-gold/50 bg-forest p-6 text-ivory shadow-xl">
                <span className="font-serif italic text-2xl text-champagne block mb-2">
                  "Not mere decor, but spatial poetry."
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold block">
                  EVERAFTER Atelier Manifesto
                </span>
              </div>
            </div>

            {/* Right Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] border border-burgundy/20 bg-champagne-light/50 text-burgundy">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span>The Atelier Heritage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
                Where Sacred Rituals Meet <br className="hidden sm:inline" />
                <span className="italic font-normal text-burgundy">
                  Contemporary Architectural Grace.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-light">
                Headquartered in Lavelle Road, Bengaluru, EVERAFTER designs immersive environments for families who seek something profoundly distinguished. We reject generic, cookie-cutter templates in favor of deeply personal spatial storytelling.
              </p>

              <p className="text-sm text-charcoal-muted leading-relaxed font-light">
                Whether hand-carving an open-air stone-finish mandap on the grounds of a heritage palace or suspending thousands of fresh rajnigandha stems beneath a glass conservatory ceiling, every structure is engineered for poetic grace, camera precision, and enduring memory.
              </p>

              {/* Atelier Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-4 border-l-2 border-gold bg-champagne/10">
                  <h4 className="font-serif text-lg font-medium text-charcoal mb-1">
                    Uncompromising Exclusivity
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    By limiting our studio to three events monthly, our senior creative directors remain personally on-site from first pencil sketch to final candle illumination.
                  </p>
                </div>

                <div className="p-4 border-l-2 border-forest bg-champagne/10">
                  <h4 className="font-serif text-lg font-medium text-charcoal mb-1">
                    Bio-Sustainable Floristry
                  </h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    We offer zero-foam installation mechanics and collaborate directly with growers in Bengaluru and Ooty, followed by post-event floral repurposing.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-atelier text-burgundy hover:text-gold transition-colors border-b border-burgundy/30 pb-1"
                >
                  <span>Explore Our Philosophy &amp; Creative Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED DISCIPLINES & SERVICES */}
      <section className="py-20 sm:py-28 bg-champagne-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            badge="CRAFT &amp; DISCIPLINES"
            title="Comprehensive Event Design"
            subtitle="From spiritual ceremonial altars to high-glamour nightlife stages, explore our primary design disciplines."
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-96 bg-champagne/30 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-charcoal hover:bg-burgundy text-ivory text-xs font-semibold uppercase tracking-atelier py-3.5 px-8 transition-colors"
            >
              <span>View All 12 Bespoke Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. CURATED PORTFOLIO SHOWCASE */}
      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              badge="SELECTED PORTFOLIO"
              title="Recent Curated Celebrations"
              subtitle="Step inside sample concept projects designed for grand estates and intimate sanctuaries."
              centered={false}
              className="mb-0"
            />
            <div className="mt-6 md:mt-0">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-atelier text-burgundy hover:text-gold transition-colors border-b border-burgundy pb-1"
              >
                <span>View Complete Portfolio Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenGallery={openGallery}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. VISUAL STORYTELLING & ATMOSPHERIC BANNER */}
      <section className="relative py-28 sm:py-36 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"
            alt="Opulent Reception Stage Gala"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-forest/85"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold block mb-4">
            Atmospheric Mastery
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory mb-6 leading-tight">
            "We do not merely decorate rooms. <br className="hidden sm:inline" />
            We construct the memories <br className="hidden sm:inline" />
            you will cherish fifty years from today."
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-8"></div>
          <p className="text-sm sm:text-base text-champagne/90 font-light max-w-xl mx-auto leading-relaxed mb-8">
            From the subtle fragrance of hand-selected blossoms greeting your guests at the threshold to the golden candlelight flickering across midnight banquets, every sensory touchpoint is intentional.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal text-xs font-semibold uppercase tracking-atelier py-3.5 px-8 transition-colors"
          >
            <span>Discover The Portfolio Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 6. THE 4-STEP CELEBRATION PLANNING PROCESS */}
      <section className="py-20 sm:py-28 bg-ivory border-b border-champagne/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            badge="THE ATELIER METHOD"
            title="How We Bring Your Vision To Life"
            subtitle="An unhurried, transparent four-stage journey ensuring complete creative clarity and calm."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="relative p-6 sm:p-8 bg-ivory border border-champagne/60 hover:border-gold transition-colors flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-serif italic text-4xl text-gold/60 block mb-4">01.</span>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                  Creative Dialogue
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                  A private exploratory meeting at our Lavelle Road atelier to understand your family traditions, aesthetics, venue dimensions, and budget contours.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-champagne/40 text-[11px] font-mono text-gold-dark">
                Timeline: Initial Consultation
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 sm:p-8 bg-ivory border border-champagne/60 hover:border-gold transition-colors flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-serif italic text-4xl text-gold/60 block mb-4">02.</span>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                  3D Spatial Modeling
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                  We generate photorealistic 3D spatial renders and physical material lookbooks, allowing you to walk through your mandap before a single flower is cut.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-champagne/40 text-[11px] font-mono text-gold-dark">
                Timeline: 3-4 Weeks Following Retainer
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 sm:p-8 bg-ivory border border-champagne/60 hover:border-gold transition-colors flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-serif italic text-4xl text-gold/60 block mb-4">03.</span>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                  Artisanal Curation
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                  Master woodcarvers, brass metalworkers, and our floral logistics network procure cold-chain blossoms from Karnataka, Ooty, and Holland.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-champagne/40 text-[11px] font-mono text-gold-dark">
                Timeline: 4-6 Weeks Prior To Vows
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 sm:p-8 bg-ivory border border-champagne/60 hover:border-gold transition-colors flex flex-col justify-between shadow-sm">
              <div>
                <span className="font-serif italic text-4xl text-gold/60 block mb-4">04.</span>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                  Flawless Execution
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                  Our 30+ person onsite crew completes structural erection, pin-spot lighting balance, and flower hydration hours ahead of guest arrival.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-champagne/40 text-[11px] font-mono text-gold-dark">
                Timeline: Day-of Turnkey Orchestration
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. AUTHENTIC SAMPLE TESTIMONIALS */}
      <section className="py-20 sm:py-28 bg-champagne-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            badge="CLIENT PERSPECTIVES"
            title="Sample Client Reflections"
            subtitle="Curated sample reviews demonstrating how our spatial direction transforms high-profile family weddings."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-8 bg-ivory border border-champagne/60 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-base sm:text-lg text-charcoal leading-relaxed mb-6">
                  "The mandap EVERAFTER constructed at Palace Grounds took our breath away. Walking down the aisle surrounded by forty thousand fragrant rajnigandha strands felt like stepping into an ancient celestial temple."
                </p>
              </div>
              <div className="pt-4 border-t border-champagne/40">
                <span className="font-semibold text-xs tracking-wider uppercase text-charcoal block">
                  Priya &amp; Karthik
                </span>
                <span className="text-[11px] text-charcoal-muted">
                  Traditional South Indian Muhurtham, Bengaluru (Sample Narrative)
                </span>
              </div>
            </div>

            <div className="p-8 bg-ivory border border-champagne/60 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-base sm:text-lg text-charcoal leading-relaxed mb-6">
                  "Our Goa beach mandap looked completely organic, swaying gently with the sea wind without a single visible clamp or wire. The attention to acoustics and photography angles was remarkable."
                </p>
              </div>
              <div className="pt-4 border-t border-champagne/40">
                <span className="font-semibold text-xs tracking-wider uppercase text-charcoal block">
                  Ananya &amp; Sameer
                </span>
                <span className="text-[11px] text-charcoal-muted">
                  Beachfront Destination Celebration, Morjim (Sample Narrative)
                </span>
              </div>
            </div>

            <div className="p-8 bg-ivory border border-champagne/60 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="font-serif italic text-base sm:text-lg text-charcoal leading-relaxed mb-6">
                  "For our intimate 80-guest family dinner, they styled long teak tables with handmade pottery and hand-calligraphed linen cards. It was sophisticated, warm, and utterly unforgettable."
                </p>
              </div>
              <div className="pt-4 border-t border-champagne/40">
                <span className="font-semibold text-xs tracking-wider uppercase text-charcoal block">
                  Meera &amp; Dev
                </span>
                <span className="text-[11px] text-charcoal-muted">
                  Private Villa Micro-Wedding, Kanakapura (Sample Narrative)
                </span>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center text-xs text-charcoal-muted font-mono">
            * Sample demonstration client feedback presented for website portfolio evaluation.
          </div>

        </div>
      </section>

      {/* 8. GRAND INVITATION / ENQUIRY BANNER */}
      <section className="py-20 sm:py-28 bg-burgundy text-ivory relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial-vignette opacity-40"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-4">
            Private Commissions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-ivory mb-6 leading-tight">
            Let Us Orchestrate Your <br className="hidden sm:inline" />
            <span className="italic text-champagne">Unforgettable Celebration.</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-10">
            Tell us about your celebration date, venue dreams, and preferred aesthetics. Our atelier concierge will review date availability and schedule your private design consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ivory text-charcoal hover:bg-champagne text-xs font-semibold uppercase tracking-atelier py-4 px-8 shadow-2xl transition-all"
            >
              <Calendar className="w-4 h-4 text-burgundy" />
              <span>Schedule Atelier Consultation</span>
            </Link>

            <a
              href="https://wa.me/916363427278"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-ivory text-xs font-semibold uppercase tracking-atelier py-4 px-8 border border-gold/40 transition-all"
            >
              <span>Instant Concierge Chat</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </a>
          </div>
        </div>
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
