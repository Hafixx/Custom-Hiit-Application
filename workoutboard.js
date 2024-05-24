import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
// import uuid from 'uuid-random';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

export async function listWorkouts() {
  const db = await dbConn;
  return db.all('SELECT * FROM Workouts');
}
export async function findWorkouts(id) {
  const db = await dbConn;
  return db.get('SELECT * FROM Workouts WHERE id = ?', id);
}


export async function addWorkout(name, description) {
  const db = await dbConn;
  return db.run('INSERT INTO Workouts VALUES (?, ?)', [name, description]);
}

export async function listHiits() {
  const db = await dbConn;
  return db.all('SELECT * FROM Hiits');
}
