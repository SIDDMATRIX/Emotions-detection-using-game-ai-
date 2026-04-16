// gameLogic.js

class Game {
    constructor() {
        this.player = { position: 0, score: 0, emotionalState: 'neutral' };
        this.obstacles = [];
        this.difficultyLevel = 1;
    }

    movePlayer(distance) {
        this.player.position += distance; // Move player
        this.checkObstacleCollision();
    }

    generateObstacle() {
        const newObstacle = { position: Math.random() * 100, size: Math.random() * 10 };
        this.obstacles.push(newObstacle);
    }

    checkObstacleCollision() {
        for (const obstacle of this.obstacles) {
            if (this.player.position >= obstacle.position && this.player.position <= obstacle.position + obstacle.size) {
                this.handleCollision();
            }
        }
    }

    handleCollision() {
        this.player.score -= 5;  // Penalty for collision
        console.log('Collision! Your score has been reduced.');
    }

    updateScore(points) {
        this.player.score += points;
        console.log(`Score: ${this.player.score}`);
    }

    adaptDifficulty() {
        if (this.player.emotionalState === 'stressed') {
            this.difficultyLevel += 1; // Increase difficulty
            console.log('Difficulty increased due to stress!');
        } else if (this.player.emotionalState === 'calm') {
            this.difficultyLevel = Math.max(1, this.difficultyLevel - 1); // Decrease difficulty
            console.log('Difficulty decreased, you seem calm.');
        }
    }

    setEmotionalState(state) {
        this.player.emotionalState = state;
        this.adaptDifficulty();
    }
}

// Example of game initialization and usage
const myGame = new Game();
myGame.movePlayer(5);
myGame.setEmotionalState('stressed');
myGame.generateObstacle();
myGame.updateScore(10);
