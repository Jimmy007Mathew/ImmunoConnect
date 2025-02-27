import {
  Menu,
  Bell,
  Plus,
  BookOpen,
  User,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";

const Header = ({
  openSidebar,
  toggleNotifications,
  toggleAddChild,
  toggleChat,
  notificationCount,
  user,
  onLogout,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <header
      className={`sticky top-0 z-40 shadow ${
        darkMode
          ? "bg-gray-800 text-gray-100 border-b-2 border-gray-200"
          : "bg-white text-gray-900 border-gray-200"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu Button (Visible only on small screens) */}
          <div className="lg:hidden">
            <button
              onClick={openSidebar}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Spacer for larger screens (pushes content to the right) */}
          <div className="hidden lg:block flex-1"></div>

          {/* Right Side - Buttons and Profile */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>

            {/* Notification Button */}
            <button
              onClick={toggleNotifications}
              className={`relative p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Add Child Button */}
            <button
              onClick={toggleAddChild}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                darkMode
                  ? "bg-blue-700 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              aria-label="Add child"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Child</span>
            </button>

            {/* Chat Button */}
            <button
              onClick={toggleChat}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Open chat"
            >
              <BookOpen className="h-6 w-6" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center space-x-2 focus:outline-none ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
                aria-label="User profile"
              >
                <div
                  className={`p-2 rounded-full ${
                    darkMode ? "bg-gray-800" : "bg-blue-100"
                  }`}
                >
                  <User
                    className={`h-5 w-5 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
                <span className="hidden md:inline">{user.name}</span>
                <ChevronDown
                  className={`h-4 w-4 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 hidden group-hover:block ${
                  darkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-white text-gray-900"
                }`}
              >
                <div className="py-1">
                  <button
                    onClick={onLogout}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      darkMode
                        ? "text-gray-100 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30 hidden group-hover:block"></div>
    </header>
  );
};

export default Header;
