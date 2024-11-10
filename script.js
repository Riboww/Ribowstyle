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

// Auto-rotate every 5 seconds
setInterval(nextProduct, 5000);

updateCarousel(); // Initial setup
