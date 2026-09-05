const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");


addTaskBtn.addEventListener("click", addTask); // Add task when button is clicked


// Allows Enter key
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Function to add a task
function addTask() {

    const taskText =
        taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task."); // Prevents empty tasks
        return;
    }
    
    const listItem =
        document.createElement("li");
    listItem.className = "task-item"; // Creates a new list item
    
    const text =
        document.createElement("span");
    text.className = "task-text";
    text.textContent = taskText;
    
    const actions =
        document.createElement("div");
    actions.className = "task-actions"; // Creates button container
    
    const completeButton =
        document.createElement("button");
    completeButton.className = "complete-btn";
    completeButton.textContent = "Complete"; // Creates Complete button
    
    const deleteButton =
        document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete"; // Creates Delete button
    
    completeButton.addEventListener(
        "click",
        function () {
            text.classList.toggle("completed"); // Complete task
        }
    );


    // Delete task
    deleteButton.addEventListener(
        "click",
        function () {
            listItem.remove();
            updateEmptyMessage();
        }
    );


    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    
    listItem.appendChild(text);
    listItem.appendChild(actions); // Put text and buttons inside list item

    taskList.appendChild(listItem); // Add list item to task list

    taskInput.value = "";
    taskInput.focus();

    updateEmptyMessage(); // Hide empty message
}


// Show or hide empty message
function updateEmptyMessage() {
    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}