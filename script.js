// script.js BreakBound 

// Get the timer display element
const timerDisplay = document.getElementById('timerDisplay');

let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000);
        running = true;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);
}

// Event listeners for the start and stop buttons
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
