const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY;
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;

// Updated field mappings to match GHL custom field names
const FIELD_MAPPINGS = {
  monthlyLeads: 'Monthly_leads',
  leadValue: 'Lead_value', 
  operationalCosts: 'Operational_costs',
  adminHours: 'Admin_hours',
  annualSavings: 'Annual_savings',
  marketingSpend: 'Marketing_spend',
  churnRate: 'Churn_rate',
} as const;

interface GHLContactPayload {
  email: string;
  customField: Array<{ id: string; value: string }>;
  locationId?: string;
}

interface GHLErrorResponse {
  message?: string;
  error?: string;
  errors?: Array<{ message: string }>;
  statusCode?: number;
}

export async function createGHLContact(data: {
  email: string;
  monthlyLeads: number;
  leadValue: number;
  operationalCosts: number;
  adminHours: number;
  marketingSpend?: number;
  churnRate?: number;
}) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('Missing required environment variables: VITE_GHL_API_KEY or VITE_GHL_LOCATION_ID');
  }

  const annualSavings = (
    data.monthlyLeads * data.leadValue * 0.2 + 
    data.operationalCosts * 0.15 + 
    data.adminHours * 50
  ) * 12;

  // Create customFields object with proper field names
  const customFields: Record<string, any> = {
    [FIELD_MAPPINGS.monthlyLeads]: data.monthlyLeads,
    [FIELD_MAPPINGS.leadValue]: data.leadValue,
    [FIELD_MAPPINGS.operationalCosts]: data.operationalCosts,
    [FIELD_MAPPINGS.adminHours]: data.adminHours,
    [FIELD_MAPPINGS.annualSavings]: annualSavings,
  };

  if (data.marketingSpend !== undefined) {
    customFields[FIELD_MAPPINGS.marketingSpend] = data.marketingSpend;
  }

  if (data.churnRate !== undefined) {
    customFields[FIELD_MAPPINGS.churnRate] = data.churnRate;
  }

  const payload = {
    email: data.email,
    customFields,
    locationId: GHL_LOCATION_ID,
    // ADD TAGS HERE 👇
    tags: ["profit-calculator-submission"]
  };

  try {
    console.log('GHL Request Payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json() as GHLErrorResponse;
    console.log('GHL Response:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      // Extract error message from various possible error response formats
      const errorMessage = 
        responseData.message || 
        responseData.error || 
        (responseData.errors && responseData.errors[0]?.message) ||
        `HTTP ${response.status}: Failed to create contact`;

      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error('GHL Error:', error);
    
    // Handle network errors and other unexpected errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to GHL API');
    }
    
    if (error instanceof Error) {
      throw new Error(`GHL API Error: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred while creating the contact');
  }
}

export async function updateGHLContact(contactId: string, data: {
  monthlyLeads?: number;
  leadValue?: number;
  operationalCosts?: number;
  adminHours?: number;
  marketingSpend?: number;
  churnRate?: number;
  annualSavings?: number;
}) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error('Missing required environment variables: VITE_GHL_API_KEY or VITE_GHL_LOCATION_ID');
  }

  const customFields: Record<string, any> = {};

  // Only include fields that are provided
  if (data.monthlyLeads !== undefined) customFields[FIELD_MAPPINGS.monthlyLeads] = data.monthlyLeads;
  if (data.leadValue !== undefined) customFields[FIELD_MAPPINGS.leadValue] = data.leadValue;
  if (data.operationalCosts !== undefined) customFields[FIELD_MAPPINGS.operationalCosts] = data.operationalCosts;
  if (data.adminHours !== undefined) customFields[FIELD_MAPPINGS.adminHours] = data.adminHours;
  if (data.annualSavings !== undefined) customFields[FIELD_MAPPINGS.annualSavings] = data.annualSavings;
  if (data.marketingSpend !== undefined) customFields[FIELD_MAPPINGS.marketingSpend] = data.marketingSpend;
  if (data.churnRate !== undefined) customFields[FIELD_MAPPINGS.churnRate] = data.churnRate;

  const payload = {
    customFields,
    locationId: GHL_LOCATION_ID,
  };

  try {
    console.log('GHL Update Request Payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json() as GHLErrorResponse;
    console.log('GHL Update Response:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      const errorMessage = 
        responseData.message || 
        responseData.error || 
        (responseData.errors && responseData.errors[0]?.message) ||
        `HTTP ${response.status}: Failed to update contact`;

      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error('GHL Update Error:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to GHL API');
    }
    
    if (error instanceof Error) {
      throw new Error(`GHL API Error: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred while updating the contact');
  }
}