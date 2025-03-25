let messageElement = document.getElementById('message');

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (!username) {
    window.location.href = 'login.html';
}

document.getElementById('verify-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    messageElement.textContent = '';
    let formData = new FormData(this);
    
    let verifyButton = document.getElementById('verify-button');
    verifyButton.disabled = true;
    
    fetch('login_verify.php', {
        method: 'POST',
        body: JSON.stringify({
            username:          username,
            verification_code: formData.get('verification_code')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'login.html';
        } else {
            messageElement.textContent = 'Lỗi: ' + data.message;
        }
        verifyButton.disabled = false;
    })
    .catch(error => {
        messageElement.textContent = "Lỗi: " + error;
        verifyButton.disabled = false
    });
});

document.getElementById('resend-button').addEventListener('click', function() {
    messageElement.textContent = '';
    
    let verifyButton = document.getElementById('verify-button');
    verifyButton.disabled = true;
    this.textContent = 'Đang gửi ...';
    this.disabled = true;
    
    fetch('login_resend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            messageElement.textContent = "Lỗi: " + data.message;
        }
        this.disabled = false;
        this.textContent = 'Gửi lại';
        verifyButton.disabled = false;
    })
    .catch(error => {
        messageElement.textContent = "Lỗi: " + error;
        this.disabled = false;
        this.textContent = 'Gửi lại';
        verifyButton.disabled = false;
    });
});
