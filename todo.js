let tasks = [{
    done: false,
    text: 'gym',
    id: 1
}];
const taskList = document.getElementById("list");
const addTaskInputBox = document.getElementById("add-task");

function addTodo(task) {
    tasks.push(task);
    renderList();
}

function deleteTodo(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    tasks = newTasks;
    renderList();
}

function renderList() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" id="${tasks[i].id}" />
            <label for="${tasks[i].id}"> ${tasks[i].text}</label>
            <button data-taskId="${tasks[i].id}" data-test="test" class="delete">Delete</button>
        `;
        taskList.appendChild(li);
    }
}

function checkTodo(taskId) {
    const taskIndex = tasks.findIndex(function (task) {
        return task.id == taskId;
    });

    tasks[taskIndex].done = !tasks[taskIndex].done;
}

function handleClick(event) {
    console.log(event.target.className);
    if (event.target.className == 'delete') {
        const taskid = Number(event.target.dataset.taskid);
        deleteTodo(taskid);
    }

}

function initialize() {
    document.addEventListener('click', handleClick);
    document.addEventListener('keyup', function (e) {
        const text = e.target.value;
        if (e.key == 'Enter') {
            console.log("initialize-> text", text)
            const task = {
                text: text,
                id: Date.now(),
                done: false
            }

            addTodo(task);
        }
    })
    renderList();
}

initialize();