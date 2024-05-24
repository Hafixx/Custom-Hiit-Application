// Define the sound for timer alerts
const sound = new Audio('./audios/timerSound.ogg');

// Object to hold references to UI elements
const el = {};

// Array to store selected workout options
let selectedOptions = [];

// Interval ID for the timer
let timerInterval;

// Variable to track elapsed time
let elapsedTime = 0;

// Total time for the timer (constant)
const totalTimeSeconds = 0;

// Current timer value
let currentTimer = 0;

// Function to prepare handles to UI elements
function prepareHandles() {
  // Assigning UI elements to variables
  el.newWorkout = document.querySelector('#newWorkout');
  el.startBtn = document.querySelector('#startBtn');
  el.stopBtn = document.querySelector('#stopBtn');
  el.resetBtn = document.querySelector('#resetBtn2');
  el.createdWorkout = document.querySelector('#createdWorkout');
  el.workoutName = document.querySelector('#workoutName');
  el.workoutDuration = document.querySelector('#workoutDuration');
  el.workoutDescription = document.querySelector('#workoutDescription');
  el.addWorkoutBtn = document.querySelector('#addWorkoutBtn');
  el.clock = document.querySelector('#clock');
  el.timer = document.querySelector('#clock');
}

// import { showScreen } from './index.js';
// Function to add event listeners to UI elements
function addEventListeners() {
  // Event listener for adding a custom workout
  el.addWorkoutBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    addCustomWorkout();
    saveToLocalStorage();
  });

  // Event listener for starting the timer
  el.startBtn.addEventListener('click', () => {
    // showScreen('timer');
    startTimer();
    saveToLocalStorage();
  });

  // Event listener for stopping the timer
  el.stopBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    stopTimer();
    saveToLocalStorage();
  });

  // Event listener for resetting the timer
  el.resetBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    resetCreateTimer();
    saveToLocalStorage();
  });
}

// Function to add a custom workout to the selected options
function addCustomWorkout() {
  // Retrieve input values
  const name = el.workoutName.value.trim();
  const duration = parseInt(el.workoutDuration.value);
  const description = el.workoutDescription.value.trim();
  const validationMessage = document.getElementById('validationMessage');

  // Validate input values
  if (name === '' || isNaN(duration) || duration <= 0) {
    validationMessage.style.display = 'block';
    return;
  } else {
    validationMessage.style.display = 'none';
  }

  // Add the workout to selected options
  selectedOptions.push({ name, duration, description });

  // Calculate total time and update timer display
  const totalTimeSeconds = selectedOptions.reduce((total, workout) => total + workout.duration, 0);
  updateTimerDisplay(totalTimeSeconds);

  // Create and append list item for the workout
  const workoutList = document.querySelector('#workoutList');
  const li = document.createElement('li');
  // Creating spans for each detail
  const nameSpan = document.createElement('span');
  nameSpan.classList.add('workout-name');
  nameSpan.textContent = name;

  const durationSpan = document.createElement('span');
  durationSpan.classList.add('workout-duration');
  durationSpan.textContent = `${duration} seconds`;

  const descriptionSpan = document.createElement('span');
  descriptionSpan.classList.add('workout-description');
  descriptionSpan.textContent = description;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn', 'btn', 'btn-danger');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash-alt');
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.addEventListener('click', () => deleteWorkout(li));

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn', 'btn', 'btn-primary');
  const editIcon = document.createElement('i');
  editIcon.classList.add('fas', 'fa-edit');
  editBtn.appendChild(editIcon);
  editBtn.addEventListener('click', () => editWorkout(li, name, duration, description));

  // Appending spans to the list item
  li.appendChild(nameSpan);
  li.appendChild(document.createTextNode(' - '));
  li.appendChild(durationSpan);
  li.appendChild(document.createTextNode(' ('));
  li.appendChild(descriptionSpan);
  li.appendChild(document.createTextNode(')'));
  li.appendChild(document.createTextNode(' '));
  li.appendChild(deleteBtn);
  li.appendChild(document.createTextNode(' '));
  li.appendChild(editBtn);

  workoutList.appendChild(li);

  // Clear input fields
  el.workoutName.value = '';
  el.workoutDuration.value = '';
  el.workoutDescription.value = '';
}

// Function to start the timer
function startTimer() {
  // Calculate total duration of all selected workouts
  const totalDuration = selectedOptions.reduce((total, workout) => workout && workout.duration ? total + workout.duration : total, 0);
  currentTimer = Math.max(totalDuration - elapsedTime, 0);
  el.startBtn.disabled = true;

  let currentWorkoutIndex = 0; // Track the index of the current workout
  let remainingTime = 0; // Initialize remainingTime to 0

  // Check if there are any workouts in the selectedOptions array
  if (selectedOptions.length > 0) {
    // Ensure the first workout has a valid duration property
    const firstWorkout = selectedOptions[0];
    if (firstWorkout && firstWorkout.duration) {
      remainingTime = firstWorkout.duration; // Set the remaining time for the first workout
      const currentWorkout = selectedOptions[currentWorkoutIndex];
      document.getElementById('currentObject2').textContent = `${currentWorkout.name}`;
      document.getElementById('currentWorkoutDescription').textContent = `${currentWorkout.description}`;
    }
  }

  // Start the timer interval
  timerInterval = setInterval(() => {
    sound.play();

    currentTimer--;
    elapsedTime++;
    remainingTime--;

    // If the current workout is completed, switch to the next workout
    if (remainingTime <= 0 && currentWorkoutIndex < selectedOptions.length - 1) {
      currentWorkoutIndex++;
      const currentWorkout = selectedOptions[currentWorkoutIndex];

      // Check if the current workout has a valid duration property
      if (currentWorkout && currentWorkout.duration) {
        document.getElementById('currentObject2').textContent = `${currentWorkout.name}`;
        document.getElementById('currentWorkoutDescription').textContent = `${currentWorkout.description}`;
        remainingTime = currentWorkout.duration; // Reset remaining time for the new workout
      } else {
        // Handle the case where the current workout has an invalid duration
        console.error('Invalid workout duration encountered:', currentWorkout);
      }
    }

    // Update timer display
    updateTimerDisplay(currentTimer);

    // If all workouts are completed, clear the timer interval and current workout display
    if (currentTimer <= 0) {
      clearInterval(timerInterval);
      document.getElementById('currentObject2').textContent = ''; // Clear current workout display
      document.getElementById('currentWorkoutDescription').textContent = ''; // Clear current workout description
      el.startBtn.disabled = false;

      // Enable the startBtn
      elapsedTime = 0; // Reset elapsedTime
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  sound.pause();
  clearInterval(timerInterval);
  el.startBtn.disabled = false;
}

// Function to delete a workout from the list
function deleteWorkout(li) {
  const workoutList = li.parentNode;
  const index = Array.from(workoutList.children).indexOf(li);

  selectedOptions.splice(index, 1);
  workoutList.removeChild(li);
  saveToLocalStorage();

  // Recalculate the total time and update the timer display
  const totalTimeSeconds = selectedOptions.reduce((total, workout) => total + workout.duration, 0);
  updateTimerDisplay(totalTimeSeconds);
}

// Function to edit a workout in the list
function editWorkout(li, currentName, currentDuration, currentDescription) {
  // Remove any existing "Confirm" button
  const existingConfirmBtn = el.addWorkoutBtn.parentNode.querySelector('.confirmBtn');
  if (existingConfirmBtn) {
    existingConfirmBtn.remove();
  }

  el.workoutName.value = currentName;
  el.workoutDuration.value = currentDuration;
  el.workoutDescription.value = currentDescription;

  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'Confirm';
  confirmBtn.classList.add('confirmBtn'); // Add a class to identify the "Confirm" button

  confirmBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const newName = el.workoutName.value.trim();
    const newDuration = parseInt(el.workoutDuration.value);
    const newDescription = el.workoutDescription.value.trim();

    if (newName === '' || isNaN(newDuration) || newDuration <= 0) {
      document.getElementById('validationMessage').style.display = 'block';
      return;
    } else {
      document.getElementById('validationMessage').style.display = 'none';
    }

    const workoutList = li.parentNode;
    const index = Array.from(workoutList.children).indexOf(li);
    selectedOptions[index] = { name: newName, duration: newDuration, description: newDescription };

    workoutList.removeChild(li);
    addCustomWorkout();
    saveToLocalStorage();

    // Remove the "Confirm" button after confirming the edit
    confirmBtn.remove();
  });

  el.addWorkoutBtn.parentNode.insertBefore(confirmBtn, el.addWorkoutBtn.nextSibling);
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  el.timer.textContent = ` ${display}`;
}

// Function to reset the timer and workout list
function resetCreateTimer() {
  clearInterval(timerInterval);
  currentTimer = totalTimeSeconds;
  updateTimerDisplay(currentTimer);
  el.startBtn.disabled = false;
  selectedOptions = [];
  const workoutList = document.querySelector('#workoutList');
  workoutList.innerHTML = '';
  elapsedTime = 0; // Reset elapsedTime here

  // Clear current workout display
  document.getElementById('currentObject2').textContent = '';
}

// Function to save selected options to local storage
function saveToLocalStorage() {
  localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
}

// Function to load selected options from local storage
function loadFromLocalStorage() {
  const storedOptions = localStorage.getItem('selectedOptions');
  if (storedOptions) {
    selectedOptions = JSON.parse(storedOptions);
    selectedOptions.forEach((option) => {
      const { name, duration, description } = option;
      const workoutList = document.querySelector('#workoutList');
      const li = document.createElement('li');

      // Creating spans for each detail
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('workout-name');
      nameSpan.textContent = name;

      const durationSpan = document.createElement('span');
      durationSpan.classList.add('workout-duration');
      durationSpan.textContent = `${duration} seconds`;

      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('workout-description');
      descriptionSpan.textContent = description;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn', 'btn', 'btn-danger');
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash-alt');
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.addEventListener('click', () => deleteWorkout(li));

      const editBtn = document.createElement('button');
      editBtn.classList.add('edit-btn', 'btn', 'btn-primary');
      const editIcon = document.createElement('i');
      editIcon.classList.add('fas', 'fa-edit');
      editBtn.appendChild(editIcon);
      editBtn.addEventListener('click', () => editWorkout(li, name, duration, description));

      // Appending spans and buttons to the list item
      li.appendChild(nameSpan);
      li.appendChild(document.createTextNode(' - '));
      li.appendChild(durationSpan);
      li.appendChild(document.createTextNode(' ('));
      li.appendChild(descriptionSpan);
      li.appendChild(document.createTextNode(')'));
      li.appendChild(document.createTextNode(' '));
      li.appendChild(deleteBtn);
      li.appendChild(document.createTextNode(' '));
      li.appendChild(editBtn);

      workoutList.appendChild(li);
    });
  }
}

// Initialization function
export function createInit() {
  prepareHandles();
  loadFromLocalStorage();
  addEventListeners();
}
