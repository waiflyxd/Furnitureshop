"use strict";
import { products } from "./massive.js";

const mainProductsDiv = document.querySelector('.main_products');
const cartBox = document.querySelector('.header_korz-box');
const users = [];
const admin = { email: "Shamova", password: "admin123", role: "admin" };
users.push(admin);

// ПОИСК
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const user = JSON.parse(localStorage.getItem('user'));

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );

    renderProducts(user, filtered);
}

let btnreg = document.querySelector('.registration');
let regwind = document.querySelector('.main_registration-window');
let signin = document.querySelector('.sign_in');
let signUp = document.querySelector('.sign_up');
let userreg = document.querySelector('.userreg');

// === UI ===
btnreg.addEventListener('click', () => {
    regwind.style.display = "block";
});
document.querySelector('.closePopup').addEventListener('click', () => {
    regwind.style.display = "none";
});

// === Логика входа ===
signin.addEventListener('click', () => {
    const email = document.querySelector('.input_reg[type="email"]').value;
    const password = document.querySelector('.input_reg[type="password"]').value;

    fetch("http://localhost/Furnitureshop/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert(`Добро пожаловать, ${data.user.email}`);
            setUser(data.user);
            regwind.style.display = "none";
        } else {
            alert("Неверный логин или пароль");
        }
    });
});


// === Регистрация ===
signUp.addEventListener('click', () => {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch("http://localhost/Furnitureshop/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Регистрация прошла успешно!");
        } else {
            alert("Ошибка: " + data.error);
        }
    });
});

// === Сохранение пользователя ===
function setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    btnreg.textContent = user.email;
    renderProducts(user);

    if (user.role === "admin") {
        showAdminPanel(user);
    }
}



// === Отрисовка карточек ===
function renderProducts(user) {
    mainProductsDiv.innerHTML = '';
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
                <img src="${product.star}" class="main_product-star" />
                <p class="main_product-mention">${product.mention}</p>
            </div>
            <p class="main_product-nal">${product.nal}</p>
            <button class="main_product-btn" data-id="${product.id}">В корзину</button>
        `;

        if (user && user.role === "admin") {
            const prodinfo = document.createElement('div');
            prodinfo.classList.add('info-panel');
            prodinfo.innerHTML = `<button class="edit-product-btn" data-id="${product.id}">Посмотреть информацию</button>`;
            prodinfo.querySelector('.edit-product-btn').addEventListener('click', () => {
                const prodinformation = document.createElement('div');
                prodinformation.classList.add('prod-information');  
                prodinformation.innerHTML = `
                    <p class="info-product">ID: ${product.id}</p>
                    <p class="info-product">Название: ${product.name}</p>
                    <p class="info-product">Цена: ${product.price}</p>
                    <p class="info-product">ID: ${product.id}</p>
                    `
                   
                    productCard.appendChild(prodinformation); // Добавляем в DOM
            })
            productCard.appendChild(prodinfo);
        }

        mainProductsDiv.appendChild(productCard);
    });
}

// === Обработка кнопки "В корзину" ===
mainProductsDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('main_product-btn')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        const messageDiv = document.querySelector('.main_item-done');

        setTimeout(() => messageDiv.style.display = 'flex', 3);
        setTimeout(() => messageDiv.style.display = 'none', 3000);

        if (product) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity += 1;
            } else {
                cartItems.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }
});

// === Админ-панель ===
function showAdminPanel(user) {
    const adminPanel = document.querySelector('.admin');
    adminPanel.classList.add('admin-panel');
    adminPanel.innerHTML = `
        <h2>Здравствуйте, ${user.email}!</h2>
        <p class="admin-welcome"><b>Добро пожаловать в админ панель!</b></p>
        <button id="view-users">Просмотреть пользователей</button>
        <div id="user-list"></div>
        <h3>Редактировать товары</h3>
        <input type="text" id="product-id" placeholder="ID товара" />
        <input type="text" id="product-name" placeholder="Название товара" />
        <input type="text" id="product-price" placeholder="Цена товара" />
        <input type="file" id="product-image" accept="image/*" />
        <button id="save-product">Сохранить изменения</button>
    `;

    document.getElementById('view-users').addEventListener('click', () => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(u => {
            const userItem = document.createElement('p');
            userItem.textContent = `Email: ${u.email}, Роль: ${u.role}`;
            userList.appendChild(userItem);
        });
    });

    document.getElementById('save-product').addEventListener('click', editProduct);
}

// === Редактирование товара ===
function editProduct() {
    const productId = document.getElementById('product-id').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productImage = document.getElementById('product-image').files[0];

    const productIndex = products.findIndex(product => product.id === parseInt(productId));
    if (productIndex !== -1) {
        products[productIndex].name = productName;
        products[productIndex].price = productPrice;

        if (productImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                products[productIndex].img = e.target.result;

                alert('Товар успешно обновлён!');
                const user = JSON.parse(localStorage.getItem('user'));
                renderProducts(user); // Перерисовать товары после загрузки изображения
            };
            reader.readAsDataURL(productImage);
        } else {
            alert('Товар успешно обновлён!');
            const user = JSON.parse(localStorage.getItem('user'));
            renderProducts(user); // Перерисовать товары без изображения
        }
    } else {
        alert('Товар не найден!');
    }
}

// === Загрузка при старте ===
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        setUser(savedUser);
    } else {
        renderProducts(null);
    }
});
// === Выход ===
const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Выйти';
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    location.reload();
});
document.body.appendChild(logoutBtn);



