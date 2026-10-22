import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { fetchPackages } from '../services/api';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (err) {
        console.error('Failed to load packages:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  return (
    <div className="bg-ivory min-h-screen">
      
      {/* Header */}
      <section className="relative py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80"
            alt="EVERAFTER Investment Tiers"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-forest/90"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-forest-dark/50 text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Demonstration Investment Tiers</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory mb-6 leading-tight">
            Curated Celebration <br />
            <span className="italic font-normal text-gold-gradient">Investment Frameworks.</span>
          </h1>

          <p className="text-base sm:text-lg text-champagne/90 font-light max-w-2xl mx-auto leading-relaxed">
            Transparent conceptual benchmarks designed to orient your planning. Every celebration we produce is ultimately bespoke, tailored to your exact venue architecture and floral choices.
          </p>
        </div>
      </section>

      {/* Pricing Disclaimer Alert */}
      <div className="bg-champagne-light border-y border-gold/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-start sm:items-center gap-3 text-xs text-charcoal">
          <AlertCircle className="w-4 h-4 text-burgundy flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-burgundy">Sample Pricing Transparency:</strong> All figures below are sample indicative starting benchmarks for demonstration purposes. Final investment quotations are determined strictly by venue dimensions, guest scale, botanical seasonality, and custom structural fabrication.
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[600px] bg-champagne/20 animate-pulse border border-champagne/40"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between bg-ivory border transition-all duration-300 p-8 sm:p-10 shadow-sm ${
                  pkg.featured
                    ? 'border-gold shadow-luxury ring-1 ring-gold/40'
                    : 'border-champagne/60 hover:border-gold'
                }`}
              >
                {/* Featured Badge */}
                {pkg.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-burgundy text-champagne text-[10px] font-semibold uppercase tracking-[0.22em] py-1 px-4 border border-gold/50 shadow-md">
                    Signature Choice
                  </div>
                )}

                <div>
                  {/* Tier Label */}
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-dark font-semibold block mb-2">
                    {pkg.tier}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-3xl text-charcoal font-light mb-2">
                    {pkg.name}
                  </h3>

                  <p className="font-serif italic text-xs text-charcoal-muted mb-6">
                    "{pkg.subtitle}"
                  </p>

                  {/* Indicative Price */}
                  <div className="p-4 bg-champagne-light/40 border border-champagne/60 mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal-muted block">
                      Indicative Starting From
                    </span>
                    <span className="font-serif text-3xl font-light text-burgundy tracking-tight block my-0.5">
                      {pkg.indicativeStartingPrice}
                    </span>
                    <span className="text-[10px] text-charcoal-muted block">
                      Recommended for {pkg.guestRange}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-light">
                    {pkg.description}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-8 pt-6 border-t border-champagne/40">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block">
                      Core Package Inclusions:
                    </span>
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-charcoal/80">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{inc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Customisation Options */}
                  {pkg.customisationOptions && (
                    <div className="space-y-2 mb-8 pt-4 border-t border-champagne/40">
                      <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold block">
                        Popular Enhancements:
                      </span>
                      {pkg.customisationOptions.map((opt, i) => (
                        <div key={i} className="text-[11px] text-charcoal-muted flex items-start gap-2">
                          <span className="text-gold">&bull;</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-champagne/40">
                  <Link
                    to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full text-center inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-atelier py-3.5 px-6 transition-all ${
                      pkg.featured
                        ? 'bg-burgundy hover:bg-burgundy-light text-ivory shadow-md'
                        : 'bg-forest hover:bg-forest-light text-ivory'
                    }`}
                  >
                    <span>Request Quotation Brief</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* FAQ teaser */}
      <section className="py-16 bg-champagne-light/30 border-t border-champagne/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-light">
            Questions Regarding Payment Milestones &amp; Floral Procurement?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto leading-relaxed font-light">
            We provide transparent milestone invoicing, cold-chain floral accountability, and structural engineering sign-offs.
          </p>
          <div className="pt-2">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-burgundy hover:text-gold transition-colors border-b border-burgundy pb-0.5"
            >
              <span>Read Our Client FAQ Section</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
