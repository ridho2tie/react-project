import axios from 'axios'

const API_URL = "https://jboaqwdcfkvttqnkaabh.supabase.co/rest/v1/FAQ";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impib2Fxd2RjZmt2dHRxbmthYWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NDk0NjIsImV4cCI6MjA2NTIyNTQ2Mn0.MXJLKqTVfq_jocKFPum6sNKSuxIL7n9WYKm3XdWIoOE"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const FAQAPI = {
    async fetchFAQ() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createFAQ(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    },

    async deleteFAQ(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    },

    async updateFAQ(id, data) {
        const response = await axios.patch(
            `${API_URL}?id=eq.${id}`,
            data,
            {
                headers: {
                    ...headers,
                    Prefer: "return=representation"
                }
            }
        );
        return response.data;
    },
}