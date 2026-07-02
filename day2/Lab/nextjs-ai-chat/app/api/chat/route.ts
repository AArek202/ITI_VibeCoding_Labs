import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const hfProvider = createOpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model } = body;

    // 1. Convert standard UI messages to core model messages
    const rawModelMessages = await convertToModelMessages(
      messages as UIMessage[],
    );

    // 2. Sanitize and flatten messages for strict open-source/HF endpoint requirements
    const sanitizedMessages = rawModelMessages.map((msg) => {
      // If content is an array, flatten it to a string for assistant/user text roles
      if (Array.isArray(msg.content)) {
        const textContent = msg.content
          .filter((part) => part.type === "text")
          .map((part) => (part as { text: string }).text)
          .join("");

        return {
          role: msg.role,
          content: textContent,
        };
      }
      return msg;
    });

    // 3. Pass the perfectly formatted history to the model
    const result = streamText({
      model: hfProvider(model || "Qwen/Qwen2.5-7B-Instruct"),
      messages: sanitizedMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat Router Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate stream" }),
      {
        status: 500,
      },
    );
  }
}
