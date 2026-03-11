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
          first_name: string | null
          monthly_leads: number | null
          lead_value: number | null
          operational_costs: number | null
          admin_hours: number | null
          marketing_spend: number | null
          churn_rate: number | null
          created_at: string
          ghl_contact_id: string | null
          annual_savings: number | null
          lead_sources: string[] | null
          sales_follow_up: string | null
          authority_position: string | null
          retention_system: string | null
          ceo_bottleneck: string | null
          revenue_range: string | null
          speed_to_lead: string | null
          monthly_lead_count: string | null
          revenue_per_client: string | null
          conversion_rate: string | null
          total_profit_leak: number | null
          biggest_leak_pillar: string | null
          analysis_json: Json | null
        }
        Insert: {
          id?: string
          email: string
          first_name?: string | null
          monthly_leads?: number | null
          lead_value?: number | null
          operational_costs?: number | null
          admin_hours?: number | null
          marketing_spend?: number | null
          churn_rate?: number | null
          created_at?: string
          ghl_contact_id?: string | null
          annual_savings?: number | null
          lead_sources?: string[] | null
          sales_follow_up?: string | null
          authority_position?: string | null
          retention_system?: string | null
          ceo_bottleneck?: string | null
          revenue_range?: string | null
          speed_to_lead?: string | null
          monthly_lead_count?: string | null
          revenue_per_client?: string | null
          conversion_rate?: string | null
          total_profit_leak?: number | null
          biggest_leak_pillar?: string | null
          analysis_json?: Json | null
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          monthly_leads?: number | null
          lead_value?: number | null
          operational_costs?: number | null
          admin_hours?: number | null
          marketing_spend?: number | null
          churn_rate?: number | null
          created_at?: string
          ghl_contact_id?: string | null
          annual_savings?: number | null
          lead_sources?: string[] | null
          sales_follow_up?: string | null
          authority_position?: string | null
          retention_system?: string | null
          ceo_bottleneck?: string | null
          revenue_range?: string | null
          speed_to_lead?: string | null
          monthly_lead_count?: string | null
          revenue_per_client?: string | null
          conversion_rate?: string | null
          total_profit_leak?: number | null
          biggest_leak_pillar?: string | null
          analysis_json?: Json | null
        }
      }
    }
  }
}
