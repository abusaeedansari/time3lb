// Configuration for the game and leaderboard
export const CONFIG = {
    // API URLs - Update these with your actual server URLs
    API_URLS: {
        LEADERBOARD: 'https://your-server.com/leaderboard.html',
        UPDATE_SCORE: 'https://your-server.com/update_score.php',
        GET_SCORES: 'https://your-server.com/get_scores.php'
    },
    
    // Update interval for the leaderboard in milliseconds
    UPDATE_INTERVAL: 5000,
    
    // Development mode settings
    DEV_MODE: false, // Set to true for local development
    LOCAL_URLS: {
        UPDATE_SCORE: 'http://localhost/update_score.php',
        GET_SCORES: 'http://localhost/get_scores.php'
    }
};