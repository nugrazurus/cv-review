import { Context } from 'hono';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface FileContent {
  type: 'text' | 'pdf' | 'docx';
  content: string; // text content for text/docx, base64 for pdf
}

export async function parseFile(c: Context): Promise<FileContent> {
  const formData = await c.req.parseBody();
  const file = formData['file'];

  if (!file || !(file instanceof File)) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large (max 5MB)');
  }

  // Text files - read directly
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return { type: 'text', content: await file.text() };
  }

  // PDF files - base64 encode for Claude
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    const buffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return { type: 'pdf', content: base64 };
  }

  // DOCX files - keep current extraction (Claude doesn't support DOCX native)
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.name.endsWith('.docx')
  ) {
    const buffer = await file.arrayBuffer();
    const text = extractReadableText(buffer);
    if (text.length < 50) {
      throw new Error(
        'Could not extract meaningful text from DOCX. Please try PDF or TXT format.'
      );
    }
    return { type: 'docx', content: text };
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