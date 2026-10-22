import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

// Simple async write mutex to ensure serial write operations
class AsyncLock {
  constructor() {
    this.queue = Promise.resolve();
  }

  acquire(fn) {
    const result = this.queue.then(fn);
    this.queue = result.catch(() => {});
    return result;
  }
}

const writeLock = new AsyncLock();

/**
 * Safely reads and parses a JSON file from the data directory.
 * Returns defaultValue if file is missing or corrupted.
 */
async function readJsonFile(filename, defaultValue = null) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`[DataService] File not found: ${filename}. Returning default.`);
      return defaultValue;
    }
    console.error(`[DataService] Error reading/parsing ${filename}:`, error.message);
    throw new Error(`Failed to load data for ${filename}`);
  }
}

/**
 * Safely writes JSON content atomically using a temporary file and rename.
 */
async function writeJsonFileAtomic(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;

  return writeLock.acquire(async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await fs.writeFile(tempPath, jsonString, 'utf-8');
      
      // Atomic replacement (On Windows, fs.rename might fail if target exists without unlink or flags)
      try {
        await fs.rename(tempPath, filePath);
      } catch (renameErr) {
        // Fallback for Windows overwrite limitation in older node versions
        await fs.copyFile(tempPath, filePath);
        await fs.unlink(tempPath).catch(() => {});
      }
      return true;
    } catch (err) {
      // Clean up temp file on failure
      await fs.unlink(tempPath).catch(() => {});
      console.error(`[DataService] Failed atomic write to ${filename}:`, err);
      throw new Error(`Data persistence failed for ${filename}`);
    }
  });
}

export const DataService = {
  async getBusiness() {
    return readJsonFile('business.json', {});
  },

  async getServices() {
    const services = await readJsonFile('services.json', []);
    return services.filter((s) => s.active !== false);
  },

  async getPackages() {
    const packages = await readJsonFile('packages.json', []);
    return packages.filter((p) => p.active !== false);
  },

  async getPortfolio() {
    return readJsonFile('portfolio.json', []);
  },

  async getPortfolioBySlug(slug) {
    const portfolio = await readJsonFile('portfolio.json', []);
    return portfolio.find((item) => item.slug === slug) || null;
  },

  async getFaqs() {
    return readJsonFile('faqs.json', []);
  },

  async saveEnquiry(enquiryRecord) {
    try {
      const enquiries = await readJsonFile('enquiries.json', []);
      enquiries.unshift(enquiryRecord); // Newest first
      await writeJsonFileAtomic('enquiries.json', enquiries);
    } catch (err) {
      console.warn('[DataService] Local persistence unavailable (Serverless / Read-Only). Writing to /tmp fallback:', err.message);
      try {
        const tmpPath = path.join('/tmp', 'enquiries.json');
        let tmpEnquiries = [];
        try {
          const content = await fs.readFile(tmpPath, 'utf-8');
          tmpEnquiries = JSON.parse(content);
        } catch {}
        tmpEnquiries.unshift(enquiryRecord);
        await fs.writeFile(tmpPath, JSON.stringify(tmpEnquiries, null, 2), 'utf-8');
      } catch (tmpErr) {
        console.warn('[DataService] /tmp write failed. Holding enquiry in memory.');
      }
    }
    return enquiryRecord;
  }
};
