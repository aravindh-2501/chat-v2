import { io } from "socket.io-client";
import { create } from "zustand";
import { useUserStore } from "./userStore"; // Import your user store

const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

export const useSocketStore = create((set, get) => ({
  socket: null,
  isTyping: false,
  messages: [],
  users: [],

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

    socketInstance.on("typing", () => set({ isTyping: true }));
    socketInstance.on("stop_typing", () => set({ isTyping: false }));

    socketInstance.on("receive_message", (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
      console.log("New message received:", message);
    });

    socketInstance.on("user_list", (users) => set({ users }));
  },

  addMesssage: (newMessages) => {
    set((state) => ({
      messages: [
        ...state.messages,
        ...(Array.isArray(newMessages) ? newMessages : [newMessages]),
      ],
    }));
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, isTyping: false, messages: [], users: [] });
    }
  },

  sendMessage: (message) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("send_message", message);
    }
  },
}));
