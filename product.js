let selectedColor;
let selectedSize;
let productTemplate = document.getElementById("product-template");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');

fetch('products/' + productId + '.json')
.then(response => response.json())
.then(data => {
	displayProduct(data);
})
.catch(error => {
	product = {
		"name": error.toString(),
		"price": "$00.00",
		"image": [""],
		"color" : [""],
		"size": [""]
	};
	displayProduct(product);
});

function displayProduct(product) {
	// Fill in product information
	productTemplate.querySelector(".product-name").textContent = product.name; // Set product name
	productTemplate.querySelector(".price").textContent = product.price; // Set price

	// Fill in images
	const imagesContainer = productTemplate.querySelector(".image-selector");
	imagesContainer.innerHTML = ""; // Clear default content
	product.image.forEach((imageSrc) => {
		const button = document.createElement("button");
		button.classList.add("image-button");
		const img = document.createElement("img");
		img.src = 'images/' + imageSrc;
		img.alt = product.name;
		button.appendChild(img);
		imagesContainer.appendChild(button);
	});
	
	let currentImage = productTemplate.querySelector(".current-image");
	let imageButtons = productTemplate.querySelectorAll(".image-selector .image-button");
	imageButtons.forEach((button, index) => {
		button.addEventListener("click", () => {
			// Update the current image source and alt attributes
			currentImage.src = 'images/' + product.image[index]; // Use the corresponding image from JSON
			currentImage.alt = product.name; // Optional: Update alt attribute
		});
	});
	imageButtons[0].click();

	// Fill in colors
	const colorsContainer = productTemplate.querySelector(".colors-container");
	colorsContainer.innerHTML = ""; // Clear default content
	product.color.forEach((color) => {
		const input = document.createElement("input");
		input.type = "checkbox";
		input.style.backgroundColor = color; // Set background color
		colorsContainer.appendChild(input);
	});
	
	const colorButtons = productTemplate.querySelectorAll(".colors-container input[type='checkbox']");
	colorButtons.forEach((button) => {
		button.addEventListener("change", (event) => {
			if (event.target.checked) {
				// Uncheck all other checkboxes
				colorButtons.forEach((btn) => {
					if (btn !== event.target) {
						btn.checked = false;
					}
				});
			}
			selectedColor = event.target.style.backgroundColor;
		});
	});
	colorButtons[0].checked = true;
	colorButtons[0].dispatchEvent(new Event("change"));

	// Fill in sizes
	const sizesContainer = productTemplate.querySelector(".sizes-container");
	sizesContainer.innerHTML = ""; // Clear default content
	product.size.forEach((size) => {
		const sizeButton = document.createElement("div");
		sizeButton.classList.add("size-button");

		const input = document.createElement("input");
		input.type = "checkbox";
		const sizeText = document.createElement("p");
		sizeText.textContent = size;

		sizeButton.appendChild(input);
		sizeButton.appendChild(sizeText);
		sizesContainer.appendChild(sizeButton);
	});
	
	const sizeButtons = productTemplate.querySelectorAll(".sizes-container input[type='checkbox']");
	sizeButtons.forEach((button) => {
		button.addEventListener("change", (event) => {
			sizeButtons.forEach((btn) => {
				if (btn !== event.target) {
					btn.checked = false;
				}
			});
			event.target.checked = true;
			selectedSize = event.target.nextElementSibling.textContent;
		});
	});
	sizeButtons[0].checked = true;
	sizeButtons[0].dispatchEvent(new Event("change"));
}

// Quantity handler
document.addEventListener("DOMContentLoaded", () => {
    const quantityInput = document.querySelector(".quantity-input");
    const minusButton = document.querySelector(".quantity-minus");
    const plusButton = document.querySelector(".quantity-plus");

    // Decrease quantity
    minusButton.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Increase quantity with a maximum limit of 100
    plusButton.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 100) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Validate input to ensure it's within the range of 1 to 100
    quantityInput.addEventListener("input", () => {
        let currentValue = parseInt(quantityInput.value);
        if (isNaN(currentValue) || currentValue < 1) {
            quantityInput.value = 1;
        } else if (currentValue > 100) {
            quantityInput.value = 100;
        }
    });
});

// Function to update cart count
function updateCartCount(quantity) {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCount += quantity;
    localStorage.setItem('cartCount', cartCount);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Event listener for all "Add to Cart" buttons
// JavaScript function to show a pop-up when an item is added to the cart
document.querySelector('.add-to-cart').addEventListener('click', function() {
    // Retrieve current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
	
    // Check if the product already exists in the cart
    const existingProductIndex = cartItems.findIndex(item =>
		item.id === productId &&
		item.color === selectedColor &&
		item.size === selectedSize
	);
    
	const quantity = parseInt(document.querySelector(".quantity-input").value);
    if (existingProductIndex === -1) {
        // If the product is not in the cart, add it
        cartItems.push({
			id: productId,
			color: selectedColor,
			size: selectedSize,
			quantity: quantity
		});
    } else {
        cartItems[existingProductIndex].quantity += quantity;
    }

    // Save updated cart items back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update cart count
    updateCartCount(quantity);
	
    // Show added notification
	let addToCartButton = document.querySelector(".add-to-cart");
	let addToCartButtonText = addToCartButton.querySelector("p");
	
    const originalText = addToCartButtonText.textContent;
    addToCartButtonText.textContent = "Đã thêm vào giỏ hàng";
	addToCartButtonText.classList.add("fading");
	addToCartButton.disabled = true;
	
    // Restore the original text after a few seconds
    setTimeout(() => {
		addToCartButtonText.classList.remove("fading");
        addToCartButtonText.textContent = originalText;
		addToCartButton.disabled = false;
    }, 1500);
});
