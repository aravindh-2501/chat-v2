import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Chat from "../pages/chat";
import ErrorBoundary from "../utils/ErrorBoundary";
import { useUserStore } from "../store/userStore";

const AppRoutes = () => {
  const user = useUserStore((state) => state.currentUser);

  console.log("");

  return (
    <Routes>
      {/* Default Route (with Error Boundary) */}
      <Route
        path="/"
        element={
          user ? (
            <ErrorBoundary>
              <Chat />
            </ErrorBoundary>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Chat Route with User ID as URL Parameter */}
      <Route
        path="/chat/:id"
        element={
          <ErrorBoundary>
            <Chat />
          </ErrorBoundary>
        }
      />

      {/* Login and Register Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
export default AppRoutes;
