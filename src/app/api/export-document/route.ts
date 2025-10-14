import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { content, format, title } = await req.json();

    if (!content || !format) {
      return NextResponse.json({ error: 'Content and format are required' }, { status: 400 });
    }

    if (format === 'docx') {
      // Skip DocuGenerate API - use client-side fallback
      return NextResponse.json({ 
        error: 'API unavailable',
        fallback: true
      });
    }

    // PDF handled client-side
    return NextResponse.json({ 
      htmlContent: content,
      filename: `${title || 'assignment'}.pdf`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Export failed' }, { status: 500 });
  }
}