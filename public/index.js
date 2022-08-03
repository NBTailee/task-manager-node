const btn = document.querySelector(".task-btn");
const formDOM = document.querySelector(".task-form");
const inputDOM = document.querySelector(".task-input");
const tasksDOM = document.querySelector(".task-container");
const alertDOM = document.querySelector(".alert");
const deleteBtn = document.querySelector(".task-container");

const showTasks = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get("/api/tasks");
    // console.log(tasks);
    alertDOM.classList.add("alert-success");
    alertDOM.textContent = "Loading.....";
    setTimeout(() => {
      alertDOM.classList.remove("alert-success");
      const allTasks = tasks
        .map((task) => {
          // console.log(task.id);
          return `
        <div class="tasks">
            <div class="task-name">${task.name}</div>
              <div class="btn-group">
                <a href="edit-task.html?${task._id}" class="edit-btn" >
                  <ion-icon class="icon-btn edit" name="create-outline"></ion-icon>
                </a>
                <button class="delete-btn" data-id="${task._id}">
                  <ion-icon class="icon-btn delete" name="trash-outline"></ion-icon>
                </button>
              </div>
        </div>
          `;
        })
        .join("");
      tasksDOM.innerHTML = allTasks;
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};
showTasks();
// Create new task
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = inputDOM.value;
  try {
    await axios.post("/api/tasks", { name: data });
    showTasks();
    inputDOM.value = "";
    alertDOM.classList.add("alert-success");
    alertDOM.textContent = "Add successfully !!!";
    setTimeout(() => {
      alertDOM.classList.remove("alert-success");
    }, 2000);
  } catch (err) {
    alertDOM.classList.add("alert-failed");
    alertDOM.textContent = "must provide name or name too long !!!";
    setTimeout(() => {
      alertDOM.classList.remove("alert-failed");
    }, 2000);
  }
});
// delete task
deleteBtn.addEventListener("click", async (e) => {
  const el = e.target;
  try {
    await axios.delete(`/api/tasks/${el.parentElement.dataset.id}`);
    showTasks();
  } catch (err) {
    console.log(err);
  }
});
