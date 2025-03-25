// Load cart items on page load
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Display each product in the cart
    cartItems.forEach((item, index) => {
		fetch('products/' + item.id + '.json')
		.then(response => response.json())
		.then(data => {
			appendCartItem(data, index, item);
		})
    });

    // Attach event listeners to remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

let totalPrice = 0;
const cartList = document.querySelector('.cart-list');

function appendCartItem(product, index, item) {
	
	const productDiv = document.createElement('div');
    productDiv.classList.add('cart-item');

	// Create the image element
	const img = document.createElement('img');
	img.src = 'images/' + product.image[0];
	img.alt = product.name;
	img.className = 'cart-item-image';

	// Create the product name element
	const name = document.createElement('h3');
	name.className = 'cart-item-name';
	name.textContent = product.name;
	
	// Create a container for the size and color
	const detailsContainer = document.createElement('div');
	detailsContainer.className = 'cart-item-details';
	
	const sizeLabel = document.createElement('p');
	sizeLabel.className = 'cart-item-size';
	sizeLabel.textContent = 'Kích thước: ' + item.size;

	const colorBox = document.createElement('div');
	colorBox.className = 'cart-item-color';
	colorBox.style.backgroundColor = item.color;

	// Create the price element
	const price = document.createElement('p');
	price.className = 'cart-item-price';
	price.textContent = item.quantity.toString() + 'x ' + product.price;

	// Create the remove button
	const removeButton = document.createElement('button');
	removeButton.className = 'remove-from-cart';
    removeButton.dataset.index = index;
    removeButton.dataset.price = product.price;
    removeButton.dataset.quantity = item.quantity;
	removeButton.textContent = 'Xóa khỏi giỏ hàng';
	removeButton.addEventListener('click', removeFromCart);

	detailsContainer.appendChild(name);
	detailsContainer.appendChild(sizeLabel);
	detailsContainer.appendChild(colorBox);

	productDiv.appendChild(img);
	productDiv.appendChild(detailsContainer);
	productDiv.appendChild(price);
	productDiv.appendChild(removeButton);

    cartList.appendChild(productDiv);
	
    // Update the total price
    totalPrice += parseFloat(product.price.replace('$', '')) * item.quantity;
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(event) {
	let productDiv = event.target.parentElement;
    const itemIndex = event.target.dataset.index;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Remove item from the cart
    cartItems.splice(itemIndex, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart count
	const quantity = event.target.dataset.quantity;
	localStorage.setItem('cartCount', localStorage.getItem('cartCount') - quantity);
    loadCartCount();
	
    totalPrice -= parseFloat(event.target.dataset.price.replace('$', '')) * quantity;
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);

    // Remove element
    productDiv.remove();
}

// Load initial cart items and cart count
loadCartItems();
