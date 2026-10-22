import { DataService } from '../services/dataService.js';

export async function getServices(req, res, next) {
  try {
    const services = await DataService.getServices();
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
}
