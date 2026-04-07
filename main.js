import { createTask, validateTaskData } from "./services.js";

const form = document.getElementById("task-form");

// 🟢 state
const tasks = [];
const taskList = document.getElementById("task-list");

// 🟢 render function
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const div = document.createElement("div");

    div.className = `task-card ${task.priority} ${task.status}`;

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>
      <p>Priority: ${task.priority}</p>
    `;

    taskList.appendChild(div);
  });
}

// 🟢 form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  const errors = validateTaskData(title, description, priority);

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return;
  }

  const newTask = createTask(title, description, priority);

  tasks.push(newTask);

  renderTasks();

  form.reset();
});