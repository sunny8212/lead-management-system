import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { calculateLeadScore, LeadData, ScoredLead } from '@/lib/leadScoring';

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

    // Trigger n8n workflow via webhook
    await triggerN8nWorkflow(scoredLead);

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

async function triggerN8nWorkflow(lead: ScoredLead) {
  try {
    // Check if n8n webhook URL is configured
    if (!process.env.N8N_WEBHOOK_URL) {
      console.warn('N8N_WEBHOOK_URL not configured, skipping workflow trigger');
      return;
    }

    // Send lead data to n8n webhook
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        leadId: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        industry: lead.industry,
        companySize: lead.companySize,
        score: lead.score,
        category: lead.category,
        budget: lead.budget,
        timeline: lead.timeline,
        painPointsText: lead.painPointsText,
        automationNeedsText: lead.automationNeedsText,
        currentHassles: lead.currentHassles,
        currentTools: lead.currentTools,
        createdAt: lead.createdAt,
      }),
    });

    if (!response.ok) {
      console.error('Failed to trigger n8n workflow:', response.statusText);
    } else {
      console.log(`n8n workflow triggered for ${lead.email} (${lead.category} lead)`);
    }
  } catch (error) {
    console.error('Error triggering n8n workflow:', error);
    // Don't throw error - we don't want to fail lead submission if n8n is down
  }
}
