// Главные константы
const inputBox = document.querySelector('.input-box');
const listContainer = document.querySelector('.list-container');

// Функция для создания элемента задачи и добавления его в список
function createTaskElement(text, checked = false) {
    let li = document.createElement('li');

    li.textContent = text;

    if (checked)
        li.classList.add('checked');

    // Создаем кнопку удаления
    let deleteButton = document.createElement('div');

    deleteButton.textContent = '×'; // Символ удаления (крестик)
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function () {
        li.remove();
        saveTasks();  // Сохраняем обновленный список задач
    };

    li.appendChild(deleteButton);  // Добавляем кнопку удаления в <li>

    li.addEventListener('click', function () {
        li.classList.toggle('checked');
        saveTasks();  // Сохраняем обновленный список задач
    });

    listContainer.appendChild(li);
}

// Функция для добавления новой задачи
function addTask() {
    if (inputBox.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    else {
        createTaskElement(inputBox.value);
        saveTasks();  // Сохраняем обновленный список задач
        inputBox.value = '';
    }
}

// Функция для сохранения задач в Local Storage
function saveTasks() {
    const tasks = [];

    document.querySelectorAll('.list-container li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Удаляем все старые задачи
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
}

// Добавляем обработчик события keydown на поле ввода
inputBox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();  // Вызываем функцию добавления задачи
    }
});

// Загружаем задачи при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTasks);


// Функция для показа/скрытия меню
function toggleMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Закрытие меню при клике вне его области
window.onclick = function (event) {
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (!event.target.closest('.burger-menu') && !event.target.closest('.dropdown-menu'))
        dropdownMenu.style.display = 'none';
}
