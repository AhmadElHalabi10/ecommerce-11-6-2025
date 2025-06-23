-- Add isAdmin field to user table
ALTER TABLE "user" ADD COLUMN "isAdmin" boolean DEFAULT false;

-- Update existing users table if it exists (for compatibility)
ALTER TABLE "users" ADD COLUMN "isAdmin" boolean DEFAULT false; 