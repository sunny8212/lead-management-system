# Quick Start Guide - Lead Management System with n8n

## 🎯 What You'll Build

A complete lead management system where:
1. Clients fill a form on your website
2. System automatically scores leads (0-100)
3. n8n sends personalized emails based on score
4. Hot leads get calendar invites automatically
5. You manage everything from a dashboard

## ⏱️ Total Setup Time: 30 minutes

---

## Step 1: Set Up MongoDB (5 minutes)

### Create Database:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Click **"Build a Database"** → Choose **"M0 FREE"**
4. Click **"Create"**

### Create User:
1. Username: `admin`
2. Click **"Autogenerate Secure Password"** → **SAVE THIS PASSWORD**
3. Click **"Create User"**

### Allow Access:
1. Click **"Add My Current IP Address"**
2. Also add: `0.0.0.0/0` (for Vercel)
3. Click **"Finish and Close"**

### Get Connection String:
1. Click **"Connect"** → **"Connect your application"**
2. Copy the connection string
3. Replace `<password>` with your saved password
4. **SAVE THIS STRING**

✅ MongoDB Done!

---

## Step 2: Set Up n8n (10 minutes)

### Option A: n8n Cloud (Easiest)

1. Go to https://n8n.io/cloud
2. Sign up (free tier: 5,000 executions/month)
3. Click **"New Workflow"**
4. Click **"Import from File"**
5. Upload `n8n-workflows/lead-workflow-main.json` from this repo
6. Workflow imported!

### Configure Gmail:
1. Click on any "Send Email" node
2. Click **"Create New Credential"**
3. Select **"Gmail OAuth2"**
4. Click **"Connect my account"**
5. Sign in with your Gmail
6. Click **"Allow"**
7. Done! n8n handles all OAuth automatically

### Configure Google Calendar:
1. Click on "Create Calendar Event" node
2. Click **"Create New Credential"**
3. Select **"Google Calendar OAuth2"**
4. Click **"Connect my account"**
5. Sign in with your Google account
6. Click **"Allow"**
7. Done!

### Get Webhook URL:
1. Click on the **"Webhook"** node (first node)
2. Copy the **"Production URL"**
3. **SAVE THIS URL**

### Activate Workflow:
1. Toggle the switch at top right to **"Active"**
2. Workflow is now live!

✅ n8n Done!

---

## Step 3: Deploy to Vercel (10 minutes)

### Connect GitHub:
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Import `sunny8212/lead-management-system`

### Add Environment Variables:
Click **"Environment Variables"** and add:

```
MONGODB_URI=your_mongodb_connection_string_from_step1
N8N_WEBHOOK_URL=your_n8n_webhook_url_from_step2
ADMIN_PASSWORD=choose_a_secure_password
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```

### Deploy:
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your site is live!

✅ Deployment Done!

---

## Step 4: Test Everything (5 minutes)

### Test the Form:
1. Visit your Vercel URL
2. Fill out the form with test data
3. Use high budget ($10,000+) and "Immediate" timeline for hot lead
4. Submit

### Check n8n:
1. Go to n8n dashboard
2. Click **"Executions"**
3. You should see a successful execution
4. Click on it to see the flow

### Check Email:
1. Check the email you entered in the form
2. You should receive a welcome email
3. If hot lead, check your calendar for the event

### Check Dashboard:
1. Visit `your-vercel-url.vercel.app/admin`
2. Enter your admin password
3. See your test lead!

✅ Everything Working!

---

## 🎨 Customize Email Templates

### In n8n (No Coding!):
1. Open your workflow
2. Click on any "Send Email" node
3. Edit the HTML directly in the editor
4. Use these variables:
   - `{{$json["name"]}}` - Lead's name
   - `{{$json["company"]}}` - Company name
   - `{{$json["score"]}}` - Lead score
   - `{{$json["budget"]}}` - Budget amount
5. Click **"Execute Node"** to test
6. Save when happy!

---

## 🚀 Go Live

### Add Your Domain:
1. In Vercel, go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow DNS instructions
4. Update `NEXT_PUBLIC_BASE_URL` environment variable

### Update n8n Webhook:
1. Update the webhook URL in Vercel environment variables
2. Redeploy

### Share Your Form:
- Share your URL with potential clients
- Embed on your website
- Add to email signature

---

## 📊 Monitor Performance

### n8n Dashboard:
- View execution history
- See success/failure rates
- Debug any issues

### Admin Dashboard:
- Track lead scores
- Filter by category
- Export data

---

## 🆘 Common Issues

### "Webhook not triggering"
- Check N8N_WEBHOOK_URL in Vercel
- Ensure workflow is "Active" in n8n
- Check n8n execution history for errors

### "Email not sending"
- Verify Gmail credentials in n8n
- Check spam folder
- Ensure Gmail API is enabled

### "Can't access admin dashboard"
- Check ADMIN_PASSWORD environment variable
- Clear browser cache
- Try incognito mode

---

## 🎓 Next Steps

### Add More Features:
1. **Slack Notifications**: Add Slack node for hot leads
2. **Follow-up Sequences**: Add Wait + Email nodes
3. **CRM Integration**: Connect to your CRM
4. **SMS Notifications**: Add Twilio node

### Optimize:
1. A/B test email templates
2. Adjust scoring weights
3. Add more form fields
4. Create custom reports

---

## 💡 Pro Tips

1. **Test with different scores**: Try budget/timeline combinations to see all email types
2. **Use n8n's test mode**: Execute nodes individually to debug
3. **Check execution history**: n8n shows you exactly what happened
4. **Start simple**: Get basic flow working, then add complexity
5. **Use templates**: n8n has 400+ pre-built integrations

---

## 📞 Need Help?

- **n8n Issues**: https://community.n8n.io
- **Vercel Issues**: https://vercel.com/support
- **MongoDB Issues**: https://www.mongodb.com/community/forums
- **This Project**: Open a GitHub issue

---

**You're all set! 🎉**

Your lead management system is now live and automatically handling leads 24/7!
