# Lead Management System 🚀

A comprehensive lead management system with automated scoring, categorization, and workflow automation. Built with Next.js, MongoDB, and integrated with Gmail and Google Calendar.

## Features ✨

### Client-Facing Form
- **Comprehensive intake form** capturing:
  - Contact information (name, email, phone)
  - Company details (name, industry, size)
  - Pain points (multiple choice + detailed text)
  - Automation needs (multiple choice + detailed text)
  - Current hassles and tools
  - Budget (slider: $1K - $50K)
  - Timeline (Immediate, 1-3 months, 3-6 months, 6+ months)

### Intelligent Lead Scoring
Automatic scoring based on:
- **Budget** (max 40 points)
  - $10K+: 40 pts
  - $5K-$10K: 30 pts
  - $2K-$5K: 20 pts
  - <$2K: 10 pts

- **Timeline** (max 30 points)
  - Immediate: 30 pts
  - 1-3 months: 20 pts
  - 3-6 months: 10 pts
  - 6+ months: 5 pts

- **Company Size** (max 15 points)
  - 100+ employees: 15 pts
  - 50-100: 10 pts
  - 10-50: 5 pts
  - <10: 2 pts

- **Pain Points & Needs** (max 15 points)
  - Multiple specific items + detailed text: 15 pts
  - Few items: 8 pts
  - Vague: 3 pts

### Lead Categories
- **🔥 Hot Lead** (70+ points): Immediate action, calendar invite sent
- **☀️ Warm Lead** (40-69 points): Testimonials and case studies
- **❄️ Cold Lead** (<40 points): Educational content and nurturing

### Automated Workflows

#### Hot Leads (Score 70+)
- ✅ Instant welcome email with meeting booking link
- ✅ Automatic calendar event creation
- ✅ Priority follow-up

#### Warm Leads (Score 40-69)
- ✅ Welcome email with testimonials
- ✅ Success stories from similar companies
- ✅ Social proof and case studies

#### Cold Leads (Score <40)
- ✅ Educational welcome email
- ✅ Blog posts and resources
- ✅ Past work showcase
- ✅ Nurture sequence

### Admin Dashboard
- 📊 Real-time statistics (total, hot, warm, cold leads)
- 🔍 Filter by category
- 📈 Sort by date or score
- 👁️ Detailed lead view with all information
- 🎯 Average score tracking

## Tech Stack 💻

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB Atlas (Free Tier - 512MB)
- **Email**: Gmail API with OAuth2
- **Calendar**: Google Calendar API
- **Hosting**: Vercel (Free Tier)

## Setup Instructions 🛠️

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/sunny8212/lead-management-system.git
cd lead-management-system
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set Up MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free M0 tier)
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string

### 4. Set Up Gmail API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Gmail API and Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `https://developers.google.com/oauthplayground`
6. Go to [OAuth Playground](https://developers.google.com/oauthplayground)
7. Select Gmail API v1 and Calendar API v3 scopes
8. Authorize and get refresh token

### 5. Configure Environment Variables
Create a `.env.local` file:
\`\`\`env
# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# Gmail API
GMAIL_USER=your_email@gmail.com
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token

# Google Calendar API
GOOGLE_CALENDAR_ID=primary

# Admin Dashboard
ADMIN_PASSWORD=your_secure_password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### 6. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit:
- Client form: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`

### 7. Deploy to Vercel
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## Usage 📖

### For Clients
1. Visit your deployed URL
2. Fill out the comprehensive intake form
3. Submit and receive instant confirmation
4. Check email for next steps based on lead category

### For Admins
1. Visit `/admin`
2. Enter admin password
3. View all leads with filtering and sorting
4. Click "View Details" for complete lead information

## Project Structure 📁

\`\`\`
lead-management-system/
├── lib/
│   ├── mongodb.ts           # MongoDB connection
│   ├── leadScoring.ts       # Scoring logic
│   └── emailTemplates.ts    # Email templates
├── pages/
│   ├── api/
│   │   ├── submit-lead.ts   # Lead submission endpoint
│   │   └── leads.ts         # Fetch leads endpoint
│   ├── _app.tsx
│   ├── index.tsx            # Client intake form
│   └── admin.tsx            # Admin dashboard
├── styles/
│   └── globals.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
\`\`\`

## API Endpoints 🔌

### POST /api/submit-lead
Submit a new lead with automatic scoring and workflow trigger.

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Inc",
  "industry": "Technology",
  "companySize": "50",
  "painPoints": ["Manual data entry", "Repetitive tasks"],
  "painPointsText": "Detailed description...",
  "automationNeeds": ["Email automation", "Data processing"],
  "automationNeedsText": "Detailed description...",
  "currentHassles": "Current challenges...",
  "currentTools": "Excel, Salesforce",
  "budget": 10000,
  "timeline": "immediate",
  "spendingCapacity": 10000
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "leadId": "...",
  "score": 85,
  "category": "hot"
}
\`\`\`

### GET /api/leads
Fetch all leads with filtering (requires admin password).

**Query Parameters:**
- `password`: Admin password (required)
- `category`: Filter by category (optional: all, hot, warm, cold)
- `sortBy`: Sort field (optional: createdAt, score)
- `order`: Sort order (optional: asc, desc)

## Customization 🎨

### Modify Scoring Logic
Edit `lib/leadScoring.ts` to adjust point allocations.

### Customize Email Templates
Edit `lib/emailTemplates.ts` to change email content for each category.

### Add More Form Fields
1. Update `LeadData` interface in `lib/leadScoring.ts`
2. Add fields to form in `pages/index.tsx`
3. Update scoring logic if needed

## Free Tier Limits 📊

- **MongoDB Atlas**: 512MB storage, shared cluster
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **Gmail API**: 1 billion quota units/day (plenty for most use cases)
- **Google Calendar API**: 1 million requests/day

## Security 🔒

- Admin dashboard protected by password
- Environment variables for sensitive data
- MongoDB connection with authentication
- OAuth2 for Gmail and Calendar APIs

## Support 💬

For issues or questions, please open an issue on GitHub.

## License 📄

MIT License - feel free to use this for your projects!

---

Built with ❤️ using Next.js, MongoDB, and Google APIs
