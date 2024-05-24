## Project Name

Nutri-fit

## Description
Nutri-fit is a user-friendly web application that allows fitness enthusiasts to create, customize, and manage their workout routines with ease. The app caters to individuals who prefer tailoring their exercise regimes to their specific needs while also providing access to a collection of pre-designed High-Intensity Interval Training (HIIT) workouts.

## Table of Contents

- [Installation](#installation)
- [Design](#design)
- [Ui](#ui)
- [Usage](#usage)
- [Features](#features)
- [AI](#Ai)
- [Challenges](#challenges)


## Installation

Before you start, ensure you have a good code editor like Visual Studio Code.

1. Clone the repository:
    ```bash
     git clone https://github.com/Hafixx/Custom-Hiit-Application
    ```

2. Install dependencies:
    ```bash
    npm i 
    ```

3. Start the application:
    ```bash
    npm start

 Open any Selected web browser of your choice and visit [http://localhost:8080/](http://localhost:8080/) to view the app.
    ```


### Design 

 I had a clear vision that streamlined the process. Starting with sketches on Figma, I chose a portrait orientation for the exercise interface, departing from the typical small box format to offer a fresh experience. Recognizing the importance of warm-ups, I integrated a rest time feature to enhance user experience. Furthermore,Each person is unique, with distinct goals, preferences, and physical attributes. That's why we've developed a holistic approach that takes into account various factors such as body type, preferred exercise intensity, and time availability to devise customized workout plans that resonate with our users on a personal level. Nutri-fit empowers fitness enthusiasts to create, modify, and manage their workout routines effortlessly, catering to individuals who prefer tailoring their exercise regimens to their specific needs. Additionally, the application offers a range of pre-designed workouts to make it even more user-friendly. Users are also given the option to pause their workout if they wish to resume later.


## Ui

The UI has a clean and minimalistic design with a white background and black text. The navigation bar and workout description boxes have a green color scheme, which may be intentional to complement the fitness theme.
Overall, this UI provides an overview of the different HIIT workout types offered by the website or application, allowing users to quickly understand the various options available and potentially navigate to specific workout pages or create their own customized workouts using the "Create" button.
1. Navigation Bar: At the top, there are three navigation buttons labeled "Home," "Create," and "About." These buttons which serve as links to different sections of the web application.



## Usage
1. **Create Workout**: Click the "Create Workout" button on the main interface.
2. **Fill Details**: Enter exercise name, duration, and description in the form.
3. **Add Exercise**: Click "Add Exercise" to include it in your routine.
4. **Manage Routine**: Edit or delete exercises from the list view.
5. **Start Workout**: Click "Start Workout" to see details, timer, and controls.
6. **Follow Instructions**: Use start and pause buttons to control the timer and follow the routine.
7. **Repeat/Create**: After finishing, repeat the routine or create a new one.
8. **Pre-designed HIIT**: Access and follow pre-designed HIIT workouts from the designated section.

## Features

### Custom Workout Creation

Nutri-fit empowers users to create personalized workout routines tailored to their specific fitness goals and preferences. The custom workout creation feature presents a user-friendly form that guides users through the process of inputting essential exercise information, including:

1. **Exercise Name**: Users can provide a descriptive name for their exercise, making it easy to identify and reference within their workout routines.
2. **Duration**: Users specify the duration of the exercise in minutes and seconds, ensuring precise timing for each exercise.
3. **Description**: Users have the freedom to provide a detailed description of the exercise, including instructions, targeted muscle groups, and any additional notes they deem necessary.

To ensure data integrity, Nutri-fit implements robust input validation mechanisms. If any of the required fields are left blank or contain invalid data, such as a non-numeric duration or an excessively long description, the app will display an error message, prompting the user to correct the input before proceeding.

Once the exercise details are successfully submitted, the custom workout is dynamically added to a user-friendly list view, allowing users to easily access and manage their previously created workouts.

### Workout Management

The workout list serves as a centralized hub for users to oversee their custom routines. From this list, users have the ability to:

1. **Edit Workouts**: Users can modify the details of their existing workouts, such as the exercise name, duration, or description, by accessing the edit functionality. This feature ensures that workouts can be adjusted to match evolving fitness goals, changing exercise preferences, or any necessary corrections.
2. **Delete Workouts**: If a user no longer requires a particular workout or wishes to remove an outdated routine, they can conveniently delete it from their list with a single click or tap, keeping their workout collection organized and up-to-date.

### Workout Execution

After creating or selecting a workout from the list, users can initiate the routine by navigating to a dedicated workout execution screen. This screen presents a comprehensive overview of the chosen workout, including:

1. **Total Workout Duration**: The app calculates and displays the total duration of the selected workout, allowing users to plan their time accordingly and ensure they can complete the entire routine without interruptions.
2. **Current Exercise**: As users progress through their workout, the app dynamically displays the name and description of the current exercise, ensuring they can follow along with the correct movements and instructions without confusion.
3. **Timer**: To enhance the workout experience, Nutri-fit incorporates a countdown timer that accurately tracks the remaining duration of the current exercise, providing users with real-time feedback on their progress and helping them transition smoothly to the next exercise.
4. **Start/Pause Controls**: Users have full control over their workout flow with intuitive "Start" and "Pause" buttons. The "Start" button initiates the timer and allows users to begin their workout, while the "Pause" button temporarily halts the timer, enabling users to take breaks or adjust their pace as needed without losing track of their progress.

### Pre-designed HIIT Workouts

In addition to the custom workout creation feature, Nutri-fit offers a collection of pre-designed High-Intensity Interval Training (HIIT) workouts. These workouts are meticulously curated by fitness experts, providing users with high-intensity, time-efficient routines that can be easily incorporated into their fitness regimes.

Users can browse and select from the available HIIT workouts, each offering a unique set of exercises and durations. The pre-designed workouts follow a similar structure to the custom workouts, with each exercise displaying its name, duration, and description. Once a HIIT workout is chosen, users can follow the same execution process as with their custom workouts, ensuring a consistent and engaging experience.


### Prompts to develop Custom Workout Creation

To implement the Custom Workout Creation feature, I utilized the following sequence of prompts:

> How can I create a form in a web application that allows users to input exercise details such as name, duration, and description? The form should have input validation to ensure valid data is entered.

The response provided guidance on using HTML forms and input fields, as well as handling form submissions with JavaScript. It also suggested using regular expressions and JavaScript functions to validate user input, ensuring that fields are not left blank and that the duration is in the correct format (e.g., minutes:seconds).

> How can I dynamically add user-created exercises to a list view in a web application? The list should be sortable and allow for editing and deleting exercises.

The response outlined methods to create and append new list items to an existing HTML list using JavaScript, allowing for dynamic updates as new exercises are added. It also suggested implementing drag-and-drop functionality to reorder the exercises and providing options to edit or delete exercises from the list.

### Prompts to develop Workout Execution

For the Workout Execution feature, I used the following prompts:

> How can I display the current exercise details (name, duration, and description) and total workout duration in a web application? The information should update dynamically as the user progresses through the workout.

The response suggested using HTML elements and JavaScript to dynamically update the content based on the selected workout and exercise data. It recommended creating separate sections or containers for the exercise details and total workout duration, and updating them accordingly as the user moves through the exercises.

> How can I implement a countdown timer in a web application that tracks the duration of an exercise and automatically moves to the next exercise when the time is up?

The suggestion involved using JavaScript's built-in `setInterval` and `clearInterval` functions to create and manage a timer that updates every second and stops when the exercise duration is reached. It also proposed adding logic to automatically load the next exercise in the workout routine when the timer reaches zero.

> How can I create start and pause buttons to control the workout timer in a web application? The buttons should allow users to start, pause, and resume the timer as needed.

The response provided guidance on adding event listeners to button elements and toggling the timer functionality based on the user's interaction with the start and pause buttons. It recommended using separate functions or methods to handle the start, pause, and resume actions, and updating the timer display accordingly.

### Audio Cues
- I implemented audio cue using a sound I created with my voice on audacity. This can help significantly enhance the user experience of SeeFit by providing pace and cadence for exercises that involve rhythmic movements such as jumping jacks or mountain jacks to keep users engaged through out the activity. With this being implemented, the users do not constantly have to stare at their device to check for time as they know the exercise time has elapsed when the audio cue sound stops. This aligns with the Nielsen's 1st usability Heuristic which suggests "visibility of system status" as the system always keeps users informed about what's going on in the app.
  
## Data Integration
Nutri-fit efficiently integrates a database and local storage for seamless data management:

Database: Handles user authentication, profiles, and workout routines.
Local Storage: Stores session data and enables offline access to cached content.


 ## Challenges
While developing Nutri-fit, I encountered a challenging issue: when the application is initially loaded, it does not allow users to start a workout right away. However, it functions correctly after the initial attempt. I believe this issue is related to the routing of the application. I am actively working to resolve this minor issue to ensure a smoother user experience.
## AI

- I utilised Ai to generate appropriate comments for my functions.

ChatGPT OpenAI. (2024)
