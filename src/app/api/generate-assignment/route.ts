import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function fetchRelevantImage(query: string) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) return null;

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1&order_by=relevant`, {
      headers: { Authorization: `Client-ID ${accessKey}` },
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const image = data.results[0];
      return { url: image.urls.regular, alt: image.alt_description || query, downloadUrl: image.urls.full };
    }
  } catch (e) {
    console.error('Image fetch failed:', e);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const topic = String(formData.get('topic') || '');
    const subject = String(formData.get('subject') || '');
    const wordCount = String(formData.get('wordCount') || '1000');
    const level = String(formData.get('level') || 'undergraduate');
    const requirements = String(formData.get('requirements') || '');
    const includeImages = String(formData.get('includeImages') || '') === 'true';
    const imageQuery = String(formData.get('imageQuery') || '');

    if (!topic || !subject) return NextResponse.json({ error: 'Topic and subject are required' }, { status: 400 });

    let fileContent = '';
    const files = Array.from(formData.entries()).filter(([key]) => key.startsWith('file_'));
    for (const [, file] of files) {
      if (file instanceof File) {
        const text = await file.text();
        fileContent += `\n--- Content from ${file.name} ---\n${text}\n\n`;
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Generate a comprehensive academic assignment on "${topic}" for ${subject} at ${level} level.\nTarget word count: ${wordCount} words.\n${requirements ? `Additional requirements: ${requirements}` : ''}\n${fileContent ? `Reference materials:\n${fileContent}` : ''}\n\nStructure the assignment with: 1. Title 2. Introduction 3. Main content with proper headings 4. Conclusion 5. References (if applicable). Format the response as structured HTML with proper headings, paragraphs, and formatting.`;

    const result = await model.generateContent(prompt);
    const content = result.response?.text() || '';

    let finalContent = content;
    if (includeImages && imageQuery) {
      const imageData = await fetchRelevantImage(imageQuery);
      if (imageData) {
        finalContent = `<div style="text-align: center; margin: 20px 0;"><img src="${imageData.url}" alt="${imageData.alt}" style="max-width: 100%; height: auto; border-radius: 8px;"/></div>\n${content}`;
      }
    }

    return NextResponse.json({ content: finalContent });
  } catch (err: unknown) {
    console.error('Assignment generation failed:', err);
    const error = err as Error;
    const errorMessage = error.message?.includes('limit') || error.message?.includes('quota') || error.message?.includes('exceeded')
      ? 'Your limit for today has exceeded. Please try again tomorrow.'
      : error.message || 'Assignment generation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

