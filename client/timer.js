// Module import
import { getAllWorkouts } from './index.js';

// Sound for timer alerts
const sound = new Audio('./audios/timerSound.ogg');

// Global variables
let workoutList = [];
let timeLeft;
let timerInterval;
let isRunning = false;
let totalDuration;

// Function to add event listeners
function addEventListeners() {
  // Start/Stop button event listener
  const startStopBtn = document.getElementById('startStopBtn');
  startStopBtn.addEventListener('click', function () {
    if (!isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  // Reset button event listener
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', function () {
    resetTimer();
  });
}

// Function to calculate total HIIT duration
function calcHiitDuration(workouts) {
  return workouts.reduce((sum, obj) => sum + obj.duration, 0);
}

// Variable to track the elapsed time when the timer is stopped
let elapsedTime = 0;

// Function to start the timer
function startTimer() {
  const timerDisplay = document.getElementById('timer');
  const startStopBtn = document.getElementById('startStopBtn');

  // Set timeLeft to totalDuration minus the elapsed time
  timeLeft = totalDuration - elapsedTime;

  isRunning = true;
  startStopBtn.textContent = 'Stop';
  timerDisplay.textContent = timeLeft;
  timerInterval = setInterval(function () {
    sound.play();
    timeLeft--;
    elapsedTime++; // Increment elapsed time
    timerDisplay.textContent = timeLeft;
    updateCurrentObject();

    if (timeLeft === 0) {
      stopTimer();
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  sound.pause();
  const startStopBtn = document.getElementById('startStopBtn');
  isRunning = false;
  startStopBtn.textContent = 'Start';
  clearInterval(timerInterval);
}

// Function to reset the timer
function resetTimer() {
  const timerDisplay = document.getElementById('timer');
  const currentObjectDisplay = document.getElementById('currentObject');
  stopTimer();
  timeLeft = totalDuration;
  elapsedTime = 0; // Reset elapsed time
  timerDisplay.textContent = timeLeft;
  currentObjectDisplay.textContent = '';
}

// Function to update the current workout object displayed
function updateCurrentObject() {
  const currentObjectDisplay = document.getElementById('currentObject');
  let cumulativeDuration = 0;
  let currentObject = '';

  for (let i = 0; i <= workoutList.length; i++) {
    cumulativeDuration += workoutList[i].duration;
    if (timeLeft <= cumulativeDuration) {
      currentObject = workoutList[i].name;
      break;
    }
  }

  currentObjectDisplay.textContent = currentObject;
}

// Function to fetch workouts for a clicked HIIT
export async function getclickedWorkouts(clickedHiit) {
  const workouts = await getAllWorkouts();

  const filteredWorkouts = workouts.filter((workout) => workout.hiits_id === clickedHiit);

  totalDuration = calcHiitDuration(filteredWorkouts);
  workoutList = filteredWorkouts.reverse(); // Reverse the array

  // Reset timeLeft to 0 before setting it to the total duration
  timeLeft = 0;

  // Clear description when a different HIIT is clicked
  const currentDescriptionDisplay = document.getElementById('currentDescription');
  currentDescriptionDisplay.textContent = ''; // Clear description

  // Ensure timer starts from 0
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = timeLeft;
}

// Function to initialize event listeners
export function start() {
  addEventListeners();
}
