# Lead Management System 🚀

A comprehensive lead management system with automated scoring, categorization, and workflow automation using n8n. Built with Next.js, MongoDB, and n8n for visual workflow automation.

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
- **Timeline** (max 30 points)
- **Company Size** (max 15 points)
- **Pain Points & Needs** (max 15 points)

### Lead Categories
- **🔥 Hot Lead** (70+ points): Immediate action, calendar invite sent
- **☀️ Warm Lead** (40-69 points): Testimonials and case studies
- **❄️ Cold Lead** (<40 points): Educational content and nurturing

### Automated Workflows with n8n

All email and calendar automation is handled by n8n workflows:

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
- **Workflow Automation**: n8n (Cloud or Self-hosted)
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

### 4. Set Up n8n

**Option A: n8n Cloud (Recommended for beginners)**
1. Sign up at [n8n.io/cloud](https://n8n.io/cloud)
2. Free tier available with 5,000 workflow executions/month

**Option B: Self-hosted**
\`\`\`bash
npm install -g n8n
n8n start
\`\`\`

### 5. Import n8n Workflow
1. Open n8n dashboard
2. Click "Workflows" → "Import from File"
3. Import `n8n-workflows/lead-workflow-main.json`
4. Configure Gmail and Google Calendar credentials in n8n
5. Activate the workflow
6. Copy the webhook URL from the Webhook node

### 6. Configure Environment Variables
Create a `.env.local` file:
\`\`\`env
# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# n8n Webhook
N8N_WEBHOOK_URL=your_n8n_webhook_url

# Admin Dashboard
ADMIN_PASSWORD=your_secure_password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### 7. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit:
- Client form: `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`

### 8. Deploy to Vercel
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## n8n Workflow Setup 📧

### Configure Gmail in n8n:
1. In n8n, go to "Credentials"
2. Add "Gmail OAuth2" credential
3. Follow n8n's built-in OAuth setup
4. Authorize your Gmail account

### Configure Google Calendar in n8n:
1. In n8n, go to "Credentials"
2. Add "Google Calendar OAuth2" credential
3. Follow n8n's built-in OAuth setup
4. Authorize your Google account

### Customize Email Templates:
1. Open the workflow in n8n
2. Click on any "Send Email" node
3. Edit the HTML template directly
4. Use variables like `{{$json["name"]}}`, `{{$json["company"]}}`, etc.
5. Save and test!

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

### For Workflow Management
1. Open n8n dashboard
2. View execution history
3. Modify email templates visually
4. Add new automation steps without coding

## Project Structure 📁

\`\`\`
lead-management-system/
├── lib/
│   ├── mongodb.ts           # MongoDB connection
│   └── leadScoring.ts       # Scoring logic
├── pages/
│   ├── api/
│   │   ├── submit-lead.ts   # Lead submission + n8n trigger
│   │   └── leads.ts         # Fetch leads endpoint
│   ├── _app.tsx
│   ├── index.tsx            # Client intake form
│   └── admin.tsx            # Admin dashboard
├── n8n-workflows/
│   ├── README.md            # n8n setup guide
│   └── lead-workflow-main.json  # Workflow template
├── styles/
│   └── globals.css
├── package.json
└── README.md
\`\`\`

## API Endpoints 🔌

### POST /api/submit-lead
Submit a new lead with automatic scoring and n8n workflow trigger.

### GET /api/leads
Fetch all leads with filtering (requires admin password).

## Advantages of n8n Integration 🎯

### Visual Workflow Editor
- No coding required for email changes
- Drag-and-drop interface
- Real-time testing

### Easy Customization
- Modify email templates in minutes
- Add new automation steps visually
- A/B test different approaches

### Powerful Integrations
- 400+ pre-built integrations
- Connect to Slack, CRM, databases
- Custom HTTP requests

### Execution History
- See every workflow run
- Debug issues easily
- Track email delivery

## Free Tier Limits 📊

- **MongoDB Atlas**: 512MB storage, shared cluster
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **n8n Cloud**: 5,000 workflow executions/month
- **n8n Self-hosted**: Unlimited (requires hosting)

## Customization Examples 🎨

### Add Slack Notification for Hot Leads:
1. Open workflow in n8n
2. Add "Slack" node after hot lead email
3. Configure Slack credentials
4. Send message to #sales channel

### Add Follow-up Sequence:
1. Add "Wait" node (e.g., 3 days)
2. Add another "Send Email" node
3. Create follow-up email template

### Add CRM Integration:
1. Add "HTTP Request" node
2. Configure your CRM API
3. Sync lead data automatically

## Troubleshooting 🔧

### Webhook not triggering:
- Check N8N_WEBHOOK_URL in Vercel
- Ensure workflow is activated in n8n
- Check n8n execution history

### Emails not sending:
- Verify Gmail credentials in n8n
- Check Gmail API quotas
- Review spam folder

## Support 💬

- **n8n Documentation**: https://docs.n8n.io
- **n8n Community**: https://community.n8n.io
- **GitHub Issues**: For project-specific questions

## License 📄

MIT License - feel free to use this for your projects!

---

Built with ❤️ using Next.js, MongoDB, and n8n
