import crypto from 'node:crypto';

/**
 * Generates an enquiry reference code in the format: EVE-YYYYMMDD-XXXX
 * Example: EVE-20261022-A89F
 */
export function generateEnquiryId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateSegment = `${year}${month}${day}`;
  const randomSegment = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `EVE-${dateSegment}-${randomSegment}`;
}
