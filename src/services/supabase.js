import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azqxcqjnfgjzodlmduzj.supabase.co'; // Ganti dengan milikmu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cXhjcWpuZmdqem9kbG1kdXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTY2MDksImV4cCI6MjA2NTg3MjYwOX0.mhkDMZHDosb8z8acptroOFaVDIuVliieNk6HR0AKVbk';   // Ambil dari tab API (anon/public key)

export const supabase = createClient(supabaseUrl, supabaseKey);
