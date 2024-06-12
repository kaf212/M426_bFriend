

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => {
            if (res.status === 401) {
                alert("Wrong password");
                return;
            }
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(data => {
            if (data) {
                window.location = `../index.html?userid=${data}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    fetch('http://localhost:3000/api/login/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, password: newPassword })
    })
        .then(response => response.json())
});
