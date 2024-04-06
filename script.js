// script.js BreakBound 

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

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
        if (elapsedTime === 0) {
            startTime = Date.now();
        } else {
            startTime = Date.now() - elapsedTime * 1000; // Adjusting start time for unpausing
        }
        timerInterval = setInterval(updateTimer, 1000);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function resetTimer() {
    pauseTimer();
    elapsedTime = 0;
    timerDisplay.textContent = formatTime(elapsedTime);
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', () => {
    if (running) {
        pauseTimer();
        pauseButton.textContent = 'Resume'; // Change button text to reflect functionality
    } else {
        startTimer();
        pauseButton.textContent = 'Pause'; // Change button text to reflect functionality
    }
});
resetButton.addEventListener('click', resetTimer);

// FOOTER 
document.addEventListener("DOMContentLoaded", function() {
    // Get the footer container
    const footerContainer = document.getElementById("footerContainer");

    // Create a new paragraph element for the copyright text
    const copyrightText = document.createElement("p");

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Set the copyright text
    copyrightText.textContent = `© ${currentYear} BreakBound by Taylor Bisset`;

    // Append the copyright text to the footer container
    footerContainer.appendChild(copyrightText);
});
