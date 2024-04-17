let titleElement = document.getElementById("title");
let inputElement = document.getElementById("new-task-input");
let addTaskButton = document.getElementById("add-new-task");
let taskList = document.getElementById("task-list");
let totalTask = document.getElementById("total-task");
let finishedTask = document.getElementById("finished-task");
let unfinishedTask = document.getElementById("unfinished-task");

// Array to store tasks
let tasks = [];

//counters for finished task handle
let previousFinishedTaskCounter = 0;
let finishedTaskCounter = 0;

// Add a "load" event to initialize the tasks on page load
window.addEventListener("load", init);

addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskName = inputElement.value.trim();
  console.log(`The new task are: ${taskName}`);
  if (taskName !== "") {
    const newTask = {
      id: Date.now(),
      name: taskName,
      complete: false,
    };
    tasks.push(newTask);
  }
  //console.log(`Current list of task : ${JSON.stringify(tasks)} `);
  console.log(tasks);
  inputElement.value = "";
  updateUiList();
  saveTasksInLocalStorage();
  updateTasksCount();
}

function updateUiList() {
  taskList.innerHTML = ""; // Clear list for re-build
  tasks.forEach((task) => {
    const taskElement = document.createElement("li");

    // Add checkbox for marking the task as complete
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.complete;
    checkBox.addEventListener("change", () => toggleTask(task.id));

    //task text
    const taskText = document.createElement("p");
    taskText.setAttribute("id", "task-text");
    taskText.innerText = task.name;
    taskText.style.textDecoration = task.complete
      ? taskText.classList.add("completed-task")
      : "none";
    // taskText.style.textDecoration = task.complete ? "line-through" : "none";

    // Task delete button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    //adding the element in element li
    taskElement.appendChild(checkBox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteButton);

    //adding the element 'li'  to task list
    taskList.appendChild(taskElement);
  });

  console.log(`Current list of task : ${JSON.stringify(tasks)} `);
}

// Function to save tasks in localStorage
function saveTasksInLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//function delete task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksInLocalStorage();
  updateUiList();
  updateTasksCount();
}
// Function to mark or unmark a task as complete
function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, complete: !task.complete } : task
  );
  saveTasksInLocalStorage();
  updateUiList();
  updateTasksCount();
}
// Function to update the total number of tasks
// and the number of unfinished tasks in the DOM
function updateTasksCount() {
  totalTask.innerText = tasks.length;

  finishedTask.innerText = tasks.filter((task) => task.complete).length;

  finishedTaskCounter = tasks.filter((task) => task.complete).length;

  unfinishedTask.innerText = tasks.filter((task) => !task.complete).length;

  if (finishedTaskCounter > previousFinishedTaskCounter) {
    congrats();
  }

  if (finishedTaskCounter === tasks.length) {
    congrats2();
  }

  // Update the previous value
  previousFinishedTaskCounter = finishedTaskCounter;
}

// Function to retrieve tasks from localStorage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}
// Function for initializing tasks on page load
function init() {
  tasks = loadTasksFromLocalStorage();
  updateUiList();
  updateTasksCount();
}


function congrats() {
  titleElement.innerText = "Well done, you just finished a task !";
  setTimeout(() => {
    titleElement.innerText = "My To Do List V.2";
  }, 1500);
}
function congrats2() {
  titleElement.innerText = "Congratulation, you finished all tasks !";
  setTimeout(() => {
    titleElement.innerText = "My To Do List V.2";
  }, 1500);
}
