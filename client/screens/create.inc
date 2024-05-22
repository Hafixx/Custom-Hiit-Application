<section class=card>
  <form id="workout-form">
<section id="newWorkout">
  <h2>Create your Custom Workout</h2>
  <p>(You can select the same workout multiple times)</p>
  <div id="workoutForm">
    <input type="text" id="workoutName" placeholder="Enter Workout Name">
    <input type="number" id="workoutDuration" placeholder="Enter Duration in Seconds">
     <input type="text" id="workoutDescription" placeholder="Enter Description">
    <button id="addWorkoutBtn">Add</button>
  </div>
  <section id="createdWork">
    <div>Previously Selected Workouts:</div>
    <ul id="workoutList"></ul>
  </section>
      <button id="startWorkoutBtn">Start Workout </button>
  <button id="resetBtn2">Reset </button>

  
<div id="validationMessage" style="display: none; color: red;">Please enter a valid workout name, duration, and description.</div>
<head>
  <!-- Other meta tags and stylesheets -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>