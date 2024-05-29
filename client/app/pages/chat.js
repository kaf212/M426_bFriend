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

    // Simulated list of chats and messages
    const chats = {};

    let currentChat = null;

    // Function to display chat list
    function displayChatList() {
        chatList.innerHTML = '';
        for (const chatEmail in chats) {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.innerText = `${chats[chatEmail].nickname}`;
            chatItem.addEventListener('click', () => {
                openChat(chatEmail);
            });
            chatList.appendChild(chatItem);
        }
    }

    // Function to open a chat
    function openChat(chatEmail) {
        currentChat = chatEmail;
        chatMessages.innerHTML = '';
        chatWithHeader.innerText = `Chat with ${chats[chatEmail].nickname}`;
        chats[chatEmail].messages.forEach(message => {
            addMessageToWindow(message.user, message.text);
        });
        chatWindow.classList.add('visible');
        chatListContainer.classList.remove('visible');
    }

    // Function to add message to chat window
    function addMessageToWindow(user, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${user}:</strong> ${text}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    // Event listener for the send button
    sendButton.addEventListener('click', () => {
        const text = messageInput.value;
        if (text.trim() && currentChat) {
            const message = { user: 'You', text };
            chats[currentChat].messages.push(message);
            addMessageToWindow(message.user, message.text);
            messageInput.value = '';
        }
    });

    // Event listener for adding a new chat
    addChatButton.addEventListener('click', () => {
        const email = newChatEmailInput.value;
        const nickname = newChatNicknameInput.value;
        if (email.trim() && nickname.trim() && !chats[email]) {
            chats[email] = { nickname, messages: [] };
            displayChatList();
            newChatEmailInput.value = '';
            newChatNicknameInput.value = '';
        } else {
            alert('Invalid email or nickname, or chat already exists.');
        }
    });

    // Event listener for the back button
    backButton.addEventListener('click', () => {
        chatWindow.classList.remove('visible');
        chatListContainer.classList.add('visible');
    });

    // Toggle chat visibility
    chatToggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('visible');
        displayChatList();
    });

    // Close chat
    chatCloseButton.addEventListener('click', () => {
        chatContainer.classList.remove('visible');
        chatWindow.classList.remove('visible');
        chatListContainer.classList.add('visible');
    });
});
