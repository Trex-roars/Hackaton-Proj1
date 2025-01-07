import { GoogleGenerativeAI } from "@google/generative-ai";
import { promptData } from "./prompt";

const apiKey = "AIzaSyAg2bGH7Unh701ftOV1VDkM32S0Uc20cdM";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  systemInstruction: promptData,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1000,
  responseMimeType: "text/plain",
};

export async function GetResponse(Prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(Prompt);
  return result.response.text();
}
