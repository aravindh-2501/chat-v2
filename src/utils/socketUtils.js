// src/utils/socketUtils.js
export const emitStopTyping = (socket, senderId, receiverId) => {
  if (!socket || !senderId || !receiverId) return;

  socket.emit("stop_typing", {
    sender: senderId,
    receiver: receiverId,
    typing: false,
  });
};
