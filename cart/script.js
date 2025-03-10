"use strict";

const cartBox = document.querySelector('.main_items');
let totalPriceDiv = document.querySelector('.total');
// Загружаем товары из localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0;
const boxitems = document.querySelector('.main_allitems');

// Отображаем товары в корзине
cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart_item');
    cartItem.innerHTML = `
    <div class="allproducts">
    <div class="main_korz-items">
        <img src="${item.img}" alt="${item.name}" class="main_product-img" />
        <div class="main_items-info">   
            <h3>${item.name}</h3>
            <p>Цена: ${item.price} руб.</p>
        </div>
        <div class="main_items-btn">
        <button class="main_product-btn" data-id="${item.id}">Купить</button>
        </div>
    </div>
    </div>
    `;
    cartBox.appendChild(cartItem);
    totalPrice += parseFloat(item.price);
    boxitems.appendChild(cartItem);
    boxitems.style.display = "block";
});

let btnclear = document.querySelector('.main_btn-clear');
btnclear.addEventListener('click', (event) => {
    localStorage.removeItem('cartItems');
    location.reload();
})



totalPriceDiv.innerHTML = `${totalPrice} руб.`;