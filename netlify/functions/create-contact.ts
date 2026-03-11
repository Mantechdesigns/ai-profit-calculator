import type { Handler } from '@netlify/functions';

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

  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GHL credentials not configured' }) };
  }

  try {
    const { email, firstName, formData, analysisResults } = JSON.parse(event.body || '{}');

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

    const customFields: Record<string, any> = {};

    if (formData) {
      customFields['Lead_sources'] = Array.isArray(formData.leadSources)
        ? formData.leadSources.join(', ')
        : '';
      customFields['Sales_follow_up'] = formData.salesFollowUp || '';
      customFields['Authority_position'] = formData.authorityPosition || '';
      customFields['Retention_system'] = formData.retentionSystem || '';
      customFields['CEO_bottleneck'] = formData.ceoBottleneck || '';
      customFields['Revenue_range'] = formData.revenueRange || '';
      customFields['Speed_to_lead'] = formData.speedToLead || '';
      customFields['Monthly_leads_range'] = formData.monthlyLeadCount || '';
      customFields['Revenue_per_client'] = formData.revenuePerClient || '';
      customFields['Conversion_rate'] = formData.conversionRate || '';
    }

    if (analysisResults) {
      customFields['Total_profit_leak'] = analysisResults.totalAnnualLeak || 0;
      customFields['Biggest_leak'] = analysisResults.biggestLeak || '';
    }

    const payload = {
      email,
      firstName: firstName || '',
      customFields,
      locationId: GHL_LOCATION_ID,
      tags: ['profit-leak-audit'],
    };

    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('GHL error:', responseData);
      return {
        statusCode: 502,
        body: JSON.stringify({
          error: 'Failed to create contact',
          message: responseData.message || responseData.error || 'Unknown error',
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ contactId: responseData.contact?.id || responseData.id || '' }),
    };
  } catch (error) {
    console.error('Create contact error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create contact' }),
    };
  }
};

export { handler };
