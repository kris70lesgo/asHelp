import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message, currentContent, topic, subject } = await req.json();

    if (!message || !currentContent) {
      return NextResponse.json({ error: 'Message and current content are required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Determine if the user wants to modify the content or just ask a question
    const modificationKeywords = [
      'change', 'modify', 'edit', 'update', 'rewrite', 'make', 'add', 'remove', 'delete',
      'shorter', 'longer', 'expand', 'reduce', 'improve', 'fix', 'correct', 'adjust',
      'include', 'exclude', 'replace', 'substitute', 'revise', 'enhance', 'simplify'
    ];

    const isModificationRequest = modificationKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    let prompt: string;
    let shouldUpdateContent = false;

    if (isModificationRequest) {
      prompt = `You are helping to modify an academic assignment. Here is the current assignment content:

${currentContent}

The user wants to make this change: "${message}"

Please provide the modified version of the entire assignment incorporating the requested changes. Keep the same HTML structure and formatting. Make sure the content remains academically appropriate for the topic "${topic}" in ${subject}.

Return the complete modified assignment content.`;
      shouldUpdateContent = true;
    } else {
      prompt = `You are an AI assistant helping with an academic assignment about "${topic}" in ${subject}. 

Current assignment content:
${currentContent}

User question: "${message}"

Please provide a helpful response about the assignment. If the user is asking for clarification, suggestions, or general questions about the content, respond conversationally. Do not modify the assignment unless explicitly asked to do so.`;
    }

    const result = await model.generateContent(prompt);
    
    if (!result.response) {
      throw new Error('Failed to generate response');
    }

    const response = result.response.text();

    if (shouldUpdateContent) {
      // Clean the response for content updates
      const cleanContent = response
        .replace(/```html/gi, '')
        .replace(/```/gi, '')
        .replace(/^Here is the modified assignment:?\s*/i, '')
        .replace(/^The modified assignment:?\s*/i, '')
        .trim();

      return NextResponse.json({ 
        response: 'I\'ve updated your assignment based on your request. You can see the changes in the content panel.',
        updatedContent: cleanContent
      });
    } else {
      return NextResponse.json({ 
        response: response
      });
    }

  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to process chat request' 
    }, { status: 500 });
  }
}