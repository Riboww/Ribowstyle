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

// Add this at the bottom of your script.js file

// Form toggle functionality
const toggleFormLinks = document.querySelectorAll('.toggle-form');
const loginBox = document.querySelector('.login-box');
const signupBox = document.querySelector('.signup-box');

toggleFormLinks.forEach(link => {
    link.addEventListener('click', () => {
        loginBox.classList.toggle('active');
        signupBox.classList.toggle('active');
    });
});

// Example: Handling form submission (you can integrate with an API for real-world use)
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    alert(`Login Attempted with Email: ${email}`);
});

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password === confirmPassword) {
        alert(`Signed up successfully with name: ${name}`);
    } else {
        alert('Passwords do not match!');
    }
});
