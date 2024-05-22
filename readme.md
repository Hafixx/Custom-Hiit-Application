
# HIIT up2125745

## Key features

### Custom Workout Creation

Nutri-fit allows users to create personalized workout routines by providing a user-friendly form to input exercise details such as name, duration, and description. This feature empowers users to tailor their fitness regimes according to their specific goals and preferences, ensuring a highly customized experience.

### Workout Management

Users can easily manage their previously created workouts through a dedicated list view. This section allows them to edit existing workouts, update exercise details, or delete unwanted routines. The intuitive interface streamlines the process of maintaining and organizing workout collections.

### Workout Execution

Once a workout is selected, users can initiate the routine by navigating to the workout execution screen. This screen displays the total workout duration, the current exercise details, and a built-in timer to track progress. Additionally, users have access to start and pause controls, enabling seamless workout flow and flexibility.

### Pre-designed HIIT Workouts

In addition to custom workout creation, Nutri-fit offers a collection of pre-designed High-Intensity Interval Training (HIIT) workouts curated by fitness experts. These time-efficient and challenging routines cater to users seeking intense, structured workouts without the need for customization.

## AI

### Prompts to develop Custom Workout Creation

To implement the Custom Workout Creation feature, I utilized the following sequence of prompts:

> How can I create a form in a web application that allows users to input exercise details such as name, duration, and description?

The response provided guidance on using HTML forms and input fields, as well as handling form submissions with JavaScript.

> How can I validate user input in a web form to ensure valid data is entered?

The suggestion involved using regular expressions and JavaScript functions to check if the input values meet certain criteria, such as non-empty fields and correct duration formats.

> How can I dynamically add user-created exercises to a list view in a web application?

The response outlined methods to create and append new list items to an existing HTML list using JavaScript, allowing for dynamic updates as new exercises are added.

### Prompts to develop Workout Execution

For the Workout Execution feature, I used the following prompts:

> How can I display the current exercise details and total workout duration in a web application?

The response suggested using HTML elements and JavaScript to dynamically update the content based on the selected workout and exercise data.

> How can I implement a countdown timer in a web application that tracks the duration of an exercise?

The suggestion involved using JavaScript's built-in `setInterval` and `clearInterval` functions to create and manage a timer that updates every second and stops when the exercise duration is reached.

> How can I create start and pause buttons to control the workout timer in a web application?

The response provided guidance on adding event listeners to button elements and toggling the timer functionality based on the user's interaction with the start and pause buttons.

The AI-generated suggestions and code snippets were instrumental in developing the core features of Nutri-fit, allowing me to create a functional and user-friendly workout application.