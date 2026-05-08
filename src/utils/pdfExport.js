import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { A4_WIDTH_MM, A4_HEIGHT_MM } from './constants';

/**
 * Capture the A4 canvas area and export as PDF.
 * Uses html2canvas for raster capture, then jsPDF for PDF creation.
 */
export async function exportCanvasToPDF(canvasElement, filename = 'dicatatin-export') {
  if (!canvasElement) {
    throw new Error('Canvas element not found');
  }

  // Capture the canvas area as a high-res image
  const canvas = await html2canvas(canvasElement, {
    scale: 2, // 2x for quality
    useCORS: true,
    backgroundColor: '#FFFFFF',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Fit image to A4
  pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

  // Generate filename with date
  const date = new Date().toISOString().slice(0, 10);
  const safeName = filename.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '_');
  pdf.save(`${safeName}_${date}.pdf`);

  return true;
}
