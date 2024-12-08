// File: cart.js

// Load cart items on page load
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartList = document.querySelector('.cart-list');
    let totalPrice = 0;

    // Clear any existing content
    cartList.innerHTML = '';

    // Display each product in the cart
    cartItems.forEach((item, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');

        productDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">${item.price}</p>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;

        cartList.appendChild(productDiv);

        // Calculate the total price
        const itemPrice = parseFloat(item.price.replace('$', ''));
        totalPrice += itemPrice;
    });

    // Update the total price
    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove item from cart
function removeFromCart(event) {
    const itemIndex = event.target.dataset.index;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Remove item from the cart
    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart count
    updateCartCount();

    // Reload cart items
    loadCartItems();
}

// Update cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = cartItems.length;

    localStorage.setItem('cartCount', cartCount);
    document.querySelector('.cart-count').innerText = cartCount;
}

// Load initial cart items and cart count
loadCartItems();
updateCartCount();
