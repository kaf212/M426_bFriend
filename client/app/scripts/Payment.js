document.addEventListener("DOMContentLoaded", () => {
    let submitButton = document.getElementById('submit');

    
    
    async function payment(){
        let email = document.getElementById('emailInput');
        let password = document.getElementById('passwordInput')

        console.log(password.value)

        //Hash password in base64
        const hashedPassword = btoa(password.value)
        //check database if data is correct
        
        //show confirmation, if accepts continue

        //send data to api so the databse updates to an active user with the chosen subscribtion, and backend takes money on successful update

        //return a answer if successful, else show problem
    };

    submitButton.addEventListener('click', payment);

})

router.post("/checkCredentials", async (req, res) => {
    const email = req.body.email;
    const passowrd = req.body.password;

    //check if email, password in database, if yes respond with {email:true, password:true}
    //If password is false {email:true, password:false} if email doesn't exist and password correct {email:false, password:false}
})
