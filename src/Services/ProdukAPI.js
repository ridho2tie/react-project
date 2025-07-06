import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azqxcqjnfgjzodlmduzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cXhjcWpuZmdqem9kbG1kdXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyOTY2MDksImV4cCI6MjA2NTg3MjYwOX0.mhkDMZHDosb8z8acptroOFaVDIuVliieNk6HR0AKVbk'; // ganti dengan key yang benar
const supabase = createClient(supabaseUrl, supabaseKey);

export const ProdukAPI = {
  async fetchAll() {
    const { data, error } = await supabase.from('sepatu').select('*');
    if (error) throw error;
    return data;
  },
  
  async fetchBrands() {
    const { data, error } = await supabase.from('sepatu').select('brand');
    if (error) throw error;
    const unique = [...new Set(data.map(d => d.brand))];
    return unique;
  }
};