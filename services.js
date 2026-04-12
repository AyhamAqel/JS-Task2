import { generateId } from "./utils.js";

// create a new task object
export function createTask(title, description, priority) {
  return {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    status: "todo",
    priority,
    createdAt: new Date().toISOString(),
  };
}

// validate the task data
export function validateTaskData(title, description, priority) {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = "Title is required";
  }

  if (!description || !description.trim()) {
    errors.description = "Description is required";
  }

  if (!priority) {
    errors.priority = "Priority is required";
  }

  return errors;
}

// update a task in the list
export function updateTask(tasks, taskId, updatedValues) {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedValues } : task
  );
}

// delete a task from the list
export function deleteTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// change the status to the next one in the sequence
export function getNextStatus(currentStatus) {
  if (currentStatus === "todo") {
    return "in-progress";
  }

  if (currentStatus === "in-progress") {
    return "done";
  }

  return "todo";
}

// filter and sort tasks based on the provided filters
export function getFilteredAndSortedTasks(tasks, filters) {
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;

    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    const searchValue = filters.search.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchValue) ||
      task.description.toLowerCase().includes(searchValue);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return filters.sortByDate === "oldest" ? dateA - dateB : dateB - dateA;
  });

  return sortedTasks;
}