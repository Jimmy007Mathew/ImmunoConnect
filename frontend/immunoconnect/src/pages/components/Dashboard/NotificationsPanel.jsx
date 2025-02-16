import { Bell, X } from "lucide-react";

const NotificationsPanel = ({
  notifications,
  closePanel,
  removeNotification,
}) => {
  return (
    <div className="absolute right-4 top-16 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <button
            onClick={closePanel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
