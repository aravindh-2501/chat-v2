import { io } from "socket.io-client";
import { create } from "zustand";
import { useUserStore } from "./userStore";
import { playAudioNotification } from "../utils/audioNotification";

const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export const useSocketStore = create((set, get) => ({
  socket: null,
  isTyping: false,
  messages: [],
  users: [],
  typingReceiverId: null,

  connectSocket: () => {
    const { currentUser, token } = useUserStore.getState();

    if (get().socket) return;

    const socketInstance = io(socketUrl);

    set({ socket: socketInstance });

    socketInstance.on("connect", () => {
      console.log("Socket connected", `${socketInstance.id}`);
      if (currentUser && token) {
        socketInstance.emit("register_user", {
          userId: currentUser._id,
          token,
        });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    // Listen for typing events for private chat
    socketInstance.on("typing", (data) => {
      console.log("typing", data);
      const { currentUser } = useUserStore.getState();
      if (data?.sender !== currentUser?._id) {
        set({ typingReceiverId: data?.sender, isTyping: data?.typing });
      }
    });

    // Listen for stop typing events for private chat
    socketInstance.on("stop_typing", (data) => {
      console.log("stop_typing", data);
      const { currentUser } = useUserStore.getState();
      if (data?.sender !== currentUser?._id) {
        set({ typingReceiverId: data?.sender, isTyping: data?.typing });
      }
    });

    socketInstance.on("receive_message", (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
      playAudioNotification();
      console.log("New message received:", message);
    });

    socketInstance.on("user_list", (users) => set({ users }));
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, isTyping: false, messages: [], users: [] });
    }
  },

  addMessage: (newMessages) => {
    set((state) => ({
      messages: [
        ...state.messages,
        ...(Array.isArray(newMessages) ? newMessages : [newMessages]),
      ],
    }));
  },

  sendMessage: (message) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("send_message", message);
    }
  },

  // Emit the typing event for private chat
  startTyping: (receiverId) => {
    const socket = get().socket;
    const { currentUser } = useUserStore.getState();
    if (socket && currentUser) {
      socket.emit("typing", {
        senderId: currentUser._id,
        receiverId,
      });
    }
  },

  // Emit the stop typing event for private chat
  stopTyping: (receiverId) => {
    const socket = get().socket;
    const { currentUser } = useUserStore.getState();
    if (socket && currentUser) {
      socket.emit("stop_typing", {
        senderId: currentUser._id,
        receiverId,
      });
    }
  },
}));
