import { NextResponse } from 'next/server'
import LlamaStackClient from 'llama-stack-client';

interface GenerateReplyRequest {
    threadContext: string;
    instructions?: string;
    tone: string;
    replyLength: string;
    variations: number;
    useEmojis: boolean;
}

export const ENDPOINT = "https://llama-stack.together.ai";
export const MODEL = "Llama3.2-3B-Instruct";

const llamaClient = new LlamaStackClient({ baseURL: ENDPOINT });

export async function POST(req: Request) {
    try {
        console.log("Generating responses...");
        // Parse the request body
        const {
            threadContext,
            instructions,
            tone,
            replyLength,
            variations,
            useEmojis,
        }: GenerateReplyRequest = await req.json();

        // Validate input
        if (!threadContext) {
            return NextResponse.json(
                { error: "Thread context is required" },
                { status: 400 }
            );
        }

        // Construct the enhanced prompt
        const prompt = `
        You are an assistant generating responses for a Slack thread. 
        Follow these instructions to structure your output exactly as specified:
        1. Summarize the thread in 2-3 sentences.
        2. Provide a recommended action for the user.
        3. Generate ${variations} replies in the requested tone and style.
        
        Thread Context:
        ${threadContext}
        
        ${instructions ? `Additional Instructions: ${instructions}` : "Additional Instructions: None"}
        Tone: ${tone}
        Reply Length: ${getReplyLengthInstructions(replyLength)}
        ${useEmojis ? "Include appropriate emojis in replies." : "Do not use emojis."}
        
        Output format (strict):
        ### Summary:
        [Provide the summary]
        
        ### Recommended Action:
        [Provide the recommended action]
        
        ### Replies:
        ${Array.from({ length: variations }, (_, i) => `${i + 1}. [Reply]`).join("\n")}
        `;

        // Send a single inference request
        const response = await llamaClient.inference.chatCompletion({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        console.log("Response:", response);

        const responseJson: LlamaStackClient.InferenceChatCompletionResponse.ChatCompletionResponse =
            JSON.parse((response as unknown as string).slice(6));

        // Parse the structured response
        const result = parseResponse(responseJson.completion_message.content as string);
        console.log("Result:", result)
        return NextResponse.json(result);
    } catch (error) {
        console.error("Response generation error:", error);
        return NextResponse.json(
            {
                error: "Failed to generate response",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

// Helper function to determine max tokens based on reply length
function getReplyLengthInstructions(length: string): string {
    switch (length) {
        case "short":
            return "Keep the reply short and concise. 1-2 sentences.";
        case "medium":
            return "Provide a detailed and comprehensive reply. 3-5 sentences.";
        case "long":
            return "Expand on the thread context with a detailed and comprehensive reply. 5-10 sentences.";
        default:
            return "";
    }
}
function parseResponse(content: string): {
    summary: string;
    recommendedAction: string;
    replies: string[];
} {
    const summaryMatch = content.match(/### Summary:\n([\s\S]*?)\n### Recommended Action:/);
    const actionMatch = content.match(/### Recommended Action:\n([\s\S]*?)\n### Replies:/);
    const repliesMatch = content.match(/### Replies:\n([\s\S]*)/);

    return {
        summary: summaryMatch ? summaryMatch[1].trim() : "",
        recommendedAction: actionMatch ? actionMatch[1].trim() : "",
        replies: repliesMatch
            ? repliesMatch[1]
                .trim()
                .split("\n")
                .map((reply) => reply.replace(/^\d+\.\s*/, "").trim())
            : [],
    };
}

// Optional: Add GET handler for API documentation or testing
export async function GET() {
    return NextResponse.json({
        message: "FlowThread Reply Generation API",
        supportedParams: [
            "threadContext (required)",
            "instructions (optional)",
            "tone",
            "replyLength",
            "variations",
            "useEmojis",
        ],
    });
}
