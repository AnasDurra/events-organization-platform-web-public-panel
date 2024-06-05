import { io } from 'socket.io-client';
import { URL } from './constants.js';

export let chatSocket = io(URL + '/chat');

// Function to reinitialize the socket
export const setChatSocketHeader = (authToken) => {
    // Close the existing socket connection if it's open
    if (chatSocket.connected) {
        chatSocket.disconnect();
    }

    // Create a new socket instance with updated headers
    chatSocket = io(URL + '/chat', {
        extraHeaders: {
            Authorization: `Bearer ${authToken}`,
        },
    });
};

export const joinChannel = (channel) => {
    // Add event listeners for each channelSocket
    console.log(channel);
    // chatSocket.on(`${channel}`, (message) => {
    //     console.log(`Received message on channel ${channel}:`, message);
    // });
};

export const sendMessage = (messageData) => {
    chatSocket.emit('message-sent', messageData);
};
export const userReacted = (reactionData) => {
    chatSocket.emit('user-reacted', reactionData);
};
