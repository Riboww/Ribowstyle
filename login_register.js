document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('message').textContent = '';
    let formData = new FormData(this);
        
    const regex = /^\d{10}$/;
    if (!regex.test(formData.get('phone_number'))) {
        document.getElementById('message').textContent = 'Please use a 10-digit phone number.';
        return;
    }
    
    if (formData.get('password') !== formData.get('repeat_password')) {
        document.getElementById('message').textContent = 'Password repeat field doesn\'t match.';
        return;
    }
    
    fetch('login_register.php', {
        method: 'POST',
        body: JSON.stringify({
            username:     formData.get('username'),
            email:        formData.get('email'),
            real_name:    formData.get('real_name'),
            phone_number: formData.get('phone_number'),
            address:      formData.get('address'),
            city:         formData.get('city'),
            password:     formData.get('password')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('register-form').style.display = 'none';
    		document.getElementById('verification-form').style.display = 'initial';
        } else {
            document.getElementById('message').textContent = 'Error: ' + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('verification-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('message').textContent = '';
    let formData = new FormData(this);
    
    fetch('login_verify.php', {
        method: 'POST',
        body: JSON.stringify({
            verification_code: formData.get('verification_code')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('message').textContent = 'Error: ' + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
