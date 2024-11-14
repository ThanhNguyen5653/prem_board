let timerInterval;
let secondsElapsed = 0;
let isSecondHalf = false;
let customStartTime = 0;

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").innerText = formatTime(secondsElapsed);
    }, (12 * 1000) / 45); // Speed up: 12 min = 45 game min
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    secondsElapsed = isSecondHalf ? 45 * 60 : 0;
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
    document.getElementById("extra-time").style.display = "none";
}

function setExtraTime() {
    const extraTime = parseInt(document.getElementById("extra-time-input").value, 10);
    if (!isNaN(extraTime) && extraTime > 0) {
        document.getElementById("extra-time").style.display = "block";
        document.getElementById("extra-time").innerText = `+${extraTime}`;
    }
}

function startSecondHalf() {
    isSecondHalf = true;
    secondsElapsed = 45 * 60;
    startTimer();
}

function startCustomTimer() {
    const startTime = prompt("Enter start time in minutes:");
    if (!isNaN(startTime) && startTime !== null) {
        customStartTime = parseInt(startTime, 10) * 60;
        secondsElapsed = customStartTime;
        startTimer();
    }
}
