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

async function banUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT'
        });
        if (!response.ok) {
            throw new Error('Benutzer konnte nicht gesperrt werden');
        }
        const data = await response.json();
        console.log(data.message);
        loadUsers(); // Aktualisieren der Benutzerliste nach dem Bann
    } catch (error) {
        console.error('Fehler beim Sperren des Benutzers:', error);
    }
}

async function loadUsers() {
    const users = await fetchUsers();
    console.log(users); // Überprüfen Sie die Daten in der Konsole
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Leeren der Liste

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user._id}. ${user.username} ${user.email}`;
        if (user.isBanned) {
            li.classList.add('banned');
            console.log(`User ${user.username} is banned`); // Überprüfen Sie die Klassenzuordnung in der Konsole
            console.log(li); // Überprüfen Sie das Listenelement in der Konsole
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', () => {
            if (confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
                deleteUser(user._id);
            }
        });

        const banButton = document.createElement('button');
        banButton.textContent = 'Sperren';
        banButton.addEventListener('click', () => {
            if (confirm('Möchten Sie diesen Benutzer wirklich sperren?')) {
                banUser(user._id);
            }
        });

        li.appendChild(deleteButton);
        li.appendChild(banButton);
        userList.appendChild(li);
    });
}

loadUsers();
