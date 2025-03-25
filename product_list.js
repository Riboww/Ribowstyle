// Function to fetch and populate a single product item
function populateProductItem(item) {
	const productId = item.getAttribute("data-id"); // Get the data-id attribute
	fetch('products/' + productId + '.json')
	.then((response) => response.json())
	.then((data) => {
		// Create and populate the <img> element
		const img = document.createElement("img");
		img.src = 'images/' + data.image[0]; // Set the first image
		img.alt = data.name;

		// Create and populate the <h3> element
		const name = document.createElement("h3");
		name.textContent = data.name;

		// Create and populate the <p> element
		const price = document.createElement("p");
		price.textContent = data.price;

		// Create the "Chi tiết" button
		const button = document.createElement("button");
		button.classList.add("details-button");
		button.textContent = "Chi tiết";
		button.addEventListener("click", () => {
			// Redirect to the product page with the product ID in the query string
			window.location.href = `product.html?product=${encodeURIComponent(productId)}`;
		});

		// Clear any existing content in the item
		item.innerHTML = "";

		// Append the new elements to the item
		item.appendChild(img);
		item.appendChild(name);
		item.appendChild(price);
		item.appendChild(button);
	})
}

document.querySelectorAll(".product-item").forEach(item => {
	populateProductItem(item);
});
