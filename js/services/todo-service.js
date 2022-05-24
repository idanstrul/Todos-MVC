'use strict'

const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'ALL'
var gSortBy = 'TEXT'
_createTodos()

function getTodosForDisplay() {
    var todosForDisplay;
    if (gFilterBy === 'ALL') todosForDisplay = gTodos;
    else{
        todosForDisplay = gTodos.filter(todo => 
            todo.isDone && gFilterBy === 'DONE' || 
            !todo.isDone && gFilterBy === 'ACTIVE'
    )}
    console.log(todosForDisplay.sort(todoSorter)); 
    return todosForDisplay.sort(todoSorter);
}

function removeTodo(todoId)  {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId)  {
    var todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)  
    gTodos.unshift(todo)    
    _saveTodosToStorage()
}

function getTodosCount(){
    return gTodos.length
}

function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy){
    gSortBy = sortBy;
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML', 1),
            _createTodo('Study CSS', 2),
            _createTodo('Master Javascript', 3),
        ]
        _saveTodosToStorage()
    }
}

function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt: txt,
        importance,
        createdAt: Date.now(),
        isDone: false
    }
    return todo
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < length; i++)    {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}