/*
  # Create submissions table and security policies

  1. New Tables
    - `submissions`
      - `id` (uuid, primary key)
      - `email` (text)
      - `monthly_leads` (integer)
      - `lead_value` (decimal)
      - `operational_costs` (decimal)
      - `admin_hours` (integer)
      - `marketing_spend` (decimal)
      - `churn_rate` (decimal)
      - `created_at` (timestamp)
      - `ghl_contact_id` (text, nullable)

  2. Security
    - Enable RLS on `submissions` table
    - Add policy for authenticated users to insert data
*/

CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  monthly_leads integer NOT NULL,
  lead_value decimal NOT NULL,
  operational_costs decimal NOT NULL,
  admin_hours integer NOT NULL,
  marketing_spend decimal,
  churn_rate decimal,
  created_at timestamptz DEFAULT now(),
  ghl_contact_id text
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous submissions"
  ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);