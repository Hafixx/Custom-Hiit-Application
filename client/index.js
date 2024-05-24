
// Importing necessary functions from external modules
import { start, getclickedWorkouts } from './timer.js';
import { createInit } from './create.js';

// Array containing page configurations
const pages = [
  {
    screen: 'home',
    title: 'Home',
  },
  {
    screen: 'create',
    title: 'Create',
  },
  {
    screen: 'about',
    title: 'About',
  },
  {
    screen: 'workouts',
    title: 'Workouts',
  },
  {
    screen: 'timer',
    title: 'timer',
  },
];

// Object to hold references to UI elements
const ui = {};

// Object to store templates
const templates = {};

// Function to get references to main UI elements
function getHandles() {
  ui.mainnav = document.querySelector('header > nav');
  ui.main = document.querySelector('main');
  ui.screens = {};
  ui.getScreens = () => Object.values(ui.screens);
  ui.getButtons = () => Object.values(ui.buttons);
  templates.screen = document.querySelector('#screen-template');
}

// Function to build screens based on page configurations
function buildScreens() {
  const template = templates.screen;
  for (const page of pages) {
    const section = template.content.cloneNode(true).firstElementChild;
    section.dataset.id = `sect-${page.screen}`;
    section.dataset.name = page.screen;
    ui.main.append(section);
    ui.screens[page.screen] = section;
  }
}

// Function to set up navigation buttons
function setupNav() {
  ui.buttons = {};
  for (const page of pages) {
    if (page.screen === 'error' || page.screen === 'workouts' || page.screen === 'timer') { continue; }
    const button = document.createElement('button');
    button.classList.add('btn');
    button.textContent = page.title;
    button.dataset.screen = page.screen;
    button.addEventListener('click', show);
    ui.mainnav.append(button);
    ui.buttons[page.screen] = button;
  }
}

// Function to show the timer screen when the "Start Workout" button is clicked
function showTimer() {
  const showTimer = document.getElementById('startWorkoutBtn');
  showTimer.addEventListener('click', () => {
    showScreen('timer');
  });
}

// Function to hide all screens
function hideAllScreens() {
  for (const screen of ui.getScreens()) {
    hideElement(screen);
  }
}

// Function to store current state in history
function storeState() {
  const stateObj = { screen: ui.current };
  const url = `#/${ui.current}`;
  history.pushState(stateObj, ui.current, url);
}

// Function to show a specific screen
function show(event) {
  ui.previous = ui.current;
  const screen = event?.target?.dataset?.screen ?? 'home';
  showScreen(screen);
  storeState();
}

// Function to show a specific screen by name
function showScreen(name) {
  hideAllScreens();
  if (!ui.screens[name]) {
    name = 'Home';
  }
  showElement(ui.screens[name]);
  ui.current = name;
  document.title = `Nutri-fit | ${name}`;
}

// Function to hide an element
function hideElement(e) {
  if (e) {
    e.classList.add('hidden');
  }
}

// Function to show an element
function showElement(e) {
  if (e) {
    e.classList.remove('hidden');
  }
}

// Function to read the current path
function readPath() {
  const path = window.location.pathname.slice(5);
  if (path) {
    return path;
  }
  return 'home';
}

// Function to load the initial screen based on the URL
function loadinitialScreen() {
  ui.current = readPath();
  showScreen(ui.current);
}

// Function to fetch screen content from the server
async function fetchScreenContent(s) {
  const url = `/screens/${s}.inc`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.text();
  } else {
    return `sorry, a ${response.status} error ocurred retrieving section data for: <code>${url}</code>`;
  }
}

// Function to fetch and display content for all screens
async function getContent() {
  for (const page of pages) {
    const content = await fetchScreenContent(page.screen);
    const article = document.createElement('article');
    article.innerHTML = content;
    article.classList.add(page.screen);
    ui.screens[page.screen].append(article);
  }
}

// Function to fetch all workouts from the server
export async function getAllWorkouts() {
  const response = await fetch('/Workouts');
  let workouts;
  if (response.ok) {
    workouts = await response.json();
    return workouts;
  } else {
    console.error('Failed to fetch workouts:', response.status);
  }
}

// Function to fetch all Hiits from the server
async function getAllHiits() {
  const response = await fetch('/Hiits');
  let hiits;
  if (response.ok) {
    hiits = await response.json();
    return hiits;
  } else {
    console.error('Failed to fetch Hiits:', response.status);
  }
}

// Function to create a card for a Hiit
function createHiitCard(hiit) {
  const card = document.createElement('div');
  card.classList.add('hiit-card');
  const title = document.createElement('h2');
  title.textContent = hiit.name;
  card.appendChild(title);
  const description = document.createElement('p');
  description.textContent = hiit.description;
  card.appendChild(description);
  card.addEventListener('click', () => populateWorkoutPage(hiit));
  return card;
}

// Function to populate the workouts page with workouts corresponding to a Hiit
async function populateWorkoutPage(hiit) {
  showScreen('workouts');
  await displayClickedHiitWorkouts(hiit.hiits_id);
  await getclickedWorkouts(hiit.hiits_id);
}

// Function to display all Hiits
async function displayHiits() {
  const hiits = await getAllHiits();
  const hiitsContainer = document.querySelector('.hiits-container');
  if (hiitsContainer) {
    hiitsContainer.innerHTML = ''; // Clear previous content
    for (const hiit of hiits) {
      const card = createHiitCard(hiit);
      hiitsContainer.appendChild(card);
    }
  } else {
    console.error('Hiits container not found.');
  }
}

// Function to display workouts corresponding to a clicked Hiit
export async function displayClickedHiitWorkouts(clickedHiit) {
  const workouts = await getAllWorkouts();
  const filteredWorkouts = workouts.filter(
    (workout) => workout.hiits_id === clickedHiit,
  );
  const workoutsContainer = document.querySelector('.workouts-container');
  if (workoutsContainer) {
    workoutsContainer.innerHTML = ''; // Clear previous content
    const ul = document.createElement('ul');
    filteredWorkouts.forEach((workout) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="workout-info">
          <div class="workout-name">${workout.name}</div>
          <div class="workout-duration

">${workout.duration} seconds</div>
          <div class="workout-description">${workout.description}</div>
        </div>
      `;
      ul.appendChild(li);
    });
    workoutsContainer.appendChild(ul);
  } else {
    console.error('Workouts container not found.');
  }
}

// Initialization function
async function init() {
  getHandles();
  buildScreens();
  setupNav();
  await getContent();
  loadinitialScreen();
  await displayHiits(); // Wait for displayHiits to finish fetching and displaying HIITs
  start();
  createInit();
  showTimer();
}

init(); // Call the initialization function
