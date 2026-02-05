import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are tynye, an intelligent AI reading bookmark and companion. 
Your goal is to help users understand paper books they are reading.
Users will provide a "Scanned Text" (simulating the device scanning a book) and sometimes a question.
If no question is provided, briefly summarize the text and offer an interesting insight or connection to broader knowledge.
If a question is provided, answer it based on the scanned text and your general knowledge.
Keep your tone intellectual, encouraging, and concise (like a smart study buddy).
`;

export const sendMessageToGemini = async (
  contextText: string,
  userQuestion: string | null
): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview';
    
    let prompt = `Scanned Text: "${contextText}"\n\n`;
    if (userQuestion) {
      prompt += `User Question: ${userQuestion}`;
    } else {
      prompt += `Please analyze this text, summarize it, and provide a key insight.`;
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};