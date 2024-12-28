import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Chat from "../pages/chat";
import { useUserStore } from "../store/userStore";

const AppRoutes = () => {
  const user = useUserStore((state) => state.currentUser);

  console.log("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
              <Chat />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/chat/:id"
        element={
            <Chat />
        }
      />

      {/* Login and Register Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
export default AppRoutes;
