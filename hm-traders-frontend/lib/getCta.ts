import { API_URL } from "@/api/Api";

export const fetchCtaData = async () => {
    try {
        const response = await fetch(`${API_URL}/cta`);
        if (!response.ok) {
            throw new Error('Failed to fetch cta data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cta data:', error);
        return null;
    }
};