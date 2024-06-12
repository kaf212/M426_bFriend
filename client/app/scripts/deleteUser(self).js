async function setCookie() {

    // als beispiel setzt es einfach die erste die es findet
    const response = await fetch("http://localhost:3000/api/users/")
    if (!response.ok) {
        alert("something went wrong")
    }
    const data = await response.json();
    const userID = data[0]._id;
    console.log(userID)


    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (60 * 60000)); // min * seconds(1000ms*60 = min)
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = "userID=" + userID + ";" + expires + ";path=/";
}//temporary testing reasons

function getUserID() {
    const cookieValue = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith("userID" + '='));
    if (cookieValue) {
        return cookieValue.split('=')[1];
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
    let deleteButton = document.getElementById('DeleteButton');
    async function deleteSelf(){

        //temporary testing
        await setCookie()


        const userID = await getUserID('userID');

        if (userID){
            const response = await fetch(`http://localhost:3000/api/users/:${userID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userID
                })
            })
        }else{
            alert("log in to use this function")
        }
    }

    deleteButton.addEventListener("click", deleteSelf);

})