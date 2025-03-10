// Будущий проект по практике 
// Этот проект — простое веб-приложение для работы со списком автомобилей. 
// Пользователь может добавлять, редактировать, удалять, сортировать машины через форму, после чего список автоматически обновляется. 
// Также реализован поиск по параметрам автомобиля, включая дополнительные характеристики.

// Список машин с расширенными данными
let cars = [
    {
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        price: 20000,
        code: "TY123",
        country: "Япония",
        engineType: "Бензиновый",
        fuelConsumption: 7.5,
        reliability: 10,
        comfort: 8
    },
    {
        brand: "BMW",
        model: "X5",
        year: 2018,
        price: 35000,
        code: "BM456",
        country: "Германия",
        engineType: "Дизель",
        fuelConsumption: 9.0,
        reliability: 8,
        comfort: 9
    }
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

// Функция для показа уведомлений
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.style.display = "block";
    notification.textContent = message;
    // Через 3 секунды скрываем уведомление
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// 1. Функция для показа всех машин
function displayCars() {
    let carList = document.getElementById("car-list"); // Получаем ссылку на <ul> с id="car-list"
    carList.innerHTML = ""; // Очищаем список

    cars.forEach((car, index) => {
        let item = document.createElement("li");
        // Формируем текст с отображением всех параметров
        item.textContent = `${car.brand} ${car.model} (${car.code}), ${car.year} - $${car.price}; Страна: ${car.country}; Двигатель: ${car.engineType}; Расход: ${car.fuelConsumption}л/100км; Надежность: ${car.reliability} лет; Комфорт: ${car.comfort}/10`;

        // Кнопка редактирования машины (модальное окно)
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
            document.getElementById("edit-code").value = car.code;
            document.getElementById("edit-country").value = car.country;
            document.getElementById("edit-engineType").value = car.engineType;
            document.getElementById("edit-fuelConsumption").value = car.fuelConsumption;
            document.getElementById("edit-reliability").value = car.reliability;
            document.getElementById("edit-comfort").value = car.comfort;
            // Показываем модальное окно
            document.getElementById("edit-modal").style.display = "block";
        };

        // Кнопка для удаления машины
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function () {
            if (confirm("Вы уверены, что хотите удалить эту машину?"))
                deleteCar(index);
        };

        item.appendChild(editButton);
        item.appendChild(deleteButton);
        carList.appendChild(item);
    });
}

// 2. Функция для добавления новой машины с расширенными данными
function addCar(brand, model, year, price, code, country, engineType, fuelConsumption, reliability, comfort) {
    cars.push({ brand, model, year, price, code, country, engineType, fuelConsumption, reliability, comfort });
    saveData();
    displayCars();
    showNotification("Машина успешно добавлена!");
}

// 3. Функция для удаления машины по индексу
function deleteCar(index) {
    cars.splice(index, 1);
    saveData();
    displayCars();
    showNotification("Машина удалена!");
}

// 4. Функция для поиска машины по марке (базовый поиск)
function findCarByBrand(brand) {
    return cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
}

// 5. Функция сортировки массива машин по указанному параметру
function sortCarsByParameter(parameter) {
    if (typeof cars[0][parameter] === 'string') {
        cars.sort((a, b) => a[parameter].localeCompare(b[parameter]));
    } else {
        cars.sort((a, b) => a[parameter] - b[parameter]);
    }
    saveData();
    displayCars();
}

// 6. Функция расширенного поиска и фильтрации с дополнительными полями
function searchCars() {
    // Получаем критерии поиска
    let searchBrand = document.getElementById('search-brand').value.trim().toLowerCase();
    let searchModel = document.getElementById('search-model').value.trim().toLowerCase();
    let minYear = Number(document.getElementById('min-year').value);
    let maxYear = Number(document.getElementById('max-year').value);
    let minPrice = Number(document.getElementById('min-price').value);
    let maxPrice = Number(document.getElementById('max-price').value);
    let searchEngine = document.getElementById('search-engine').value.trim().toLowerCase();
    let minFuel = Number(document.getElementById('min-fuel').value);
    let maxFuel = Number(document.getElementById('max-fuel').value);
    let minReliability = Number(document.getElementById('min-reliability').value);
    let maxReliability = Number(document.getElementById('max-reliability').value);
    let minComfort = Number(document.getElementById('min-comfort').value);
    let maxComfort = Number(document.getElementById('max-comfort').value);
    
    let filtered = cars.map((car, index) => ({ ...car, originalIndex: index }))
       .filter(car => {
           let valid = true;
           if (searchBrand) {
               valid = valid && car.brand.toLowerCase().includes(searchBrand);
           }
           if (searchModel) {
               valid = valid && car.model.toLowerCase().includes(searchModel);
           }
           if (minYear) valid = valid && car.year >= minYear;
           if (maxYear) valid = valid && car.year <= maxYear;
           if (minPrice) valid = valid && car.price >= minPrice;
           if (maxPrice) valid = valid && car.price <= maxPrice;
           if (searchEngine) valid = valid && car.engineType.toLowerCase().includes(searchEngine);
           if (minFuel) valid = valid && car.fuelConsumption >= minFuel;
           if (maxFuel) valid = valid && car.fuelConsumption <= maxFuel;
           if (minReliability) valid = valid && car.reliability >= minReliability;
           if (maxReliability) valid = valid && car.reliability <= maxReliability;
           if (minComfort) valid = valid && car.comfort >= minComfort;
           if (maxComfort) valid = valid && car.comfort <= maxComfort;
           return valid;
       });
       
    displayCarsFiltered(filtered);
}

// Функция для отображения отфильтрованных результатов
function displayCarsFiltered(filteredCars) {
    let carList = document.getElementById("car-list");
    carList.innerHTML = "";
    
    filteredCars.forEach(car => {
        let item = document.createElement("li");
        item.textContent = `${car.brand} ${car.model} (${car.code}), ${car.year} - $${car.price}; Страна: ${car.country}; Двигатель: ${car.engineType}; Расход: ${car.fuelConsumption}л/100км; Надежность: ${car.reliability} лет; Комфорт: ${car.comfort}/10`;
        
        // Кнопка редактирования с использованием оригинального индекса
        let editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.style.marginLeft = "10px";
        editButton.onclick = function() {
            // Для упрощения редактирование через модальное окно (без prompt)
            currentEditIndex = car.originalIndex;
            document.getElementById("edit-brand").value = car.brand;
            document.getElementById("edit-model").value = car.model;
            document.getElementById("edit-year").value = car.year;
            document.getElementById("edit-price").value = car.price;
            document.getElementById("edit-code").value = car.code;
            document.getElementById("edit-country").value = car.country;
            document.getElementById("edit-engineType").value = car.engineType;
            document.getElementById("edit-fuelConsumption").value = car.fuelConsumption;
            document.getElementById("edit-reliability").value = car.reliability;
            document.getElementById("edit-comfort").value = car.comfort;
            document.getElementById("edit-modal").style.display = "block";
        };
        
        // Кнопка удаления с использованием оригинального индекса
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function() {
            deleteCar(car.originalIndex);
            searchCars();
        };
        
        item.appendChild(editButton);
        item.appendChild(deleteButton);
        carList.appendChild(item);
    });
}

// 7. Обработчик отправки формы для добавления новой машины
document.getElementById('car-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const brand = document.getElementById('brand').value.trim();
    const model = document.getElementById('model').value.trim();
    const year = Number(document.getElementById('year').value);
    const price = Number(document.getElementById('price').value);
    const code = document.getElementById('code').value.trim();
    const country = document.getElementById('country').value.trim();
    const engineType = document.getElementById('engineType').value.trim();
    const fuelConsumption = Number(document.getElementById('fuelConsumption').value);
    const reliability = Number(document.getElementById('reliability').value);
    const comfort = Number(document.getElementById('comfort').value);
    
    // Простая валидация
    if (!brand || !model || isNaN(year) || isNaN(price) || !code || !country || !engineType || isNaN(fuelConsumption) || isNaN(reliability) || isNaN(comfort) || year <= 0 || price <= 0 || fuelConsumption <= 0 || reliability <= 0 || comfort <= 0) {
        showNotification("Пожалуйста, введите корректные данные для всех полей.");
        return;
    }
    
    addCar(brand, model, year, price, code, country, engineType, fuelConsumption, reliability, comfort);
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
    document.getElementById('search-engine').value = "";
    document.getElementById('min-fuel').value = "";
    document.getElementById('max-fuel').value = "";
    document.getElementById('min-reliability').value = "";
    document.getElementById('max-reliability').value = "";
    document.getElementById('min-comfort').value = "";
    document.getElementById('max-comfort').value = "";
    displayCars();
});

// 11. Обработчик для отправки формы модального окна (редактирование)
document.getElementById("edit-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const newBrand = document.getElementById("edit-brand").value.trim();
    const newModel = document.getElementById("edit-model").value.trim();
    const newYear = Number(document.getElementById("edit-year").value);
    const newPrice = Number(document.getElementById("edit-price").value);
    const newCode = document.getElementById("edit-code").value.trim();
    const newCountry = document.getElementById("edit-country").value.trim();
    const newEngineType = document.getElementById("edit-engineType").value.trim();
    const newFuelConsumption = Number(document.getElementById("edit-fuelConsumption").value);
    const newReliability = Number(document.getElementById("edit-reliability").value);
    const newComfort = Number(document.getElementById("edit-comfort").value);
    
    if (currentEditIndex !== null) {
        cars[currentEditIndex] = {
            brand: newBrand,
            model: newModel,
            year: newYear,
            price: newPrice,
            code: newCode,
            country: newCountry,
            engineType: newEngineType,
            fuelConsumption: newFuelConsumption,
            reliability: newReliability,
            comfort: newComfort
        };
        saveData();
        displayCars();
        showNotification("Машина обновлена!");
    }
    
    document.getElementById("edit-modal").style.display = "none";
    currentEditIndex = null;
});

// 12. Обработчик для кнопки «Отмена» в модальном окне
document.getElementById("cancel-edit").addEventListener("click", function() {
    document.getElementById("edit-modal").style.display = "none";
    currentEditIndex = null;
});

// При загрузке страницы сначала загружаем данные из localStorage, затем отображаем список
document.addEventListener("DOMContentLoaded", function() {
    loadData();
    displayCars();
});
