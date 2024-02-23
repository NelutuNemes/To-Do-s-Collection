let myDateElement = document.getElementById("my-date");
const newTaskInput = document.getElementById("new-task-input");
const taskList = document.getElementById("task-list");
const totalTaskElement = document.getElementById("total-task");
const incompleteTaskElement = document.getElementById("incomplete-task");
const greetUserElement = document.getElementById("greet-user");
const myHourElement = document.getElementById("my-hour");

let userName = "";

let addTaskButton = document.getElementById("add-task-button");

addTaskButton.addEventListener("click", addTask);

let myDate = new Date();
console.log(myDate);
let myFullDate = new Date().toDateString();
console.log(myFullDate);
let year = myDate.getFullYear();
console.log(year);
let month = myDate.getMonth() + 1;
if (month < 10) {
  month = "0" + month;
}
console.log(month);
let day = myDate.getDate();
if (day < 10) {
  day = "0" + day;
}
console.log(day);

let weekDay = myDate.getDay();
if (weekDay === 0) {
  weekDay = "Sunday";
} else if (weekDay === 1) {
  weekDay = "Monday";
} else if (weekDay === 2) {
  weekDay = "Tuesday";
} else if (weekDay === 3) {
  weekDay = "Wednesday";
} else if (weekDay === 4) {
  weekDay = "Thursday";
} else if (weekDay === 5) {
  weekDay = "Friday";
} else if (weekDay === 6) {
  weekDay = "Saturday";
}

console.log(weekDay);
let concatenatedDate = `( ${weekDay}: ${day}-${month}-${year} )`;
console.log(concatenatedDate);

let mytime = "";
function updateClock() {
  let myDate2 = new Date();
  let myHour = myDate2.getHours();
  if (myHour < 10) {
    myHour = "0" + myHour;
  }
  let myMinute = myDate2.getMinutes();
  if (myMinute < 10) {
    myMinute = "0" + myMinute;
  }
  let mySecond = myDate2.getSeconds();
  if (mySecond < 10) {
    mySecond = "0" + mySecond;
  }

  mytime = `${myHour}:${myMinute}:${mySecond}`;
  console.log(`Ora este : ${mytime}`);
}

myDateElement.innerText = concatenatedDate;

// Array to store tasks
let tasks = [];

// I add a "load" event to initialize the tasks on page load
window.addEventListener("load", init);

// Function to add a new task
function addTask() {
  const taskName = newTaskInput.value.trim();
  console.log(`The new task is  : ${taskName}`);
  if (taskName !== "") {
    const newTask = {
      id: Date.now(),
      name: taskName,
      complete: false,
    };

    //Send the new task to the 'tasks' array that stores the added tasks
    tasks.push(newTask);

    // Update the list of tasks and the total number of tasks
    saveTasksToLocalStorage();
    updateTaskList();
    updateTaskCount();
  }
  console.log(tasks);
  newTaskInput.value = "";
}
// Function to update the list of tasks in the DOM
function updateTaskList() {
  taskList.innerHTML = ""; // Clear list for re-build
  tasks.forEach((task) => {
    const taskElement = document.createElement("li");

    // Checkbox for marking the task as complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.complete;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    // Task text with modified style if completed
    const taskText = document.createElement("p");
    taskText.setAttribute("id", "task-text");
    taskText.innerText = task.name;
    taskText.style.textDecoration = task.complete
      ? taskText.classList.add("completed-task")
      : "none";

    // Task delete button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    //adding the elements in element 'li'
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteButton);

    // Adding 'li' item to task list
    taskList.appendChild(taskElement);
  });
}

// Function to mark or unmark a task as complete
function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, complete: !task.complete } : task
  );
  saveTasksToLocalStorage();
  updateTaskList();
  updateTaskCount();
}
// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  updateTaskList();
  updateTaskCount();
}

// Function to update the total number of tasks
// and the number of unfinished tasks in the DOM
function updateTaskCount() {
  totalTaskElement.textContent = tasks.length;
  incompleteTaskElement.textContent = tasks.filter(
    (task) => !task.complete
  ).length;
}

// Function to save tasks in localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Function to retrieve tasks from localStorage
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}
// Function for initializing tasks on page load
function init() {
  tasks = loadTasksFromLocalStorage();
  updateTaskList();
  updateTaskCount();
}

//modal
let modal = document.getElementById("myModal");

//open the modal when the page loads
window.onload = function () {
  modal.style.display = "flex";
};

//function for retrieving the user's name
function getUserName() {
  userName = document.getElementById("user-name").value;
  console.log(`Numele introdus este: ${userName}`);
  greet();
  closeModal();
}
//modal closing function
function closeModal() {
  modal.style.display = "none";
  greet();
}
//greeting function
function greet() {
  if (userName === "") {
    greetUserElement.innerText = `Hello, user${Date.now()} !`;
  } else {
    greetUserElement.innerText = `Hello , ${userName.toUpperCase()} !`;
  }
}

//clock display function
myHourElement.addEventListener("mouseover", checkTime);

function checkTime() {
  updateClock();
  myHourElement.innerHTML = mytime;
  setTimeout(() => {
    myHourElement.innerHTML = '<button id="check-time-button">⌚</button>';
  }, 1000);
}
