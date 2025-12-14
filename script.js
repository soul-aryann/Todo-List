const input = document.getElementById('newTask');
const form = document.getElementById('form');
const todoList = document.getElementById('todo-list');

let tasks = [];

form.addEventListener('submit', function(event){
    event.preventDefault();
    const taskText = input.value;
    if (taskText.trim()===''){
        return;
    }

    const taskObject ={
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(taskObject);

    renderTasks();

    input.value = '';

});

function renderTasks(){
    todoList.innerHTML = '';
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.textContent = task.text;
        todoList.appendChild(li);

        if (task.completed){
            li.classList.add('completed');
        }
        li.addEventListener('click', function(){
            task.completed =! task.completed;
            renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent='Delete';
        
        
        deleteButton.addEventListener('click', function(e){
            e.stopPropagation();
            tasks=tasks.filter(function(t){
                return t.id !== task.id ;
            })
            renderTasks();
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}