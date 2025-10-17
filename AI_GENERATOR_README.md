# AI Assignment Generator Feature

## Overview
The AI Assignment Generator allows users to create complete academic assignments using AI, with export capabilities to PDF and Word formats. This feature streamlines assignment creation while maintaining high-quality, structured content.

## Features
- **AI-Powered Content Generation**: Uses Gemini AI to generate comprehensive assignments
- **Multiple Export Formats**: Export to PDF and Word documents
- **Customizable Parameters**: Topic, subject, word count, academic level, and requirements
- **Usage Tracking**: Monitor API usage limits and daily quotas
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## API Integration
- **Gemini AI API**: For generating high-quality assignment content
- **Client-side Export**: PDF generation using jsPDF, Word export using file-saver

## Usage
1. Navigate to `/ai-generator`
2. Fill in assignment details:
   - Topic (required)
   - Subject (required)
   - Academic level (high school to PhD)
   - Word count (500-3000 words)
   - Additional requirements (optional)
3. Click "Generate Assignment"
4. Preview the generated content
5. Export to PDF or Word format

## File Structure
```
src/
├── app/
│   ├── ai-generator/
│   │   └── page.tsx              # Main generator interface
│   └── api/
│       ├── generate-assignment/
│       │   └── route.ts          # AI generation endpoint
│       └── export-document/
│           └── route.ts          # Document export endpoint
├── components/
│   ├── usage-tracker.tsx         # Usage monitoring component
│   └── ui/                       # UI components
├── lib/
│   └── document-utils.ts         # Export utility functions
└── types/
    └── assignment.ts             # TypeScript definitions
```

## Environment Variables
Add these to your `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key
```

## Dependencies Added
- `@google/generative-ai`: Gemini AI integration
- `jspdf`: PDF generation
- `file-saver`: File download functionality
- `@radix-ui/react-select`: Dropdown components
- `@radix-ui/react-progress`: Progress bars

## Usage Limits
- **Free Tier Limits**: 100 AI generations and 50 exports per day
- **Usage Tracking**: Real-time monitoring with visual indicators
- **Limit Warnings**: Alerts when approaching usage limits

## Future Enhancements
- Image integration using Piktochart API
- Advanced formatting with TinyWow API
- DocuGenerate API for enhanced document creation
- User authentication integration
- Assignment history and templates