// API base URL
const apiUrl = "http://127.0.0.1:8000/api/";

// Fetch and display tasks
function getTasks() {
  fetch(apiUrl + 'task-list/')
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';

      data.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>${task.title}</strong>
              <p class="mb-1">${task.description}</p>
              <small class="${task.completed ? 'text-success' : 'text-warning'}">
                ${task.completed ? 'Completed' : 'Pending'}
              </small>
            </div>
            <div>
              <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
          </div>
        `;
        taskList.appendChild(listItem);
      });
    });
}

// Add a new task
document.getElementById('addTaskForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const completed = document.getElementById('taskCompleted').checked;

  fetch(apiUrl + 'task-create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      description: description,
      completed: completed
    })
  })
  .then(response => response.json())
  .then(data => {
    // Reset form
    document.getElementById('addTaskForm').reset();
    getTasks();
  });
});

// Delete a task
function deleteTask(id) {
  fetch(apiUrl + `task-delete/${id}/`, {
    method: 'DELETE'
  })
  .then(() => getTasks());
}

// Load tasks on page load
getTasks();
