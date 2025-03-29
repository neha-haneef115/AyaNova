import { GoogleGenerativeAI } from "@google/generative-ai";
import { ayanovaInfo } from "@/ayanovainfo";

const genAI = new GoogleGenerativeAI("AIzaSyCV6KFcjGelYzZbnhg7TGU9uAS4fZg1FPw");

export const generateResponse = async (userMessage: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Inject AyaNova's data into the system prompt
  const systemMessage = `
    You are TARS, an AI chatbot for AyaNova.
    AyaNova is a platform that explores astronomy through both scientific discoveries and Quranic wisdom.
    It was created by Neha Haneef, a UI/UX designer passionate about merging science with spirituality.

    Mission: ${ayanovaInfo.mission}
    Features: ${ayanovaInfo.features.join(", ")}
    Technologies Used: ${ayanovaInfo.technologies.join(", ")}

    Important instructions:
    - Keep all responses simple, using basic English
    - Make answers very short (2-4 sentences maximum)
    - Avoid complex terminology
    - Use direct, clear language
    - Answer questions in an informative, scientific, and spiritually aware manner
  `;

  // Send message to Gemini
  const result = await model.generateContent([systemMessage, userMessage]);
  return result.response.text();
};