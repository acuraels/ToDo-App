const inputBox = document.querySelector('.input-box');
const listContainer = document.querySelector('.list-container');

function addTask() {
    if (inputBox.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    else {
        let li = document.createElement('li');
        li.textContent = inputBox.value;

        // Создаем кнопку удаления
        let deleteButton = document.createElement('div');

        deleteButton.textContent = '×'; // Символ удаления (крестик)
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function () {
            li.remove();  // Удаляем задачу
        };

        li.appendChild(deleteButton);  // Добавляем кнопку удаления в <li>

        li.addEventListener('click', function () {
            li.classList.toggle('checked');
        });

        listContainer.appendChild(li);
        inputBox.value = '';
    }
}

// Добавляем обработчик события keydown на поле ввода
inputBox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();  // Вызываем функцию добавления задачи
    }
});
