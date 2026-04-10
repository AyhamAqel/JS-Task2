import { generateId } from "./utils.js";

// إنشاء task جديدة
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

// التحقق من المدخلات
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

// تحديث task بطريقة immutable
export function updateTask(tasks, taskId, updatedValues) {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedValues } : task
  );
}

// حذف task
export function deleteTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// تغيير الحالة للدور اللي بعدها
export function getNextStatus(currentStatus) {
  if (currentStatus === "todo") {
    return "in-progress";
  }

  if (currentStatus === "in-progress") {
    return "done";
  }

  return "todo";
}

// فلترة + ترتيب بدون تعديل الأصل
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