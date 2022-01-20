import { io } from 'socket.io-client';
let socket;
export const initiateSocketConnection = () => {
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:8080");
    console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
    socket.emit('my message', 'Hello there from React.');
    socket.on('my broadcast', msg => {
        return cb(null, msg);
    });
}

export const myCustomEvent = (cb) => {
    socket.emit('message', 'Moshiur Event');
}