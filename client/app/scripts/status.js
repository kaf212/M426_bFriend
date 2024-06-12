async function fetchUserStatus(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/status`);
        const userStatus = await response.json();
        return userStatus;
    } catch (error) {
        console.error('Fehler beim Laden des Benutzerstatus:', error);
        throw error;
    }
}

async function displayUserStatus(userId) {
    try {
        const userStatus = await fetchUserStatus(userId);
        if (userStatus.isBanned) {
            alert('Der Benutzer ist deaktiviert.');
        } else {
            alert('Der Benutzer ist aktiviert.');
        }
    } catch (error) {
        console.error('Fehler beim Laden des Benutzerstatus:', error);
    }
}


displayUserStatus();
