const el = {};
let selectedOptions = [];
let timerInterval;
let elapsedTime = 0;
let totalTimeSeconds = 0;
let currentTimer = 0;
let currentWorkoutIndex = 0;
let remainingTime = 0;

function prepareHandles() {
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

function addEventListeners() {
  el.addWorkoutBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    addCustomWorkout();
    saveToLocalStorage();
  });

  el.startBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    startTimer();
    saveToLocalStorage();
  });

  el.stopBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    stopTimer();
    saveToLocalStorage();
  });

  el.resetBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    resetCreateTimer();
    saveToLocalStorage();
  });
}

function addCustomWorkout() {
  const name = el.workoutName.value.trim();
  const duration = parseInt(el.workoutDuration.value);
  const description = el.workoutDescription.value.trim();
  const validationMessage = document.getElementById('validationMessage');

  if (name === '' || isNaN(duration) || duration <= 0) {
    validationMessage.style.display = 'block';
    return;
  } else {
    validationMessage.style.display = 'none';
  }

  selectedOptions.push({ name, duration, description });

  totalTimeSeconds = selectedOptions.reduce((total, workout) => total + workout.duration, 0);
  updateTimerDisplay(totalTimeSeconds);

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

  el.workoutName.value = '';
  el.workoutDuration.value = '';
  el.workoutDescription.value = '';
}

function startTimer() {
  if (selectedOptions.length === 0) {
    console.log('No workouts selected. Please add workouts before starting the timer.');
    return;
  }

  totalTimeSeconds = selectedOptions.reduce((total, workout) => workout && workout.duration ? total + workout.duration : total, 0);
  currentTimer = Math.max(totalTimeSeconds - elapsedTime, 0);
  el.startBtn.disabled = true;

  currentWorkoutIndex = 0; // Reset current workout index
  remainingTime = selectedOptions[currentWorkoutIndex].duration;

  document.getElementById('currentObject2').textContent = `${selectedOptions[currentWorkoutIndex].name}`;
  document.getElementById('currentWorkoutDescription').textContent = `${selectedOptions[currentWorkoutIndex].description}`;

  timerInterval = setInterval(() => {
    currentTimer--;
    elapsedTime++;
    remainingTime--;

    // If the current workout is completed, switch to the next workout
    if (remainingTime <= 0 && currentWorkoutIndex < selectedOptions.length - 1) {
      currentWorkoutIndex++;
      const currentWorkout = selectedOptions[currentWorkoutIndex];

      document.getElementById('currentObject2').textContent = `${currentWorkout.name}`;
      document.getElementById('currentWorkoutDescription').textContent = `${currentWorkout.description}`;
      remainingTime = currentWorkout.duration; // Reset remaining time for the new workout
    }

    // Update timer display
    updateTimerDisplay(currentTimer);

    // If all workouts are completed, clear the timer interval and current workout display
    if (currentTimer <= 0) {
      clearInterval(timerInterval);
      document.getElementById('currentObject2').textContent = ''; // Clear current workout display
      document.getElementById('currentWorkoutDescription').textContent = ''; // Clear current workout description
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  el.startBtn.disabled = false;
}

function deleteWorkout(li) {
  const workoutList = li.parentNode;
  const index = Array.from(workoutList.children).indexOf(li);

  selectedOptions.splice(index, 1);
  workoutList.removeChild(li);
  saveToLocalStorage();

  // Recalculate the total time and update the timer display
  totalTimeSeconds = selectedOptions.reduce((total, workout) => total + workout.duration, 0);
  updateTimerDisplay(totalTimeSeconds);
}

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

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  el.timer.textContent = `Total Time: ${display}`;
}

function resetCreateTimer() {
  clearInterval(timerInterval);
  currentTimer = 0;
  updateTimerDisplay(currentTimer);
  el.startBtn.disabled = false;
  selectedOptions = [];
  const workoutList = document.querySelector('#workoutList');
  workoutList.innerHTML = '';
  elapsedTime = 0; // Reset elapsedTime here

  // Clear current workout display
  document.getElementById('currentObject2').textContent = '';
  document.getElementById('currentWorkoutDescription').textContent = '';
}

function saveToLocalStorage() {
  localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
  localStorage.setItem('elapsedTime', elapsedTime.toString());
}

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
  const storedElapsedTime = localStorage.getItem('elapsedTime');
  if (storedElapsedTime) {
    elapsedTime = parseInt(storedElapsedTime, 10);
  }
}

export function createInit() {
  prepareHandles();
  addEventListeners();
  loadFromLocalStorage();
}
