// Get the current URL
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('newUser') === "true") {
    document.querySelector(".notice-container").style.display = "block"
    document.querySelector(".notice-container").textContent = "User was created successfully!"
}



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
            if (data && data.ok) { // Check if data exists and has ok property
                window.location = `login.html?userid=${data}` // Assuming data is the user ID
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
