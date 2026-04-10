import { formatDate } from "./utils.js";

// عناصر الأخطاء
const titleError = document.getElementById("title-error");
const descriptionError = document.getElementById("description-error");
const priorityError = document.getElementById("priority-error");

// عناصر الفورم
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priorityInput = document.getElementById("priority");
const taskIdInput = document.getElementById("task-id");

const submitBtn = document.getElementById("submit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const loadingEl = document.getElementById("loading");
const globalErrorEl = document.getElementById("global-error");

// مسح أخطاء الحقول
export function clearErrors() {
  titleError.textContent = "";
  descriptionError.textContent = "";
  priorityError.textContent = "";
}

// عرض أخطاء الحقول
export function showErrors(errors) {
  titleError.textContent = errors.title || "";
  descriptionError.textContent = errors.description || "";
  priorityError.textContent = errors.priority || "";
}

// رسم التاسكات
export function renderTasks(tasks, taskList) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<div class="empty">No tasks found.</div>`;
    return;
  }

  // document fragment للأداء
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

// تعبئة الفورم عند التعديل
export function populateFormForEdit(task) {
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  priorityInput.value = task.priority;
  taskIdInput.value = task.id;

  submitBtn.textContent = "Update Task";
  cancelEditBtn.classList.remove("hidden");
}

// إعادة شكل الفورم للوضع الطبيعي
export function resetFormUI() {
  submitBtn.textContent = "Add Task";
  cancelEditBtn.classList.add("hidden");
}

// إظهار/إخفاء loading
export function setLoadingState(isLoading) {
  loadingEl.classList.toggle("hidden", !isLoading);
}

// عرض خطأ عام
export function showGlobalError(message) {
  globalErrorEl.textContent = message;
  globalErrorEl.classList.remove("hidden");
}

// مسح الخطأ العام
export function clearGlobalError() {
  globalErrorEl.textContent = "";
  globalErrorEl.classList.add("hidden");
}