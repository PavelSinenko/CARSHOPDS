// Будущий проект по практике 
// Этот проект — простое веб-приложение для работы со списком автомобилей. 
// Пользователь может добавлять, редактировать, удалять, сортировать машины через форму, после чего список автоматически обновляется. 
// Также реализован поиск по марке автомобиля.


// Список машин
let cars = [
    { brand: "Toyota", model: "Camry", year: 2020, price: 20000 },
    { brand: "BMW", model: "X5", year: 2018, price: 35000 }
];

// Глобальная переменная для хранения индекса редактируемой машины
let currentEditIndex = null;


// Функция сохранения данных в localStorage
function saveData() {
    localStorage.setItem('cars', JSON.stringify(cars));
}

// Функция загрузки данных из localStorage
function loadData() {
    let stored = localStorage.getItem('cars');
    if (stored) {
        cars = JSON.parse(stored);
    }
}

// 1. Функция для показа всех машин
function displayCars() {
    let carList = document.getElementById("car-list");    //Получаем ссылку на HTML-элемент <ul> с id="car-list", в который будем выводить список машин.
    carList.innerHTML = "";       // Очищает список перед обновлением, чтобы не дублировать данные.
   
    cars.forEach((car, index) => {   //Перебирает массив cars
        let item = document.createElement("li");   // Для каждой машины создает новый <li>
        item.textContent = `${car.brand} ${car.model}, ${car.year} - $${car.price}`;  // Определяет текст: "Марка, Модель, Год - $Цена"

        // Кнопка редактирования машины
        let editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.style.marginLeft = "10px";
        editButton.onclick = function () {

            // Запоминаем индекс редактируемой машины
             currentEditIndex = index;
            // Заполняем поля модального окна текущими данными
             document.getElementById("edit-brand").value = car.brand;
             document.getElementById("edit-model").value = car.model;
             document.getElementById("edit-year").value = car.year;
             document.getElementById("edit-price").value = car.price;
            // Показываем модальное окно
             document.getElementById("edit-modal").style.display = "block";
            
        };

        // Кнопка для удаления машины
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function () {
            // Запрос подтверждения удаления
            if (confirm("Вы уверены, что хотите удалить эту машину?"))
            deleteCar(index);
        };

        // Добавляем кнопки редактирования и удаления в элемент списка
        item.appendChild(editButton);
        item.appendChild(deleteButton); 

        // Добавляем элемент списка в контейнер
        carList.appendChild(item);     
    });
}

// 2. Функция для добавления новой машины
function addCar(brand, model, year, price) {
    cars.push({ brand, model, year, price });
    saveData(); // Сохраняем данные
    displayCars();
}


// 3. Функция для удаления машины по индексу
function deleteCar(index) {
    cars.splice(index, 1); // Удаляет элемент из массива
    saveData(); // Сохраняем изменения
    displayCars(); // Обновляет отображение списка
}


// 4. Функция для поиска машины по марке
function findCarByBrand(brand) {  // Ищет машины по марке (brand)
    return cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());  // Отбирает машины, у которых brand совпадает (без учета регистра)
}

// 5. Функция сортировки массива машин по указанному параметру
function sortCarsByParameter(parameter) {
    // Если параметр — строка, используем localeCompare для корректного сравнения
    if (typeof cars[0][parameter] === 'string') {
        cars.sort((a, b) => a[parameter].localeCompare(b[parameter]));
    } else {
        // Если параметр — число
        cars.sort((a, b) => a[parameter] - b[parameter]);
    }
    displayCars(); // Обновляем отображение отсортированного списка
}


// 6. Функция расширенного поиска и фильтрации
function searchCars() {
    // Получаем критерии поиска
    let searchBrand = document.getElementById('search-brand').value.trim().toLowerCase();
    let searchModel = document.getElementById('search-model').value.trim().toLowerCase();
    let minYear = Number(document.getElementById('min-year').value);
    let maxYear = Number(document.getElementById('max-year').value);
    let minPrice = Number(document.getElementById('min-price').value);
    let maxPrice = Number(document.getElementById('max-price').value);
    
    // Фильтруем массив, сохраняя оригинальный индекс для корректной работы редактирования и удаления
    let filtered = cars.map((car, index) => ({ ...car, originalIndex: index }))
       .filter(car => {
           let valid = true;
           if (searchBrand) {
               valid = valid && car.brand.toLowerCase().includes(searchBrand);
           }
           if (searchModel) {
               valid = valid && car.model.toLowerCase().includes(searchModel);
           }
           if (minYear) {
               valid = valid && car.year >= minYear;
           }
           if (maxYear) {
               valid = valid && car.year <= maxYear;
           }
           if (minPrice) {
               valid = valid && car.price >= minPrice;
           }
           if (maxPrice) {
               valid = valid && car.price <= maxPrice;
           }
           return valid;
       });
       
    displayCarsFiltered(filtered);
}

// Функция для отображения отфильтрованных результатов
function displayCarsFiltered(filteredCars) {
    let carList = document.getElementById("car-list");
    carList.innerHTML = ""; // Очищаем список
    
    filteredCars.forEach(car => {
        let item = document.createElement("li");
        item.textContent = `${car.brand} ${car.model}, ${car.year} - $${car.price}`;
        
        // Кнопка редактирования с использованием оригинального индекса
        let editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.style.marginLeft = "10px";
        editButton.onclick = function() {
            let newBrand = prompt("Введите новую марку", car.brand);
            let newModel = prompt("Введите новую модель", car.model);
            let newYear = prompt("Введите новый год выпуска", car.year);
            let newPrice = prompt("Введите новую цену", car.price);
            if(newBrand && newModel && newYear && newPrice) {
                cars[car.originalIndex] = {
                    brand: newBrand,
                    model: newModel,
                    year: Number(newYear),
                    price: Number(newPrice)
                };
                searchCars(); // Обновляем поиск после редактирования
            }
        };
        
        // Кнопка удаления с использованием оригинального индекса
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function() {
            deleteCar(car.originalIndex);
            searchCars(); // Обновляем поиск после удаления
        };
        
        item.appendChild(editButton);
        item.appendChild(deleteButton);
        carList.appendChild(item);
    });
}

// 7. Обработчик отправки формы для добавления новой машины
document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяет стандартное поведение формы (перезагрузку страницы)
    // Получаем значения из полей ввода
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const year = Number(document.getElementById('year').value);
    const price = Number(document.getElementById('price').value);
    // Добавляем новую машину и обновляем отображение
    addCar(brand, model, year, price);
    // Очищаем форму после отправки
    this.reset();
});

// 8. Обработчик сортировки по выбранному параметру
document.getElementById("sort-button").addEventListener("click", function() {
    const parameter = document.getElementById("sort-param").value;
    sortCarsByParameter(parameter);
});

// 9. Обработчик расширенного поиска
document.getElementById("search-button").addEventListener("click", function() {
    searchCars();
});

// 10. Обработчик сброса поиска: очищает поля поиска и отображает полный список
document.getElementById("reset-search-button").addEventListener("click", function() {
    document.getElementById('search-brand').value = "";
    document.getElementById('search-model').value = "";
    document.getElementById('min-year').value = "";
    document.getElementById('max-year').value = "";
    document.getElementById('min-price').value = "";
    document.getElementById('max-price').value = "";
    displayCars();
});

// 11. Обработчик для отправки формы модального окна
document.getElementById("edit-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    // Получаем новые данные из полей модального окна
    const newBrand = document.getElementById("edit-brand").value;
    const newModel = document.getElementById("edit-model").value;
    const newYear = Number(document.getElementById("edit-year").value);
    const newPrice = Number(document.getElementById("edit-price").value);
    
    // Обновляем данные в массиве
    if (currentEditIndex !== null) {
        cars[currentEditIndex] = {
            brand: newBrand,
            model: newModel,
            year: newYear,
            price: newPrice
        };
        saveData();     // Сохраняем изменения
        displayCars();  // Обновляем отображение списка
    }
    
    // Скрываем модальное окно и сбрасываем currentEditIndex
    document.getElementById("edit-modal").style.display = "none";
    currentEditIndex = null;
});

// 12. Обработчик для кнопки «Отмена» в модальном окне
document.getElementById("cancel-edit").addEventListener("click", function() {
    // Скрываем модальное окно и сбрасываем currentEditIndex
    document.getElementById("edit-modal").style.display = "none";
    currentEditIndex = null;
});


// При загрузке страницы сначала загружаем данные из localStorage, затем отображаем список
document.addEventListener("DOMContentLoaded", function() {
    loadData();
    displayCars();
});