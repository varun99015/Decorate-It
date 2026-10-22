import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, ShieldCheck, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest text-ivory border-t border-gold/30 pt-16 pb-12 selection:bg-gold selection:text-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-gold/70 flex items-center justify-center bg-forest-dark text-champagne font-display font-semibold text-sm tracking-wider">
                EA
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-[0.2em] text-champagne block">
                  EVERAFTER
                </span>
                <span className="text-[9px] tracking-[0.28em] text-gold font-medium uppercase block">
                  Wedding &amp; Event Atelier
                </span>
              </div>
            </div>

            <p className="text-sm text-ivory/80 leading-relaxed max-w-sm pt-2">
              Where Every Celebration Becomes a Story. An award-calibre spatial design studio based in Bengaluru, transforming grand wedding grounds, sacred mandaps, and intimate villas into living poetry.
            </p>

            <div className="flex items-center gap-2 text-xs text-champagne/90 pt-2">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <span>We curate a maximum of three celebrations monthly to preserve uncompromised artistic devotion.</span>
            </div>

            <div className="flex items-center gap-4 pt-3">
              <a
                href="https://instagram.com/everafter.atelier"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-champagne hover:text-white hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@everafteratelier.in"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-champagne hover:text-white hover:border-gold transition-colors"
                aria-label="Email Concierge"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/916363427278"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-champagne hover:text-white hover:border-gold transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-gold font-semibold">
              Atelier Portals
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link to="/" className="text-ivory/70 hover:text-champagne transition-colors">
                  The Atelier Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-ivory/70 hover:text-champagne transition-colors">
                  Bespoke Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-ivory/70 hover:text-champagne transition-colors">
                  Curated Portfolio
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-ivory/70 hover:text-champagne transition-colors">
                  Investment Tiers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ivory/70 hover:text-champagne transition-colors">
                  Design Philosophy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-ivory/70 hover:text-champagne transition-colors">
                  Client FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ivory/70 hover:text-champagne transition-colors">
                  Private Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-gold font-semibold">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs tracking-wider text-ivory/70">
              <li>Architectural Mandaps</li>
              <li>Botanical Floral Clouds</li>
              <li>Gala Reception Stages</li>
              <li>Saffron Haldi &amp; Mehendi</li>
              <li>Intimate Courtyard Vows</li>
              <li>Destination Production</li>
              <li>Sculptural Rigging</li>
            </ul>
          </div>

          {/* Atelier Coordinates */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-gold font-semibold">
              Studio Coordinates
            </h4>
            <div className="space-y-3 text-xs text-ivory/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Villa 14, The Boulevard, Lavelle Road, Shanthala Nagar, Bengaluru, Karnataka 560001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+91 63634 272785 / (080) 4920-3344</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>concierge@everafteratelier.in</span>
              </div>
              <div className="pt-2">
                <span className="block text-[11px] text-champagne/70 font-mono">
                  Monday – Saturday: 10:00 AM – 7:30 PM (By Prior Appointment)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <p className="text-[11px]">
              <strong className="text-champagne font-medium">Demonstration Notice:</strong> EVERAFTER is a fictional demonstration brand created for wedding decorators, event management studios, and floral stylists. All packages, portfolio projects, and pricing represent curated sample concepts.
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] whitespace-nowrap">
            <span>&copy; {new Date().getFullYear()} EVERAFTER Atelier. Crafted with devotion in Bengaluru.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
