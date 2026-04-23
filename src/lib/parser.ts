import './polyfills'; // Must be first - applies polyfills before pdfjs loads
import { Context } from 'hono';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Disable worker for legacy build
pdfjsLib.GlobalWorkerOptions.workerSrc = '';

export async function parseFile(c: Context): Promise<string> {
  const formData = await c.req.parseBody();
  const file = formData['file'];

  if (!file || !(file instanceof File)) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large (max 5MB)');
  }

  // For text files, read directly
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return await file.text();
  }

  // For PDF files, use pdfjs-dist
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    try {
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      });

      const pdfDocument = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      if (fullText.trim().length > 50) {
        return fullText.trim();
      }
      throw new Error('Could not extract meaningful text from PDF');
    } catch (err) {
      throw new Error('Failed to parse PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }

  // For DOCX files, try basic text extraction
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
    const buffer = await file.arrayBuffer();
    const text = extractReadableText(buffer);

    if (text.length < 50) {
      throw new Error('Could not extract meaningful text from DOCX. Please try PDF or TXT format.');
    }

    return text;
  }

  throw new Error('Unsupported file format. Please use PDF, DOCX, or TXT.');
}

function extractReadableText(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let text = '';

  let inSequence = false;
  let sequenceStart = 0;

  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    const isReadable = (byte >= 32 && byte <= 126) || byte === 10 || byte === 13;

    if (isReadable && !inSequence) {
      inSequence = true;
      sequenceStart = i;
    } else if (!isReadable && inSequence) {
      if (i - sequenceStart > 10) {
        const chunk = new Uint8Array(buffer, sequenceStart, i - sequenceStart);
        text += new TextDecoder('utf-8').decode(chunk) + ' ';
      }
      inSequence = false;
    }
  }

  return text.trim();
}