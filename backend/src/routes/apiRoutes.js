import { Router } from 'express';
import { getBusiness } from '../controllers/businessController.js';
import { getServices } from '../controllers/servicesController.js';
import { getPackages } from '../controllers/packagesController.js';
import { getPortfolio, getPortfolioBySlug } from '../controllers/portfolioController.js';
import { getFaqs } from '../controllers/faqsController.js';
import { createEnquiry } from '../controllers/enquiryController.js';
import { validateEnquiry } from '../middleware/validation.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'EVERAFTER Wedding & Event Atelier API',
    version: '1.0.0'
  });
});

// Content endpoints
router.get('/business', getBusiness);
router.get('/services', getServices);
router.get('/packages', getPackages);
router.get('/portfolio', getPortfolio);
router.get('/portfolio/:slug', getPortfolioBySlug);
router.get('/faqs', getFaqs);

// Transactional Enquiry endpoint
router.post('/enquiries', enquiryLimiter, validateEnquiry, createEnquiry);

export default router;
