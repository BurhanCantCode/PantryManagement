import vision from '@google-cloud/vision';
import path from 'path';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS 
    ? path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : undefined,
});

export const scanProduct = async (imageData: string): Promise<{ name: string; quantity: number; allLabels: string[] }> => {
  try {
    const base64Image = imageData.replace(/^data:image\/\w+;base64,/, '');
    
    console.log('Sending image to Vision API, length:', base64Image.length);
    
    const [result] = await client.labelDetection({
      image: { content: Buffer.from(base64Image, 'base64') },
    });

    console.log('Vision API response:', JSON.stringify(result, null, 2));

    const labels = result.labelAnnotations || [];
    
    // Filter out generic labels
    const specificLabels = labels.filter(label => 
      !['Food', 'Produce', 'Natural foods', 'Fruit', 'Vegetable'].includes(label.description)
    );

    if (specificLabels.length > 0) {
      // Use the most confident specific label
      const productName = specificLabels[0].description;
      
      // Log all labels for debugging
      console.log('All labels:', labels.map(l => `${l.description} (${l.score})`).join(', '));
      
      return { name: productName, quantity: 1, allLabels: labels.map(label => label.description || '').filter(Boolean) };
    } else if (labels.length > 0) {
      // If no specific labels, use the most confident general label
      const productName = labels[0].description;
      return { name: productName, quantity: 1, allLabels: labels.map(label => label.description || '').filter(Boolean) };
    } else {
      throw new Error('No labels detected in the image');
    }
  } catch (error) {
    console.error('Error in scanProduct:', error);
    throw new Error(`Failed to scan product: ${error.message}`);
  }
};