// Будущий проект по практике 


// Список машин
const cars = [
    { brand: "Toyota", model: "Camry", year: 2020, price: 20000 },
    { brand: "BMW", model: "X5", year: 2018, price: 35000 }
];

// 1. Функция для показа всех машин
function displayCars() {
    let carList = document.getElementById("car-list");    //Получаем ссылку на HTML-элемент <ul> с id="car-list", в который будем выводить список машин.
    carList.innerHTML = "";       // Очищает список перед обновлением, чтобы не дублировать данные.
   
    cars.forEach(car => {   //Перебирает массив cars
        let item = document.createElement("li");   // Для каждой машины создает новый <li>
        item.textContent = `${car.brand} ${car.model}, ${car.year} - $${car.price}`;  // Определяем текст
        carList.appendChild(item);     // Добавляем созданный <li> в список ul
    });
}

// 2. Функция для добавления новой машины
function addCar(brand, model, year, price) {
    cars.push({ brand, model, year, price });  // Добавляет объект в массив
    displayCars(); // Обновляем список
}

// 3. Функция для поиска машины по марке
function findCarByBrand(brand) {  // Ищет машины по марке (brand)
    return cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());  // Отбирает машины, у которых brand совпадает (без учета регистра)
}

// Выводим машины на страницу при загрузке
document.addEventListener("DOMContentLoaded", displayCars);

