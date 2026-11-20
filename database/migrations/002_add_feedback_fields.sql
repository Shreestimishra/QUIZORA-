-- Add subcategory and attachments fields to feedback table
ALTER TABLE feedback
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS attachments TEXT;

-- Add comment for documentation
COMMENT ON COLUMN feedback.subcategory IS 'More specific category within the main feedback type';
COMMENT ON COLUMN feedback.attachments IS 'Links to screenshots or additional information';
