function checkEpic() {
    let epicInput = document.getElementById("epic");
    fetch(`/validate-epic/${epicInput.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                epicInput.style.borderColor = "green";
                document.getElementById("epic-validation").innerText = data.name;
                document.getElementById("epic-validation").style.color = "green";
            } else {
                epicInput.style.borderColor = "red";
                document.getElementById("epic-validation").innerText = "Эпик не найден";
                document.getElementById("epic-validation").style.color = "red";
            }
        });
}

function checkChangeRequest() {
    let crInput = document.getElementById("changeRequest");
    let descriptionInput = document.getElementById("description"); // Получаем элемент поля description

    if (crInput.value === "") {
        document.getElementById("cr-validation").innerText = "";
        crInput.style.borderColor = "#ccc";
        return;
    }

    fetch(`/validate-change-request/${crInput.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                crInput.style.borderColor = "green";
                document.getElementById("cr-validation").innerText = data.name;
                document.getElementById("cr-validation").style.color = "green";

                // Вставляем данные из Change Request в поле description
                descriptionInput.value = data.name; // Здесь предполагаем, что в ответе есть поле description
            } else {
                crInput.style.borderColor = "red";
                document.getElementById("cr-validation").innerText = "Change Request не найден";
                document.getElementById("cr-validation").style.color = "red";

                // Если Change Request не найден, очищаем поле description
                descriptionInput.value = "";
            }
        });
}

function checkReleaseTask() {
    let releaseInput = document.getElementById("releaseTask");
    fetch(`/validate-release/${releaseInput.value}`)
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                releaseInput.style.borderColor = "green";
                document.getElementById("release-validation").innerText = data.name;
                document.getElementById("release-validation").style.color = "green";
            } else {
                releaseInput.style.borderColor = "red";
                document.getElementById("release-validation").innerText = "Релизная задача не найдена";
                document.getElementById("release-validation").style.color = "red";
            }
        });
}

// Функция для фильтрации компонентов
function filterComponents() {
    let search = document.getElementById('component-search').value.toLowerCase();
    let items = document.getElementById('component-list').getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        let itemText = items[i].textContent.toLowerCase();
        if (itemText.includes(search)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}

// Функция для добавления компонента в список выбранных
function addComponent(element) {
    let value = element.getAttribute('data-value');
    let selectedComponents = document.getElementById('selected-components');
    let hiddenContainer = document.getElementById('selected-components-hidden');

    // Проверка на повторное добавление
    if (document.querySelector(`#selected-components div[data-value="${value}"]`)) {
        return;
    }

    // Создаем новый элемент для выбранного компонента
    let selectedComponent = document.createElement('div');
    selectedComponent.classList.add('selected-component');
    selectedComponent.setAttribute('data-value', value);
    selectedComponent.innerHTML = value + '<span onclick="removeComponent(this)">x</span>';
    selectedComponents.appendChild(selectedComponent);

    // Создаем скрытое поле input для отправки на сервер
    let hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'components';
    hiddenInput.value = value;
    hiddenContainer.appendChild(hiddenInput);
}

// Функция для удаления компонента из списка выбранных
function removeComponent(element) {
    let value = element.parentElement.getAttribute('data-value');
    let hiddenContainer = document.getElementById('selected-components-hidden');

    // Удаляем компонент из отображаемого списка
    element.parentElement.remove();

    // Находим и удаляем соответствующее скрытое поле input
    let hiddenInput = hiddenContainer.querySelector(`input[value="${value}"]`);
    if (hiddenInput) {
        hiddenInput.remove();
    }
}

// Показать выпадающее окно
function showDropdown(id) {
    document.getElementById(id).style.display = 'block';
}

// Скрыть выпадающее окно
function hideDropdown(id) {
    setTimeout(function () {
        document.getElementById(id).style.display = 'none';
    }, 200);
}

// Фильтрация тестировщика
function filterTester() {
    let search = document.getElementById('tester-search').value.toLowerCase();
    let items = document.getElementById('tester-list').getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        let itemText = items[i].textContent.toLowerCase();
        if (itemText.includes(search)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}

// Выбор тестировщика с отображением
// Update the selectTester function

// Функция для очистки выбранного тестировщика
function clearTester() {
    document.getElementById('selected-tester').innerHTML = '';
}

// Фильтрация аналитика
function filterAnalyst() {
    let search = document.getElementById('analyst-search').value.toLowerCase();
    let items = document.getElementById('analyst-list').getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        let itemText = items[i].textContent.toLowerCase();
        if (itemText.includes(search)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}

// Фильтрация разработчика
function filterDeveloper() {
    let search = document.getElementById('developer-search').value.toLowerCase();
    let items = document.getElementById('developer-list').getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        let itemText = items[i].textContent.toLowerCase();
        if (itemText.includes(search)) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none';
        }
    }
}


// Функция для очистки выбранного аналитика
function clearAnalyst() {
    document.getElementById('selected-analyst').innerHTML = '';
}

// Функция для очистки выбранного разработчика
function clearDeveloper() {
    document.getElementById('selected-developer').innerHTML = '';
}


function adjustHeight(element) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
}

// Функция для выбора разработчика
function selectDeveloper(element) {
    let value = element.getAttribute('data-value');
    document.getElementById('selected-developer').value = value;
    document.getElementById('hidden-developer').value = value; // Обновляем скрытое поле
    document.getElementById('developer-list').style.display = 'none';
}

// Функция для выбора тестировщика
function selectTester(element) {
    let value = element.getAttribute('data-value');
    document.getElementById('selected-tester').value = value;
    document.getElementById('hidden-tester').value = value; // Обновляем скрытое поле
    document.getElementById('tester-list').style.display = 'none';
}

// Функция для выбора аналитика
function selectAnalyst(element) {
    let value = element.getAttribute('data-value');
    document.getElementById('selected-analyst').value = value;
    document.getElementById('hidden-analyst').value = value; // Обновляем скрытое поле
    document.getElementById('analyst-list').style.display = 'none';
}

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

// Добавляем обработчик событий для закрытия выпадающего списка при клике вне его
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.task-form__dropdown'); // Находим все выпадающие списки
    const searchInputs = document.querySelectorAll('.task-form__dropdown input'); // Находим все поля поиска

    dropdowns.forEach(dropdown => {
        // Проверяем, если клик был вне выпадающего списка и его родительского элемента
        if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
            dropdown.style.display = 'none'; // Закрываем выпадающий список
        }
    });
});
