document.addEventListener("DOMContentLoaded", () => {
    let submitButton = document.getElementById('submit');
    
    async function payment(){
        let inputEmail = document.getElementById('emailInput');
        let inputPassword = document.getElementById('passwordInput')

        console.log(inputPassword.value)
        console.log(inputEmail.value)

        //Hash password
        const hashedPassword = btoa(inputPassword.value)
        //check database if data is correct
        const response = await fetch("http://localhost:3000/api/users/checkcredentials", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputEmail.value,
                password: hashedPassword
            })
        })
        const jsonResponse = await response.json()
        alert(JSON.stringify(jsonResponse))
        //show confirmation, if accepts continue

        //send data to api so the databse updates to an active user with the chosen subscribtion, and backend takes money on successful update

        //return a answer if successful, else show problem
    };

    submitButton.addEventListener('click', payment);

})