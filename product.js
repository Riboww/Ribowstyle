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


products = {
	"products" : [
		{
			"name": "Cap",
			"price": "$19.99",
			"image": ["cap1.jpg", "cap2.jpg", "cap3.jpg"],
			"color" : ["black", "blue", "saddlebrown"],
			"size": ["10", "11", "12"],
		},
		{
			"name": "Glasses",
			"price": "$39.99",
			"image": ["glasses_blue.jpg", "glasses_orange.jpg", "glasses_purple.jpg"],
			"color" : ["cornflowerblue", "darksalmon", "purple"],
			"size": ["S", "M", "XL"]
		},
		{
			"name": "Starboy leather jacket",
			"price": "$29.99",
			"image": ["jacket1.jpg", "jacket2.jpg", "jacket3.jpg"],
			"color" : ["black", "blue", "saddlebrown"],
			"size": ["S", "M", "XL"]
		}
	]
};

//

let product_template_node = document.getElementsByClassName("product")[0];

let product_node = product_template_node.cloneNode(true);
product_template_node.after(product_node);
product_template_node.remove();

let product = products.products[0];
let current_image_node = product_node.getElementsByClassName('images-container')[0].getElementsByClassName('current-image')[0];
current_image_node.src = 'images/' + product.image[0];
