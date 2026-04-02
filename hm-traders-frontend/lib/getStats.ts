import { API_URL } from "@/api/Api";

export const fetchStatsData = async () => {
    try {
        const response = await fetch(`${API_URL}/About_Stats`);
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

// import data from "@/data/stats.json"

// export async function fetchStatsData() {
//     try {
//         return data
        
//     } catch (error) {
//         console.error('Failed to load stats:', error);
//         return [];
//     }
// }

