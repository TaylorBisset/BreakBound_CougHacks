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

/*

minutesToSeconds
startTimer 
pauseTimer 
resumeTimer 
resetTimer 
updateTimer 
formatTime 

*/
