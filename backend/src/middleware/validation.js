/**
 * Input sanitization utility to strip HTML tags and trim strings.
 */
export function sanitizeString(val) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case "'": return '&#39;';
        case '"': return '&quot;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
}

/**
 * Validates and sanitizes customer enquiry submissions.
 */
export function validateEnquiry(req, res, next) {
  const {
    name,
    phone,
    email,
    eventType,
    eventDate,
    venue,
    guestCount,
    budget,
    services,
    message,
    consent
  } = req.body;

  const errors = {};

  // Validate Name
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  } else if (name.trim().length > 100) {
    errors.name = 'Name must not exceed 100 characters.';
  }

  // Validate Phone
  const cleanedPhone = phone ? String(phone).replace(/[\s\-\(\)\+]/g, '') : '';
  if (!phone || cleanedPhone.length < 9 || cleanedPhone.length > 15 || !/^\d+$/.test(cleanedPhone)) {
    errors.phone = 'Please provide a valid contact number (10 to 15 digits).';
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Validate Event Type
  if (!eventType || typeof eventType !== 'string' || eventType.trim().length === 0) {
    errors.eventType = 'Please select your celebration event type.';
  }

  // Validate Event Date (must be in YYYY-MM-DD and not in the distant past)
  if (!eventDate || typeof eventDate !== 'string') {
    errors.eventDate = 'Please select a tentative celebration date.';
  } else {
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime())) {
      errors.eventDate = 'Please select a valid date.';
    } else if (selectedDate < today) {
      errors.eventDate = 'Celebration date must be today or in the future.';
    }
  }

  // Validate Venue / Location
  if (!venue || typeof venue !== 'string' || venue.trim().length < 2) {
    errors.venue = 'Please specify the celebration venue or city.';
  } else if (venue.trim().length > 150) {
    errors.venue = 'Venue description must not exceed 150 characters.';
  }

  // Validate Consent
  if (consent !== true && consent !== 'true') {
    errors.consent = 'Please confirm consent to be contacted regarding your celebration.';
  }

  // Return validation errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please review the highlighted fields.',
      errors
    });
  }

  // Sanitize and attach cleaned data
  req.sanitizedEnquiry = {
    name: sanitizeString(name),
    phone: sanitizeString(phone),
    email: email.trim().toLowerCase(),
    eventType: sanitizeString(eventType),
    eventDate: eventDate.trim(),
    venue: sanitizeString(venue),
    guestCount: guestCount ? Math.max(1, parseInt(guestCount, 10) || 0) : null,
    budget: budget ? sanitizeString(budget) : 'To be discussed',
    services: Array.isArray(services) ? services.map(sanitizeString).filter(Boolean) : [],
    message: message ? sanitizeString(message).slice(0, 1500) : '',
    consent: true
  };

  next();
}
