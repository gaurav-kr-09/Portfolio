const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function addTodo(){
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-dueDate-input');
    const dueDate = dateInputElement.value;

    if(name.trim() !== '') {    
        todoList.push({
            name,
            dueDate 
        });

        inputElement.value = '';

        saveTodoList();

        renderTodoList();
    }
}

document.querySelector('.js-addTodo-button')
    .addEventListener('click', () => {
        addTodo();
    });

function saveTodoList(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function handleKeydown(event){
    if(event.key === 'Enter'){
        addTodo();
    }
}

function renderTodoList(){
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {
        
        const {name, dueDate} = todoObject;

        const html = `
            <div class="todo-item">
                <div class="todo-name" >${name}</div>
                <div class="todo-date" >${dueDate}</div>
                <button class="delete-button js-delete-button">Delete</button>
            </div>`;

        todoListHTML += html;
        }
    );

    document.querySelector('.js-todolist').innerHTML = todoListHTML;

    document.querySelectorAll('.js-delete-button')
        .forEach((deleteButton, index) =>{
            deleteButton.addEventListener('click', () => {
                todoList.splice(index, 1);
                    saveTodoList();
                    renderTodoList();
            })
        } )

}