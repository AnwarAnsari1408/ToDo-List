const taskInput = document.querySelector(".task-input input");
let taskBox = document.querySelector(".task-box");

// getting local Storage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

taskInput.addEventListener("keyup", function(e) {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!todos) {
      todos = []; //if null, initialize with an empty array
    }
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo); 
    localStorage.setItem("todo-list", JSON.stringify(todos));
    taskInput.value = ""; 
    showTodo();
  }
})

function showTodo() {
  let li = "";
  if(todos) {
    todos.forEach( function (todo, id) {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      li +=`<li class="task">
              <label for="${id}">
                <input onClick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                <p class="${isCompleted}">${todo.name}</p>
              </label>
              <div class="settings">
                <i onClick = "showMenu(this)" class="fa-solid fa-ellipsis"></i>
                <ul class="settings-menu">
                  <li><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i>Edit</li>
                  <li><i onClick="deleteTask(${id})" class="fa-solid fa-trash-can" style="color: #000000;"></i>Delete</li>
                </ul>
              </div>
            </li>`;
  });
  }
  taskBox.innerHTML = li;
}
showTodo();

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  let id = selectedTask.id;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[id].status = "completed";
  }
  else {
    taskName.classList.remove("checked");
    todos[id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function showMenu(selectedTask) {
  let settingsMenu = selectedTask.parentElement.lastElementChild;
  settingsMenu.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != 'I' || e.target != selectedTask) {
      settingsMenu.classList.remove("show");
    }
  })
}

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}