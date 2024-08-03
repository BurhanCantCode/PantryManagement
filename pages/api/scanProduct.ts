import type { NextApiRequest, NextApiResponse } from 'next'
import { scanProduct } from '../../utils/visionUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { imageData } = req.body;
      console.log('Received image data length:', imageData.length);
      const result = await scanProduct(imageData);
      console.log('Scan result:', result);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in scanProduct API:', error);
      res.status(500).json({ error: 'Failed to scan product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}