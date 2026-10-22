import { DataService } from '../services/dataService.js';

export async function getBusiness(req, res, next) {
  try {
    const business = await DataService.getBusiness();
    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    next(error);
  }
}
