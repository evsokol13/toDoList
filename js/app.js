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

function displayMessages() {
    let displayMessage = ''
    if (todoList.length === 0) todo.innerHTML = ''
    todoList.forEach((item, i) => {
        displayMessage += `
            <li>
                <input type="checkbox" id='item${i}' ${
            item.checked ? 'checked' : ''
        }>
                <label for='item${i}' class='${
            item.important ? 'important' : ''
        }'>
                ${item.todo}</label>

                <img class='delete' src='./icons/delete.png' alt='delete'>
            </li>
        `

        todo.innerHTML = displayMessage
    })
}