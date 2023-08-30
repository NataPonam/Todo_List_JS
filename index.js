//consts
const taskForm = document.querySelector('.form');
const taskInput = document.querySelector('.form__input');
const taskList = document.querySelector('.todo__list');
let currentTasks = [];

//event Listeners
window.addEventListener('DOMContentLoaded', () => {
  if (checkLocalStorage() !== true) {
    currentTasks = JSON.parse(localStorage.getItem('currentTask.list'));
    currentTasks.forEach((task) => {
      createNewTask(task);
    });
  }
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (taskInput.value === '' || taskInput.value == null) return;
  createNewTask(taskInput.value);
  saveToLocalStorage(taskInput.value);
  taskInput.value = null;
});
////

//functions for saving and delete

const handleDeleteCard = (task) => {
  task.remove();
  const taskToBeDeleted = currentTasks.indexOf(
    task.querySelector('.todo-card__title').innerText
  );
  currentTasks.splice(taskToBeDeleted, 1);
  localStorage.setItem('currentTask.list', JSON.stringify(currentTasks));
};

const handleCheckCard = (e) => {
  e.target.closest('.todo-card').classList.toggle('checked');
};

//check localStorage
const checkLocalStorage = () => {
  return (
    localStorage.getItem('currentTask.list') === null ||
    localStorage.getItem('currentTask.list') === ''
  );
};

const saveToLocalStorage = (task) => {
  if (checkLocalStorage() !== true) {
    currentTasks = JSON.parse(localStorage.getItem('currentTask.list'));
  }
  currentTasks.push(task);
  localStorage.setItem('currentTask.list', JSON.stringify(currentTasks));
};

const createNewTask = (task) => {
  const taskTemplate = document.querySelector('#todo-template');
  const clonedList = document.importNode(taskTemplate.content, true); //клонируем темплейт контент с ТРУ!!-глубокое клонрование
  // с внутренними тегами, без ТРУ только тег темплейт
  const taskTxt = clonedList.querySelector('.todo-card__title');
  taskTxt.innerText = task;

  const deleteButton = clonedList.querySelector(
    '.todo-card__button_type_delete'
  );
  deleteButton.addEventListener('click', (e) => {
    handleDeleteCard(e.target.closest('.todo-card'));
  });

  const checkButton = clonedList.querySelector('.todo-card__button_type_check');
  checkButton.addEventListener('click', handleCheckCard);

  taskList.prepend(clonedList);
};
