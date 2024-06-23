import Tarea from './Tarea.js';
import { addTask } from '../database/taskActions.js';
class Tareas {
  constructor() {
    this._listado = {};
  }
  async createTarea(description = '') {
    const tarea = new Tarea(description);
    this._listado[tarea.id] = tarea;
    await addTask({
      id: tarea.id,
      description: tarea.description,
      createdAt: tarea.createtAt,
      completed: tarea.completed,
    });
  }
}
export default Tareas;
