const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
let list = JSON.parse(localStorage.getItem("list")) || [];
const btnEl = document.querySelector(".btn");

list.forEach((task) => {
  toDoList(task);
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

btnEl.addEventListener("click", (e) => {
  e.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
  if (!task && inputEl.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");

  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtn = document.createElement("div");
  checkBtn.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
  liEl.appendChild(checkBtn);
  const trashBtn = document.createElement("div");
  trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  liEl.appendChild(trashBtn);

  checkBtn.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtn.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  let list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
