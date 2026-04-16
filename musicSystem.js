// musicSystem.js

// Dynamic music generation system using Web Audio API

const context = new (window.AudioContext || window.webkitAudioContext)();

function createTone(frequency, duration) {
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime); // Hz

    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
}

function generateMusic(emotion) {
    let frequency = 440; // Default frequency
    let intensity = 1; // Default intensity
    let duration = 1; // Default duration in seconds

    // Adjust parameters based on detected emotions
    switch (emotion) {
        case 'happy':
            frequency = 523; // C5
            intensity = 1;
            duration = 0.5;
            break;
        case 'sad':
            frequency = 220; // A3
            intensity = 0.5;
            duration = 2;
            break;
        case 'angry':
            frequency = 660; // E5
            intensity = 1.5;
            duration = 0.3;
            break;
        case 'calm':
            frequency = 440; // A4
            intensity = 1;
            duration = 1.5;
            break;
        default:
            break;
    }

    createTone(frequency, duration);
}

// Example of generating music based on detected emotion
// generateMusic('happy'); // Uncomment this line to test with happy emotion