export function createTask(title, description, priority) {
  return {
    id: Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    status: "todo",
    priority: priority,
    createdAt: new Date().toISOString(),
  };
}
export function validateTaskData(title, description, priority) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Title is required";
  }

  if (!description.trim()) {
    errors.description = "Description is required";
  }

  if (!priority) {
    errors.priority = "Priority is required";
  }

  return errors;
}