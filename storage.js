const STORAGE_KEY = "task-manager-tasks";

// save the tasks to storage
export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

//  unload the tasks from storage
export function loadTasksFromStorage() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    //sanity check to ensure we have an array of tasks
    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks;
  } catch (error) {
    console.error("Corrupted storage data:", error);
    return [];
  }
}