let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;
let lapCount = 1;

const displayHours = document.querySelector(".hours");
const displayMinutes = document.querySelector(".minutes");
const displaySeconds = document.querySelector(".seconds");
const displayMilliseconds = document.querySelector(".milliseconds");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const lapButton = document.querySelector(".lap");
const resetButton = document.querySelector(".reset");
const lapsContainer = document.querySelector(".laps-container");
const lapsList = document.querySelector(".laps");
const container = document.querySelector(".container");

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    displayHours.textContent = (hours < 10 ? "0" : "") + hours + " : ";
    displayMinutes.textContent = (minutes < 10 ? "0" : "") + minutes + " : ";
    displaySeconds.textContent = (seconds < 10 ? "0" : "") + seconds + " : ";
    displayMilliseconds.textContent = (milliseconds < 100 ? "0" : "") + Math.floor(milliseconds / 10);
}

startButton.addEventListener("click", () => {
    if (!running) {
        running = true;
        timer = setInterval(updateTime, 10);
        lapsContainer.style.overflowY = "hidden";
    }
});

stopButton.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    lapsContainer.style.overflowY = "auto";
});

lapButton.addEventListener("click", () => {
    if (!running) return;

    if (lapsList.children.length === 0) {
        lapsContainer.classList.add("active");
        lapsContainer.style.display = "block";
        container.style.justifyContent = "space-between";
    }

    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${displayHours.textContent}${displayMinutes.textContent}${displaySeconds.textContent}${displayMilliseconds.textContent}`;
    lapsList.appendChild(lapItem);
    lapCount++;

    if (lapsList.children.length > 4) {
        lapsContainer.style.overflowY = "auto";
    }
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    hours = minutes = seconds = milliseconds = lapCount = 0;

    displayHours.textContent = "00 : ";
    displayMinutes.textContent = "00 : ";
    displaySeconds.textContent = "00 : ";
    displayMilliseconds.textContent = "00";

    lapsList.innerHTML = "";
    
    lapsContainer.classList.add("collapsing");
    
    setTimeout(() => {
        lapsContainer.classList.remove("active", "collapsing");
        lapsContainer.style.display = "none";
        
        container.style.justifyContent = "center"; 
        container.style.transition = "all 0.5s ease-in-out";
        
    }, 500);
});
