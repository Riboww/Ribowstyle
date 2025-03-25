// Function to load cart count on page load
function loadCartCount() {
    const cartCount = localStorage.getItem('cartCount') || 0;
    document.querySelector('.cart-count').textContent = cartCount;
}

// Redirect to the cart page when clicking on the cart icon
document.querySelector('.cart').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

loadCartCount();
