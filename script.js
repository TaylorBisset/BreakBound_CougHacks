// script.js BreakBound 

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const restMessage = document.getElementById('restMessage');
const statusMessage = document.getElementById('statusMessage');
const alarmSound = document.getElementById('alarmSound');

// Define the times for work, rest, and long break
const workTime = .20 * 60;   // 20 minutes for work
const restTime = 20;        // 20 seconds for rest
const breakTime = 10 * 60;  // 10 minutes for long break

let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;
let isResting = false;
let isBreaking = false;

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!running && !isResting && !isBreaking) {
        startTime = Date.now() - elapsedTime * 1000; // Adjusting start time for unpausing
        timerInterval = setInterval(updateTimer, 1000);
        running = true;
        statusMessage.textContent = 'Work Time';
    } else if (!running && isResting) {
        startTime = Date.now() - (restTime - elapsedTime) * 1000; // Adjusting start time for unpausing
        timerInterval = setInterval(updateRestTimer, 1000);
    } else if (!running && isBreaking) {
        startTime = Date.now() - (breakTime - elapsedTime) * 1000; // Adjusting start time for unpausing
        timerInterval = setInterval(updateBreakTimer, 1000);
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
    statusMessage.textContent = '';
}

function updateTimer() {
    console.log('Updating timer...');

    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);

    let remainingTime = 0;
    let cycleType = '';

    if (elapsedTime < workTime) {
        remainingTime = workTime - elapsedTime;
        cycleType = 'Work Time';
    } else if (elapsedTime < workTime + restTime) {
        remainingTime = workTime + restTime - elapsedTime;
        cycleType = 'Rest Time';
    } else if (elapsedTime < workTime + restTime + workTime) {
        remainingTime = workTime + restTime + workTime - elapsedTime;
        cycleType = 'Work Time';
    } else {
        remainingTime = workTime + restTime + workTime + breakTime - elapsedTime;
        cycleType = 'Break Time';
    }

    console.log(`Remaining time: ${remainingTime}`);
    console.log(`Cycle type: ${cycleType}`);

    statusMessage.textContent = `${cycleType} (${formatTime(remainingTime)})`;

    if (remainingTime <= 1) {
        // Play the alarm sound
        setTimeout(() => {
            // Play the alarm sound
            console.log('Timer reached zero. Playing alarm sound.');
            alarmSound.play();

            // Flash the tab by changing the title
            const originalTitle = document.title;
            let flashInterval = setInterval(() => {
                document.title = (document.title === originalTitle) ? 'Time\'s Up!' : originalTitle;
            }, 1000);

            // Reset the title and clear the flash interval after 5 seconds
            setTimeout(() => {
                clearInterval(flashInterval);
                document.title = originalTitle;
            }, 5000);
        }, 500); // 0.5 second delay
    }
}

function updateRestTimer() {
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);

    let remainingTime = restTime - elapsedTime;
    statusMessage.textContent = `Rest Time (${formatTime(remainingTime)})`;

    if (elapsedTime >= restTime) {
        stopRest();
    }
}

function updateBreakTimer() {
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);

    let remainingTime = breakTime - elapsedTime;
    statusMessage.textContent = `Break Time (${formatTime(remainingTime)})`;

    if (elapsedTime >= breakTime) {
        stopBreak();
    }
}

function startRest() {
    isResting = true;
    pauseButton.disabled = true;
    restMessage.classList.remove('hidden');
    startButton.textContent = 'Rest Your Eyes';
    startTime = Date.now();
    timerInterval = setInterval(updateRestTimer, 1000);
}

function stopRest() {
    isResting = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = formatTime(elapsedTime);
    restMessage.classList.add('hidden');
    startButton.textContent = 'Start';
    pauseButton.disabled = false;
}

function startBreak() {
    isBreaking = true;
    pauseButton.disabled = true;
    restMessage.textContent = 'Time to take a longer break!';
    restMessage.classList.remove('hidden');
    startButton.textContent = 'Take a Break';
    startTime = Date.now();
    timerInterval = setInterval(updateBreakTimer, 1000);
}

function stopBreak() {
    isBreaking = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = formatTime(elapsedTime);
    restMessage.classList.add('hidden');
    startButton.textContent = 'Start';
    pauseButton.disabled = false;
}

startButton.addEventListener('click', () => {
    if (!running && !isResting && !isBreaking) {
        startTimer();
    } else if (!running && isResting) {
        stopRest();
    } else if (!running && isBreaking) {
        stopBreak();
    }
});

pauseButton.addEventListener('click', () => {
    if (running && !isResting && !isBreaking) {
        pauseTimer();
        pauseButton.textContent = 'Resume'; // Change button text to reflect functionality
    }
});

resetButton.addEventListener('click', resetTimer);

/* Total Timers logic */

// Global variables for total times
let totalWorkSeconds = 0;
let totalRestSeconds = 0;
let totalBreakSeconds = 0;

// Function to update and display the total count-up timer
function updateTotalTimer() {
    if (isTimerRunning && isWorking) {
        totalWorkSeconds++;
    }
    if (isTimerRunning && !isWorking && isResting) {
        totalRestSeconds++;
    }
    if (isTimerRunning && !isWorking && !isResting && isOnBreak) {
        totalBreakSeconds++;
    }

    const totalTimerDisplay = document.getElementById("totalTimerDisplay");
    totalTimerDisplay.textContent = `Total Work: ${formatTime(totalWorkSeconds)} | Total Rest: ${formatTime(totalRestSeconds)} | Total Break: ${formatTime(totalBreakSeconds)}`;
}

// Initialize the total timer display
function initializeTotalTimer() {
    const totalTimerDisplay = document.getElementById("totalTimerDisplay");
    totalTimerDisplay.textContent = `Total Work: ${formatTime(totalWorkSeconds)} | Total Rest: ${formatTime(totalRestSeconds)} | Total Break: ${formatTime(totalBreakSeconds)}`;
}

// Call initializeTotalTimer to set up the initial display
initializeTotalTimer();

// Update the total timer every second
setInterval(updateTotalTimer, 1000);

document.addEventListener("DOMContentLoaded", function() {
    const footerContainer = document.getElementById("footerContainer");
    const copyrightText = document.createElement("p");
    const currentYear = new Date().getFullYear();
    copyrightText.textContent = `© ${currentYear} BreakBound by Taylor Bisset`;
    footerContainer.appendChild(copyrightText);
});
