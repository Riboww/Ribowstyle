let messageElement = document.getElementById('message');

// Check if already logged in
const storedToken = localStorage.getItem('accessToken');
if (storedToken) {
    document.getElementById('login-form').style.display = 'none';
    
    let user_info_element = document.getElementById('user-info');
    const username = localStorage.getItem('username');
    user_info_element.getElementsByClassName('username')[0].innerHTML = 'Đã đăng nhập vào <b>' + username;
    user_info_element.style.display = 'initial';
}

document.querySelectorAll('.show-password').forEach(button => {
    button.addEventListener('click', function () {
        // Find the associated password input field
        const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
        const icon = this.querySelector('i'); // The icon inside the button
        
        // Toggle the input type between 'password' and 'text'
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('bxs-show', 'bxs-hide'); // Change icon to 'bxs-hide'
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('bxs-hide', 'bxs-show'); // Change icon back to 'bxs-show'
        }
    });
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    messageElement.textContent = '';
    let formData = new FormData(this);
    
    let loginButton = document.getElementById('login-button');
    loginButton.textContent = 'Đang đăng nhập ...';
    loginButton.disabled = true;
    
    let username = formData.get('username');
    fetch('login.php', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: formData.get('password')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('username', username);
            window.location.href = 'index.html';
        } else {
            if (data.needVerify) {
                const params = new URLSearchParams();
                params.append('username', username);
                window.location.href = 'login_verify.html?' + params.toString();
            }
            messageElement.textContent = "Lỗi: " + data.message;
        }
        loginButton.disabled = false
        loginButton.textContent = 'Đăng nhập';
    })
    .catch(error => {
        messageElement.textContent = "Lỗi: " + error;
        loginButton.disabled = false
        loginButton.textContent = 'Đăng nhập';
    });
});

document.getElementById('logout-button').addEventListener('click', function() {
    const token = localStorage.getItem('accessToken');
    localStorage.removeItem('accessToken');
    
    fetch('logout.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'index.html';
        } else {
            messageElement.textContent = "Lỗi: " + data.message;
        }
    })
    .catch(error => {
        messageElement.textContent = "Lỗi: " + error;
    });
});
