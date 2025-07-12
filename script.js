const taskInput = document.querySelector(".task-input input");
let taskBox = document.querySelector(".task-box");
let filters = document.querySelectorAll(".filters span");
let activeFilter;

// getting local Storage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEditedTask = false;

filters.forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    activeFilter = btn.id;
    showTodo(btn.id);
  });
});

taskInput.addEventListener("keyup", function(e) {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      if (!todos) {
        todos = []; //if null, initialize with an empty array
      }
      let taskInfo = {name: userTask, status: "pending"};
      todos.push(taskInfo); 
    }
    else {
      todos[editId].name = userTask;
      isEditedTask = false;
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    taskInput.value = ""; 
    showTodo(activeFilter);
  }
})

function showTodo(filter) {
  let li = "";
  if(todos) {
    todos.forEach( function (todo, id) {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li +=`<li class="task">
                <label for="${id}">
                  <input onClick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                  <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                  <i onClick = "showMenu(this)" class="fa-solid fa-ellipsis"></i>
                  <ul class="settings-menu">
                    <li onClick= "editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i>Edit</li>
                    <li onClick= "deleteTask(${id})"><i class="fa-solid fa-trash-can" style="color: #000000;"></i>Delete</li>
                  </ul>
                </div>
              </li>`;
      }  
  });
  }
  taskBox.innerHTML = li || `<span>You dont have ant task here</span>`;
}
showTodo("all");

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
  showTodo(activeFilter);
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
  showTodo(activeFilter);
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}