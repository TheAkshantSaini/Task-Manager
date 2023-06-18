// app.js

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");
  const addButton = document.getElementById("add-button");
  const taskList = document.getElementById("task-list");

  addButton.addEventListener("click", addTask);

  function addTask(e) {
    e.preventDefault();

    const task = taskInput.value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    if (task !== "" && date !== "" && time !== "") {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-content");
      taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span>${task}</span>
        <span>${date}</span>
        <span>${time}</span>
        <div class="button-container">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);

      taskInput.value = "";
      dateInput.value = "";
      timeInput.value = "";

      const deleteButton = taskItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", deleteTask);

      const editButton = taskItem.querySelector(".edit-button");
      editButton.addEventListener("click", editTask);
    }
  }

  function deleteTask() {
    const taskItem = this.closest(".task-content");
    taskItem.remove();
  }

  function editTask() {
    const taskItem = this.closest(".task-content");
    const taskText = taskItem.querySelector("span:first-child");
    const taskTextInput = document.createElement("input");
    taskTextInput.type = "text";
    taskTextInput.value = taskText.textContent;
    taskText.replaceWith(taskTextInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("edit-task-button");

    this.replaceWith(saveButton);

    saveButton.addEventListener("click", () => {
      const updatedTask = taskTextInput.value.trim();
      if (updatedTask !== "") {
        taskTextInput.replaceWith(taskText);
        taskText.textContent = updatedTask;
        saveButton.replaceWith(editButton);
      }
    });
  }
});
