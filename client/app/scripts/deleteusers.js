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

async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Benutzer konnte nicht gelöscht werden');
        }
        const data = await response.json();
        console.log(data.message);
        loadUsers(); // Aktualisieren der Benutzerliste nach dem Löschen
    } catch (error) {
        console.error('Fehler beim Löschen des Benutzers:', error);
    }
}

async function deleteUserById() {
    const users = await fetchUsers();
    console.log("Aktuelle Benutzerliste:");
    users.forEach(user => {
        console.log(`${user._id}. ${user.username} ${user.email}`);
    });

    const wichu = prompt('ID des Benutzers eingeben den Sie löschen möchten:');
    if (wichu !== null) {
        const userIdToDelete = wichu; // Benutzer-ID ist bereits ein String, keine Konvertierung notwendig
        const userIndex = users.findIndex(user => user._id === userIdToDelete);

        if (userIndex !== -1) {
            deleteUser(userIdToDelete).then(() => {
                console.log(`Benutzer ${users[userIndex].username} ${users[userIndex].email} wurde gelöscht.`);
                console.log("Aktualisierte Benutzerliste:");
                users.splice(userIndex, 1); // Benutzer aus der lokalen Liste entfernen
                users.forEach(user => {
                    console.log(`${user._id}. ${user.username} ${user.email}`);
                });
            });
        } else {
            console.log("Ungültige ID");
        }
    }
}

async function loadUsers() {
    const users = await fetchUsers();
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Leeren der Liste

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user._id}. ${user.username} ${user.email}`;

        const button = document.createElement('button');
        button.textContent = 'Löschen';
        button.addEventListener('click', () => {
            if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
                deleteUser(user._id);
            }
        });

        li.appendChild(button);
        userList.appendChild(li);
    });
}

// Anfangs die Benutzerliste laden
loadUsers();
