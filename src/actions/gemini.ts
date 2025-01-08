import { GoogleGenerativeAI } from "@google/generative-ai";
import { promptData } from "./prompt";

const apiKey = "AIzaSyAg2bGH7Unh701ftOV1VDkM32S0Uc20cdM";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1000,
};

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function GetResponse(
  prompt: string,
  previousMessages: ChatMessage[] = [],
) {
  try {
    // Take only the last 2 messages from history if there are more
    const recentHistory = previousMessages.slice(-2);

    // Start a chat session
    const chat = model.startChat({
      generationConfig,
    });

    // Add previous messages to the chat
    for (const msg of recentHistory) {
      if (msg.role === "user") {
        await chat.sendMessage(msg.content);
      }
    }

    // Send the current prompt and get response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error in GetResponse:", error);
    throw error;
  }
}
