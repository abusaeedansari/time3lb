// Mock data for development and fallback
export const generateMockData = () => {
    const names = [
        'Alice', 'Bob', 'Charlie', 'David', 'Emma',
        'Frank', 'Grace', 'Henry', 'Isabel', 'Jack'
    ];
    
    return names.map((name, index) => ({
        name,
        score: Math.floor(Math.random() * 300) + 700, // Scores between 700-1000
        isNew: index === 0 // First player always marked as new for demo
    }));
};

// Simulate network delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));