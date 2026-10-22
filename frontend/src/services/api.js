import { fallbackBusiness } from '../data/business.js';
import { fallbackServices } from '../data/services.js';
import { fallbackPackages } from '../data/packages.js';
import { fallbackPortfolio } from '../data/portfolio.js';
import { fallbackFaqs } from '../data/faqs.js';

const API_BASE = '/api';

export async function fetchBusiness() {
  try {
    const res = await fetch(`${API_BASE}/business`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || fallbackBusiness;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled business data:', error.message);
    return fallbackBusiness;
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || fallbackServices;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled services:', error.message);
    return fallbackServices;
  }
}

export async function fetchPackages() {
  try {
    const res = await fetch(`${API_BASE}/packages`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || fallbackPackages;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled packages:', error.message);
    return fallbackPackages;
  }
}

export async function fetchPortfolio(category = null) {
  try {
    const url = category && category !== 'All' 
      ? `${API_BASE}/portfolio?category=${encodeURIComponent(category)}`
      : `${API_BASE}/portfolio`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || fallbackPortfolio;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled portfolio:', error.message);
    if (category && category !== 'All') {
      return fallbackPortfolio.filter(
        (p) => p.eventType.toLowerCase() === category.toLowerCase()
      );
    }
    return fallbackPortfolio;
  }
}

export async function fetchProjectBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/portfolio/${slug}`);
    if (!res.ok) throw new Error('Project not found');
    const json = await res.json();
    return json;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled project detail:', error.message);
    const project = fallbackPortfolio.find((p) => p.slug === slug);
    if (!project) return null;
    const related = fallbackPortfolio
      .filter((p) => p.slug !== slug && p.eventType === project.eventType)
      .slice(0, 3);
    return { data: project, related };
  }
}

export async function fetchFaqs(category = null) {
  try {
    const url = category && category !== 'All'
      ? `${API_BASE}/faqs?category=${encodeURIComponent(category)}`
      : `${API_BASE}/faqs`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || fallbackFaqs;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled FAQs:', error.message);
    if (category && category !== 'All') {
      return fallbackFaqs.filter(
        (f) => f.category.toLowerCase() === category.toLowerCase()
      );
    }
    return fallbackFaqs;
  }
}

export async function submitEnquiry(formData) {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || result.error || 'Submission failed. Please check form inputs.',
        errors: result.errors || {}
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error('[API Client] Network error submitting enquiry:', error);
    return {
      success: false,
      message: 'Unable to reach the studio concierge server. Please check your network or reach us via WhatsApp.'
    };
  }
}
