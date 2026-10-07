let tasks = [];

const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const addBtn = document.getElementById("add-btn");
const searchInput = document.getElementById("search-input");
const taskList = document.getElementById("task-list");

function renderTasks() {
  const query = searchInput.value.toLowerCase();
  taskList.innerHTML = "";

  tasks
    .filter(function (task) {
      return task.title.toLowerCase().includes(query);
    })
    .forEach(function (task) {
      const card = document.createElement("div");
      card.className = "task-card";

      const title = document.createElement("h3");
      title.textContent = task.title;
      if (task.completed) {
        title.style.textDecoration = "line-through";
      }

      const desc = document.createElement("p");
      desc.textContent = task.description;

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Undo" : "Complete";
      completeBtn.onclick = function () {
        task.completed = !task.completed;
        renderTasks();
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "8px";
      deleteBtn.onclick = function () {
        tasks = tasks.filter(function (t) {
          return t.id !== task.id;
        });
        renderTasks();
      };

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(completeBtn);
      card.appendChild(deleteBtn);
      taskList.appendChild(card);
    });
}

addBtn.addEventListener("click", function () {
  const title = titleInput.value.trim();
  if (title === "") {
    return;
  }
  tasks.push({
    id: Date.now(),
    title: title,
    description: descInput.value.trim(),
    completed: false
  });
  titleInput.value = "";
  descInput.value = "";
  renderTasks();
});

searchInput.addEventListener("input", renderTasks);