import vision from '@google-cloud/vision';

let client: any;

try {
  const credentials = {
    client_email: process.env.EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
  client = new vision.ImageAnnotatorClient({ credentials });
} catch (error) {
  console.error('Error parsing Google Cloud credentials:', error);
  // Initialize with default credentials as a fallback
  client = new vision.ImageAnnotatorClient();
}

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
      label.description && !['Food', 'Produce', 'Natural foods', 'Fruit', 'Vegetable'].includes(label.description)
    );

    if (specificLabels.length > 0) {
      // Use the most confident specific label
      const productName = specificLabels[0].description || 'Unknown Product';
      
      // Log all labels for debugging
      console.log('All labels:', labels.map(l => `${l.description} (${l.score})`).join(', '));
      
      return { 
        name: productName, 
        quantity: 1, 
        allLabels: labels.map(label => label.description || '').filter(Boolean) 
      };
    } else if (labels.length > 0) {
      // If no specific labels, use the most confident general label
      const productName = labels[0].description || 'Unknown Product';
      return { 
        name: productName, 
        quantity: 1, 
        allLabels: labels.map(label => label.description || '').filter(Boolean) 
      };
    } else {
      throw new Error('No labels detected in the image');
    }
  } catch (error: unknown) {
    console.error('Error in scanProduct:', error);
    throw new Error(`Failed to scan product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};