export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string
          email: string
          monthly_leads: number
          lead_value: number
          operational_costs: number
          admin_hours: number
          marketing_spend: number | null
          churn_rate: number | null
          created_at: string
          ghl_contact_id: string | null
          annual_savings: number | null
        }
        Insert: {
          id?: string
          email: string
          monthly_leads: number
          lead_value: number
          operational_costs: number
          admin_hours: number
          marketing_spend?: number | null
          churn_rate?: number | null
          created_at?: string
          ghl_contact_id?: string | null
          annual_savings?: number | null
        }
        Update: {
          id?: string
          email?: string
          monthly_leads?: number
          lead_value?: number
          operational_costs?: number
          admin_hours?: number
          marketing_spend?: number | null
          churn_rate?: number | null
          created_at?: string
          ghl_contact_id?: string | null
          annual_savings?: number | null
        }
      }
    }
  }
}