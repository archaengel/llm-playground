import { env } from "../../lib/env";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const response = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
  });

  return response.toAIStreamResponse();
}
