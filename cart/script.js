const cartBox = document.querySelector('.main_items');
let totalPriceDiv = document.querySelector('.total');
// Загружаем товары из localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = 0;
const boxitems = document.querySelector('.main_allitems');
let btnclear = document.querySelector('.main_btn-clear');
btnclear.addEventListener('click', (event) => {
    localStorage.removeItem('cartItems');
    location.reload();
});
const cartinfo = document.createElement('div');
cartinfo.classList.add('cart_info');
;

// Функция для отображения товаров в корзине
function renderCartItems() {
        cartBox.innerHTML = ``; // Очищаем корзину перед рендерингом

    totalPrice = 0; // Сбрасываем общую стоимость

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
                    <p>Количество: <span class="item-quantity">${item.quantity}</span></p>
                </div>
                <div class="main_items-btn">
                    <button class="btn-decrease" data-id="${item.id}">-</button>
                    <button class="btn-increase" data-id="${item.id}">+</button>
                    <button class="btn-remove" data-id="${item.id}">Удалить</button>
                </div>
            </div>
        </div>`;
        cartBox.appendChild(cartItem);
        totalPrice += parseFloat(item.price) * item.quantity; // Учитываем количество
    });

    totalPriceDiv.innerHTML = `${totalPrice} руб.`; // Обновляем общую стоимость

    // Устанавливаем обработчик событий для кнопки "Очистить Корзину"
   
}

// Обновляем интерфейс при загрузке страницы
renderCartItems();

// Обработчик событий для кнопок в корзине
cartBox.addEventListener('click', (event) => {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const productIndex = cartItems.findIndex(item => item.id === productId);

    if (event.target.classList.contains('btn-increase')) {
        cartItems[productIndex].quantity += 1; // Увеличиваем количество
    } else if (event.target.classList.contains('btn-decrease')) {
        if (cartItems[productIndex].quantity > 1) {
            cartItems[productIndex].quantity -= 1; // Уменьшаем количество
        }
    } else if (event.target.classList.contains('btn-remove')) {
        cartItems.splice(productIndex, 1); // Удаляем элемент
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Сохраняем изменения в localStorage
    renderCartItems(); // Обновляем отображение корзины
});

