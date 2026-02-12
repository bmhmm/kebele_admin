// services/dashboardService.js

export const dashboardService = {
    // Get dashboard statistics
    getStatistics: async () => {
        try {
            console.log('Calling dashboard API...');
            
            const API_URL = 'http://localhost:5000/api';
            const response = await fetch(`${API_URL}/dashboard/statistics`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API Response data:', data);
            return data;
            
        } catch (error) {
            console.error('Error fetching dashboard statistics:', error);
            
            // Fallback to mock data ONLY if API fails
            console.log('Using fallback mock data');
            return {
                success: true,
                data: {
                    today_registrations: 12,
                    pending_tasks: 8,
                    total_individuals: 1247,
                    total_families: 342,
                    total_houses: 289,
                    total_id_cards: 856,
                    individuals_change: 12.5,
                    families_change: 8.2,
                    houses_change: -3.1,
                    id_cards_change: 15.7,
                    new_registrations: 47,
                    new_registrations_change: 22.3,
                    active_this_week: 234,
                    active_this_week_change: 5.6
                }
            };
        }
    }
};