import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function fetchRelevantImage(query: string) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      console.log('Unsplash API key not configured');
      return null;
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1&order_by=relevant`,
      {
        headers: {
          'Authorization': `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Unsplash API error:', response.status);
      return null;
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const image = data.results[0];
      return {
        url: image.urls.regular,
        alt: image.alt_description || query,
        downloadUrl: image.urls.full
      };
    }
  } catch (error) {
    console.error('Image fetch failed:', error);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const topic = formData.get('topic') as string;
    const subject = formData.get('subject') as string;
    const wordCount = formData.get('wordCount') as string;
    const level = formData.get('level') as string;
    const requirements = formData.get('requirements') as string;
    const includeImages = formData.get('includeImages') === 'true';
    const imageQuery = formData.get('imageQuery') as string;

    if (!topic || !subject) {
      return NextResponse.json({ error: 'Topic and subject are required' }, { status: 400 });
    }

    // Extract text from uploaded files
    let fileContent = '';
    const files = Array.from(formData.entries()).filter(([key]) => key.startsWith('file_'));
    
    for (const [, file] of files) {
      if (file instanceof File) {
        const text = await file.text();
        fileContent += `\n--- Content from ${file.name} ---\n${text}\n\n`;
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Generate a comprehensive academic assignment on "${topic}" for ${subject} at ${level || 'undergraduate'} level. 
    Target word count: ${wordCount || 1000} words.
    ${requirements ? `Additional requirements: ${requirements}` : ''}
    ${fileContent ? `\nReference materials:\n${fileContent}` : ''}

    Structure the assignment with:
    1. Title
    2. Introduction
    3. Main content with proper headings
    4. Conclusion
    5. References (if applicable)
    
    Format the response as structured HTML with proper headings, paragraphs, and formatting.`;

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    // Fetch image if requested
    let finalContent = content;
    if (includeImages && imageQuery) {
      const imageData = await fetchRelevantImage(imageQuery);
      if (imageData) {
        finalContent = `<div style="text-align: center; margin: 20px 0;">
          <img src="${imageData.url}" alt="${imageData.alt}" style="max-width: 100%; height: auto; border-radius: 8px;" />
        </div>\n${content}`;
      }
    }

    return NextResponse.json({ content: finalContent });
  } catch (error: unknown) {
    console.error('Assignment generation failed:', error);
    const errorObj = error as Error;
    const errorMessage = errorObj.message?.includes('limit') || errorObj.message?.includes('quota')
      ? 'Your limit for today has exceeded. Please try again tomorrow.'
      : errorObj.message || 'Assignment generation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}