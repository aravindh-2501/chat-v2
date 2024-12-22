import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../store/useTheme";
import { THEMES } from "../content/data";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 fixed top-0 z-20 shadow-md bg-black/30 backdrop-blur-md">
      {/* Left Side: Logo and Name */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 flex items-center justify-center">
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-primary">Chatty</h1>
      </div>

      {/* Right Side: Theme Dropdown and Logout */}
      <div className="flex items-center gap-4">
        {/* Theme Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="font-medium py-2 px-4 rounded-lg transition bg-white text-black shadow-sm"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            aria-label="Theme selection dropdown"
          >
            {theme || "Select Theme"}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-black border rounded-lg shadow-lg z-10">
              <ul className="text-sm max-h-[300px] overflow-auto p-2 scrollbar-none">
                {THEMES.map((t) => (
                  <li
                    key={t}
                    onClick={() => handleThemeChange(t)}
                    className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${
                      theme === t
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Logout Button */}
        {location.pathname !== "/login" && (
          <button
            className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-primary rounded-lg shadow-sm transition hover:bg-primary-dark"
            onClick={handleLogout}
          >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
