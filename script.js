let timer;
let isRunning = false;
let timeLeft;
let currentMode = 'focus'; // 'focus', 'shortBreak', 'longBreak'

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const focusTimeInput = document.getElementById('focusTime');
const shortBreakInput = document.getElementById('shortBreak');
const longBreakInput = document.getElementById('longBreak');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    timeLeft = getTimeInSeconds(currentMode);
    updateDisplay();
    updateBackground();

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert(`Waktu habis! Saatnya ${currentMode === 'focus' ? 'istirahat' : 'kembali bekerja'}.`);
            switchMode();
        }
    }, 1000);
}

function switchMode() {
    if (currentMode === 'focus') {
        currentMode = 'shortBreak';
    } else if (currentMode === 'shortBreak') {
        currentMode = 'focus';
    }
    // Jika ingin menambahkan long break, bisa menggunakan logika tambahan di sini
    timeLeft = getTimeInSeconds(currentMode);
    updateDisplay();
    updateBackground();
}

function getTimeInSeconds(mode) {
    if (mode === 'focus') {
        return parseInt(focusTimeInput.value) * 60;
    } else if (mode === 'shortBreak') {
        return parseInt(shortBreakInput.value) * 60;
    } else if (mode === 'longBreak') {
        return parseInt(longBreakInput.value) * 60;
    }
    return 0;
}

function updateBackground() {
    if (currentMode === 'focus') {
        document.body.style.backgroundImage = "url('images/focus-background.jpg')"; // Ganti dengan path gambar fokus
    } else if (currentMode === 'shortBreak') {
        document.body.style.backgroundImage = "url('images/short-break-background.jpg')"; // Ganti dengan path gambar istirahat pendek
    } else if (currentMode === 'longBreak') {
        document.body.style.backgroundImage = "url('images/long-break-background.jpg')"; // Ganti dengan path gambar istirahat panjang
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    currentMode = 'focus';
    timeLeft = getTimeInSeconds(currentMode);
    updateDisplay();
    updateBackground();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Tampilkan waktu awal
resetTimer();