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
        try {
          const text = await file.text();
          fileContent += `\n\nReference from ${file.name}:\n${text}\n`;
        } catch (error) {
          console.error(`Failed to read file ${file.name}:`, error);
        }
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Generate a comprehensive academic assignment on "${topic}" for ${subject} at ${level || 'undergraduate'} level. 
    Target word count: ${wordCount || 1000} words.
    ${requirements ? `Additional requirements: ${requirements}` : ''}
    ${fileContent ? `\n\nReference materials provided:\n${fileContent}\n\nPlease incorporate relevant information from these reference materials into the assignment.` : ''}
    
    Structure the assignment with:
    1. Title
    2. Introduction
    3. Main content with proper headings
    4. Conclusion
    5. References (if applicable)
    
    ${includeImages ? `Also suggest 1 relevant image search term that would enhance this assignment. Use the main topic "${topic}" as the search term unless a more specific term would be better. Add this term as a JSON array in an HTML comment at the very end: <!-- ["term1"] -->` : ''}
    
    Format the response as structured HTML with proper headings, paragraphs, and formatting.`;

    const result = await model.generateContent(prompt);
    
    if (!result.response) {
      throw new Error('Your limit for today has exceeded. Please try again tomorrow.');
    }
    
    let content = result.response.text();
    
    // Extract image suggestions and fetch images
    if (includeImages) {
      const imageTermsMatch = content.match(/<!--\s*\[([^\]]+)\]\s*-->/s);
      if (imageTermsMatch) {
        try {
          const imageTerms = JSON.parse(`[${imageTermsMatch[1]}]`);
          const images = [];
          
          // Use user's image query, or topic as fallback
          const searchTerm = imageQuery || topic;
          const image = await fetchRelevantImage(searchTerm);
          if (image) {
            // Find the first heading after introduction to inject image
            const headingMatch = content.match(/(<h[2-6][^>]*>)/i);
            if (headingMatch) {
              const imageHtml = `
<div class="image-container" style="margin: 20px 0; text-align: center;">
  <img src="${image.url}" alt="${image.alt}" style="max-width: 100%; height: auto; border-radius: 8px;" data-download-url="${image.downloadUrl}" />
</div>
`;
              // Insert image before the first main heading, preserving the original heading tag
              content = content.replace(headingMatch[1], imageHtml + headingMatch[1]);
            }
          }
          
          // Remove the image suggestions comment
          content = content.replace(/<!--\s*\[.*?\]\s*-->/s, '');
        } catch (e) {
          console.error('Failed to process image suggestions:', e);
        }
      }
    }

    return NextResponse.json({ content, topic, subject });
  } catch (error: any) {
    const errorMessage = error.message?.includes('limit') || error.message?.includes('quota') || error.message?.includes('exceeded')
      ? 'Your limit for today has exceeded. Please try again tomorrow.'
      : error.message || 'Assignment generation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}