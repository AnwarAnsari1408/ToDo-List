const taskInput = document.querySelector(".task-input input");

taskInput.addEventListener("keyup", function(e) {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {

    // getting local Storage todo-list
    try {
      //gets the key and converts to valid JSON; if returns null, falls back to empty array
      todos = JSON.parse(localStorage.getItem("todo-list")) || []; 
    } catch {
      todos = []; // If there is an error(corrupted or non-json data), initialize empty array.
    }
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo); 
    localStorage.setItem("todo-list", JSON.stringify(todos));
    taskInput.value = ""; 
  }
})