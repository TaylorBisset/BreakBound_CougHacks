// script.js BreakBound 

// VARIABLES
let isTimerRunning = false;
let isWorking = false;
let isPaused = false;
let timeElapsed = 0; // Time elapsed in seconds

// Time intervals (in seconds)
let workTime = 20 * 60;     // 20 minutes
let restTime = 20;          // 20 seconds eye rest
let breakTime = 10 * 60;    // 10 minutes walkaway break
let pauseStartTime = 0; 

let totalWorkTime = 0; 
let totalRestTime = 0; 
let totalBreakTime = 0; 
let totalPauseTime = 0; 


// FUNCTIONS 

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600); 
    let minutes = Math.floor((seconds % 3600) / 60); 
    let remainingSeconds = seconds % 60; 

                    // add a leading zero if single digit
    let formattedHours = hours < 10 ? `0${hours}` : hours; 
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 
    let formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds; 

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`; 
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000ms)
    }
}

function pauseTimer() {
    if (isTimerRunning && !isPaused) {
        isPaused = true;
        clearInterval(timerInterval);   // Pause the timer
        pauseStartTime = Date.now();    // Record the pause start time
    }
}

function resumeTimer() {
    if (isTimerRunning && isPaused) {
        isPaused = false;
        let pausedTime = (Date.now() - pauseStartTime) / 1000; // Calculate the time paused in seconds
        timeElapsed -= pausedTime; // Subtract the paused time from the elapsed time
        if (timeElapsed < 0) {
            timeElapsed = 0; // Prevent negative time display
        }
        timerInterval = setInterval(updateTimer, 1000); // Resume the timer
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    isPaused = false;
    timeElapsed = 0;
    updateTimer(); // Update the timer display
}

function updateTimer() {
    timeElapsed++;
    updateDisplay();
}

function updateDisplay() {
    const timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.textContent = formatTime(timeElapsed);
}

// EVENT LISTENERS (BUTTONS)
document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("pauseButton").addEventListener("click", pauseTimer);
document.getElementById("resumeButton").addEventListener("click", resumeTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);

// Initial display
updateDisplay();

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
