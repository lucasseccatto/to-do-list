const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const fullList = document.querySelector('.list-task');

let myItensList = [];

function addNewTask() {
  const taskText = input.value.trim();
  if (taskText !== '') {
    myItensList.push({
      task: taskText,
      complete: false,
    });

    input.value = '';

    showTask();
  } else {
    alert('Por favor, insira uma descrição para a tarefa.');
  }

  showTask();
}

function showTask() {
  let newLi = '';

  myItensList.forEach((item, index) => {
    newLi =
      newLi +
      `

    <li class='task ${item.complete && 'done'}' >
        <img src='./src/img/checked.png' alt='check na tarefa' onclick='completeTask(${index})'/>
        <p>${item.task}</p>
        <img src='./src/img/trash.png' alt='deletar tarefa' onclick='deleteTask(${index})'/>
    </li>

    `;
  });

  fullList.innerHTML = newLi;

  localStorage.setItem('list', JSON.stringify(myItensList));
}

function completeTask(index) {
  myItensList[index].complete = !myItensList[index].complete;

  showTask();
}

function deleteTask(index) {
  myItensList.splice(index, 1);

  showTask();
}

function reloadTask() {
  const localStorageTask = localStorage.getItem('list');

  if (localStorageTask) {
    myItensList = JSON.parse(localStorageTask);
  }

  showTask();
}

reloadTask();
button.addEventListener('click', addNewTask);
