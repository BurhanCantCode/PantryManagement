import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export const scanProduct = async (imageData: string): Promise<{ name: string; quantity: number }> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "Identify the product in this image and suggest a default quantity. Return the result as a JSON object with 'name' and 'quantity' fields.";

    const result = await model.generateContent([prompt, { inlineData: { data: imageData, mimeType: "image/jpeg" } }]);
    const response = await result.response;
    const text = response.text();
    
    const parsedResult = JSON.parse(text);
    return { name: parsedResult.name, quantity: parsedResult.quantity };
  } catch (error) {
    console.error('Error in scanProduct:', error);
    throw error;
  }
};