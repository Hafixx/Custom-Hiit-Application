import { getAllWorkouts } from './index.js';


let workoutList = [];
let timeLeft;
let timerInterval;
let isRunning = false;
let totalDuration;

function addEventListeners() {
  const startStopBtn = document.getElementById('startStopBtn');
  const resetBtn = document.getElementById('resetBtn');
  startStopBtn.addEventListener('click', function () {
    if (!isRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  });

  resetBtn.addEventListener('click', function () {
    resetTimer();
  });
}

function calcHiitDuration(workouts) {
  const res = workouts.reduce(
    (sum, obj) => sum + obj.duration,
    0,
  );
  return res;
}


let elapsedTime = 0; // Variable to track the elapsed time when the timer is stopped

function startTimer() {
  const timerDisplay = document.getElementById('timer');
  const startStopBtn = document.getElementById('startStopBtn');

  // Set timeLeft to totalDuration minus the elapsed time
  timeLeft = totalDuration - elapsedTime;

  isRunning = true;
  startStopBtn.textContent = 'Stop';
  timerDisplay.textContent = timeLeft;
  timerInterval = setInterval(function () {
    timeLeft--;
    elapsedTime++; // Increment elapsed time
    timerDisplay.textContent = timeLeft;
    updateCurrentObject();

    if (timeLeft === 0) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  const startStopBtn = document.getElementById('startStopBtn');
  isRunning = false;
  startStopBtn.textContent = 'Start';
  clearInterval(timerInterval);
}

function resetTimer() {
  const timerDisplay = document.getElementById('timer');
  const currentObjectDisplay = document.getElementById('currentObject');
  stopTimer();
  timeLeft = totalDuration;
  elapsedTime = 0; // Reset elapsed time
  timerDisplay.textContent = timeLeft;
  currentObjectDisplay.textContent = '';
}


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

export async function getclickedWorkouts(clickedHiit) {
  const workouts = await getAllWorkouts();

  const filteredWorkouts = workouts.filter(
    (workout) => workout.hiits_id === clickedHiit,
  );

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


export function start() {
  addEventListeners();
}
