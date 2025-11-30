# n8n Workflow Guide - Visual Explanation

## 🔄 Complete System Flow

```
┌─────────────────┐
│  Client visits  │
│   your website  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Fills out form │
│  (name, email,  │
│   budget, etc)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js API    │
│  calculates     │
│  lead score     │
│  (0-100 points) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Saves lead to  │
│  MongoDB with   │
│  score & category│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Triggers n8n   │
│  via webhook    │
│  (sends all     │
│   lead data)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│         n8n Workflow Starts         │
│  ┌─────────────────────────────┐   │
│  │  1. Webhook receives data   │   │
│  └──────────┬──────────────────┘   │
│             │                       │
│             ▼                       │
│  ┌─────────────────────────────┐   │
│  │  2. Switch by category      │   │
│  │     (hot/warm/cold)         │   │
│  └──┬────────┬────────┬────────┘   │
│     │        │        │             │
│  HOT│     WARM│    COLD│            │
│     │        │        │             │
│     ▼        ▼        ▼             │
│  ┌────┐  ┌────┐  ┌────┐            │
│  │ 🔥 │  │ ☀️ │  │ ❄️ │            │
│  └─┬──┘  └─┬──┘  └─┬──┘            │
│    │       │       │                │
│    ▼       ▼       ▼                │
│  Email   Email   Email              │
│  + Cal   only    only               │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Client receives│
│  personalized   │
│  email based on │
│  their score    │
└─────────────────┘
```

---

## 📧 Email Templates by Category

### 🔥 Hot Lead (Score 70-100)
**Subject**: "Let's Get Started, [Name]! 🔥"

**Content**:
- Urgent, action-oriented tone
- "We noticed you're ready to get started immediately"
- Direct call-to-action
- Meeting booking link
- Shows lead score

**Additional Action**:
- ✅ Creates Google Calendar event for tomorrow
- ✅ Sends calendar invite to lead's email

---

### ☀️ Warm Lead (Score 40-69)
**Subject**: "Great to Connect, [Name]! Here's What We Can Do"

**Content**:
- Friendly, informative tone
- 3 customer success stories with results
- Social proof and testimonials
- Invitation to schedule discovery call
- Shows lead score

**No calendar event** - waiting for them to respond

---

### ❄️ Cold Lead (Score 0-39)
**Subject**: "Welcome [Name]! Discover Automation for [Company]"

**Content**:
- Educational, nurturing tone
- Explains what you do
- 2 detailed case studies
- List of benefits
- Resources and blog links
- Shows lead score

**No calendar event** - focus on education first

---

## 🎯 n8n Workflow Nodes Explained

### 1. Webhook Node
**What it does**: Receives data from your Next.js app

**Configuration**:
- HTTP Method: POST
- Path: `lead-webhook`
- Response Mode: Using 'Respond to Webhook' node

**Data received**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "score": 85,
  "category": "hot",
  "budget": 10000,
  "timeline": "immediate",
  ...
}
```

---

### 2. Switch Node
**What it does**: Routes to different branches based on category

**Logic**:
```
IF category = "hot" → Go to Hot Lead branch
IF category = "warm" → Go to Warm Lead branch  
IF category = "cold" → Go to Cold Lead branch
```

---

### 3. Gmail Nodes (3 different ones)
**What they do**: Send personalized emails

**Configuration**:
- Authentication: OAuth2 (automatic in n8n)
- To: `{{$json["email"]}}`
- Subject: Different for each category
- Body: HTML template with variables

**Variables you can use**:
- `{{$json["name"]}}` - Lead's name
- `{{$json["email"]}}` - Lead's email
- `{{$json["company"]}}` - Company name
- `{{$json["score"]}}` - Lead score (0-100)
- `{{$json["category"]}}` - hot/warm/cold
- `{{$json["budget"]}}` - Budget amount
- `{{$json["timeline"]}}` - Timeline
- `{{$json["painPointsText"]}}` - Pain points
- `{{$json["automationNeedsText"]}}` - Automation needs

---

### 4. Google Calendar Node (Hot leads only)
**What it does**: Creates calendar event for tomorrow

**Configuration**:
- Calendar: Primary
- Start: Tomorrow at current time
- End: Tomorrow + 1 hour
- Summary: "Strategy Call - [Company Name]"
- Description: Includes all lead details
- Attendees: Lead's email
- Send Updates: Yes

---

### 5. Respond to Webhook Node
**What it does**: Sends success response back to Next.js

**Response**:
```json
{
  "success": true,
  "message": "Lead processed successfully",
  "category": "hot"
}
```

---

## 🛠️ How to Modify the Workflow

### Change Email Content:
1. Open workflow in n8n
2. Click on the email node you want to edit
3. Scroll to "Message" field
4. Edit the HTML directly
5. Click "Execute Node" to test
6. Save workflow

### Add a New Email Field:
1. The data is already sent from the form
2. Just use it in your email: `{{$json["fieldName"]}}`
3. Example: `{{$json["phone"]}}` for phone number

### Change Calendar Event Time:
1. Click on "Create Calendar Event" node
2. Find "Start" field
3. Current: `={{$now.plus({days: 1}).toISO()}}`
4. Change to 2 days: `={{$now.plus({days: 2}).toISO()}}`
5. Change to 3 hours: `={{$now.plus({hours: 3}).toISO()}}`

### Add Slack Notification:
1. Click "+" after any email node
2. Search for "Slack"
3. Add "Slack" node
4. Configure Slack credentials
5. Set channel and message
6. Connect nodes
7. Save

---

## 🧪 Testing Your Workflow

### Test Mode (Before going live):
1. Click "Execute Workflow" button (top right)
2. Manually input test data in the webhook node
3. Watch each node execute step-by-step
4. Check if email was sent
5. Check if calendar event was created

### Production Test:
1. Submit a real form on your website
2. Go to n8n → "Executions" tab
3. See the latest execution
4. Click on it to see details
5. Check each node's output
6. Verify email delivery

---

## 📊 Monitoring & Debugging

### Execution History:
- Every workflow run is logged
- See input/output of each node
- Check error messages
- View execution time

### Common Issues:

**Email not sending:**
- Check Gmail credentials
- Verify email address is valid
- Check spam folder
- Review Gmail API quotas

**Calendar event not creating:**
- Check Google Calendar credentials
- Verify calendar permissions
- Check date/time format
- Ensure attendee email is valid

**Webhook not triggering:**
- Check webhook URL in Vercel
- Ensure workflow is "Active"
- Verify Next.js is sending correct data
- Check n8n logs

---

## 🚀 Advanced Customizations

### Add Follow-up Email (3 days later):
```
Send Email Node
    ↓
Wait Node (3 days)
    ↓
Send Follow-up Email Node
```

### Add A/B Testing:
```
Switch Node (random)
    ↓
├─→ Email Template A (50%)
└─→ Email Template B (50%)
```

### Add CRM Integration:
```
Send Email Node
    ↓
HTTP Request Node
    ↓
POST to CRM API
```

### Add SMS Notification:
```
Send Email Node
    ↓
Twilio Node
    ↓
Send SMS to lead
```

---

## 💡 Best Practices

1. **Always test in test mode first**
2. **Use descriptive node names**
3. **Add notes to complex nodes**
4. **Keep email templates simple**
5. **Monitor execution history regularly**
6. **Set up error notifications**
7. **Use version control for workflows**
8. **Document your customizations**

---

## 📚 Resources

- **n8n Documentation**: https://docs.n8n.io
- **n8n Templates**: https://n8n.io/workflows
- **Gmail Node Docs**: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/
- **Calendar Node Docs**: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/
- **n8n Community**: https://community.n8n.io

---

**Happy Automating! 🎉**
