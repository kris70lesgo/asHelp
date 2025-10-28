import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

// Helper function to convert image URL to base64
const getImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to base64:', error);
    return null;
  }
};

export const exportToPDF = async (content: string, filename: string = 'assignment') => {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.error('PDF export only works in browser environment');
      return false;
    }
    
    const pdf = new jsPDF();
    
    // Parse HTML and extract structured content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const lineHeight = 6;
    const margin = 15;
    
    // Process each element including images
    const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, li, img');
    
    for (const element of Array.from(elements)) {
      const text = element.textContent?.trim() || '';
      if (!text && element.tagName !== 'IMG') continue;
      
      // Handle images
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        const imgUrl = img.src;
        
        if (imgUrl && (imgUrl.startsWith('http') || imgUrl.startsWith('data:'))) {
          const base64 = await getImageAsBase64(imgUrl);
          if (base64 && yPosition < pageHeight - 60) {
            try {
              pdf.addImage(base64, 'PNG', margin, yPosition, 150, 100);
              yPosition += 110;
            } catch (error) {
              console.error('Failed to add image to PDF:', error);
            }
          }
        }
        continue;
      }
      
      // Get heading level
      const headingMatch = element.tagName.match(/^H([1-6])$/);
      const headingLevel = headingMatch ? parseInt(headingMatch[1]) : null;
      
      // Set font size based on element type
      if (headingLevel) {
        const fontSize = Math.max(20 - parseInt(headingLevel.toString()) * 2, 12);
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
      }
      
      const lines = pdf.splitTextToSize(text, 180);
      
      // Check if we need a new page
      if (yPosition + (lines.length * lineHeight) > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      
      // Add spacing before headings
      if (headingLevel && yPosition > 20) {
        yPosition += 5;
      }
      
      lines.forEach((line: string) => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      // Add spacing after paragraphs
      yPosition += 3;
    }
    
    pdf.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
};

export const exportToWord = async (content: string, filename: string = 'assignment') => {
  try {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.error('Word export only works in browser environment');
      return false;
    }
    
    // Parse HTML and create structured RTF
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}{\\f1 Arial;}} ';
    
    const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, li');
    
    elements.forEach((element) => {
      const text = element.textContent?.trim() || '';
      if (!text) return;
      
      // Clean text
      const cleanText = text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\\/g, '\\\\')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}');
      
      // Check if it's a heading
      if (element.tagName.match(/^H[1-6]$/)) {
        const level = element.tagName.charAt(1);
        const fontSize = 24 - parseInt(level) * 2;
        rtfContent += `\\f0\\fs${fontSize} ${cleanText}\\par\\par `;
      } else {
        // Paragraph: normal text
        rtfContent += `\\f0\\fs24 ${cleanText}\\par\\par `;
      }
    });
    
    rtfContent += '}';
    
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    saveAs(blob, `${filename}.rtf`);
    return true;
  } catch (error) {
    console.error('Word export failed:', error);
    return false;
  }
};

export const formatContentForDisplay = (content: string): string => {
  // Basic HTML formatting for better display
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
};