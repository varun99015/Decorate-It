import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-ivory flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center mx-auto text-gold bg-champagne-light/50">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>

        <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-dark block font-semibold">
          Error 404 &bull; Sanctuary Uncharted
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
          This Page Has Wandered From The Atelier.
        </h1>

        <p className="text-sm text-charcoal-muted leading-relaxed font-light">
          The celebration archive or discipline you were looking for has either moved to a new salon address or is temporarily undergoing curatorial refinement.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-atelier py-3.5 px-6 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return To Atelier Home</span>
          </Link>
          <Link
            to="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-champagne-light hover:bg-champagne text-charcoal text-xs font-semibold uppercase tracking-atelier py-3.5 px-6 border border-gold/40 transition-colors"
          >
            <span>Explore Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
