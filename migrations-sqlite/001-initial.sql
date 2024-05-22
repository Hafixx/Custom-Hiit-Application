CREATE TABLE Hiits (
hiits_id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(20) NOT NULL,
description TEXT NOT NULL
);

CREATE TABLE Workouts (
workouts_id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(40) NOT NULL,
description TEXT NOT NULL,
duration INTEGER NOT NULL,
hiits_id INTEGER REFERENCES Hiits(hiits_id)
);

CREATE TABLE hiit_workouts (
hiits_id INTEGER REFERENCES Hiits(hiits_id),
workouts_id INTEGER REFERENCES Workouts(workouts_id)
);


-- Insert some sample data with various types of HIIT workouts
INSERT INTO Hiits (name, description) VALUES
    ('CrossFit WOD', 'High-intensity interval training based on CrossFit workouts, combining functional movements and varied exercises for a full-body workout.'),
    ('Interval Cycling', 'HIIT workout performed on a stationary bike, alternating between periods of intense pedaling and recovery.'),
    ('Plyometric Power', 'Explosive HIIT workout incorporating plyometric exercises like jump squats, box jumps, and burpees to build power and agility.'),
    ('Kettlebell HIIT', 'High-intensity interval training using kettlebell exercises such as swings, cleans, and snatches for strength and cardiovascular conditioning.'),
    ('Jump Rope Circuit', 'HIIT workout using a jump rope, alternating between periods of jumping and rest for a cardiovascular and coordination challenge.');

INSERT INTO Workouts (name, description, duration, hiits_id) VALUES
    ('Warm-Up', 'Prepare the body for exercise with dynamic stretching and mobility drills.', 10, 1), 
    ('Cardio Blast', 'High-intensity cardio exercises to elevate heart rate and burn calories.', 20, 1),
    ('Strength Circuit', 'Full-body strength training circuit targeting major muscle groups', 20, 1),
    ('Cool Down', 'Gradually lower heart rate and stretch major muscle groups to aid recovery.', 10, 1),

    ('Cycle Warm-Up', 'Gentle warm-up on the stationary bike to prepare for intense cycling intervals.', 10, 2), 
    ('Sprint Intervals', 'Alternate between high-intensity sprints and recovery periods.', 25, 2),
    ('Hill Climbs', 'Simulate uphill climbs on the stationary bike to build strength and endurance.', 20, 2),
    ('Cool Down', 'Gradually reduce intensity and stretch to prevent muscle soreness.', 10, 2),


    ('Dynamic Stretching', 'Perform dynamic stretches to increase flexibility and mobility.', 15, 3), 
    ('Strength Blast', 'High-intensity circuit of bodyweight and resistance exercises.', 25, 3),
    ('Tabata Finisher', 'Tabata-style intervals of intense exercise followed by brief rest periods.', 20, 3),
    ('Recovery', 'Focus on deep breathing and gentle movements to aid recovery.', 10, 3),

    ('Kettlebell Swings', 'Perform explosive kettlebell swings for power and cardiovascular conditioning.', 20, 4), 
    ('Core Crusher', 'Intense core workout targeting all the major abdominal muscles.', 20, 4),
    ('Interval Runs', 'Alternate between short bursts of sprinting and jogging.', 25, 4),
    ('Stretch & Relax', 'Complete the workout with relaxing stretches to improve flexibility.', 10, 4),

   ('Jump Rope Warm-Up', 'Get the heart rate up and warm up the muscles with jump rope exercises.', 10, 5), 
    ('Bodyweight Circuit', 'High-intensity circuit of bodyweight exercises such as push-ups, squats, and lunges.', 20, 5),
    ('Agility Drills', 'Perform agility exercises to improve coordination and speed.', 15, 5),
    ('Cooldown', 'Lower the heart rate and stretch to improve flexibility and prevent muscle soreness.', 10, 5);

INSERT INTO hiit_workouts (hiits_id, workouts_id) VALUES
    (1, 1), 
    (1, 2), 
    (1, 3), 
    (1, 4), 
    (2, 5), 
    (2, 6), 
    (2, 7), 
    (2, 8), 
    (3, 9), 
    (3, 10), 
    (3, 11), 
    (3, 12), 
    (4, 13), 
    (4, 14), 
    (4, 15), 
    (4, 16), 
    (5, 17), 
    (5, 18), 
    (5, 19), 
    (5, 20); 


-- Check the inserted data
-- SELECT * FROM Workouts;


-- Check the inserted data
-- SELECT * FROM Hiit;

