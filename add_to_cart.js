// Function to load cart count on page load
function loadCartCount() {
    const cartCount = localStorage.getItem('cartCount') || 0;
    document.querySelector('.cart-count').innerText = cartCount;
}
// JavaScript function to show a pop-up when an item is added to the cart
function addToCart(event) {
    // Get the product details from the DOM
    const productItem = event.target.closest('.product-item');
    const productName = productItem.querySelector('h3').innerText;
    const productPrice = productItem.querySelector('p').innerText;
    const productImage = productItem.querySelector('img').src;

    // Create product object
    const product = { name: productName, price: productPrice, image: productImage };

    // Retrieve current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex(item => item.name === productName);
    
    if (existingProductIndex === -1) {
        // If the product is not in the cart, add it
        cartItems.push(product);
    } else {
        // If the product already exists, update it (optional: add quantity, etc.)
        // Example: You could increase quantity here, if desired
        cartItems[existingProductIndex].quantity = (cartItems[existingProductIndex].quantity || 1) + 1;
    }

    // Save updated cart items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart count
    updateCartCount();
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

loadCartCount();