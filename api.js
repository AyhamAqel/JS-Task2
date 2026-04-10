// fake api لمحاكاة السيرفر
export const fakeApi = {
  fetchTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve([]);
        } catch (error) {
          reject(new Error("Failed to fetch tasks"));
        }
      }, 500);
    });
  },

  saveTask(task) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(task);
        } catch (error) {
          reject(new Error("Failed to save task"));
        }
      }, 500);
    });
  },
};