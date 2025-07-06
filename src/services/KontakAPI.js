// src/services/KontakAPI.js
import axios from 'axios';

// Ganti URL dan API_KEY dengan milik teman Anda
const API_URL = "https://jboaqwdcfkvttqnkaabh.supabase.co/rest/v1/Kontak";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impib2Fxd2RjZmt2dHRxbmthYWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDk0NjIsImV4cCI6MjA2NTIyNTQ2Mn0.MXJLKqTVfq_jocKFPum6sNKSuxIL7n9WYKm3XdWIoOE"; // Jangan bocorkan ke publik

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};

export const KontakAPI = {
  async createKontak(data) {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error saat mengirim ke Supabase:", error.response?.data || error.message);
      throw error;
    }
  }
};
