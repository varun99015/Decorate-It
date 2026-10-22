import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from '../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEST_PORT = 3999;
let server;

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: TEST_PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
        }
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = raw;
          }
          resolve({ status: res.statusCode, body: parsed, headers: res.headers });
        });
      }
    );

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('\n🚀 Starting EVERAFTER Backend API Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  server = app.listen(TEST_PORT);
  await new Promise((r) => setTimeout(r, 200));

  try {
    // 1. Health check
    const health = await makeRequest('GET', '/api/health');
    assert(health.status === 200 && health.body.status === 'healthy', 'GET /api/health returns 200 and healthy');

    // 2. Business configuration
    const business = await makeRequest('GET', '/api/business');
    assert(
      business.status === 200 && business.body.data.shortName === 'EVERAFTER',
      'GET /api/business returns 200 with studio configuration'
    );

    // 3. Services list
    const services = await makeRequest('GET', '/api/services');
    assert(
      services.status === 200 && services.body.data.length >= 12,
      `GET /api/services returns 200 with ${services.body.data?.length} services (>= 12 expected)`
    );

    // 4. Packages list
    const packages = await makeRequest('GET', '/api/packages');
    assert(
      packages.status === 200 && packages.body.data.length >= 3,
      `GET /api/packages returns 200 with ${packages.body.data?.length} packages`
    );

    // 5. Portfolio list & filter
    const portfolio = await makeRequest('GET', '/api/portfolio');
    assert(
      portfolio.status === 200 && portfolio.body.data.length >= 6,
      `GET /api/portfolio returns 200 with ${portfolio.body.data?.length} projects`
    );

    // 6. Portfolio slug endpoint
    const sampleSlug = portfolio.body.data[0].slug;
    const projectDetail = await makeRequest('GET', `/api/portfolio/${sampleSlug}`);
    assert(
      projectDetail.status === 200 && projectDetail.body.data.slug === sampleSlug,
      `GET /api/portfolio/:slug returns 200 for slug "${sampleSlug}"`
    );

    // 7. FAQs list
    const faqs = await makeRequest('GET', '/api/faqs');
    assert(
      faqs.status === 200 && faqs.body.data.length >= 5,
      `GET /api/faqs returns 200 with ${faqs.body.data?.length} FAQs`
    );

    // 8. Public GET /api/enquiries MUST NOT expose private enquiry records (Should return 404)
    const privateGet = await makeRequest('GET', '/api/enquiries');
    assert(
      privateGet.status === 404,
      'GET /api/enquiries returns 404 (Private enquiry records are protected and not publicly readable)'
    );

    // 9. POST /api/enquiries with invalid data (validation check)
    const invalidPost = await makeRequest('POST', '/api/enquiries', {
      name: '',
      phone: '123',
      email: 'bad-email'
    });
    assert(
      invalidPost.status === 400 && invalidPost.body.errors !== undefined,
      'POST /api/enquiries rejects invalid data with 400 and detailed errors'
    );

    // 10. POST /api/enquiries with valid test payload
    const testPayload = {
      name: 'Rohan & Ananya Test',
      phone: '+91 98450 99887',
      email: 'rohan.test@example.com',
      eventType: 'Weddings',
      eventDate: '2026-12-15',
      venue: 'The Leela Palace Bengaluru',
      guestCount: 350,
      budget: '₹12,00,000 - ₹20,00,000',
      services: ['Architectural Mandap Design', 'Reception Stage Decoration'],
      message: 'Looking for a breathtaking rajnigandha and lotus botanical mandap.',
      consent: true
    };

    const validPost = await makeRequest('POST', '/api/enquiries', testPayload);
    assert(
      validPost.status === 201 && validPost.body.data.referenceId.startsWith('EVE-'),
      `POST /api/enquiries creates enquiry with reference ID: ${validPost.body.data?.referenceId}`
    );

    // 11. Verify atomic file persistence in enquiries.json
    const enquiriesFile = path.resolve(__dirname, '../data/enquiries.json');
    const rawEnquiries = await fs.readFile(enquiriesFile, 'utf-8');
    const enquiriesList = JSON.parse(rawEnquiries);
    const persisted = enquiriesList.find((e) => e.id === validPost.body.data.referenceId);
    assert(
      persisted !== undefined && persisted.name === 'Rohan &amp; Ananya Test',
      'Enquiry is safely persisted and sanitized in backend/data/enquiries.json'
    );

    console.log(`\n📊 Backend Test Summary: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exitCode = 1;
  } catch (err) {
    console.error('Test execution crashed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runTests();
