// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useAuth = create(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       login: (userData) => set({ user: userData.user, token: userData.token }),
//       logout: () => {
//         set({ token: null, user: null });
//         localStorage.removeItem("user-store");
//       },
//     }),
//     {
//       name: "user-store",
//       getStorage: () => localStorage,
//     }
//   )
// );
