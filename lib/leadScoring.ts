export interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  painPoints: string[];
  painPointsText: string;
  automationNeeds: string[];
  automationNeedsText: string;
  currentHassles: string;
  currentTools: string;
  budget: number;
  timeline: string;
  spendingCapacity: number;
}

export interface ScoredLead extends LeadData {
  score: number;
  category: 'hot' | 'warm' | 'cold';
  createdAt: Date;
}

export function calculateLeadScore(lead: LeadData): { score: number; category: 'hot' | 'warm' | 'cold' } {
  let score = 0;

  // Budget scoring (max 40 points)
  if (lead.budget >= 10000) {
    score += 40;
  } else if (lead.budget >= 5000) {
    score += 30;
  } else if (lead.budget >= 2000) {
    score += 20;
  } else {
    score += 10;
  }

  // Timeline scoring (max 30 points)
  switch (lead.timeline.toLowerCase()) {
    case 'immediate':
      score += 30;
      break;
    case '1-3 months':
      score += 20;
      break;
    case '3-6 months':
      score += 10;
      break;
    case '6+ months':
      score += 5;
      break;
  }

  // Company size scoring (max 15 points)
  const size = parseInt(lead.companySize);
  if (size >= 100) {
    score += 15;
  } else if (size >= 50) {
    score += 10;
  } else if (size >= 10) {
    score += 5;
  } else {
    score += 2;
  }

  // Pain points and automation needs (max 15 points)
  const totalItems = lead.painPoints.length + lead.automationNeeds.length;
  const hasDetailedText = (lead.painPointsText?.length || 0) > 50 || (lead.automationNeedsText?.length || 0) > 50;
  
  if (totalItems >= 5 && hasDetailedText) {
    score += 15;
  } else if (totalItems >= 3) {
    score += 8;
  } else {
    score += 3;
  }

  // Determine category
  let category: 'hot' | 'warm' | 'cold';
  if (score >= 70) {
    category = 'hot';
  } else if (score >= 40) {
    category = 'warm';
  } else {
    category = 'cold';
  }

  return { score, category };
}
