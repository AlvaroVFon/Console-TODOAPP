import { pool } from './config.js';
async function getTasks() {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  } catch (error) {
    return `Ha ocurrido un error: ${error}`;
  }
}
async function getUncompletedTasks() {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM tasks where completed = false'
    );
    return rows;
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
}
async function getCompletedTasks() {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM tasks where completed=true'
    );
    return rows;
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
}
async function addTask({ id, description, createdAt, completed }) {
  try {
    const { rows } = pool.query(
      'INSERT INTO tasks (id,description,createdat, completed) VALUES ($1, $2, $3,$4)',
      [id, description, createdAt, completed]
    );
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
}
async function completeTask(id) {
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET completed=true where id=$1',
      [id]
    );
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
}

async function deleteTask(id) {
  try {
    const { rows } = await pool.query('DELETE FROM tasks where id=$1', [id]);
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
}
export {
  getTasks,
  getUncompletedTasks,
  getCompletedTasks,
  addTask,
  completeTask,
  deleteTask,
};
