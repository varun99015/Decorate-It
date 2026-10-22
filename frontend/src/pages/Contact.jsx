import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { submitEnquiry } from '../services/api';

const EVENT_TYPES = [
  'Grand Wedding (Multi-Day)',
  'Traditional Sacred Wedding / Muhurtham',
  'Gala Reception Stage',
  'Haldi & Mehendi Revelry',
  'Sangeet & Cocktail Soiree',
  'Intimate Villa Celebration',
  'Destination Wedding Production',
  'Anniversary / Milestone Gala',
  'Corporate Gala / Luxury Launch',
  'Custom Architectural Installation'
];

const AVAILABLE_SERVICES = [
  'Bespoke Wedding Decoration',
  'Architectural Mandap Design',
  'Botanical & Floral Artistry',
  'Opulent Reception Stages',
  'Haldi & Mehendi Setups',
  'Sangeet & Cocktail Styling',
  'Intimate Villa Celebrations',
  'Destination Wedding Production',
  'Sculptural Rigging & Ceilings'
];

const BUDGET_RANGES = [
  '₹4,50,000 – ₹8,00,000 (Intimate/Micro-Wedding)',
  '₹8,00,000 – ₹15,00,000 (Signature Celebration)',
  '₹15,00,000 – ₹30,00,000 (Grand Multi-Day)',
  '₹30,00,000+ (Couture Destination Production)',
  'To Be Explored During Consultation'
];

export default function Contact() {
  const [searchParams] = useSearchParams();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: searchParams.get('service') || '',
    eventDate: '',
    venue: '',
    guestCount: '',
    budget: searchParams.get('package') ? `Selected Tier: ${searchParams.get('package')}` : '',
    services: searchParams.get('service') ? [searchParams.get('service')] : [],
    message: searchParams.get('style') ? `Inquiring about style aesthetic: "${searchParams.get('style')}"` : '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [serverError, setServerError] = useState('');

  // Set min date to today's YYYY-MM-DD
  const todayString = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear individual field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleServiceToggle = (serviceName) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      const updated = exists
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName];
      return { ...prev, services: updated };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please provide your full name (minimum 2 characters).';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!formData.phone || cleanPhone.length < 9 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
      newErrors.phone = 'Please provide a valid contact number (10 to 15 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select your celebration event type.';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Please select a tentative celebration date.';
    } else {
      const selected = new Date(formData.eventDate);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (isNaN(selected.getTime()) || selected < now) {
        newErrors.eventDate = 'Event date must be today or in the future.';
      }
    }

    if (!formData.venue.trim() || formData.venue.trim().length < 2) {
      newErrors.venue = 'Please enter your intended venue or city.';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm consent to be contacted regarding your celebration.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        venue: formData.venue,
        guestCount: formData.guestCount ? parseInt(formData.guestCount, 10) : null,
        budget: formData.budget || 'To be discussed',
        services: formData.services,
        message: formData.message,
        consent: formData.consent
      });

      if (response.success) {
        setSubmitResult(response.data);
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        setServerError(response.message || 'Submission error. Please check form fields.');
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch (err) {
      setServerError('A network communication error occurred. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitResult(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: '',
      eventDate: '',
      venue: '',
      guestCount: '',
      budget: '',
      services: [],
      message: '',
      consent: false
    });
    setErrors({});
    setServerError('');
  };

  return (
    <div className="bg-ivory min-h-screen">

      {/* Header */}
      <section className="relative py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="EVERAFTER Contact Concierge"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-forest/90"></div>
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] border border-gold/40 bg-forest-dark/50 text-champagne">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Private Consultations &amp; Enquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory mb-6 leading-tight">
            Initiate Your <br />
            <span className="italic font-normal text-gold-gradient">Celebration Journey.</span>
          </h1>

          <p className="text-base sm:text-lg text-champagne/90 font-light max-w-2xl mx-auto leading-relaxed">
            We invite you to share your celebration date, venue aspirations, and floral aesthetic. Our concierge team reviews date availability and schedules your private consultation.
          </p>
        </div>
      </section>

      {/* Main Content: Form + Coordinates */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Form or Confirmation Card */}
          <div className="lg:col-span-8">

            {submitResult ? (
              /* Success Confirmation Card */
              <div className="bg-ivory border-2 border-gold p-8 sm:p-12 shadow-luxury animate-fadeIn space-y-6">
                <div className="w-16 h-16 rounded-full bg-forest text-gold flex items-center justify-center mx-auto mb-4 border border-gold/50 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-center space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-dark font-semibold">
                    Enquiry Registered Successfully
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
                    Thank You, {submitResult.name}
                  </h2>
                  <p className="text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
                    Your celebration brief has been safely recorded in the atelier register.
                  </p>
                </div>

                <div className="p-6 bg-champagne-light/50 border border-gold/40 text-xs space-y-3 font-mono">
                  <div className="flex items-center justify-between border-b border-champagne/60 pb-2">
                    <span className="text-charcoal-muted uppercase">Reference Code:</span>
                    <span className="font-bold text-burgundy text-sm">{submitResult.referenceId}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-champagne/60 pb-2">
                    <span className="text-charcoal-muted uppercase">Celebration Type:</span>
                    <span className="text-charcoal font-medium">{submitResult.eventType}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-champagne/60 pb-2">
                    <span className="text-charcoal-muted uppercase">Anticipated Date:</span>
                    <span className="text-charcoal font-medium">{submitResult.eventDate}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-charcoal-muted uppercase">Status:</span>
                    <span className="text-forest font-semibold">Under Concierge Review</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-charcoal-muted leading-relaxed font-light border-l-2 border-forest pl-4">
                  <p>
                    <strong>What Happens Next:</strong> Our lead creative director reviews your venue specs, logistical viability, and date availability within 24 business hours. We will connect directly via WhatsApp or phone call to schedule your exploratory atelier consultation.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto text-center bg-forest hover:bg-forest-light text-ivory text-xs font-semibold uppercase tracking-widest py-3 px-6 transition-colors"
                  >
                    Submit Another Brief
                  </button>
                  <a
                    href="https://wa.me/916363427278"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto text-center bg-champagne-light hover:bg-champagne text-charcoal text-xs font-semibold uppercase tracking-widest py-3 px-6 border border-gold/40 transition-colors"
                  >
                    Connect With Concierge On WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              /* The Form */
              <form onSubmit={handleSubmit} className="bg-ivory border border-champagne/60 p-8 sm:p-12 shadow-sm space-y-8" noValidate>

                <div className="border-b border-champagne/40 pb-6">
                  <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold-dark font-semibold block mb-1">
                    Celebration Brief
                  </span>
                  <h2 className="font-serif text-3xl text-charcoal font-light">
                    Consultation Registration
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-1 font-light">
                    Fields marked with an asterisk (<span className="text-burgundy">*</span>) are required to verify calendar availability.
                  </p>
                </div>

                {serverError && (
                  <div className="p-4 bg-burgundy/10 border border-burgundy/30 text-burgundy text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Section 1: Contact Details */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-charcoal font-medium">
                    1. Contact Coordinates
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                        Full Name <span className="text-burgundy">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Ananya Rao &amp; Rohan Mehta"
                        className={`w-full px-4 py-3 bg-champagne-light/30 border text-xs focus:bg-white transition-colors ${errors.name ? 'border-burgundy' : 'border-champagne/80 focus:border-gold'
                          }`}
                      />
                      {errors.name && <span className="text-[11px] text-burgundy mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                        Contact Number / WhatsApp <span className="text-burgundy">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 63634 272785"
                        className={`w-full px-4 py-3 bg-champagne-light/30 border text-xs focus:bg-white transition-colors ${errors.phone ? 'border-burgundy' : 'border-champagne/80 focus:border-gold'
                          }`}
                      />
                      {errors.phone && <span className="text-[11px] text-burgundy mt-1 block">{errors.phone}</span>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Email Address <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. concierge@example.com"
                      className={`w-full px-4 py-3 bg-champagne-light/30 border text-xs focus:bg-white transition-colors ${errors.email ? 'border-burgundy' : 'border-champagne/80 focus:border-gold'
                        }`}
                    />
                    {errors.email && <span className="text-[11px] text-burgundy mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                {/* Section 2: Celebration Details */}
                <div className="space-y-4 pt-6 border-t border-champagne/40">
                  <h3 className="font-serif text-xl text-charcoal font-medium">
                    2. Celebration Dimensions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventType" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                        Celebration Type <span className="text-burgundy">*</span>
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-champagne-light/30 border text-xs focus:bg-white transition-colors ${errors.eventType ? 'border-burgundy' : 'border-champagne/80 focus:border-gold'
                          }`}
                      >
                        <option value="">Select Celebration Type...</option>
                        {EVENT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.eventType && <span className="text-[11px] text-burgundy mt-1 block">{errors.eventType}</span>}
                    </div>

                    <div>
                      <label htmlFor="eventDate" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                        Anticipated Date <span className="text-burgundy">*</span>
                      </label>
                      <input
                        id="eventDate"
                        type="date"
                        name="eventDate"
                        min={todayString}
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-champagne-light/30 border text-xs focus:bg-white transition-colors ${errors.eventDate ? 'border-burgundy' : 'border-champagne/80 focus:border-gold'
                          }`}
                      />
                      {errors.eventDate && <span className="text-[11px] text-burgundy mt-1 block">{errors.eventDate}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="venue" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                        Venue / Estate / Destination <span className="text-burgundy">*</span>
                      </label>
                      <input
                        id="venue"
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        placeholder="e.g. Palace Grounds, Bengaluru / The Leela / Goa Beachfront"
                        className={`w-full px-4 py-3 bg-champagne-light/30 border text-xs focus:bg-white transition-colors ${errors.venue ? 'border-burgundy' : 'border-champagne/80 focus:border-gold'
                          }`}
                      />
                      {errors.venue && <span className="text-[11px] text-burgundy mt-1 block">{errors.venue}</span>}
                    </div>

                    <div>
                      <label htmlFor="guestCount" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                        Approximate Guest Count
                      </label>
                      <input
                        id="guestCount"
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        placeholder="e.g. 350"
                        min="1"
                        className="w-full px-4 py-3 bg-champagne-light/30 border border-champagne/80 text-xs focus:bg-white focus:border-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Estimated Decor Investment Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-champagne-light/30 border border-champagne/80 text-xs focus:bg-white focus:border-gold transition-colors"
                    >
                      <option value="">Select Estimated Decor Budget...</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 3: Disciplines of Interest */}
                <div className="space-y-4 pt-6 border-t border-champagne/40">
                  <h3 className="font-serif text-xl text-charcoal font-medium">
                    3. Specific Disciplines of Interest
                  </h3>
                  <p className="text-xs text-charcoal-muted font-light">
                    Select all elements you would like included in your spatial brief:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AVAILABLE_SERVICES.map((serv) => {
                      const checked = formData.services.includes(serv);
                      return (
                        <label
                          key={serv}
                          className={`flex items-center gap-3 p-3 text-xs border cursor-pointer transition-colors ${checked
                            ? 'bg-champagne/40 border-gold text-burgundy font-medium'
                            : 'bg-champagne-light/20 border-champagne/60 text-charcoal hover:bg-champagne/20'
                            }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleServiceToggle(serv)}
                            className="w-4 h-4 rounded-none accent-burgundy cursor-pointer"
                          />
                          <span>{serv}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Section 4: Narrative / Notes */}
                <div className="space-y-4 pt-6 border-t border-champagne/40">
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-charcoal font-medium">
                    Artistic Vision / Heritage Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your preferred color palette, specific sacred traditions, or aesthetic memories you wish to evoke..."
                    className="w-full px-4 py-3 bg-champagne-light/30 border border-champagne/80 text-xs focus:bg-white focus:border-gold transition-colors"
                  ></textarea>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-charcoal-muted leading-relaxed">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-0.5 rounded-none accent-burgundy cursor-pointer"
                    />
                    <span>
                      I consent to EVERAFTER Atelier retaining the provided contact and celebration details strictly to coordinate this design enquiry and schedule our consultation. <span className="text-burgundy">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <span className="text-[11px] text-burgundy mt-1 block pl-7">
                      {errors.consent}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-champagne/40">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-light text-ivory text-xs font-semibold uppercase tracking-atelier py-4 px-10 transition-all shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
                        <span>Registering Brief...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold" />
                        <span>Submit Celebration Enquiry</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Atelier Coordinates & Hospitality Information */}
          <div className="lg:col-span-4 space-y-8">

            {/* Atelier Studio Card */}
            <div className="p-8 bg-forest text-ivory border border-gold/40 shadow-luxury space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold block">
                The Atelier Physical Salon
              </span>

              <h3 className="font-serif text-2xl text-ivory font-light leading-snug">
                Private Consultation By Prior Appointment
              </h3>

              <div className="space-y-4 text-xs text-champagne/90 leading-relaxed font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    Villa 14, The Boulevard, Lavelle Road, Shanthala Nagar, Bengaluru, Karnataka 560001
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>+91 63634 272785 / (080) 4920-3344</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>concierge@everafteratelier.in</span>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-ivory block">Consultation Hours:</span>
                    <span>Monday – Saturday: 10:00 AM – 7:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://maps.google.com/?q=Lavelle+Road+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-champagne hover:text-white transition-colors border-b border-champagne/40 pb-0.5 font-medium"
                >
                  <span>Open Lavelle Road Atelier In Google Maps</span>
                  <MapPin className="w-3 h-3 text-gold" />
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-6 bg-ivory border border-champagne/60 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <h4 className="font-serif text-lg text-charcoal font-medium">
                  Direct Concierge Desk
                </h4>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                For urgent date availability checks or wedding planners requesting fast preliminary availability:
              </p>
              <a
                href="https://wa.me/916363427278"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Message Concierge Desk</span>
              </a>
            </div>

            {/* Privacy & Demonstrator Assurance */}
            <div className="p-6 bg-champagne-light/30 border border-champagne/40 text-xs text-charcoal-muted space-y-2">
              <div className="flex items-center gap-2 text-charcoal font-medium text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Data Protection Assurance</span>
              </div>
              <p className="font-light leading-relaxed">
                Submitted information is strictly maintained in private, encrypted atelier files and is never shared, marketed, or exposed publicly.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
