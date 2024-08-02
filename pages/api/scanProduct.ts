import type { NextApiRequest, NextApiResponse } from 'next'
import { scanProduct } from '../../utils/visionUtils';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      let credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      if (credentialsPath) {
        credentialsPath = path.resolve(process.cwd(), credentialsPath);
      }

      const { imageData } = req.body;
      console.log('Received image data length:', imageData.length);
      console.log('Using credentials file:', credentialsPath);
      const result = await scanProduct(imageData);
      console.log('Scan result:', result);
      res.status(200).json({
        ...result,
        allLabels: result.allLabels || []
      });
    } catch (error) {
      console.error('Error in scanProduct API:', error);
      res.status(500).json({ error: 'Failed to scan product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}