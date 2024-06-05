document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatCloseButton = document.getElementById('chat-close-button');
    const chatListContainer = document.getElementById('chat-list-container');
    const chatList = document.getElementById('chat-list');
    const chatWindow = document.getElementById('chat-window');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const newChatEmailInput = document.getElementById('new-chat-email');
    const newChatNicknameInput = document.getElementById('new-chat-nickname');
    const addChatButton = document.getElementById('add-chat-button');
    const backButton = document.getElementById('back-button');
    const chatWithHeader = document.getElementById('chat-with');

    let currentChat = null;

    async function fetchChats() {
        const response = await fetch('http://localhost:3000/api/users');
        return await response.json();
    }

    async function fetchChatByEmail(email) {
        const response = await fetch(`http://localhost:3000/api/users/${email}`);
        return await response.json();
    }

    async function addChat(email, nickname) {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username: nickname, password: "defaultPassword" })
        });
        return await response.json();
    }

    async function addMessage(email, message) {
        const response = await fetch(`http://localhost:3000/api/users/${email}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });
        return await response.json();
    }

    function displayChatList(users) {
        chatList.innerHTML = '';
        users.forEach(user => {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.innerText = `${user.username}`;
            chatItem.addEventListener('click', () => {
                openChat(user.email);
            });
            chatList.appendChild(chatItem);
        });
    }

    async function openChat(chatEmail) {
        currentChat = chatEmail;
        const chat = await fetchChatByEmail(chatEmail);
        chatMessages.innerHTML = '';
        chatWithHeader.innerText = `Chat with ${chat.username}`;
        // Assuming chat has messages array
        chat.messages.forEach(message => {
            addMessageToWindow(message.user, message.text);
        });
        chatWindow.classList.add('visible');
        chatListContainer.classList.remove('visible');
    }

    function addMessageToWindow(user, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${user}:</strong> ${text}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    sendButton.addEventListener('click', async () => {
        const text = messageInput.value;
        if (text.trim() && currentChat) {
            const message = { user: 'You', text };
            await addMessage(currentChat, message);
            addMessageToWindow(message.user, message.text);
            messageInput.value = '';
        }
    });

    addChatButton.addEventListener('click', async () => {
        const email = newChatEmailInput.value;
        const nickname = newChatNicknameInput.value;
        if (email.trim() && nickname.trim()) {
            await addChat(email, nickname);
            const users = await fetchChats();
            displayChatList(users);
            newChatEmailInput.value = '';
            newChatNicknameInput.value = '';
        } else {
            alert('Invalid email or nickname, or chat already exists.');
        }
    });

    backButton.addEventListener('click', () => {
        chatWindow.classList.remove('visible');
        chatListContainer.classList.add('visible');
    });

    chatToggleButton.addEventListener('click', async () => {
        chatContainer.classList.toggle('visible');
        const users = await fetchChats();
        displayChatList(users);
    });

    chatCloseButton.addEventListener('click', () => {
        chatContainer.classList.remove('visible');
        chatWindow.classList.remove('visible');
        chatListContainer.classList.add('visible');
    });
});
