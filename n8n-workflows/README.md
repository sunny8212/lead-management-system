# n8n Workflows for Lead Management System

This directory contains n8n workflow templates for automating lead management tasks.

## Overview

The system uses n8n to handle all email and calendar automation. When a lead is submitted through the form, it triggers an n8n workflow that:

1. Receives lead data via webhook
2. Determines lead category (hot/warm/cold)
3. Sends appropriate welcome email
4. Creates calendar events for hot leads
5. Schedules follow-up tasks

## Setup Instructions

### 1. Install n8n

**Option A: Cloud (Recommended for beginners)**
- Sign up at https://n8n.io/cloud
- Free tier available

**Option B: Self-hosted**
```bash
npm install -g n8n
n8n start
```

### 2. Import Workflows

1. Open n8n dashboard
2. Click "Workflows" → "Import from File"
3. Import the workflow JSON files from this directory:
   - `lead-workflow-main.json` - Main lead processing workflow
   - `hot-lead-workflow.json` - Hot lead specific actions
   - `warm-lead-workflow.json` - Warm lead nurturing
   - `cold-lead-workflow.json` - Cold lead education

### 3. Configure Credentials

In n8n, set up these credentials:

**Gmail Account:**
1. Go to Credentials → Add Credential → Gmail OAuth2
2. Follow n8n's built-in OAuth setup
3. Authorize your Gmail account

**Google Calendar:**
1. Go to Credentials → Add Credential → Google Calendar OAuth2
2. Follow n8n's built-in OAuth setup
3. Authorize your Google account

### 4. Get Webhook URL

1. Open the main workflow in n8n
2. Click on the "Webhook" node
3. Copy the "Production URL"
4. Add this URL to your Vercel environment variables as `N8N_WEBHOOK_URL`

## Workflow Structure

### Main Workflow: Lead Processing

```
Webhook (receives lead data)
    ↓
Switch (by category)
    ↓
├─→ Hot Lead Branch
│   ├─→ Send Hot Lead Email
│   └─→ Create Calendar Event
│
├─→ Warm Lead Branch
│   └─→ Send Warm Lead Email with Testimonials
│
└─→ Cold Lead Branch
    └─→ Send Cold Lead Email with Resources
```

## Customizing Email Templates

### In n8n:

1. Open the workflow
2. Click on the "Send Email" node
3. Edit the email template directly in n8n's visual editor
4. Use variables like `{{$json["name"]}}`, `{{$json["company"]}}`, etc.

### Available Variables:

- `{{$json["name"]}}` - Lead's name
- `{{$json["email"]}}` - Lead's email
- `{{$json["company"]}}` - Company name
- `{{$json["score"]}}` - Lead score (0-100)
- `{{$json["category"]}}` - hot/warm/cold
- `{{$json["budget"]}}` - Budget amount
- `{{$json["timeline"]}}` - Timeline
- `{{$json["painPointsText"]}}` - Pain points description
- `{{$json["automationNeedsText"]}}` - Automation needs

## Testing Workflows

### Test Mode:
1. In n8n, click "Execute Workflow" button
2. Manually input test data
3. Watch each node execute step-by-step

### Production Test:
1. Submit a test lead through your form
2. Check n8n execution history
3. Verify email was sent
4. Check calendar for hot leads

## Advanced Features

### Add Follow-up Sequences:

1. Add "Wait" node after initial email
2. Add "Send Email" node for follow-up
3. Set wait time (e.g., 3 days)

### Add Slack Notifications:

1. Add Slack node after webhook
2. Configure Slack credentials
3. Send notification for hot leads

### Add CRM Integration:

1. Add HTTP Request node
2. Connect to your CRM API
3. Sync lead data automatically

## Troubleshooting

### Webhook not triggering:
- Check N8N_WEBHOOK_URL in Vercel environment variables
- Ensure workflow is activated in n8n
- Check n8n execution history for errors

### Emails not sending:
- Verify Gmail credentials in n8n
- Check Gmail API quotas
- Review email content for spam triggers

### Calendar events not creating:
- Verify Google Calendar credentials
- Check calendar permissions
- Ensure calendar ID is correct

## Workflow Files

- `lead-workflow-main.json` - Complete workflow with all branches
- `email-templates.md` - Email template examples
- `workflow-diagram.png` - Visual workflow diagram

## Support

For n8n specific questions:
- Documentation: https://docs.n8n.io
- Community: https://community.n8n.io
- YouTube: https://www.youtube.com/c/n8n-io

For this project:
- Check GitHub issues
- Review README.md in root directory
