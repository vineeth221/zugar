const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function askAI({ userMessage, history, projects }) {
  const conversationContext = history
    .slice(-6)
    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n\n");

  const prompt = `
You are ARKHA, an AI Home Decision Engine.

You are not a generic chatbot.

Important behavior:
- Understand follow-up questions using conversation history.
- If user asks simple factual follow-up like builder name, price, location, possession, answer directly.
- Do not repeat full recommendation unless user asks for recommendation.
- Use ONLY supplied project data.
- Never invent details.
- Return clean Markdown only.

Conversation history:
${conversationContext}

Current user message:
${userMessage}

Available project data:
${JSON.stringify(projects, null, 2)}

Rules:
1. If current user asks "builder name", answer only builder name from the last relevant project.
2. If user asks price, answer only price range.
3. If user asks location, answer only location.
4. If user asks for recommendation, give structured recommendation.
5. If project data is missing, ask max 2 follow-up questions.
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return result.text;
}

module.exports = {
  askAI,
};