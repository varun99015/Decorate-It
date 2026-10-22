import { DataService } from '../services/dataService.js';

export async function getFaqs(req, res, next) {
  try {
    const faqs = await DataService.getFaqs();
    const { category } = req.query;

    let filtered = faqs;
    if (category && category !== 'All') {
      filtered = faqs.filter(
        (f) => f.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
}
