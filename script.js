let scoreA = 0;
let scoreB = 0;
let half = 1;  // 1 for first half, 2 for second half
let currentTime = 0; // starts from 0 seconds
let extraMinutes = 0;
let timerInterval = null;
let timerSpeed = 10 * 60; // scale to finish 45 minutes in 10 real minutes

// Display update
function updateDisplay() {
  const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
  const seconds = String(currentTime % 60).padStart(2, '0');
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  document.getElementById("extraTime").textContent = extraMinutes > 0 ? `+${extraMinutes}` : '';
}

// Score controls
function incrementScoreA() { scoreA++; document.getElementById("scoreA").textContent = scoreA; }
function decrementScoreA() { if (scoreA > 0) scoreA--; document.getElementById("scoreA").textContent = scoreA; }
function incrementScoreB() { scoreB++; document.getElementById("scoreB").textContent = scoreB; }
function decrementScoreB() { if (scoreB > 0) scoreB--; document.getElementById("scoreB").textContent = scoreB; }

// Timer controls
function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      currentTime++;
      if ((half === 1 && currentTime >= 45 * 60) || (half === 2 && currentTime >= 90 * 60)) {
        stopTimer();
        return;
      }
      if (currentTime >= (half * 45 * 60) && extraMinutes > 0) {
        currentTime -= 60;  // Add an extra minute
        extraMinutes--;
      }
      updateDisplay();
    }, (1000 * 60) / timerSpeed); // scaled time
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  currentTime = (half === 1) ? 0 : 45 * 60;
  extraMinutes = 0;
  updateDisplay();
}

function addExtraTime(event) {
  event.preventDefault();
  extraMinutes = parseInt(document.getElementById("extraTimeInput").value) || 0;
  document.getElementById("extraTimeInput").value = '';
  updateDisplay();
}

// Start second half from 45:00
function setSecondHalf() {
  resetTimer();
  half = 2;
  currentTime = 45 * 60;
  updateDisplay();
}

// Set custom time
function setCustomTime() {
  const customMinutes = prompt("Enter start time in minutes:", "0");
  if (!isNaN(customMinutes) && customMinutes !== null) {
    currentTime = parseInt(customMinutes) * 60;
    half = currentTime >= 45 * 60 ? 2 : 1;
    updateDisplay();
  }
}

// Initial display setup
updateDisplay();
