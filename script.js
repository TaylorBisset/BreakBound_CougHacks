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
