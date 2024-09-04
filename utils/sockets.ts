// socket.js
import io from 'socket.io-client';

let socket:any;

export const connectSocket = (url:string) => {
  socket = io(url);

  socket.on('connect', () => {
    console.log('Connected to the socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the socket server');
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};

export const subscribeToEvent = ({ eventName, callback }:{eventName:any, callback:any}) => {
  if (!socket) return;

  socket.on(eventName, callback);
};

export const emitEvent = ({ eventName, data }:{eventName:any, data:any}) => {
  if (!socket) return;

  socket.emit(eventName, data);
};

// New functions for room management

export const joinRoom = (roomId:any) => {
  if (!socket) return;

  socket.emit('joinRoom', roomId);
  console.log(`Joined room: ${roomId}`);
};

export const leaveRoom = (roomId:any) => {
  if (!socket) return;

  socket.emit('leaveRoom', roomId);
  console.log(`Left room: ${roomId}`);
};

export const emitToRoom = ({ roomId, eventName, data }:{roomId:any, eventName:any, data:any}) => {
  if (!socket) return;

  socket.emit('roomEvent', { roomId, eventName, data });
};

export const subscribeToRoomEvent = ({ roomId, eventName, callback }:{roomId:any, eventName:any, callback:any}) => {
  if (!socket) return;

  const roomEventName = `${roomId}:${eventName}`;
  socket.on(roomEventName, callback);
};
