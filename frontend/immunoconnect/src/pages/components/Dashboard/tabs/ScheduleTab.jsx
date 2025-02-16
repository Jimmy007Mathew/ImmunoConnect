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
        const response = await axios.get("https://mytest-kk5g.onrender.com/api/children", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  // Handle marking a vaccine as done or pending
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
                  {vaccine.status === "Completed" && (
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          vaccine.verified
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {vaccine.verified ? "Verified" : "Pending Verification"}
                      </span>
                      {vaccine.verified && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
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
