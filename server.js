import * as wb from './workoutboard.js';


import express from 'express';

const app = express();


app.use(express.static('client', { extensions: ['html'] }));

async function getWorkouts(req, res) {
  res.json(await wb.listWorkouts());
}


async function getWorkout(req, res) {
  const result = await wb.findWorkouts(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that ID.');
  }
}
async function getHiits(req, res) {
  const result = await wb.listHiits(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('No match for that ID.');
  }
}

async function postWorkouts(req, res) {
  const messages = await wb.addWorkouts(req.body.msg);
  res.json(messages);
}


app.get('/Workouts', getWorkouts);
app.get('/Workouts/:id', getWorkout);
app.post('/Workouts', express.json(), postWorkouts);
app.get('/Workouts', getWorkouts);
app.get('/Hiits', getHiits);


app.listen(8000);
