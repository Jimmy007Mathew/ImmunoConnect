import { useState, useEffect } from "react";
import axios from "axios";
import {
  Baby,
  Shield,
  Calendar as CalendarIcon,
  Activity,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const OverviewTab = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllSchedules, setShowAllSchedules] = useState(false); // Toggle state
  const [selectedChild, setSelectedChild] = useState(
    children.length > 0 ? children[0]._id : ""
  );

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/children", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setChildren(response.data);

        // Set the first child as the selected child if none is selected
        if (response.data.length > 0 && !selectedChild) {
          setSelectedChild(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching children:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []); // Removed `children` dependency to avoid infinite loops

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <Baby className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-blue-600 font-medium">Total Children</p>
            <p className="text-2xl font-bold text-blue-900">
              {children.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Vaccination Progress</h3>
        {children.map((child) => (
          <div key={child._id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{child.name}</span>
              <span className="text-sm text-gray-500">
                {
                  child.vaccinations.filter((v) => v.status === "Completed")
                    .length
                }
                /{child.vaccinations.length} Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (child.vaccinations.filter((v) => v.status === "Completed")
                      .length /
                      child.vaccinations.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Schedule with Toggle */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          {/* Dropdown to select child */}
          <select
            className="p-2 border rounded-lg text-gray-700"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            {children.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name}
              </option>
            ))}
          </select>

          {/* Toggle Button */}
          <button
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
            onClick={() => setShowAllSchedules(!showAllSchedules)}
          >
            {showAllSchedules ? "Show Next Only" : "Show All"}
            {showAllSchedules ? (
              <ChevronUp className="h-5 w-5 ml-1" />
            ) : (
              <ChevronDown className="h-5 w-5 ml-1" />
            )}
          </button>
        </div>

        {(() => {
          const today = new Date();

          // Get selected child's data
          const childData = children.find(
            (child) => child._id === selectedChild
          );
          if (!childData) {
            return <p className="text-gray-500">No data available.</p>;
          }

          const overdueVaccinations = childData.vaccinations
            .filter(
              (v) => v.status === "Pending" && new Date(v.scheduledDate) < today
            )
            .map((v) => ({ ...v, childName: childData.name }));

          const upcomingVaccinations = childData.vaccinations
            .filter(
              (v) =>
                v.status === "Pending" && new Date(v.scheduledDate) >= today
            )
            .map((v) => ({ ...v, childName: childData.name }));

          if (
            upcomingVaccinations.length === 0 &&
            overdueVaccinations.length === 0
          ) {
            return <p className="text-gray-500">No pending vaccinations.</p>;
          }

          return (
            <>
              {overdueVaccinations.length > 0 && (
                <div>
                  <p className="text-red-600 font-bold mb-2">
                    Overdue Vaccinations
                  </p>
                  {overdueVaccinations.map((vaccine) => (
                    <div
                      key={vaccine._id}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div>
                        <p className="font-medium text-red-600">
                          {vaccine.childName}
                        </p>
                        <p className="text-sm text-red-600">
                          {vaccine.name} (Pending)
                        </p>
                      </div>
                      <p className="text-sm text-red-600">
                        {new Date(vaccine.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {showAllSchedules
                ? upcomingVaccinations.map((vaccine) => (
                    <div
                      key={vaccine._id}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div>
                        <p className="font-medium">{vaccine.childName}</p>
                        <p className="text-sm text-gray-600">{vaccine.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(vaccine.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                : (() => {
                    const nextDate = new Date(
                      Math.min(
                        ...upcomingVaccinations.map(
                          (v) => new Date(v.scheduledDate)
                        )
                      )
                    );

                    return upcomingVaccinations
                      .filter(
                        (v) =>
                          new Date(v.scheduledDate).toDateString() ===
                          nextDate.toDateString()
                      )
                      .map((vaccine) => (
                        <div
                          key={vaccine._id}
                          className="flex justify-between items-center py-2 border-b"
                        >
                          <div>
                            <p className="font-medium">{vaccine.childName}</p>
                            <p className="text-sm text-gray-600">
                              {vaccine.name}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(
                              vaccine.scheduledDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      ));
                  })()}
            </>
          );
        })()}
      </div>
    </div>
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      {renderStats()}
      {renderAnalytics()}
    </>
  );
};

export default OverviewTab;
