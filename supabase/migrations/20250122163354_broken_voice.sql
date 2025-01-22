/*
  # Add Go High Level fields

  1. Changes
    - Add new columns to match Go High Level custom fields
    - Add indexes for better query performance
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'submissions' AND column_name = 'annual_savings'
  ) THEN
    ALTER TABLE submissions ADD COLUMN annual_savings decimal;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);