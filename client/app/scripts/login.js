document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Erfolgreich eingeloggt!');
            } else {
                alert('Fehler: ' + data.message);
            }
        })
        .catch(error => {
            alert('Fehler beim Einloggen: ' + error);
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
        .then(data => {
            if (data.success) {
                alert('Erfolgreich registriert!');
            } else {
                alert('Fehler: ' + data.message);
            }
        })
        .catch(error => {
            alert('Fehler bei der Registrierung: ' + error);
        });
});
