const taskIDDOM = document.querySelector(".content");
const inputNameDOM = document.querySelector(".edit-input");
const checkboxDOM = document.querySelector(".completed");
const btnDOM = document.querySelector(".btn");
const singleDOM = document.querySelector(".single-task-form");
const alertDOM = document.querySelector(".alert");
let temp;
const id = window.location.search.slice(1);
// const params = window.location.search;
// const id = new URLSearchParams(params).get("id");
// console.log(id);

const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/tasks/${id}`);
    const { completed, name, _id } = task;
    taskIDDOM.textContent = _id;
    inputNameDOM.value = name;
    if (completed) {
      checkboxDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};
showTask();
// edit
singleDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const newTaskName = inputNameDOM.value;
    const check = checkboxDOM.checked;
    await axios.patch(`/api/tasks/${id}`, {
      name: newTaskName,
      completed: check,
    });
    alertDOM.classList.add("alert-success");
    alertDOM.textContent = "Edit Successfully !!!";
    setTimeout(() => {
      alertDOM.classList.remove("alert-success");
      alertDOM.style.opacity = 0;
    }, 1500);
  } catch (err) {
    console.log(err);
  }
});
