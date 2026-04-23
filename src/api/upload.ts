import { Hono } from 'hono';
import { parseFile } from '../lib/parser';
import { analyzeCV } from '../lib/claude';

export const uploadApi = new Hono();

uploadApi.post('/upload', async (c) => {
  try {
    // Parse and validate file
    const content = await parseFile(c);

    // Get API config from environment
    const apiKey = c.env?.CLAUDE_API_KEY;
    const baseUrl = c.env?.CLAUDE_BASE_URL;
    const model = c.env?.CLAUDE_MODEL;

    if (!apiKey) {
      return c.json({ error: 'Claude API key not configured' }, 500);
    }

    // Analyze with Claude
    const result = await analyzeCV(content, apiKey, baseUrl, model);

    return c.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('No file')) {
      return c.json({ error: message }, 400);
    }
    if (message.includes('too large')) {
      return c.json({ error: message }, 413);
    }
    if (message.includes('Could not extract')) {
      return c.json({ error: message }, 400);
    }

    return c.json({ error: 'Analysis failed: ' + message }, 500);
  }
});