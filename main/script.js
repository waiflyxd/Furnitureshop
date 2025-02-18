"use strict"
import { products } from "./massive";

const mainProductsDiv = document.querySelector('.main_products');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product_card');

    productCard.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>Цена: ${product.price} руб.</p>
        <button>Купить</button>
    `;

    mainProductsDiv.appendChild(productCard);
    
});