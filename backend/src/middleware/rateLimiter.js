import rateLimit from 'express-rate-limit';

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000;
const generalMax = parseInt(process.env.RATE_LIMIT_MAX, 10) || 200;
const enquiryMax = parseInt(process.env.ENQUIRY_RATE_LIMIT_MAX, 10) || 10;

// Standard general API rate limiter
export const generalLimiter = rateLimit({
  windowMs,
  max: generalMax,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: { trustProxy: false }, // Avoid warning when trust proxy is active
  message: {
    success: false,
    error: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Stricter limiter specifically for client enquiry submissions to prevent form spam/abuse
export const enquiryLimiter = rateLimit({
  windowMs,
  max: enquiryMax,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    error: 'You have submitted multiple enquiries recently. Please allow our concierge team time to review your request or contact us directly via WhatsApp.'
  }
});
