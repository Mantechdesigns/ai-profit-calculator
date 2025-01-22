const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY;
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;

// Field mappings from environment variables
const FIELD_MAPPINGS = {
  monthlyLeads: import.meta.env.VITE_GHL_FIELD_MONTHLY_LEADS,
  leadValue: import.meta.env.VITE_GHL_FIELD_LEAD_VALUE,
  operationalCosts: import.meta.env.VITE_GHL_FIELD_OPERATIONAL_COSTS,
  adminHours: import.meta.env.VITE_GHL_FIELD_ADMIN_HOURS,
  annualSavings: import.meta.env.VITE_GHL_FIELD_ANNUAL_SAVINGS,
  marketingSpend: import.meta.env.VITE_GHL_FIELD_MARKETING_SPEND,
  churnRate: import.meta.env.VITE_GHL_FIELD_CHURN_RATE,
};

interface GHLContact {
  email: string;
  customField: {
    id: string;
    value: string;
  }[];
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
  const annualSavings = (
    data.monthlyLeads * data.leadValue * 0.2 + 
    data.operationalCosts * 0.15 + 
    data.adminHours * 50
  ) * 12;

  const contact: GHLContact = {
    email: data.email,
    customField: [
      { id: FIELD_MAPPINGS.monthlyLeads, value: data.monthlyLeads.toString() },
      { id: FIELD_MAPPINGS.leadValue, value: data.leadValue.toString() },
      { id: FIELD_MAPPINGS.operationalCosts, value: data.operationalCosts.toString() },
      { id: FIELD_MAPPINGS.adminHours, value: data.adminHours.toString() },
      { id: FIELD_MAPPINGS.annualSavings, value: annualSavings.toString() },
    ],
  };

  if (data.marketingSpend) {
    contact.customField.push({ 
      id: FIELD_MAPPINGS.marketingSpend, 
      value: data.marketingSpend.toString() 
    });
  }

  if (data.churnRate) {
    contact.customField.push({ 
      id: FIELD_MAPPINGS.churnRate, 
      value: data.churnRate.toString() 
    });
  }

  const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      ...contact,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create GHL contact');
  }

  return response.json();
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
  const customField = Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== undefined && FIELD_MAPPINGS[key]) {
      acc.push({
        id: FIELD_MAPPINGS[key],
        value: value.toString()
      });
    }
    return acc;
  }, [] as { id: string; value: string }[]);

  const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/${contactId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      customField,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update GHL contact');
  }

  return response.json();
}