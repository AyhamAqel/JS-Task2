import { formatDate } from "./utils.js";

// the error elements
const titleError = document.getElementById("title-error");
const descriptionError = document.getElementById("description-error");
const priorityError = document.getElementById("priority-error");

// the form inputs
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const taskIdInput = document.getElementById("task-id");

const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const loadingEl = document.getElementById("loading");
const globalErrorEl = document.getElementById("global-error");

// delete the error messages from the page 
export function clearErrors() {
  titleError.textContent = "";
  descriptionError.textContent = "";
  priorityError.textContent = "";
}

// show validation errors next to the relevant fields
export function showErrors(errors) {
  titleError.textContent = errors.title || "";
  descriptionError.textContent = errors.description || "";
  priorityError.textContent = errors.priority || "";
}

// draw the tasks on the page 
export function renderTasks(tasks, taskList) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<div class="empty">No tasks found.</div>`;
    return;
  }

  // document fragment for better performance when rendering multiple tasks
  const fragment = document.createDocumentFragment();

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = `task-card ${task.priority} ${task.status}`;

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Created:</strong> ${formatDate(task.createdAt)}</p>

      <div class="actions">
        <button class="status-btn" data-action="status" data-id="${task.id}">
          Change Status
        </button>

        <button class="edit-btn" data-action="edit" data-id="${task.id}">
          Edit
        </button>

        <button class="delete-btn" data-action="delete" data-id="${task.id}">
          Delete
        </button>
      </div>
    `;

    fragment.appendChild(div);
  });

  taskList.appendChild(fragment);
}

//  populate the form when editing a task
export function populateFormForEdit(task) {
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  priorityInput.value = task.priority;
  taskIdInput.value = task.id;

  submitBtn.textContent = "Update Task";
  cancelEditBtn.classList.remove("hidden");
}

//  reset the form to its default state
export function resetFormUI() {
  submitBtn.textContent = "Add Task";
  cancelEditBtn.classList.add("hidden");
}

// hide or show the loading indicator
export function setLoadingState(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
}

//   an error message in case of API failure
export function showGlobalError(message) {
  globalErrorEl.textContent = message;
  globalErrorEl.classList.remove("hidden");
}

//  delete the global error message 
export function clearGlobalError() {
  globalErrorEl.textContent = "";
  globalErrorEl.classList.add("hidden");
}