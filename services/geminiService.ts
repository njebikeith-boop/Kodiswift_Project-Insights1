
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiSummary } from "../types.ts";

export const getPostSummary = async (content: string): Promise<GeminiSummary> => {
  // Use direct process.env.API_KEY for initialization as per Google GenAI SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following blog content and provide 3 key takeaways. Content: ${content}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: 'A concise summary of the content.',
          },
          keyTakeaways: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: 'Three bullet points of key insights.',
          },
        },
        required: ["summary", "keyTakeaways"],
      },
    },
  });

  try {
    return JSON.parse(response.text || '{}') as GeminiSummary;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      summary: "Could not generate summary at this time.",
      keyTakeaways: ["Error processing content."]
    };
  }
};
