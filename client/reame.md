Sure, here's a more detailed version of the README.md file:

# HIIT up2125745

## Project Name
Nutri-fit

## Usage
To get started with Nutri-fit, follow these steps:

**Navigate to the Workout Creation Page**: Upon visiting the Nutri-fit web application, you'll be directed to the main application interface. Locate and click on the "Create Workout" button or link to access the workout creation page.
**Fill in the Workout Details**: On the workout creation page, you'll find a form with fields for entering the exercise name, duration, and description. Provide the necessary information for your desired exercise, ensuring that all required fields are filled out correctly.
**Add the Exercise to Your Routine**: Once you've entered the exercise details, click the "Add Exercise" or "Submit" button to add the exercise to your workout routine. The exercise will be displayed in the list view below the form.
**Manage Your Workout Routine**: From the list view, you can edit or delete any exercise in your routine by clicking on the corresponding "Edit" or "Delete" buttons or icons.
**Start Your Workout**: When you're ready to begin your workout, click on the "Start Workout" button or link. This will take you to the workout execution screen, where you'll see the exercise details, timer, and start/pause controls.
**Follow the Workout Instructions**: The workout execution screen will guide you through your routine, displaying the current exercise name, description, and duration. Use the start and pause buttons to control the timer as you progress through each exercise.
**Repeat or Create a New Routine**: After completing a workout, you can either repeat the same routine or navigate back to the workout creation page to design a new one.
**Explore Pre-designed HIIT Workouts**: If you prefer structured, high-intensity workouts, you can access the pre-designed HIIT workouts section and select a routine to follow. The execution process for these workouts is similar to the custom-created routines.


## Key features

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

## AI

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

The AI-generated suggestions and code snippets were instrumental in developing the core features of Nutri-fit, allowing me to create a functional and user-friendly workout application. The responses helped me implement input validation, dynamic list updates, exercise progression, and timer controls, ensuring a smooth and intuitive user experience.