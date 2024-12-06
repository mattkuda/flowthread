import { NextResponse } from 'next/server'
import LlamaStackClient from 'llama-stack-client';

interface SummarizeThreadRequest {
    threadContext: string
    replyLength: string
}

export const ENDPOINT = "https://llama-stack.together.ai";
export const MODEL = "Llama3.1-8B-Instruct";
const llamaClient = new LlamaStackClient({ baseURL: ENDPOINT });

export async function POST(req: Request) {
    try {
        console.log("Summarizing thread...")
        // Parse the request body
        const {
            threadContext,
            replyLength,
        }: SummarizeThreadRequest = await req.json()

        // Validate input
        if (!threadContext) {
            return NextResponse.json({ error: 'Thread context is required' }, { status: 400 })
        }

        // Construct the prompt with additional context
        const promptInstructions = [
            `Summarize the following thread context:`,
            threadContext,
            getReplyLengthInstructions(replyLength),
        ].filter(Boolean).join('\n')

        // Generate multiple variations
        const response = await llamaClient.inference.chatCompletion({
            model: MODEL,
            messages: [{
                role: 'user',
                content: promptInstructions
            }],
        })

        console.log("Response:", response)

        const responseJson: LlamaStackClient.InferenceChatCompletionResponse.ChatCompletionResponse =
            JSON.parse((response as unknown as string).slice(6));

        // Return the generated variations
        return NextResponse.json({
            summary: responseJson.completion_message.content
        })
    } catch (error) {
        console.error('Reply generation error:', error)
        return NextResponse.json({
            error: 'Failed to generate reply',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

// Helper function to determine max tokens based on reply length
function getReplyLengthInstructions(length: string): string {
    switch (length) {
        case 'short': return 'Keep the reply short and concise. 1-2 sentences.'
        case 'medium': return 'Provide a detailed and comprehensive reply. 3-5 sentences.'
        case 'long': return 'Expand on the thread context with a detailed and comprehensive reply. 5-10 sentences.'
        default: return ''
    }
}

// Optional: Add GET handler for API documentation or testing
export async function GET() {
    return NextResponse.json({
        message: 'FlowThread Reply Generation API',
        supportedParams: [
            'threadContext (required)',
            'instructions (optional)',
            'tone',
            'replyLength',
            'variations',
            'useEmojis'
        ]
    })
}