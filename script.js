let timerInterval;
let secondsElapsed = 0;
let isSecondHalf = false;
let customStartTime = 0;
let extraTime = 0; // Track extra time in seconds

// Format time as MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Start the timer
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").innerText = formatTime(secondsElapsed);

        // Update the extra time display if applicable
        if (extraTime > 0) {
            document.getElementById("extra-time").innerText = `+${Math.floor(extraTime / 60)}:${extraTime % 60 < 10 ? '0' : ''}${extraTime % 60}`;
        }
    }, (12 * 1000) / 45); // Speed up: 12 min real-time = 45 game min
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    secondsElapsed = isSecondHalf ? 45 * 60 : 0; // Reset to 0 or 45 min based on the half
    extraTime = 0; // Reset extra time
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
    document.getElementById("extra-time").style.display = "none"; // Hide extra time
}

// Set Extra Time
function setExtraTime() {
    const extraTimeInput = document.getElementById("extra-time-input");
    const extraTimeValue = parseInt(extraTimeInput.value, 10);

    if (!isNaN(extraTimeValue) && extraTimeValue > 0) {
        extraTime = extraTimeValue * 60; // Convert minutes to seconds
        document.getElementById("extra-time").style.display = "block"; // Show extra time
        document.getElementById("extra-time").innerText = `+${extraTimeValue}:00`;
    } else {
        document.getElementById("extra-time").style.display = "none"; // Hide if invalid input
    }
}

// Start the timer from the second half (45 min)
function startSecondHalf() {
    isSecondHalf = true;
    secondsElapsed = 45 * 60; // Start from 45 minutes
    startTimer();
}

// Start the timer from a custom minute
function startCustomTimer() {
    const startTime = prompt("Enter start time in minutes (e.g., 90 for extra time):");
    if (!isNaN(startTime) && startTime !== null && startTime.trim() !== "") {
        customStartTime = parseInt(startTime, 10) * 60;
        secondsElapsed = customStartTime;
        startTimer();
    }
}

// Event Listeners for buttons
document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("stop-btn").addEventListener("click", stopTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);
document.getElementById("set-extra-time-btn").addEventListener("click", setExtraTime);
document.getElementById("second-half-btn").addEventListener("click", startSecondHalf);
document.getElementById("custom-time-btn").addEventListener("click", startCustomTimer);

// Ensure the scoreboard updates correctly on load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("team1-score").value = 0;
    document.getElementById("team2-score").value = 0;
    document.getElementById("timer").innerText = formatTime(secondsElapsed);
});
