import { useState, useEffect } from "react";
import axios from "axios";
import { Baby, Calendar, User, Syringe, Edit, Trash2, X } from "lucide-react";

const ProfilesTab = ({ darkMode }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingChild, setEditingChild] = useState(null);

  // Fetch children from the backend
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(
          "https://loud-gretal-immuno-37d08cf0.koyeb.app/api/children",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  // Handle delete child
  const handleDeleteChild = async (childId) => {
    try {
      await axios.delete(
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/children/${childId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setChildren((prev) => prev.filter((child) => child._id !== childId));
    } catch (error) {
      console.error("Error deleting child:", error);
      alert("Failed to delete child. Please try again.");
    }
  };

  // Handle edit child
  const handleEditChild = async (updatedChild) => {
    try {
      const response = await axios.put(
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/children/${updatedChild._id}`,
        updatedChild,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setChildren((prev) =>
        prev.map((child) =>
          child._id === updatedChild._id ? response.data : child
        )
      );
      setEditingChild(null);
    } catch (error) {
      console.error("Error updating child:", error);
      alert("Failed to update child. Please try again.");
    }
  };

  if (loading) {
    return (
      <p
        className={`text-center ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Loading...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
        darkMode ? "bg-gray-900 p-6" : ""
      }`}
    >
      {children.map((child) => (
        <div
          key={child._id}
          className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
            darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white"
          }`}
        >
          {/* Child Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-blue-100"
              }`}
            >
              <Baby
                className={`h-6 w-6 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
            <h3
              className={`text-xl font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {child.name}
            </h3>
          </div>

          {/* Child Details */}
          <div
            className={`space-y-3 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <p className="flex items-center">
              <Calendar
                className={`h-4 w-4 mr-2 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              Date of Birth: {new Date(child.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <User
                className={`h-4 w-4 mr-2 ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              Gender: {child.gender}
            </p>
            <div>
              <p className="font-medium mb-2 flex items-center">
                <Syringe
                  className={`h-4 w-4 mr-2 ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                Vaccinations:
              </p>
              <div className="flex flex-wrap gap-2">
                {child.vaccinations.map((vac, i) => (
                  <span
                    key={i}
                    className={`text-sm px-2 py-1 rounded-full ${
                      vac.status === "Completed"
                        ? darkMode
                          ? "bg-green-900/30 text-green-400"
                          : "bg-green-100 text-green-700"
                        : darkMode
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {vac.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setEditingChild(child)}
              className={`flex items-center ${
                darkMode
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => handleDeleteChild(child._id)}
              className={`flex items-center ${
                darkMode
                  ? "text-red-400 hover:text-red-300"
                  : "text-red-600 hover:text-red-700"
              }`}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editingChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`rounded-lg max-w-md w-full p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className={`text-xl font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Edit Child Profile
              </h2>
              <button
                onClick={() => setEditingChild(null)}
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditChild(editingChild);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Child's Name
                </label>
                <input
                  type="text"
                  required
                  value={editingChild.name}
                  onChange={(e) =>
                    setEditingChild({ ...editingChild, name: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={
                    new Date(editingChild.dateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setEditingChild({
                      ...editingChild,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Gender
                </label>
                <select
                  required
                  value={editingChild.gender}
                  onChange={(e) =>
                    setEditingChild({ ...editingChild, gender: e.target.value })
                  }
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-400 focus:ring-blue-400"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded-md transition-colors ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilesTab;
