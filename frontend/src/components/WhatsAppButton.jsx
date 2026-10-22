import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const phoneNumber = '916363427278';
  const defaultText = encodeURIComponent(
    'Hello EVERAFTER Atelier, I would like to enquire about date availability and schedule a wedding design consultation.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">

      {/* Tooltip Popup */}
      {tooltipVisible && (
        <div className="hidden sm:flex items-center gap-2 bg-charcoal text-ivory text-xs px-3.5 py-2 shadow-xl border border-gold/40 animate-fadeIn">
          <span>Concierge WhatsApp Support</span>
          <button
            onClick={() => setTooltipVisible(false)}
            className="text-champagne hover:text-white p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${defaultText}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setTooltipVisible(true)}
        className="w-13 h-13 p-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group focus:outline-none"
        aria-label="Chat with Concierge on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </div>
  );
}
