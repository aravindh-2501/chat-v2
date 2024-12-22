import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Chat from "../pages/chat";
import ErrorBoundary from "../utils/ErrorBoundary";

const AppRoutes = () => (
  <Routes>
    {/* Default Route (with Error Boundary) */}
    <Route
      path="/"
      element={
        <ErrorBoundary>
          <Chat />
        </ErrorBoundary>
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

export default AppRoutes;
