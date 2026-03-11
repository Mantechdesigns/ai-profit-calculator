-- Add new columns for the profit leak audit widget
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS lead_sources text[],
  ADD COLUMN IF NOT EXISTS sales_follow_up text,
  ADD COLUMN IF NOT EXISTS authority_position text,
  ADD COLUMN IF NOT EXISTS retention_system text,
  ADD COLUMN IF NOT EXISTS ceo_bottleneck text,
  ADD COLUMN IF NOT EXISTS revenue_range text,
  ADD COLUMN IF NOT EXISTS speed_to_lead text,
  ADD COLUMN IF NOT EXISTS monthly_lead_count text,
  ADD COLUMN IF NOT EXISTS revenue_per_client text,
  ADD COLUMN IF NOT EXISTS conversion_rate text,
  ADD COLUMN IF NOT EXISTS total_profit_leak decimal,
  ADD COLUMN IF NOT EXISTS biggest_leak_pillar text,
  ADD COLUMN IF NOT EXISTS analysis_json jsonb;

-- Make old numeric fields nullable (they won't be populated by the new audit form)
ALTER TABLE submissions
  ALTER COLUMN monthly_leads DROP NOT NULL,
  ALTER COLUMN lead_value DROP NOT NULL,
  ALTER COLUMN operational_costs DROP NOT NULL,
  ALTER COLUMN admin_hours DROP NOT NULL;
