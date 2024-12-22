import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Approutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "./shared/Navbar";
import { useTheme } from "./store/useTheme";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const queryClient = new QueryClient();
  const { theme } = useTheme();

  return (
    <div data-theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router
            future={{
              v7_startTransition: true,
            }}
          >
            <Navbar />
            <AppRoutes />
            <Toaster position="top-center" />
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  );
}
