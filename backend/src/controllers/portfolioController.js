import { DataService } from '../services/dataService.js';

export async function getPortfolio(req, res, next) {
  try {
    let portfolio = await DataService.getPortfolio();
    const { category, featured } = req.query;

    if (category && category !== 'All') {
      portfolio = portfolio.filter(
        (p) => p.eventType.toLowerCase() === category.toLowerCase()
      );
    }

    if (featured === 'true') {
      portfolio = portfolio.filter((p) => p.featured === true);
    }

    res.json({
      success: true,
      count: portfolio.length,
      data: portfolio
    });
  } catch (error) {
    next(error);
  }
}

export async function getPortfolioBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const project = await DataService.getPortfolioBySlug(slug);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: `Portfolio project not found with slug: ${slug}`
      });
    }

    // Also fetch related projects from same category
    const allProjects = await DataService.getPortfolio();
    const related = allProjects
      .filter((p) => p.slug !== slug && p.eventType === project.eventType)
      .slice(0, 3);

    res.json({
      success: true,
      data: project,
      related
    });
  } catch (error) {
    next(error);
  }
}
