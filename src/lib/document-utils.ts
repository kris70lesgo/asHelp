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
    const pdf = new jsPDF();
    
    // Parse HTML and extract structured content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.height;
    const lineHeight = 6;
    const margin = 15;
    
<<<<<<< HEAD
    // Process each element including images
    const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, li, img');
    
    for (const element of elements) {
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        const downloadUrl = img.getAttribute('data-download-url') || img.src;
        
        try {
          const base64 = await getImageAsBase64(downloadUrl);
          if (base64) {
            // Check if we need a new page for the image
            if (yPosition + 60 > pageHeight - 20) {
              pdf.addPage();
              yPosition = 20;
            }
            
            // Add image (scaled to fit)
            const imgWidth = 160;
            const imgHeight = 90;
            pdf.addImage(base64, 'JPEG', margin, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + 10;
          }
        } catch (error) {
          console.error('Failed to add image to PDF:', error);
        }
        continue;
      }
      
      const text = element.textContent?.trim();
      if (!text) continue;
      
      // Set font size based on element type with proper heading hierarchy
      const headingLevel = element.tagName.match(/^H([1-6])$/)?.[1];
      if (headingLevel) {
        const fontSize = Math.max(20 - parseInt(headingLevel) * 2, 12);
        pdf.setFontSize(fontSize);
=======
    // Process each paragraph and heading
    const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, li');
    
    elements.forEach((element) => {
      const text = element.textContent?.trim();
      if (!text) return;
      
      // Set font size based on element type
      if (element.tagName.match(/^H[1-6]$/)) {
        pdf.setFontSize(16);
>>>>>>> 744373a (ai powered assignment generator added)
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
<<<<<<< HEAD
      if (headingLevel && yPosition > 20) {
=======
      if (element.tagName.match(/^H[1-6]$/) && yPosition > 20) {
>>>>>>> 744373a (ai powered assignment generator added)
        yPosition += 5;
      }
      
      lines.forEach((line: string) => {
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      // Add spacing after paragraphs
      yPosition += 3;
<<<<<<< HEAD
    }
=======
    });
>>>>>>> 744373a (ai powered assignment generator added)
    
    pdf.save(`${filename}.pdf`);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
};

<<<<<<< HEAD
export const exportToWord = async (content: string, filename: string = 'assignment') => {
=======
export const exportToWord = (content: string, filename: string = 'assignment') => {
>>>>>>> 744373a (ai powered assignment generator added)
  try {
    // Parse HTML and create structured RTF
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}{\\f1 Arial;}} ';
    
<<<<<<< HEAD
    // Process each element including images
    const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, li, img');
    
    for (const element of elements) {
      if (element.tagName === 'IMG') {
        const img = element as HTMLImageElement;
        // Add placeholder text for images in RTF (RTF image embedding is complex)
        rtfContent += `\\f0\\fs20\\i [Image: ${img.alt || 'Diagram'}]\\i0\\par\\par `;
        continue;
      }
      
      const text = element.textContent?.trim();
      if (!text) continue;
=======
    // Process each element
    const elements = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, li');
    
    elements.forEach((element) => {
      const text = element.textContent?.trim();
      if (!text) return;
>>>>>>> 744373a (ai powered assignment generator added)
      
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
      
<<<<<<< HEAD
      // Format based on element type with proper heading hierarchy
      const headingLevel = element.tagName.match(/^H([1-6])$/)?.[1];
      if (headingLevel) {
        const fontSize = Math.max(32 - parseInt(headingLevel) * 4, 20);
        rtfContent += `\\f1\\fs${fontSize}\\b ${cleanText}\\b0\\fs24\\par\\par `;
=======
      // Format based on element type
      if (element.tagName.match(/^H[1-6]$/)) {
        // Heading: bold, larger font
        rtfContent += `\\f1\\fs28\\b ${cleanText}\\b0\\fs24\\par\\par `;
>>>>>>> 744373a (ai powered assignment generator added)
      } else {
        // Paragraph: normal text
        rtfContent += `\\f0\\fs24 ${cleanText}\\par\\par `;
      }
<<<<<<< HEAD
    }
=======
    });
>>>>>>> 744373a (ai powered assignment generator added)
    
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