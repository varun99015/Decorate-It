import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Calendar } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Packages', path: '/packages' },
    { name: 'Philosophy', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-champagne/40 py-3.5'
        : 'bg-ivory border-b border-champagne/20 py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Atelier Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center bg-forest text-champagne font-display font-semibold text-sm tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
              EA
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-[0.18em] text-charcoal">
                EVERAFTER
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gold font-medium uppercase">
                Wedding &amp; Event Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest transition-colors font-medium relative py-1 ${isActive
                    ? 'text-burgundy font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gold'
                    : 'text-charcoal/80 hover:text-burgundy'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA & Phone Link */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+916363427278"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-charcoal/70 hover:text-burgundy transition-colors tracking-wide"
              title="Call Studio Concierge"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold" />
              <span>+91 63634 272785</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-atelier py-2.5 px-5 rounded-none transition-all shadow-sm hover:shadow-luxury hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Plan Celebration</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/contact"
              className="inline-flex sm:hidden items-center bg-burgundy text-ivory text-[10px] font-semibold uppercase tracking-widest py-2 px-3"
            >
              Enquire
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-charcoal hover:text-burgundy focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-ivory border-b border-champagne shadow-xl px-6 py-8 transition-all animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-widest py-2 border-b border-champagne/30 transition-colors ${isActive ? 'text-burgundy font-bold' : 'text-charcoal/90 hover:text-burgundy'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="tel:+916363427278"
                className="flex items-center gap-2 text-xs tracking-wider text-charcoal/80 py-1"
              >
                <PhoneCall className="w-4 h-4 text-gold" />
                <span>+91 63634 272785 (Concierge)</span>
              </a>
              <Link
                to="/contact"
                className="w-full text-center bg-burgundy text-ivory text-xs font-semibold uppercase tracking-atelier py-3"
              >
                Schedule Atelier Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
