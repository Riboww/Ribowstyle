let currentIndex = 0;
const products = document.querySelectorAll(".product-item");

function updateCarousel() {
    const totalProducts = products.length;
    products.forEach((product, index) => {
        product.classList.remove("left", "center", "right");

        // Calculate new positions
        if (index === currentIndex) {
            product.classList.add("center");
        } else if (index === (currentIndex + 1) % totalProducts) {
            product.classList.add("right");
        } else if (index === (currentIndex - 1 + totalProducts) % totalProducts) {
            product.classList.add("left");
        } else {
            product.classList.add("hide");
        }
    });
}

function previousProduct() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    updateCarousel();
}

function nextProduct() {
    currentIndex = (currentIndex + 1) % products.length;
    updateCarousel();
}

// File: index.js

// Function to load cart count on page load
function loadCartCount() {
    const cartCount = localStorage.getItem('cartCount') || 0;
    document.querySelector('.cart-count').innerText = cartCount;
}
// JavaScript function to show a pop-up when an item is added to the cart
function addToCart() {
    // Show the notification
    const notification = document.createElement('div');
    notification.classList.add('cart-notification');
    notification.innerHTML = 'Item added to cart!';
    
    // Append the notification to the body
    document.body.appendChild(notification);
    
    // Remove the notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}



// Function to update cart count
function updateCartCount() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    document.querySelector('.cart-count').innerText = cartCount;
}

// Event listener for all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Redirect to the cart page when clicking on the cart icon
document.querySelector('.cart').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Load the initial cart count when the page loads
loadCartCount();

    

// Auto-rotate every 5 seconds
setInterval(nextProduct, 5000);

updateCarousel(); // Initial setup
