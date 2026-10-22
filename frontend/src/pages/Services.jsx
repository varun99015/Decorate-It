import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="bg-ivory">
      
      {/* Editorial Page Header */}
      <section className="relative py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2000&q=80"
            alt="Floral Artistry Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-forest/90"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-forest-dark/50 text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Disciplines &amp; Spatial Capabilities</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory mb-6 leading-tight">
            Curating Atmospheres of <br />
            <span className="italic font-normal text-gold-gradient">Sacred Grace &amp; Grandeur.</span>
          </h1>

          <p className="text-base sm:text-lg text-champagne/90 font-light max-w-2xl mx-auto leading-relaxed">
            Every celebration has a distinct cadence. Explore our 12 signature event disciplines, each executed with architectural rigour, cold-chain conditioned botanicals, and bespoke spatial craftsmanship.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="PORTFOLIO OF DISCIPLINES"
          title="Twelve Bespoke Offerings"
          subtitle="Tailored for luxury weddings, sacred vows, vibrant pre-wedding festivities, and high-profile corporate galas."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-champagne/20 animate-pulse border border-champagne/40"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

      </section>

      {/* Tailored Custom Brief Banner */}
      <section className="py-20 bg-champagne-light/30 border-t border-champagne/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ivory border border-gold/40 p-8 sm:p-12 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-dark font-semibold">
                Unlisted or Avant-Garde Brief?
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
                Have a unique architectural concept or destination site?
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
                Our structural engineering team and floral designers frequently realize bespoke kinetic installations, private island setups, and unconventional art environments.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-atelier py-4 px-8 shadow-sm transition-all"
              >
                <span>Request Custom Brief</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
