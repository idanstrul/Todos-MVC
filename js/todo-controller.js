'use strict'

function onInit() {
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (!confirm('Are you sure you want to delete this note?')) return;
    console.log('Removing Todo', todoId);

    removeTodo(todoId)
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    var strHTMLs = todos.map(todo =>
        `<tr class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
        <td> ${todo.txt} </td> 
        <td> ${todo.importance}</td>
        <td class = "time-stamp">${getTimeforDisplay(todo.createdAt)}</td>
        <td><button onclick="onRemoveTodo(event, '${todo.id}')">x</button></td>  
        </tr>`)
        
    var elTodoTable = document.querySelector('.todo-table');
    if (!strHTMLs.length){
        elTodoTable.innerHTML = `<h1>${getNoTodosMsg()}</h1>`;
    } else elTodoTable.innerHTML = strHTMLs.join('');

    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()
}



function onToggleTodo(todoId) {
    console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}

function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]');
    const txt = elTxt.value
    if (!txt) return;
    const importance = +document.querySelector('input[name="todoImportance"]:checked').value;
    const elDefultImportance = document.querySelector('input[name="todoImportance"][id="option1"]')
    
    addTodo(txt, importance)

    elTxt.value = '';
    elDefultImportance.checked = true;
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);

    setFilter(filterBy)
    renderTodos()

}

function onSetSort(sortBy) {
    console.log('Sorting By', sortBy);

    setSort(sortBy);
    renderTodos();
}