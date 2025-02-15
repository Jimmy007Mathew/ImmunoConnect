import { useState, useEffect } from "react";
import axios from "axios";
import { Baby, Calendar, User, Syringe, Edit, Trash2, X } from "lucide-react";

const ProfilesTab = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingChild, setEditingChild] = useState(null); // Track which child is being edited

  // Fetch children from the backend
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get("https://mytest-murex-kappa.vercel.app/api/children", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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
      await axios.delete(`http://localhost:5000/api/children/${childId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setChildren((prev) => prev.filter((child) => child._id !== childId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting child:", error);
      alert("Failed to delete child. Please try again.");
    }
  };

  // Handle edit child
  const handleEditChild = async (updatedChild) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/children/${updatedChild._id}`,
        updatedChild,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the child in the UI
      setChildren((prev) =>
        prev.map((child) =>
          child._id === updatedChild._id ? response.data : child
        )
      );
      setEditingChild(null); // Close edit mode
    } catch (error) {
      console.error("Error updating child:", error);
      alert("Failed to update child. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children.map((child) => (
        <div
          key={child._id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          {/* Child Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Baby className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {child.name}
            </h3>
          </div>

          {/* Child Details */}
          <div className="space-y-3 text-gray-600">
            <p className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              Date of Birth: {new Date(child.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              Gender: {child.gender}
            </p>
            <div>
              <p className="font-medium mb-2 flex items-center">
                <Syringe className="h-4 w-4 mr-2 text-gray-400" />
                Vaccinations:
              </p>
              <div className="flex flex-wrap gap-2">
                {child.vaccinations.map((vac, i) => (
                  <span
                    key={i}
                    className={`text-sm px-2 py-1 rounded-full ${
                      vac.status === "Completed"
                        ? "bg-green-100 text-green-700"
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
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => handleDeleteChild(child._id)}
              className="text-red-600 hover:text-red-700 flex items-center"
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
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Child Profile</h2>
              <button
                onClick={() => setEditingChild(null)}
                className="text-gray-500 hover:text-gray-700"
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
                <label className="block text-sm font-medium text-gray-700">
                  Child's Name
                </label>
                <input
                  type="text"
                  required
                  value={editingChild.name}
                  onChange={(e) =>
                    setEditingChild({ ...editingChild, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  required
                  value={editingChild.gender}
                  onChange={(e) =>
                    setEditingChild({ ...editingChild, gender: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
