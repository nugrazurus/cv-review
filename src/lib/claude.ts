import Anthropic from '@anthropic-ai/sdk';

interface AnalysisResult {
  score: number;
  verdict: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  deepDive: Array<{
    section: string;
    feedback: string;
    before?: string;
    after?: string;
  }>;
}

const SYSTEM_PROMPT = `You are a professional CV/resume analyst. Analyze the provided CV and return a structured JSON assessment.

Evaluate the CV on these criteria:
- Clarity and structure
- Impact of bullet points (quantified achievements vs generic statements)
- Relevance of skills to typical job requirements
- Formatting and readability
- Overall presentation quality

Return ONLY valid JSON with this exact structure:
{
  "score": <number 0-100>,
  "verdict": "<one-line summary>",
  "strengths": ["<string>", ...],
  "weaknesses": ["<string>", ...],
  "recommendations": ["<string>", ...],
  "deepDive": [
    {
      "section": "<section name>",
      "feedback": "<detailed feedback>",
      "before": "<original example from CV>",
      "after": "<improved version>"
    }
  ]
}

Guidelines:
- score: 0-100 based on overall quality
- verdict: concise one-line assessment
- strengths: 2-4 positive aspects
- weaknesses: 2-4 areas needing improvement
- recommendations: 3-5 actionable suggestions
- deepDive: 2-3 specific examples with before/after improvements`;

export async function analyzeCV(
  content: string,
  apiKey: string,
  baseUrl?: string,
  model?: string
): Promise<AnalysisResult> {
  const client = new Anthropic({
    apiKey,
    baseURL: baseUrl || undefined,
  });

  const response = await client.messages.create({
    model: model || 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    thinking: {
      type: 'disabled'
    },
    messages: [
      {
        role: 'user',
        content: `Analyze this CV/resume:\n\n${content}`,
      },
    ],
  });

  const textContent = response.content.find((block) => block.type === 'text');
  if (!textContent) {
    throw new Error('No text response from Claude');
  }

  // Parse JSON from response (handle potential markdown wrapping)
  let jsonStr = textContent.text;
  if (jsonStr.includes('```json')) {
    jsonStr = jsonStr.replace(/```json\n?/, '').replace(/\n?```/, '');
  }
  if (jsonStr.includes('```')) {
    jsonStr = jsonStr.replace(/```\n?/, '').replace(/\n?```/, '');
  }

  const result = JSON.parse(jsonStr) as AnalysisResult;
  return result;
}