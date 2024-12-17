import { fetchScores } from './api.js';

export class Leaderboard {
    constructor() {
        this.leaderboardBody = document.getElementById('leaderboard-body');
        this.lastUpdated = document.getElementById('last-updated');
        this.errorContainer = document.getElementById('error-container');
        this.updateInterval = 5000; // 5 seconds
        this.isUpdating = false;
        this.loadingIndicator = this.createLoadingIndicator();
    }

    // Initialize the leaderboard
    init() {
        this.showLoading();
        this.update();
        setInterval(() => this.update(), this.updateInterval);
    }

    // Create loading indicator
    createLoadingIndicator() {
        const loading = document.createElement('div');
        loading.className = 'loading-indicator';
        loading.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading leaderboard...</p>
        `;
        return loading;
    }

    // Show loading state
    showLoading() {
        if (!this.loadingIndicator.parentNode) {
            this.leaderboardBody.appendChild(this.loadingIndicator);
        }
    }

    // Hide loading state
    hideLoading() {
        if (this.loadingIndicator.parentNode) {
            this.loadingIndicator.parentNode.removeChild(this.loadingIndicator);
        }
    }

    // Update the leaderboard display
    async update() {
        if (this.isUpdating) return;
        this.isUpdating = true;

        try {
            this.showLoading();
            const data = await fetchScores();
            this.render(data);
            this.updateTimestamp();
            this.hideError();
        } catch (error) {
            this.showError('Unable to fetch leaderboard data. Retrying...');
        } finally {
            this.hideLoading();
            this.isUpdating = false;
        }
    }

    // Render the leaderboard data
    render(data) {
        if (!Array.isArray(data)) return;
        
        this.leaderboardBody.innerHTML = '';
        
        if (data.length === 0) {
            this.showMessage('No scores available yet. Be the first to play!');
            return;
        }
        
        data.forEach((player, index) => {
            const row = this.createPlayerRow(player, index);
            this.leaderboardBody.appendChild(row);
        });
    }

    // Show a message when there's no data
    showMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'leaderboard-message';
        messageEl.textContent = message;
        this.leaderboardBody.appendChild(messageEl);
    }

    // Create a player row element
    createPlayerRow(player, index) {
        const row = document.createElement('div');
        row.className = 'player-row';
        if (player.isNew) row.classList.add('new-score');
        
        row.innerHTML = `
            <div class="rank">#${index + 1}</div>
            <div class="name">${this.escapeHtml(player.name)}</div>
            <div class="score">${player.score}</div>
        `;
        
        return row;
    }

    // Update the last updated timestamp
    updateTimestamp() {
        this.lastUpdated.textContent = 'Last updated: ' + new Date().toLocaleTimeString();
    }

    // Show error message
    showError(message) {
        if (!this.errorContainer) {
            this.errorContainer = document.createElement('div');
            this.errorContainer.className = 'error-message';
            this.leaderboardBody.parentNode.insertBefore(this.errorContainer, this.leaderboardBody);
        }
        this.errorContainer.textContent = message;
        this.errorContainer.style.display = 'block';
    }

    // Hide error message
    hideError() {
        if (this.errorContainer) {
            this.errorContainer.style.display = 'none';
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}