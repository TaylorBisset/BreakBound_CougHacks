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

/*
// FUNCTIONS 

minutesToSeconds
startTimer 
pauseTimer 
resumeTimer 
resetTimer 
updateTimer 
formatTime 

*/
