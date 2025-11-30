import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { calculateLeadScore, LeadData, ScoredLead } from '@/lib/leadScoring';
import { getEmailTemplate } from '@/lib/emailTemplates';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const leadData: LeadData = req.body;

    // Calculate score and category
    const { score, category } = calculateLeadScore(leadData);

    // Create scored lead object
    const scoredLead: ScoredLead = {
      ...leadData,
      score,
      category,
      createdAt: new Date(),
    };

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('leadManagement');
    const result = await db.collection('leads').insertOne(scoredLead);

    // Send email based on category
    await sendWelcomeEmail(scoredLead);

    // For hot leads, create calendar event immediately
    if (category === 'hot') {
      await createCalendarEvent(scoredLead);
    }

    res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: result.insertedId,
      score,
      category,
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ message: 'Error submitting lead', error: String(error) });
  }
}

async function sendWelcomeEmail(lead: ScoredLead) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token || '',
      },
    });

    const template = getEmailTemplate(lead.category, lead.name, lead.company);

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: lead.email,
      subject: template.subject,
      html: template.html.replace('[CALENDAR_LINK]', `${process.env.NEXT_PUBLIC_BASE_URL}/book-meeting?email=${lead.email}`),
    });

    console.log(`Welcome email sent to ${lead.email} (${lead.category} lead)`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function createCalendarEvent(lead: ScoredLead) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Create a placeholder event for hot leads
    const event = {
      summary: `Strategy Call - ${lead.company}`,
      description: `Initial consultation with ${lead.name} from ${lead.company}\n\nLead Score: ${lead.score}\nBudget: $${lead.budget}\nTimeline: ${lead.timeline}\n\nPain Points: ${lead.painPointsText}\nAutomation Needs: ${lead.automationNeedsText}`,
      start: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
        timeZone: 'UTC',
      },
      attendees: [{ email: lead.email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
      sendUpdates: 'all',
    });

    console.log(`Calendar event created for ${lead.email}`);
  } catch (error) {
    console.error('Error creating calendar event:', error);
  }
}
