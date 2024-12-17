import { generateMockData, delay } from './mockData.js';

// API endpoints
const API_ENDPOINTS = {
    GET_SCORES: 'get_scores.php',
    UPDATE_SCORE: 'update_score.php'
};

// Configuration
const CONFIG = {
    USE_MOCK_DATA: true, // Set to false in production
    MOCK_DELAY: 500 // Simulate network delay in ms
};

// Fetch scores from the server
export async function fetchScores() {
    try {
        if (!CONFIG.USE_MOCK_DATA) {
            const response = await fetch(API_ENDPOINTS.GET_SCORES);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } else {
            // Use mock data with simulated delay
            await delay(CONFIG.MOCK_DELAY);
            return generateMockData();
        }
    } catch (error) {
        console.error('Error fetching scores:', error);
        // Fallback to mock data if real request fails
        return generateMockData();
    }
}

// Update a player's score
export async function updateScore(name, score) {
    try {
        if (!CONFIG.USE_MOCK_DATA) {
            const response = await fetch(API_ENDPOINTS.UPDATE_SCORE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, score })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        } else {
            // Simulate successful update with delay
            await delay(CONFIG.MOCK_DELAY);
            return { success: true };
        }
    } catch (error) {
        console.error('Error updating score:', error);
        // Return mock success response
        return { success: true };
    }
}