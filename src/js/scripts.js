const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const fullList = document.querySelector('.list-task');

let myItemsList = [];

function addNewTask() {
  const taskText = input.value.trim();
  if (taskText !== '') {
    myItemsList.push({
      task: taskText,
      complete: false,
    });

    input.value = '';
    showTasks();
  } else {
    alert('Por favor, insira uma descrição para a tarefa.');
  }
}

function completeTask(index) {
  myItemsList[index].complete = !myItemsList[index].complete;
  showTasks();
}

function deleteTask(index) {
  myItemsList.splice(index, 1);
  showTasks();
}

function showTasks() {
  const tasksHTML = myItemsList.map((item, index) => createTaskHTML(item, index)).join('');
  fullList.innerHTML = tasksHTML;
  saveTasksToLocalStorage();
}

function createTaskHTML(item, index) {
  return `
    <li class="task ${item.complete ? 'done' : ''}">
      <img src="./src/img/checked.png" alt="check na tarefa" onclick="completeTask(${index})"/>
      <p>${item.task}</p>
      <img src="./src/img/trash.png" alt="deletar tarefa" onclick="deleteTask(${index})"/>
    </li>
  `;
}

function saveTasksToLocalStorage() {
  localStorage.setItem('list', JSON.stringify(myItemsList));
}

function reloadTasks() {
  const localStorageTasks = localStorage.getItem('list');
  if (localStorageTasks) {
    myItemsList = JSON.parse(localStorageTasks);
  }
  showTasks();
}

reloadTasks();
button.addEventListener('click', addNewTask);
