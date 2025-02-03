import { useState, useEffect } from "react";
import axios from "axios";

const ScheduleTab = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);

  // Fetch children from the backend
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/children", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("API Response:", response.data); // Add this line
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    };

    fetchChildren();
  }, []);

  // Update vaccinations when selected child changes
  useEffect(() => {
    if (selectedChild) {
      const child = children.find((c) => c._id === selectedChild);
      setVaccinations(child?.vaccinations || []);
    }
  }, [selectedChild, children]);

  // Handle marking a vaccine as taken
  const handleMarkVaccine = async (vaccineId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/children/${selectedChild}/vaccinations/${vaccineId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state
      setVaccinations((prev) =>
        prev.map((v) => (v._id === vaccineId ? { ...v, status } : v))
      );
    } catch (error) {
      console.error("Error updating vaccine:", error);
    }
  };

  const today = new Date();

  return (
    <div className="space-y-6">
      {/* Child selector */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {children.map((child) => (
          <button
            key={child._id}
            onClick={() => setSelectedChild(child._id)}
            className={`px-4 py-2 rounded-lg ${
              selectedChild === child._id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {child.name}
          </button>
        ))}
      </div>

      {/* Vaccination timeline */}
      <div className="space-y-4">
        {vaccinations.map((vaccine) => {
          const isOverdue =
            new Date(vaccine.scheduledDate) < today &&
            vaccine.status === "Pending";
          return (
            <div
              key={vaccine._id}
              className={`p-4 rounded-lg shadow ${
                isOverdue ? "bg-red-100" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{vaccine.name}</p>
                  <p className="text-sm text-gray-600">
                    Scheduled:{" "}
                    {new Date(vaccine.scheduledDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {vaccine.dosage} • {vaccine.route}
                  </p>
                  {isOverdue && (
                    <p className="text-sm text-red-600 font-semibold">
                      Pending
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    handleMarkVaccine(
                      vaccine._id,
                      vaccine.status === "Completed" ? "Pending" : "Completed"
                    )
                  }
                  className={`px-3 py-1 rounded-md ${
                    vaccine.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {vaccine.status === "Completed" ? "Completed" : "Mark Done"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleTab;
