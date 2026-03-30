import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client with the API key from environment variables
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const hasValidGeminiKey = () => apiKey && apiKey !== 'YOUR_API_KEY_HERE';

export async function generatePostContent(
  dest: string,
  highlights: string,
  tone: string
): Promise<string> {
  if (!hasValidGeminiKey()) {
    throw new Error('API_KEY_MISSING');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Write a creative social media post about traveling to ${dest}.
Highlights of the trip: ${highlights || 'Exploring the local culture and sightseeing'}.
Tone of the post should be strictly: ${tone}.
Include a few relevant emojis and 3-4 hashtags. Do not wrap the response in quotes.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini post error:', error);
    throw new Error('Failed to generate post. Check console for details.');
  }
}

export async function generateItineraryData(
  dest: string,
  days: number,
  budget: string,
  group: string,
  interests: string[]
): Promise<any[]> {
  if (!hasValidGeminiKey()) {
    throw new Error('API_KEY_MISSING');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  // Ask for JSON response explicitly
  const prompt = `Create a realistic ${days}-day travel itinerary for ${dest}.
Target audience: ${group}.
Budget level: ${budget}.
Main interests: ${interests.join(', ')}.

Respond ONLY with a valid JSON array of objects, where each object represents one day and has the following exact structure:
[
  {
    "day": 1,
    "activities": [
      {
        "time": "09:00 AM",
        "activity": "Name of specific place or activity",
        "desc": "Short engaging description of what to do there."
      }
    ]
  }
]
Ensure the JSON is strictly valid array notation without markdown blocks around it if possible, but handle it as JSON. Make sure to provide 2-3 activities per day.`;

  try {
    const result = await model.generateContent(prompt);
    let textResult = result.response.text();
    // Clean up potential markdown blocks if present
    textResult = textResult.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    
    return JSON.parse(textResult);
  } catch (error: any) {
    console.error('Gemini itinerary parse error:', error);
    throw new Error('Failed to parse itinerary JSON from AI. Try again.');
  }
}

export async function generateChatResponse(
  prompt: string,
  historyRaw: { isUser: boolean; text: string }[]
): Promise<string> {
  if (!hasValidGeminiKey()) {
    throw new Error('API_KEY_MISSING');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const history: any[] = [
    {
      role: 'user',
      parts: [{ text: "You are Tavi, a friendly AI travel assistant. Keep responses helpful, concise, and use emojis. Do not break character. Do NOT use markdown formatting. Do NOT use asterisks (*) for bolding or lists. Use plain text and standard bullet points (•) if needed." }],
    },
    {
      role: 'model',
      parts: [{ text: "Hi! I'm Tavi, your AI travel assistant! 🌏 How can I help you plan your perfect trip today?" }],
    }
  ];

  historyRaw.slice(1).forEach(msg => {
    history.push({
      role: msg.isUser ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });

  const chat = model.startChat({ history });

  try {
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return "I'm having a little trouble connecting right now. Let's try again in a moment!";
  }
}

export async function generateBookingItems(category: string, destination: string): Promise<any[]> {
  if (!hasValidGeminiKey()) {
    throw new Error('API_KEY_MISSING');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Find 5 VERY REAL, popular ${category} options in or near ${destination}. 
Respond ONLY with a valid JSON array of objects, no markdown blocks.
Each object must have this exact structure:
[
  {
    "id": "unique-uuid",
    "name": "Actual Real Name of ${category}",
    "price": 150,
    "rating": 4.5,
    "reviews": 1200,
    "location": "${destination}",
    "tag": "Short 2-word highlight"
  }
]
For airlines, make it sound like a real flight route. Provide exact real names.`;

  try {
    const result = await model.generateContent(prompt);
    let textResult = result.response.text();
    textResult = textResult.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    return JSON.parse(textResult);
  } catch (error: any) {
    console.error('Gemini booking parse error:', error);
    throw new Error(`Failed to load real ${category}s for ${destination}.`);
  }
}
