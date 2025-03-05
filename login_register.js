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

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('message').textContent = '';
    let formData = new FormData(document.getElementById('register-form'));
        
    const regex = /^\d{10}$/;
    if (!regex.test(formData.get('phone_number'))) {
        document.getElementById('message').textContent = 'Vui lòng sử dụng SĐT 10 số.';
        return;
    }
    
    if (formData.get('password') !== formData.get('repeat_password')) {
        document.getElementById('message').textContent = 'Mật khẩu nhập lại không khớp.';
        return;
    }
    
    let recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        document.getElementById('message').textContent = 'Vui lòng hoàn tất reCAPTCHA.';
        return;
    }
    
    let registerButton = document.getElementById('register-button');
    registerButton.textContent = 'Đang đăng ký ...';
    registerButton.disabled = true;
    
    let username = formData.get('username');
    fetch('login_register.php', {
        method: 'POST',
        body: JSON.stringify({
            username:     username,
            email:        formData.get('email'),
            real_name:    formData.get('real_name'),
            phone_number: formData.get('phone_number'),
            address:      formData.get('address'),
            city:         formData.get('city'),
            password:     formData.get('password'),
            recaptcha:    recaptchaResponse
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const params = new URLSearchParams();
            params.append('username', username);
			window.location.href = 'login_verify.html?' + params.toString();
        } else {
            document.getElementById('message').textContent = 'Lỗi: ' + data.message;
        }
        registerButton.disabled = false
        registerButton.textContent = 'Đăng ký';
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
});
