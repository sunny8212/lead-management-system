import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { password, category, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Simple password authentication
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db('leadManagement');

    // Build query
    const query: any = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    // Build sort
    const sort: any = {};
    sort[sortBy as string] = order === 'desc' ? -1 : 1;

    const leads = await db.collection('leads')
      .find(query)
      .sort(sort)
      .toArray();

    res.status(200).json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Error fetching leads', error: String(error) });
  }
}
