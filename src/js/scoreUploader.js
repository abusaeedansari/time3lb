import { CONFIG } from './config.js';

class ScoreUploader {
    constructor() {
        this.apiUrl = CONFIG.DEV_MODE ? CONFIG.LOCAL_URLS.UPDATE_SCORE : CONFIG.API_URLS.UPDATE_SCORE;
        this.statusElement = document.getElementById('upload-status');
    }

    updateStatus(message) {
        if (this.statusElement) {
            this.statusElement.textContent = message;
        }
    }

    async uploadScore(playerName, score) {
        if (!playerName || score === undefined) {
            this.updateStatus('Error: Invalid player data');
            return false;
        }

        try {
            this.updateStatus('Uploading score...');
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: playerName,
                    score: score
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                this.updateStatus('Score uploaded successfully!');
                return true;
            } else {
                throw new Error(data.error || 'Failed to upload score');
            }
        } catch (error) {
            console.error('Score upload error:', error);
            this.updateStatus(`Error uploading score: ${error.message}`);
            return false;
        }
    }
}

// Create and export a single instance
export const scoreUploader = new ScoreUploader();