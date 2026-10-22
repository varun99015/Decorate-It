import { DataService } from '../services/dataService.js';

export async function getPackages(req, res, next) {
  try {
    const packages = await DataService.getPackages();
    res.json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    next(error);
  }
}
