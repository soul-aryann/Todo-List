const input = document.getElementById('newTask');
const form = document.getElementById('form');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');

const datePicker = document.getElementById('date-picker');
const prevDateBtn = document.getElementById('prev-date');
const nextDateBtn = document.getElementById('next-date');
const todayBtn = document.getElementById('today-btn');

function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getTodayString() {
    return formatDate(new Date());
}

let selectedDate = getTodayString();
let tasks = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Backward compatibility: ensure existing tasks have a date assigned
tasks.forEach(function(task) {
    if (!task.date) {
        task.date = selectedDate;
    }
});

function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(tasks));
}
saveTasks();

function setDate(newDateStr) {
    selectedDate = newDateStr;
    if (datePicker) {
        datePicker.value = selectedDate;
    }
    renderTasks();
}

if (datePicker) {
    datePicker.value = selectedDate;
    datePicker.addEventListener('change', function() {
        if (datePicker.value) {
            setDate(datePicker.value);
        }
    });
}

function shiftDate(days) {
    const parts = selectedDate.split('-');
    const cur = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    cur.setDate(cur.getDate() + days);
    setDate(formatDate(cur));
}

if (prevDateBtn) {
    prevDateBtn.addEventListener('click', function() {
        shiftDate(-1);
    });
}

if (nextDateBtn) {
    nextDateBtn.addEventListener('click', function() {
        shiftDate(1);
    });
}

if (todayBtn) {
    todayBtn.addEventListener('click', function() {
        setDate(getTodayString());
    });
}

function getDailyTasks() {
    return tasks.filter(function(t) {
        return t.date === selectedDate;
    });
}

function updateFilterCounts() {
    const daily = getDailyTasks();
    const total = daily.length;
    const completed = daily.filter(t => t.completed).length;
    const active = total - completed;

    const countAll = document.getElementById('count-all');
    const countActive = document.getElementById('count-active');
    const countCompleted = document.getElementById('count-completed');

    if (countAll) countAll.textContent = total;
    if (countActive) countActive.textContent = active;
    if (countCompleted) countCompleted.textContent = completed;
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText === '') {
        return;
    }

    const taskObject = {
        id: Date.now(),
        text: taskText,
        completed: false,
        date: selectedDate
    };

    tasks.push(taskObject);
    saveTasks();
    renderTasks();

    input.value = '';
    input.focus();
});

filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    });
});

if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', function() {
        tasks = tasks.filter(function(task) {
            return !(task.date === selectedDate && task.completed);
        });
        saveTasks();
        renderTasks();
    });
}

function getFilteredTasks() {
    const daily = getDailyTasks();
    if (currentFilter === 'active') {
        return daily.filter(t => !t.completed);
    }
    if (currentFilter === 'completed') {
        return daily.filter(t => t.completed);
    }
    return daily;
}

function renderTasks() {
    updateFilterCounts();
    todoList.innerHTML = '';
    const daily = getDailyTasks();
    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'empty-state';
        if (daily.length === 0) {
            emptyItem.textContent = selectedDate === getTodayString()
                ? 'No tasks for today. Add one above!'
                : `No tasks for ${selectedDate}. Add one above!`;
        } else if (currentFilter === 'active') {
            emptyItem.textContent = 'All tasks completed for this day! 🎉';
        } else if (currentFilter === 'completed') {
            emptyItem.textContent = 'No completed tasks for this day.';
        }
        todoList.appendChild(emptyItem);
        return;
    }

    filteredTasks.forEach(function(task) {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox-custom';
        checkbox.setAttribute('role', 'checkbox');
        checkbox.setAttribute('aria-checked', task.completed ? 'true' : 'false');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete-btn';
        deleteButton.setAttribute('aria-label', 'Delete task');
        deleteButton.innerHTML = '&times;';

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        li.addEventListener('click', function() {
            toggleTask(task.id);
        });

        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            tasks = tasks.filter(function(t) {
                return t.id !== task.id;
            });
            saveTasks();
            renderTasks();
        });

        todoList.appendChild(li);
    });
}

renderTasks();