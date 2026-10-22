import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { fetchFaqs } from '../services/api';

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState('faq-1');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await fetchFaqs(selectedCategory);
        setFaqs(data);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFaqs();
  }, [selectedCategory]);

  const categories = [
    'All',
    'Booking & Timelines',
    'Consultation & Process',
    'Customisation',
    'Venue Requirements',
    'Budget & Quotations',
    'Floral Sourcing',
    'Destination Weddings'
  ];

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-ivory min-h-screen">

      {/* Header */}
      <section className="relative py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=80"
            alt="EVERAFTER FAQs"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-forest/90"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-forest-dark/50 text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Clarity &amp; Consultation Protocol</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory mb-6 leading-tight">
            Frequently Asked <br />
            <span className="italic font-normal text-gold-gradient">Atelier Inquiries.</span>
          </h1>

          <p className="text-base sm:text-lg text-champagne/90 font-light max-w-2xl mx-auto leading-relaxed">
            Essential guidance regarding booking reservations, venue permissions, budget planning, and floral mechanics.
          </p>
        </div>
      </section>

      {/* Main FAQ Accordion Container */}
      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-8 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${selectedCategory === cat
                  ? 'bg-burgundy text-ivory border border-burgundy'
                  : 'bg-champagne/20 text-charcoal hover:bg-champagne/50 border border-champagne/40'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-20 bg-champagne/20 animate-pulse border border-champagne/40"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-ivory border border-champagne/60 hover:border-gold transition-colors overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-dark block">
                        {faq.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-charcoal">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border border-champagne/60 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-champagne-light text-burgundy' : 'text-charcoal'
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-champagne/30 text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Still Have Questions Banner */}
      <section className="py-16 bg-champagne-light/30 border-t border-champagne/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <MessageCircle className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-light">
            Have a Specific Question Regarding Your Venue?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto leading-relaxed font-light">
            Our atelier concierge is available to review your celebration date and offer preliminary guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-atelier py-3 px-6 transition-all"
            >
              <span>Submit Atelier Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/916363427278"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-ivory text-xs font-semibold uppercase tracking-atelier py-3 px-6 transition-all"
            >
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
