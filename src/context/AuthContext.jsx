/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useSocketStore } from "../store/useSocketStore";
import { useUserStore } from "../store/userStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { connectSocket, disconnectSocket } = useSocketStore();
  const { setCurrentUser, logout, setToken, setIsLoggedIn, isLoggedIn } =
    useUserStore();

  // Handle socket connection based on login state
  useEffect(() => {
    if (isLoggedIn) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [isLoggedIn, connectSocket, disconnectSocket]);

  const login = (data) => {
    setIsLoggedIn(true);
    setCurrentUser(data.user);
    setToken(data.token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Updates isLoggedIn to false
    setToken(null);
    logout(); // Calls the logout function from userStore
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
