const urlParams = new URLSearchParams(window.location.search);
const usernameVar = urlParams.get('username');
if (!usernameVar) {
    window.location.href = 'login.html';
}

document.getElementById('verify-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('message').textContent = '';
    let formData = new FormData(this);
    
    let verifyButton = document.getElementById('verify-button');
    verifyButton.disabled = true;
    
    fetch('login_verify.php', {
        method: 'POST',
        body: JSON.stringify({
            username:          usernameVar,
            verification_code: formData.get('verification_code')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('message').textContent = 'Lỗi: ' + data.message;
        }
        verifyButton.disabled = false;
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
});

document.getElementById('resend-button').addEventListener('click', function() {
    document.getElementById('message').textContent = '';
    
    let verifyButton = document.getElementById('verify-button');
    verifyButton.disabled = true;
    this.textContent = 'Đang gửi ...';
    this.disabled = true;
    
    fetch('login_resend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usernameVar })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
        } else {
            document.getElementById('message').textContent = "Lỗi: " + data.message;
        }
        this.disabled = false;
        this.textContent = 'Gửi lại';
        verifyButton.disabled = false;
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
});
