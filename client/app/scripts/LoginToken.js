function setCookie() {

    // als beispiel setzt es einfach die erste die es findet
    const user = fetch("http://localhost:3000/api/users/")[1].toJSON()
    console.log(user)
    const userID = user._id

    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (60 * 60000)); // min * seconds(1000ms*60 = min)
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = "userId=" + userID + ";" + expires + ";path=/";

    setCookie(userID, 60);
}

module.exports = setCookie;