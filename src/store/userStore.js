import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      token: null,
      isLoggedIn: false,

      // Set the current user
      setCurrentUser: (user) => set({ currentUser: user }),

      // Set token
      setToken: (token) => set({ token }),

      // Update the list of users
      setUsers: (userList) => set({ users: userList }),

      // Set the isLoggedIn state
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),

      // Logout
      logout: () => {
        set({ currentUser: null, token: null, isLoggedIn: false });
        localStorage.removeItem("user-storage");
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
