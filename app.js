
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let current_page = 1;
let todos_per_page = 2;

function addTodo() {
    let todoInput = document.getElementById('todoInput').value;
    if (todoInput.trim() !== "") {
        todos.push(todoInput);
        document.getElementById('todoInput').value = "";
        saveTodos();
        displayTodos();
    }
}

function searchTodos() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let filteredTodos = todos.filter(todo => todo.toLowerCase().includes(searchInput));
    displayTodos(filteredTodos);
}

function displayTodos(filtered = todos) {
    let result = document.getElementById('result');
    result.innerHTML = "";

    let start = (current_page - 1) * todos_per_page;
    let end = start + todos_per_page;
    let paginatedTodos = filtered.slice(start, end);

    paginatedTodos.forEach((todo, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${todo}</td>
            <td>
                <button onclick="editTodo(${start + index})">Edit</button>
                <button onclick="deleteTodo(${start + index})">Delete</button>
            </td>
        `;
        result.appendChild(tr);
    });

    displayPagination(filtered.length);
}

function displayPagination(totalItems) {
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = "";

    let totalPages = Math.ceil(totalItems / todos_per_page);
    for (let i = 1; i <= totalPages; i++) {
        let pageItem = document.createElement('span');
        pageItem.classList.add('page-item');
        if (i === current_page) pageItem.classList.add('active');
        pageItem.textContent = i;
        pageItem.onclick = function () {
            current_page = i;
            displayTodos();
        };
        pagination.appendChild(pageItem);
    }
}

function editTodo(index) {
    let newTask = prompt("Edit your task:", todos[index]);
    if (newTask !== null && newTask.trim() !== "") {
        todos[index] = newTask;
        saveTodos();
        displayTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    displayTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


displayTodos();