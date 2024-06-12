document.getElementById('personalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON object
    const jsonObject = {};
    formData.forEach((value, key) => {
        if (key !== 'confirmpw') { // Exclude confirmpw field
            jsonObject[key] = value;
        }
    });

    // Send JSON data to backend API
    fetch('http://localhost:3000/api/login/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            if (response.status === 409) {
                alert("Username is already taken")
                return response.json
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Handle successful response from backend
            console.log('Response from backend:', data);
            // You can do further processing here, like displaying a success message
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
            // You can display an error message or perform other error handling actions
        });
});