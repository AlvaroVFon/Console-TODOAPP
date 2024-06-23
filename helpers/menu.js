import inquirer from 'inquirer';
import { getTasks, getUncompletedTasks } from '../database/taskActions.js';
import 'colors';
import Questions from '../utils/Questions.json' with { type:"json" };
const inquirerMenu = async () => {
  console.clear();
  console.log('-----------------------------------'.cyan);
  console.log('              TODO APP');
  console.log('-----------------------------------'.cyan);
  const opt = inquirer.prompt({
    type: 'list',
    name: 'opt',
    message: 'Select an option',
    choices: Questions.map((question) => {
      return {
        name: question.name,
        value: question.value,
      };
    }),
  });
  return opt;
};
const completeMenu = async()=>{
  console.clear();
  console.log('-----------------------------------'.cyan);
  console.log('             COMLETE TASKS');
  console.log('-----------------------------------'.cyan);
  const uncompletedTasks = await getUncompletedTasks()

  const questions = {
    type:'checkbox',
    name: 'tasksToComplete',
    choices: uncompletedTasks.map(task=>{
      return {
        name:task.description,
        value:task.id
      }
    })
  }
  const {tasksToComplete} = await inquirer.prompt(questions)
  return tasksToComplete
}
const deleteTaskMenu = async()=>{
  console.clear();
  console.log('-----------------------------------'.cyan);
  console.log('             DELETE TASKS');
  console.log('-----------------------------------'.cyan);
  const tasks = await getTasks()

  const questions = {
    type:'checkbox',
    name:'tasksToDelete',
    choices: tasks.map((task)=>{
      return {
        name: task.description,
        value: task.id
      }
    })
  }

  const {tasksToDelete} =await inquirer.prompt(questions)
  return tasksToDelete
}

const pausa = async () => {
  const question = {
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.cyan} to continue `,
  };
  console.log('\n');
  await inquirer.prompt(question);
};

const confirm = async()=>{
  const question = {
    type:'confirm',
    name:'confirm',
    message: 'Press ENTER to confirm'
   }
   const {confirm} = await inquirer.prompt(question)
   return confirm
}
const readInput = async (message) => {
  const question = {
    type: 'input',
    name: 'description',
    message,
    validate (value){
      if(value.length === 0){
        return 'You must enter a desription'
      }
      return true
    }
  };
  const { description } = await inquirer.prompt(question);
  return description;
};

const formatTaskList = (tasks)=>{
  const formatedTasks = tasks.map((task, index) => `${index + 1}. ${task.description}`
  )
  
  return formatedTasks
}
export { inquirerMenu,completeMenu, deleteTaskMenu, pausa, confirm, readInput, formatTaskList };
