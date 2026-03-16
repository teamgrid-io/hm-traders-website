import { API_URL } from "@/api/Api";

export const fetchStatsData = async () => {
    try {
        const response = await fetch(`${API_URL}/stats`);
        if (!response.ok) {
            throw new Error('Failed to fetch stats data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stats data:', error);
        return null;
    }
};

