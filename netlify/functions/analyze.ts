import type { Handler } from '@netlify/functions';

const REVENUE_RANGE_MAP: Record<string, number> = {
  'Under $10K/month': 84000,
  '$10K-$30K/month': 240000,
  '$30K-$100K/month': 720000,
  '$100K+/month': 1800000,
};

const SYSTEM_PROMPT = `You are an AI Business Profit Leak Auditor, powered by Emanuel Castellano's Business Resilience Revolution 4 Pillars System. Your job is to analyze entrepreneurs' answers, calculate hidden profit leaks, and generate a personalized report.

Always base insights on the 5 areas: Lead Gen, Sales, Branding, Retention, and CEO Bottleneck.

RULES:
- Calculate annual revenue from their revenue range
- Estimate one total profit leak between 30-45% of annual revenue based on severity of answers
- Distribute the leak across all 5 areas based on the severity of their weaknesses
- Severity ratings: "High" if the answer indicates no system or major gap, "Medium" if partial system, "Low" if strong system
- A pillar with worse answers gets a LARGER share of the leak
- Dollar amounts must be realistic and add up to the total leak
- Use leads/month x deal value x close rate only to justify the Sales allocation - not to stack additional revenue on top
- Action steps must be specific, actionable, and achievable within 30-90 days
- Use plain ASCII characters only: straight quotes ("), regular hyphens (-), plain apostrophes (')
- Do NOT use curly quotes, em dashes, en dashes, or smart punctuation
- Use plain, simple language so even non-technical entrepreneurs understand
- Always bridge to: "This is exactly what our $5K/$12K programs fix for you."
- End with clear CTA: book a free Profit Leak Strategy Session

Respond ONLY with valid JSON matching this exact schema:
{
  "totalAnnualLeak": <number>,
  "leakPercentage": <number between 30-45>,
  "pillars": {
    "leadGeneration": {
      "severity": "<High|Medium|Low>",
      "leakAmount": <number>,
      "leakPercentage": <number>,
      "explanation": "<2-3 sentences>",
      "recommendation": "<1 specific action>"
    },
    "salesFollowUp": {
      "severity": "<High|Medium|Low>",
      "leakAmount": <number>,
      "leakPercentage": <number>,
      "explanation": "<2-3 sentences>",
      "recommendation": "<1 specific action>"
    },
    "authorityBranding": {
      "severity": "<High|Medium|Low>",
      "leakAmount": <number>,
      "leakPercentage": <number>,
      "explanation": "<2-3 sentences>",
      "recommendation": "<1 specific action>"
    },
    "retentionLTV": {
      "severity": "<High|Medium|Low>",
      "leakAmount": <number>,
      "leakPercentage": <number>,
      "explanation": "<2-3 sentences>",
      "recommendation": "<1 specific action>"
    },
    "ceoBottleneck": {
      "severity": "<High|Medium|Low>",
      "leakAmount": <number>,
      "leakPercentage": <number>,
      "explanation": "<2-3 sentences>",
      "recommendation": "<1 specific action>"
    }
  },
  "biggestLeak": "<one sentence identifying the #1 leak>",
  "bestImmediateFix": "<one sentence with the single best action to take right now>",
  "snapshotBullets": ["<insight 1>", "<insight 2>", "<insight 3>", "<insight 4>"],
  "actionSteps": [
    {
      "title": "<short action title>",
      "description": "<2-3 sentences explaining what to do>",
      "timeframe": "<e.g. This week, Next 30 days>",
      "expectedImpact": "<expected result>"
    },
    {
      "title": "<short action title>",
      "description": "<2-3 sentences>",
      "timeframe": "<timeframe>",
      "expectedImpact": "<expected result>"
    },
    {
      "title": "<short action title>",
      "description": "<2-3 sentences>",
      "timeframe": "<timeframe>",
      "expectedImpact": "<expected result>"
    }
  ]
}

IMPORTANT: The sum of all 5 pillar leakAmounts MUST equal totalAnnualLeak exactly. The sum of all 5 pillar leakPercentages MUST equal 100.`;

const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI API key not configured' }) };
  }

  try {
    const formData = JSON.parse(event.body || '{}');

    const estimatedAnnualRevenue = REVENUE_RANGE_MAP[formData.revenueRange] || 120000;

    const userMessage = `Business Audit Responses:
- Lead Sources: ${Array.isArray(formData.leadSources) ? formData.leadSources.join(', ') : 'Not specified'}
- Sales Follow-Up System: "${formData.salesFollowUp || 'Not specified'}"
- Authority/Positioning: "${formData.authorityPosition || 'Not specified'}"
- Retention System: "${formData.retentionSystem || 'Not specified'}"
- CEO Bottleneck: "${formData.ceoBottleneck || 'Not specified'}"
- Revenue Range: "${formData.revenueRange || 'Not specified'}" (estimated $${estimatedAnnualRevenue.toLocaleString()}/year)
- Speed to Lead: "${formData.speedToLead || 'Not specified'}"
- Monthly Lead Count: "${formData.monthlyLeadCount || 'Not specified'}"
- Revenue per Client: "${formData.revenuePerClient || 'Not specified'}"
- Conversion Rate: "${formData.conversionRate || 'Not specified'}"
- First Name: "${formData.firstName || 'Business Owner'}"

Calculate the profit leak analysis based on these responses. Use ${estimatedAnnualRevenue} as the estimated annual revenue for calculations.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'AI analysis service unavailable. Please try again.' }),
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Empty response from AI. Please try again.' }),
      };
    }

    const analysis = JSON.parse(content);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(analysis),
    };
  } catch (error) {
    console.error('Analyze function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process analysis. Please try again.' }),
    };
  }
};

export { handler };
