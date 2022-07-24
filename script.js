let tasks;

const savedtasks = JSON.parse(localStorage.getItem("tasks"));

if (Array.isArray(savedtasks)) {
  tasks = savedtasks;
} else {
  tasks = [
    { title: "Wash the car", dueDate: "01/01/2023", id: "id001" },
    { title: "Cook dinner", dueDate: "02/03/2022", id: "id002" },
    { title: "Go for a walk", dueDate: "12/05/2022", id: "id003" },
    { title: "Watch a movie", dueDate: "06/03/2022", id: "id004" },
  ];
}

// Create a task
function createTodo(title, dueDate) {
  const id = "" + new Date().getTime();
  tasks.push({
    title: title,
    dueDate: dueDate,
    id: id,
  });
  savetasks();
}

// Delete a task

function removeTodo(idToDelete) {
  tasks = tasks.filter(function (todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  savetasks();
}

function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTodo() {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}

function render() {
  // reset the list
  document.getElementById("todo-list").innerHTML = "";

  tasks.forEach(function (todo) {
    const element = document.createElement("div");
    element.innerText = todo.title + "   " + todo.dueDate;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style =
      "margin: .5rem 0 0.5rem 1rem; padding: 3px 1.6rem; color: red;  font-family: 'Merienda', cursive, sans-serif; font-size: 1.8rem; border-radius:30000px";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(element);
  });
}
render();
