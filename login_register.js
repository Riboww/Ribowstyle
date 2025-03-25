let messageElement = document.getElementById('message');

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
    
    messageElement.textContent = '';
    let formData = new FormData(document.getElementById('register-form'));
        
    const regex = /^\d{10}$/;
    if (!regex.test(formData.get('phone_number'))) {
        messageElement.textContent = 'Vui lòng sử dụng SĐT 10 số.';
        return;
    }
    
	let password = formData.get('password');
    if (password !== formData.get('repeat_password')) {
        messageElement.textContent = 'Mật khẩu nhập lại không khớp.';
        return;
    }
	
	const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{7,23}$/;
	if (!passwordRegex.test(password)) {
        messageElement.textContent = 'Mật khẩu phải từ 7-23 ký tự, có chữ in, chữ thường và số.';
        return;
	}
    
    let recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        messageElement.textContent = 'Vui lòng hoàn tất reCAPTCHA.';
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
            password:     password,
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
            messageElement.textContent = 'Lỗi: ' + data.message;
        }
		
		grecaptcha.reset();
        registerButton.disabled = false
        registerButton.textContent = 'Đăng ký';
    })
    .catch(error => {
        messageElement.textContent = "Lỗi: " + error;
		
		grecaptcha.reset();
        registerButton.disabled = false
        registerButton.textContent = 'Đăng ký';
    });
});
