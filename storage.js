const STORAGE_KEY = "task-manager-tasks";

// حفظ التاسكات
export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

// تحميل التاسكات
export function loadTasksFromStorage() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    // تأكد إن البيانات array
    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks;
  } catch (error) {
    console.error("Corrupted storage data:", error);
    return [];
  }
}