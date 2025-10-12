import { createClient } from '@supabase/supabase-js';

// --- IMPORTANT ---
// The credentials below are placeholders.
// For authentication to work, you need to create a Supabase project
// and replace these values with your project's URL and anon key.
// You can find these in your project settings under "API".
const supabaseUrl = 'https://gceyzcsoswwmfebgrleo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjZXl6Y3Nvc3d3bWZlYmdybGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjcyMDMsImV4cCI6MjA3NTgwMzIwM30.lTkAQGtTn01wSaJKg7OE42iBSt3xNv9MHqaMZdfS5J0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);