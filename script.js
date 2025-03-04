// Будущий проект по практике 
// Этот проект — простое веб-приложение для работы со списком автомобилей. 
// Пользователь может добавлять новые машины через форму, после чего список автоматически обновляется. 
// Также реализован поиск по марке автомобиля.


// Список машин
const cars = [
    { brand: "Toyota", model: "Camry", year: 2020, price: 20000 },
    { brand: "BMW", model: "X5", year: 2018, price: 35000 }
];

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
            
            // Используем prompt для получения новых значений
            let newBrand = prompt("Введите новую марку", car.brand);
            let newModel = prompt("Введите новую модель", car.model);
            let newYear = prompt("Введите новый год выпуска", car.year);
            let newPrice = prompt("Введите новую цену", car.price);

            // Если пользователь ввёл новые значения, обновляем запись
            if(newBrand && newModel && newYear && newPrice) {
                cars[index] = {
                    brand: newBrand,
                    model: newModel,
                    year: Number(newYear),
                    price: Number(newPrice)
                };
                displayCars(); // Обновляем отображение списка
            }
        };

        // Кнопка для удаления машины
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function () {
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
    cars.push({ brand, model, year, price });  // Добавляет объект в массив
    displayCars(); // Обновляет список
}

// 3. Функция для удаления машины по индексу
function deleteCar(index) {
    cars.splice(index, 1); // Удаляет элемент из массива
    displayCars(); // Обновляет отображение списка
}


// 4. Функция для поиска машины по марке
function findCarByBrand(brand) {  // Ищет машины по марке (brand)
    return cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());  // Отбирает машины, у которых brand совпадает (без учета регистра)
}


// 5. Обработчик отправки формы для добавления новой машины
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



// Выводим машины на страницу при загрузке
document.addEventListener("DOMContentLoaded", displayCars);


