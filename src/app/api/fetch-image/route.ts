import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query, orientation = 'landscape' } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json({ error: 'Unsplash API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1&order_by=relevant`,
      {
        headers: {
          'Authorization': `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image from Unsplash');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const image = data.results[0];
      return NextResponse.json({
        url: image.urls.regular,
        alt: image.alt_description || query,
        credit: `Photo by ${image.user.name} on Unsplash`,
        downloadUrl: image.urls.full
      });
    }

    return NextResponse.json({ error: 'No images found' }, { status: 404 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || 'Image fetch failed' }, { status: 500 });
  }
}