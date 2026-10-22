# EVERAFTER — Wedding & Event Atelier

> **"Where Every Celebration Becomes a Story."**  
> A boutique, full-stack website and sales demonstration platform for luxury wedding decorators, mandap architects, floral designers, and high-end event ateliers in Bengaluru, India.

---

## 1. Project Overview & Features

EVERAFTER is designed to showcase how modern web architecture, editorial typography, and spatial storytelling can elevate a wedding decorator's brand presence and generate qualified client enquiries.

### Key Highlights:
- **Editorial Magazine Aesthetic:** Inspired by high-fashion wedding publications, featuring warm ivory (`#F8F5F0`), champagne accents (`#E8D8BE`), deep burgundy (`#542D3A`), forest green (`#263B32`), and muted antique gold (`#B69A65`).
- **Data-Driven Dynamic Content:** All services, portfolio showcases, pricing packages, FAQs, and studio profile details are served through a lightweight Express REST API backed by local JSON storage.
- **12 Curated Event Disciplines:** From sacred temple mandaps and botanical floral clouds to high-glamour nightlife Sangeet stages and beachfront destination productions.
- **Interactive Portfolio with Lightbox:** Category filtering (Weddings, Reception stages, Floral installations, Haldi/Mehendi, Intimate celebrations, Corporate galas) with full-screen, keyboard-navigable image galleries.
- **Robust Client Enquiry Engine:** Multi-step enquiry form with client-side & server-side validation, HTML sanitization, rate limiting, and automated reference code generation (`EVE-YYYYMMDD-XXXX`).
- **Resilient Fallback Layer:** Built-in client-side cache fallback ensuring zero UI breakage even during backend cold starts or static deployments.
- **Privacy & Security First:** Helmet HTTP security headers, CORS origin whitelisting, defensive input lengths, and strict prevention of public access to private client enquiry records.

---

## 2. Technology Stack

### Frontend
- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS 3.x with custom luxury design tokens and serif typography
- **Routing:** React Router v6
- **Motion & Interactions:** Framer Motion (Motion for React)
- **Icons:** Lucide React
- **Typography:** Google Fonts (`Cormorant Garamond`, `Cinzel`, `Plus Jakarta Sans`)

### Backend
- **Runtime:** Node.js (v20+)
- **Framework:** Express.js REST API
- **Security:** Helmet, CORS, express-rate-limit
- **Persistence:** Local JSON files managed via `fs/promises` with atomic `.tmp` swap and write serialization lock
- **Development Tooling:** Concurrently for unified one-command execution

---

## 3. Screenshots & Visual Walkthrough

> *Screenshots can be placed in `frontend/public/images/screenshots/` and referenced here.*

1. **Editorial Homepage:** Immersive hero with soundless looping backdrop, Atelier manifesto, and signature disciplines.
2. **Disciplines Portfolio:** Grid showcasing 12 distinct event capabilities with included features checklist.
3. **Interactive Project Case Study:** Deep dive into design concepts, guest scales, and color palette chips.
4. **Consultation Registry:** Intuitive enquiry form with date picker, service selection, and instant reference ID.

---

## 4. Repository Structure

```
WeddingDecorator/
├── CLAUDE.md                  # Persistent architecture & developer context
├── README.md                  # Comprehensive developer & client documentation
├── package.json               # Root monorepo orchestration
├── .gitignore                 # Node, dist, logs, and temp file ignore rules
├── backend/
│   ├── .env.example           # Example environment variables
│   ├── .env                   # Local environment configuration
│   ├── package.json           # Backend dependencies and scripts
│   ├── data/                  # Writable JSON storage
│   │   ├── business.json      # Studio profile, contact, hours, social links
│   │   ├── services.json      # 12 core event styling offerings
│   │   ├── packages.json      # Curated demonstration packages
│   │   ├── portfolio.json     # Detailed editorial project showcases
│   │   ├── faqs.json          # Frequently asked questions
│   │   └── enquiries.json     # Server-private customer enquiry records
│   ├── src/
│   │   ├── app.js             # Express app setup and middleware chain
│   │   ├── server.js          # HTTP server listener
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Rate limiting, input validation, error handling
│   │   ├── routes/            # /api routing definitions
│   │   ├── services/          # DataService with atomic write lock
│   │   └── utils/             # Unique enquiry ID generator
│   └── test/
│       └── test-api.js        # Automated API test suite
└── frontend/
    ├── index.html             # HTML entry point with Google Fonts
    ├── vite.config.js         # Vite configuration with /api proxy
    ├── tailwind.config.js     # Custom color tokens & serif fonts
    ├── postcss.config.js      # PostCSS config
    ├── package.json           # Frontend dependencies
    ├── public/
    │   ├── favicon.svg        # Monogram favicon
    │   ├── robots.txt         # SEO crawling rules
    │   └── images/
    │       └── logo.svg       # Atelier vector insignia
    └── src/
        ├── main.jsx           # React DOM bootstrap
        ├── App.jsx            # Router and page routes
        ├── components/        # Lightbox, Navbar, Footer, ProjectCard, etc.
        ├── layouts/           # MainLayout with AnnouncementBar & WhatsApp CTA
        ├── pages/             # Home, Services, Portfolio, ProjectDetail, etc.
        ├── services/          # api.js API client with fallback data
        ├── data/              # Static fallback datasets
        └── styles/
            └── index.css      # Luxury utility styles and typography
```

---

## 5. Prerequisites

- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **npm:** v9.0.0 or higher

Check your installed versions:
```bash
node -v
npm -v
```

---

## 6. Installation & Quick Start

### Step 1: Install all dependencies (Root, Backend, Frontend)
```bash
npm run install:all
```
*Alternatively, install manually:*
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### Step 2: Environment Setup
Backend environment settings are stored in `backend/.env`. A pre-configured template is provided:
```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200
ENQUIRY_RATE_LIMIT_MAX=10
```

### Step 3: Start Development Servers
Run both backend and frontend concurrently with a single command from the project root:
```bash
npm run dev
```
- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API URL:** [http://localhost:3000](http://localhost:3000)
- **Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 7. Testing & Quality Assurance

To execute the automated backend test suite:
```bash
npm test
```
The test suite validates:
1. `GET /api/health` status check
2. `GET /api/business` studio profile configuration
3. `GET /api/services` returns 12 core disciplines
4. `GET /api/packages` returns investment tiers
5. `GET /api/portfolio` and `GET /api/portfolio/:slug`
6. `GET /api/faqs` grouped answers
7. **Security Check:** Ensures `GET /api/enquiries` returns 404 (private records are protected)
8. **Validation Check:** Rejects malformed submissions with HTTP 400
9. **Persistence Check:** Confirms valid submissions receive reference IDs (`EVE-...`) and are saved to `backend/data/enquiries.json`

---

## 8. API Endpoints Reference

All endpoints return JSON responses with standard schemas.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Uptime and service status |
| `GET` | `/api/business` | Studio profile, contact details, social links |
| `GET` | `/api/services` | Active event styling service categories |
| `GET` | `/api/packages` | Configurable pricing tiers & package inclusions |
| `GET` | `/api/portfolio` | Full portfolio items (`?category=` filter supported) |
| `GET` | `/api/portfolio/:slug`| Single project case study with related items |
| `GET` | `/api/faqs` | FAQs (`?category=` filter supported) |
| `POST` | `/api/enquiries` | Submit client booking enquiry (rate-limited, sanitized) |

---

## 9. Customisation Guide for New Clients

To adapt this website for another wedding decorator, follow these simple steps:

### 1. Update Business Identity & Contact Info
Edit `backend/data/business.json`:
- Change `businessName`, `tagline`, and `city`.
- Update `phone`, `email`, and `whatsAppNumber`.
- Update `address` and `mapUrl`.

### 2. Update Brand Colors
Modify `brandColours` in `backend/data/business.json` and adjust the theme palette in `frontend/tailwind.config.js`:
- Replace Burgundy (`#542D3A`) or Forest Green (`#263B32`) with your client's signature shades.

### 3. Add or Modify Portfolio Projects
Edit `backend/data/portfolio.json`:
- Add new project objects with `title`, `slug`, `eventType`, `locationDescription`, `coverImage`, and `gallery` array.
- High-resolution photographs can be placed in `frontend/public/images/portfolio/` or linked directly.

### 4. Customise Packages and Pricing
Edit `backend/data/packages.json`:
- Adjust package titles, guest scales, starting prices, and customisation options.

---

## 10. Data Persistence & Production Deployment

### Persistence Architecture
- Enquiries are persisted in `backend/data/enquiries.json`.
- Uses atomic writes (`fs.writeFile` to a `.tmp` file, then `fs.rename`) with an asynchronous write-lock queue to prevent concurrent write corruption.
- **Important Note:** Local JSON file persistence requires a persistent server or container (e.g. VPS, Render, Railway, DigitalOcean App Platform, AWS EC2). Serverless environments (like AWS Lambda or Vercel Serverless Functions) possess ephemeral filesystems where file edits do not persist across invocations. For serverless production setups, swap `DataService.js` to an external database (e.g. PostgreSQL, Supabase, or MongoDB).

---

## 11. Asset Licensing & Attribution

- **Photography:** Curated from [Unsplash](https://unsplash.com) under the Unsplash License (free for commercial and non-commercial use, no attribution required).
- **Typography:** Hosted by Google Fonts under open-source font licenses (`SIL Open Font License`).
- **Icons:** [Lucide Icons](https://lucide.dev) licensed under the ISC License.

---

## 12. Security & Data Protection

- **Sanitisation:** All text fields in enquiries are stripped of HTML tags and special entities before persistence.
- **Rate Limiting:** Public enquiry submissions are restricted to 10 submissions per 15 minutes per IP address.
- **Data Privacy:** Customer enquiry records cannot be retrieved via any public GET endpoint.
- **Input Bounds:** Text fields are constrained to reasonable maximum lengths (e.g. 1500 chars for messages) to prevent memory exhaustion attacks.
- **Headers:** Helmet middleware applies strict HTTP response headers.

---

## 13. License

This project is created as a bespoke demonstration platform by EVERAFTER Atelier. Code is licensed under the ISC License.
