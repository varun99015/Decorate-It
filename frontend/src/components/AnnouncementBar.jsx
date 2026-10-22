import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="bg-forest text-ivory text-xs tracking-atelier py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-center md:text-left">
        <div className="flex items-center justify-center w-full md:w-auto gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse hidden sm:inline" />
          <span>
            Now accepting commissions for Autumn/Winter 2026 &amp; Spring 2027 celebrations in Bengaluru &amp; Destination retreats.
          </span>
        </div>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-1.5 text-champagne hover:text-gold transition-colors font-medium border-b border-champagne/40 pb-0.5"
        >
          <span>Reserve Dates</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
