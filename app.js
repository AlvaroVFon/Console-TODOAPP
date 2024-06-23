import {
  inquirerMenu,
  pausa,
  confirm,
  readInput,
  formatTaskList,
  deleteTaskMenu,
  completeMenu,
} from './helpers/menu.js';
import {
  getTasks,
  getUncompletedTasks,
  getCompletedTasks,
  deleteTask,
  completeTask,
} from './database/taskActions.js';

import Tareas from './models/Tareas.js';

let opt = '';
let tasks = [];
let tareas = new Tareas();
async function main() {
  do {
    opt = await inquirerMenu();
    switch (opt.opt) {
      case 1:
        const description = await readInput('Description: ');
        tareas.createTarea(description);
        break;
      case 2:
        const uncompletedTasks = await getUncompletedTasks();
        const formatedUncompleted = formatTaskList(uncompletedTasks);
        formatedUncompleted.forEach((task) => console.log(task));
        break;
      case 3:
        const completedTasks = await getCompletedTasks();
        const formatedCompletedTasks = formatTaskList(completedTasks);
        formatedCompletedTasks.forEach((task) => console.log(task));
        break;
      case 4:
        const allTasks = await getTasks();
        const formatedAllTasks = formatTaskList(allTasks);
        formatedAllTasks.forEach((task) => console.log(task));
        break;
      case 5:
        const tasksToComplete = await completeMenu();
        tasksToComplete.forEach((task) => completeTask(task));
        break;
      case 6:
        const tasksToDelete = await deleteTaskMenu();
        const opt = await confirm();
        if (opt) {
          tasksToDelete.forEach((task) => deleteTask(task));
        }
        break;
      case 0:
        break;
    }

    await pausa();
  } while (opt.opt !== 0);
}
main();
