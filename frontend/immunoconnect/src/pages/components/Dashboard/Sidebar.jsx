import {
  Home,
  Users,
  Calendar,
  FileText,
  BarChart,
  MapPin,
  Settings,
  LogOut,
  X,
  User,
  Shield,
} from "lucide-react";

const Sidebar = ({
  isSidebarOpen,
  activeTab,
  setActiveTab,
  user,
  closeSidebar,
}) => {
  const sidebarItems = [
    { icon: Home, label: "Dashboard", id: "overview" },
    { icon: Users, label: "Family Profiles", id: "profiles" },
    { icon: Calendar, label: "Schedule", id: "schedule" },
    { icon: FileText, label: "Vaccination Card", id: "records" },
    { icon: MapPin, label: "Health Centers", id: "centers" },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      style={{
        position: "fixed", // Ensure sidebar is fixed on desktop
        height: "100vh", // Full height
        overflowY: "auto", // Allow scrolling only for the sidebar
      }}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 pt-5 border-b-2">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600 p-1 flex">
              <Shield className="h-6 w-6 text-blue-600 mr-3" />
              ImmunoConnect
            </span>
            <button
              onClick={closeSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={user.handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
