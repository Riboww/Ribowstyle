// Check if already logged in
const storedToken = localStorage.getItem('accessToken');
if (storedToken) {
    document.getElementById('login-form').style.display = 'none';
    
	let user_info_element = document.getElementById('user-info');
    const username = localStorage.getItem('username');
    user_info_element.getElementsByClassName('username')[0].innerHTML = 'Logged in to <b>' + username;
    user_info_element.style.display = 'initial';
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.getElementById('message').textContent = '';
    let formData = new FormData(this);
    
    fetch('login.php', {
        method: 'POST',
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('username', formData.get('username'));
            window.location.href = 'index.html';
        } else {
            document.getElementById('message').textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
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
            document.getElementById('message').textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
