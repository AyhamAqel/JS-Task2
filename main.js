import {
  createTask,
  validateTaskData,
  updateTask,
  deleteTask,
  getFilteredAndSortedTasks,
  getNextStatus,
} from "./services.js";

import {
  renderTasks,
  showErrors,
  clearErrors,
  populateFormForEdit,
  resetFormUI,
  setLoadingState,
  showGlobalError,
  clearGlobalError,
} from "./ui.js";

import { saveTasksToStorage, loadTasksFromStorage } from "./storage.js";
import { debounce } from "./utils.js";
import { fakeApi } from "./api.js";

//  DOM elements
const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const taskIdInput = document.getElementById("task-id");

const taskList = document.getElementById("task-list");
const filterStatusInput = document.getElementById("filter-status");
const filterPriorityInput = document.getElementById("filter-priority");
const sortDateInput = document.getElementById("sort-date");
const searchInput = document.getElementById("search");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

// state of tasks
let tasks = [];

// state of filters
let filters = {
  status: "all",
  priority: "all",
  sortByDate: "newest",
  search: "",
};

//  localStorage
function persistTasks() {
  saveTasksToStorage(tasks);
}

// draw the tasks based on the current filters
function renderApp() {
  const visibleTasks = getFilteredAndSortedTasks(tasks, filters);
  renderTasks(visibleTasks, taskList);
}

// reset the form to default state
function resetForm() {
  form.reset();
  taskIdInput.value = "";
  clearErrors();
  resetFormUI();
}

// run the application
async function initApp() {
  try {
    setLoadingState(true);
    clearGlobalError();

    const storedTasks = loadTasksFromStorage();

    if (storedTasks.length > 0) {
      tasks = storedTasks;
    } else {
      tasks = await fakeApi.fetchTasks();
      persistTasks();
    }

    renderApp();
  } catch (error) {
    console.error(error);
    showGlobalError("Failed to load tasks.");
  } finally {
    setLoadingState(false);
  }
}

// add/edit task
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  clearErrors();
  clearGlobalError();

  const title = titleInput.value;
  const description = descriptionInput.value;
  const priority = priorityInput.value;
  const editingTaskId = taskIdInput.value;

  const errors = validateTaskData(title, description, priority);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  try {
    setLoadingState(true);

    // editing existing task
    if (editingTaskId) {
      const existingTask = tasks.find((task) => task.id === editingTaskId);

      if (!existingTask) {
        throw new Error("Task not found for editing.");
      }

      const updatedTask = {
        ...existingTask,
        title: title.trim(),
        description: description.trim(),
        priority,
      };

      await fakeApi.saveTask(updatedTask);
      tasks = updateTask(tasks, editingTaskId, updatedTask);
    } else {
      //   creating new task 
      const newTask = createTask(title, description, priority);

      await fakeApi.saveTask(newTask);
      tasks = [...tasks, newTask];
    }

    persistTasks();
    renderApp();
    resetForm();
  } catch (error) {
    console.error(error);
    showGlobalError("Failed to save task.");
  } finally {
    setLoadingState(false);
  }
});

// event delegation for task actions (edit, delete, change status)
taskList.addEventListener("click", async (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (!action || !id) {
    return;
  }

  clearGlobalError();

  try {
    setLoadingState(true);

    // Delete task
    if (action === "delete") {
      tasks = deleteTask(tasks, id);
      persistTasks();
      renderApp();
      return;
    }

    // fill the form with the task data for editing
    if (action === "edit") {
      const taskToEdit = tasks.find((task) => task.id === id);

      if (!taskToEdit) {
        throw new Error("Task not found.");
      }

      populateFormForEdit(taskToEdit);
      return;
    }

    // change the task status
    if (action === "status") {
      const currentTask = tasks.find((task) => task.id === id);

      if (!currentTask) {
        throw new Error("Task not found.");
      }

      const updatedTask = {
        ...currentTask,
        status: getNextStatus(currentTask.status),
      };

      await fakeApi.saveTask(updatedTask);
      tasks = updateTask(tasks, id, updatedTask);
      persistTasks();
      renderApp();
    }
  } catch (error) {
    console.error(error);
    showGlobalError("Failed to update task.");
  } finally {
    setLoadingState(false);
  }
});

// filter by status  
filterStatusInput.addEventListener("change", (event) => {
  filters = {
    ...filters,
    status: event.target.value,
  };

  renderApp();
});

//   filter by priority
filterPriorityInput.addEventListener("change", (event) => {
  filters = {
    ...filters,
    priority: event.target.value,
  };

  renderApp();
});

//   sort by date
sortDateInput.addEventListener("change", (event) => {
  filters = {
    ...filters,
    sortByDate: event.target.value,
  };

  renderApp();
});

//  search with debounce
const debouncedSearch = debounce((value) => {
  filters = {
    ...filters,
    search: value.trim(),
  };

  renderApp();
}, 300);

searchInput.addEventListener("input", (event) => {
  debouncedSearch(event.target.value);
});

//  cancel editing and reset the form 
cancelEditBtn.addEventListener("click", () => {
  resetForm();
});

// initialize the app  
initApp();