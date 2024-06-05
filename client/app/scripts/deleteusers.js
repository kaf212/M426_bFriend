const fetch = require('node-fetch');

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Fehler beim Laden der Benutzer:', error);
        return [];
    }
}

async function deleteuser() {
    const users = await fetchUsers();
    console.log("Aktuelle Benutzerliste:");
    users.forEach(user => {
        console.log(`${user.id}. ${user.name} ${user.email}`);
    });

    const wichu = prompt('ID des Benutzers eingeben den Sie löschen möchten:');
    if (wichu !== null) {
        const userIdToDelete = parseInt(wichu);
        const userIndex = users.findIndex(user => user.id === userIdToDelete);

        if (userIndex !== -1) {
            const deletedUser = users.splice(userIndex, 1);
            console.log(`Benutzer ${deletedUser[0].name} ${deletedUser[0].email} wurde gelöscht.`);
            console.log("Aktualisierte Benutzerliste:");
            users.forEach(user => {
                console.log(`${user.id}. ${user.name} ${user.email}`);
            });
        } else {
            console.log("Ungültige ID")
        }
    }
}

deleteuser();
