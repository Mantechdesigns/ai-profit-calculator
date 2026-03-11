interface CreateContactEnv {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export function handleCreateContactOptions(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function handleCreateContact(request: Request, env: CreateContactEnv): Promise<Response> {
  const GHL_API_KEY = env.GHL_API_KEY;
  const GHL_LOCATION_ID = env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return new Response(
      JSON.stringify({ error: 'GHL credentials not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { email, firstName, formData, analysisResults } = await request.json() as any;

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
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

    const responseData: any = await response.json();

    if (!response.ok) {
      console.error('GHL error:', responseData);
      return new Response(
        JSON.stringify({
          error: 'Failed to create contact',
          message: responseData.message || responseData.error || 'Unknown error',
        }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ contactId: responseData.contact?.id || responseData.id || '' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Create contact error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create contact' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
