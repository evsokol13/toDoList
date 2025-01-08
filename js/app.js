let addMessage = document.querySelector('.message')
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo')
let del = document.querySelector('.delete')

let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages()
}

addButton.addEventListener('click', function () {
    if (!addMessage.value) return 
    
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        import: false
    }

    todoList.push(newTodo)
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(todoList))
    addMessage.value = ''
})

function delTask() {
    const deleteButtons = document.querySelectorAll('.delete')
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const index = event.target.dataset.index //индекс из задачи data атрибута
            todoList.splice(index, 1)
            localStorage.setItem('todo', JSON.stringify(todoList))
            displayMessages()
        })
    })
}

function addImportant() {
    const importantButtons = document.querySelectorAll('.important-btn')
    importantButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const index = event.target.dataset.index //индекс из задачи data атрибута
            todoList[index].important = !todoList[index].important
            localStorage.setItem('todo', JSON.stringify(todoList))
            displayMessages()
        })
    })
}

function addEdit() {
    const editButtons = document.querySelectorAll('.edit')

}

function displayMessages() {
    if (!todoList.length) {
        todo.innerHTML = 'No tasks'
        return
    }

    let displayMessage = ''
    todoList.forEach((item, i) => {
        displayMessage += `
            <li>
                <input type="checkbox" id='item${i}' ${item.checked ? 'checked' : ''}>
                <label for='item${i}' class='${item.important ? 'important' : ''}'>
                ${item.todo}</label>

                <div class="tools">
                    <img class='edit' data-index='${i}' src='./icons/edit.png' alt='edit'>
                    <img class='important-btn' data-index='${i}' src='./icons/important.png' alt='important'>
                    <img class='delete' data-index='${i}' src='./icons/delete.png' alt='delete'>
                </div>
            </li>
        `
    })
    todo.innerHTML = displayMessage
    delTask()   
    addImportant()
}

