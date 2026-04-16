// emotionDetector.js
// Load the required libraries
import * as tf from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js';

// Load the models for face detection and emotion recognition
async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
}

// Load the video stream from the webcam
async function setupCamera() {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

// Detect emotions in real-time
async function detectEmotion(video) {
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.clearRect(0, 0, displaySize.width, displaySize.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
}

// Initialize the application
async function init() {
    await loadModels();
    const video = await setupCamera();
    video.play();
    detectEmotion(video);
}

// Start the application
init();