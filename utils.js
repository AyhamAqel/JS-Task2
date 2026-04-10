// توليد id جديد لكل task
export function generateId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return Date.now().toString();
}

// تنسيق التاريخ بشكل مفهوم
export function formatDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleString();
}

// debounce للبحث حتى ما نعمل render كل حرف مباشرة
export function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}