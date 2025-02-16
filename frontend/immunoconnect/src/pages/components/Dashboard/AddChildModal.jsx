import { X, Syringe } from "lucide-react";

import { useState } from "react";
import axios from "axios";

const AddChildModal = ({ show, onClose }) => {
  const [newChild, setNewChild] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    completedVaccinations: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mytest-kk5g.onrender.com/api/children", // Add full URL
        newChild,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onClose(); // Close modal
      window.location.reload(); // Refresh to show new child
    } catch (error) {
      console.error("Error adding child:", error);
      alert("Failed to add child. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Child Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Child's Name
            </label>
            <input
              type="text"
              required
              value={newChild.name}
              onChange={(e) =>
                setNewChild({ ...newChild, name: e.target.value })
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
              value={newChild.dateOfBirth}
              onChange={(e) =>
                setNewChild({ ...newChild, dateOfBirth: e.target.value })
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
              value={newChild.gender}
              onChange={(e) =>
                setNewChild({ ...newChild, gender: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Syringe className="h-5 w-5 mr-2" />
            Add Child Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChildModal;
