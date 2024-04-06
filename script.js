// script.js BreakBound 

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const restMessage = document.getElementById('restMessage');
const statusMessage = document.getElementById('statusMessage');
const alarmSound = document.getElementById('alarmSound');
const totalTimerDisplay = document.getElementById("totalTimerDisplay");

const workTime = .1 * 60;   // 20 minutes for work
const restTime = 20;        // 20 seconds for rest
const breakTime = 10 * 60;  // 10 minutes for long break

let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;
let isResting = false;
let isBreaking = false;
let totalWorkSeconds = 0;
let totalRestSeconds = 0;
let totalBreakSeconds = 0;
let lastTimestamp = null;

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!running && !isResting && !isBreaking) {
        startTime = Date.now() - elapsedTime * 1000;
        timerInterval = setInterval(updateTimer, 1000);
        running = true;
        statusMessage.textContent = 'Work Time';
    } else if (!running && isResting) {
        startTime = Date.now() - (restTime - elapsedTime) * 1000;
        timerInterval = setInterval(updateRestTimer, 1000);
    } else if (!running && isBreaking) {
        startTime = Date.now() - (breakTime - elapsedTime) * 1000;
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

    statusMessage.textContent = `${cycleType} (${formatTime(remainingTime)})`;

    if (remainingTime <= 1) {
        setTimeout(() => {
            alarmSound.play();

            const originalTitle = document.title;
            let flashInterval = setInterval(() => {
                document.title = (document.title === originalTitle) ? 'Time\'s Up!' : originalTitle;
            }, 1000);

            setTimeout(() => {
                clearInterval(flashInterval);
                document.title = originalTitle;
            }, 5000);
        }, 500);
    }

    updateTotalTime(); // Update the total time
}

function updateRestTimer() {
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedTime);

    let remainingTime = restTime - elapsedTime;
    statusMessage.textContent = `Rest Time (${formatTime(remainingTime)})`;

    if (elapsedTime >= restTime) {
        stopRest();
        updateTotalTime(); // Update total time when rest timer completes
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

    updateTotalTime(); // Update the total time
}

function updateTotalTime() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

    if (running && !isResting && !isBreaking) {
        totalWorkSeconds = elapsedSeconds;
    } else if (!running && isResting) {
        totalRestSeconds = elapsedSeconds;
    } else if (!running && isBreaking) {
        totalBreakSeconds = elapsedSeconds;
    }

    const totalWorkFormatted = formatTime(totalWorkSeconds);
    const totalRestFormatted = formatTime(totalRestSeconds);
    const totalBreakFormatted = formatTime(totalBreakSeconds);

    totalTimerDisplay.textContent = `Total Work: ${totalWorkFormatted} | Total Rest: ${totalRestFormatted} | Total Break: ${totalBreakFormatted}`;
}

function startRest() {
    isResting = true;
    isBreaking = false; // Ensure break timer is not active
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
    isResting = false; // Ensure rest timer is not active
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
        pauseButton.textContent = 'Resume'; 
    }
});

resetButton.addEventListener('click', resetTimer);

function initializeTotalTimer() {
    totalTimerDisplay.textContent = `Total Work: ${formatTime(totalWorkSeconds)} | Total Rest: ${formatTime(totalRestSeconds)} | Total Break: ${formatTime(totalBreakSeconds)}`;
    requestAnimationFrame(updateTotalTimer);
}

initializeTotalTimer();

document.addEventListener("DOMContentLoaded", function() {
    const footerContainer = document.getElementById("footerContainer");
    const copyrightText = document.createElement("p");
    const currentYear = new Date().getFullYear();
    copyrightText.textContent = `© ${currentYear} BreakBound by Taylor Bisset`;
    footerContainer.appendChild(copyrightText);
});
