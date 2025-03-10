"use strict";
import { products } from "./massive.js";
import { products2 } from "./massive2.js";

const mainProductsDiv = document.querySelector('.main_products');
const cartBox = document.querySelector('.header_korz-box');
let cartItems = [];

// Карточки Товаров
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product_card');
    const price = parseFloat(product.price); 
    const bonus = (price * 0.2); 

    productCard.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="main_product-img" />
        <h2 class="main_product-text">${product.name}</h2>
        <p class="main_product-bonus"> + ${bonus} бонусов </p>
        <div class="main_product-all">
            <p class="main_product_price">${product.price} ₽</p> 
            <p class="product_price-text">${product.pricetext}</p>
        </div>
        <div class="main_product-reviews">
            <img src="${product.star}" class="main_product-star" /><p class="main_product-mention">${product.mention}</p>
        </div>
        <p class="main_product-nal">${product.nal}</p>
        <button class="main_product-btn" data-id="${product.id}">В корзину</button>
    `;

    mainProductsDiv.appendChild(productCard);
});

// Добавить в корзину
mainProductsDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('main_product-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        const messageDiv = document.querySelector('.main_item-done');
    
    // Показываем элемент
        
        setTimeout(() => {
            messageDiv.style.display = 'flex';
        }, 3);
    // Убираем элемент через 3 секунды
        setTimeout(() => {
         messageDiv.style.display = 'none';
        }, 3000); // 3000 миллисекунд = 3 секунды

        
        if (product) {
            // Получаем текущие товары в корзине из localStorage
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(product); // Добавляем товар в корзину
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем обновленный массив в localStorage
            
           
        }
    }
});

// Обновление корзины 
function updateCart() {
    cartBox.innerHTML = ''; // Очищаем корзину
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Цена: ${item.price} руб.</p>
        `;
        cartBox.appendChild(cartItem);
    });
}



const mainProductsDiv2 = document.querySelector('.main_products2');

// Карточки Товаров
products2.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product_card');
    const price = parseFloat(product.price); 
    const bonus = (price * 0.2); 

    productCard.innerHTML = `
    <div class="allproducts">
        <img src="${product.img}" alt="${product.name}" class="main_product-img" />
        <h2 class="main_product-text">${product.name}</h2>
        <p class="main_product-bonus"> + ${bonus} бонусов </p>
        <div class="main_product-all">
            <p class="main_product_price">${product.price} ₽</p> 
            <p class="product_price-text">${product.pricetext}</p>
        </div>
        <div class="main_product-reviews">
            <img src="${product.star}" class="main_product-star" /><p class="main_product-mention">${product.mention}</p>
        </div>
        <p class="main_product-nal">${product.nal}</p>
        <button class="main_product-btn" data-id="${product.id}">В корзину</button>
    </div>
    `;

    mainProductsDiv2.appendChild(productCard);
});

let btnreg = document.querySelector('.registration');
let regwind = document.querySelector('.main_registration-window');
btnreg.addEventListener('click', () =>{
    regwind.style.display = "block";
});


let exit = document.querySelector('.closePopup');
exit.addEventListener('click', () =>{
    regwind.style.display = "none";
});


//Регистрация 
const users = []; // Массив для хранения данных пользователей

let signin = document.querySelector('.sign_in');

// Обработчик события для кнопки входа
signin.addEventListener('click', (event) => {
    const email = document.querySelector('.input_reg[type="email"]').value;
    const password = document.querySelector('.input_reg[type="password"]').value;

    // Проверка на существование пользователя
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        console.log('Успешный вход:', { email });
        regwind.style.display = "none";
        localStorage.setItem('user', JSON.stringify(user)); // Сохраняем пользователя в localStorage
        btnreg.textContent = user.email; // Обновляем текст кнопки
    } else {
        console.error('Неверный email или пароль');
    }
});

// Обработчик события для кнопки регистрации
let signUp = document.querySelector('.sign_up');

signUp.addEventListener('click', (event) => {
    const email = document.querySelector('.input_reg[type="email"]').value;
    const password = document.querySelector('.input_reg[type="password"]').value;

    // Проверка на существование пользователя
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        console.error('Пользователь с таким email уже существует');
        return; // Выход из функции, если пользователь уже зарегистрирован
    }

    // Добавляем нового пользователя в массив
    users.push({ email, password });
    console.log('Пользователь зарегистрирован:', { email, password });
    
    // Сохраняем нового пользователя в localStorage
    localStorage.setItem('user', JSON.stringify({ email, password }));
});
