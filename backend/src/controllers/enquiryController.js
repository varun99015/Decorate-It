import { DataService } from '../services/dataService.js';
import { generateEnquiryId } from '../utils/idGenerator.js';

export async function createEnquiry(req, res, next) {
  try {
    const rawData = req.sanitizedEnquiry;
    const enquiryId = generateEnquiryId();
    const createdAt = new Date().toISOString();

    const enquiryRecord = {
      id: enquiryId,
      ...rawData,
      status: 'pending_review',
      createdAt
    };

    await DataService.saveEnquiry(enquiryRecord);

    // Return friendly confirmation without sensitive internal logs
    res.status(201).json({
      success: true,
      message: 'Thank you for inviting us into your celebration journey. Your enquiry has been safely received.',
      data: {
        referenceId: enquiryId,
        name: rawData.name,
        eventType: rawData.eventType,
        eventDate: rawData.eventDate,
        createdAt
      }
    });
  } catch (error) {
    next(error);
  }
}
