import { Menu, Bell, Plus, BookOpen, User, ChevronDown } from "lucide-react";

const Header = ({
  openSidebar,
  toggleNotifications,
  toggleAddChild,
  toggleChat,
  notificationCount,
  user,
  onLogout,
}) => {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Menu Button */}
          <button
            onClick={openSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Right Side - Buttons and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notification Button */}
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none"
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
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              aria-label="Add child"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Child</span>
            </button>

            {/* Chat Button */}
            <button
              onClick={toggleChat}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Open chat"
            >
              <BookOpen className="h-6 w-6" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User profile"
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span className="hidden md:inline text-gray-700">
                  {user.name}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
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
