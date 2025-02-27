import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  Shield,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const OverviewTab = ({ darkMode }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllSchedules, setShowAllSchedules] = useState(false);
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
  }, []);

  const renderStats = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <motion.div
        className={`p-6 rounded-lg border ${
          darkMode
            ? "bg-gray-800/50 border-gray-700"
            : "bg-blue-50 border-blue-100"
        }`}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <div className="flex items-center">
          <Baby
            className={`h-8 w-8 ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <div className="ml-4">
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Total Children
            </p>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-100" : "text-blue-900"
              }`}
            >
              {children.length}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      {/* Vaccination Progress */}
      <motion.div
        className={`rounded-lg shadow p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Vaccination Progress
        </h3>
        {children.map((child) => {
          const completedVaccines = child.vaccinations.filter(
            (v) => v.status === "Completed"
          ).length;
          const totalVaccines = child.vaccinations.length;
          const progressPercentage =
            totalVaccines > 0 ? (completedVaccines / totalVaccines) * 100 : 0;

          return (
            <motion.div
              key={child._id}
              className="space-y-2"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {child.name}
                </span>
                <span
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {completedVaccines}/{totalVaccines} Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <motion.div
                  className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                  style={{ width: `${progressPercentage}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Upcoming Schedule with Toggle */}
      <motion.div
        className={`rounded-lg shadow p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <select
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-gray-700 text-gray-100 border-gray-600"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            {children.map((child) => (
              <option key={child._id} value={child._id}>
                {child.name}
              </option>
            ))}
          </select>

          <motion.button
            className={`flex items-center transition ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-800"
            }`}
            onClick={() => setShowAllSchedules(!showAllSchedules)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllSchedules ? "Show Next Only" : "Show All"}
            {showAllSchedules ? (
              <ChevronUp className="h-5 w-5 ml-1" />
            ) : (
              <ChevronDown className="h-5 w-5 ml-1" />
            )}
          </motion.button>
        </div>

        {(() => {
          const today = new Date();
          const childData = children.find(
            (child) => child._id === selectedChild
          );
          if (!childData) {
            return (
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                No data available.
              </p>
            );
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
            return (
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                No pending vaccinations.
              </p>
            );
          }

          return (
            <>
              {overdueVaccinations.length > 0 && (
                <div>
                  <p className="text-red-500 font-bold mb-2">
                    Overdue Vaccinations
                  </p>
                  <AnimatePresence>
                    {overdueVaccinations.map((vaccine) => (
                      <motion.div
                        key={vaccine._id}
                        className="flex justify-between items-center py-2 border-b dark:border-gray-700"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <div>
                          <p className="font-medium text-red-500">
                            {vaccine.childName}
                          </p>
                          <p className="text-sm text-red-500">
                            {vaccine.name} (Pending)
                          </p>
                        </div>
                        <p className="text-sm text-red-500">
                          {new Date(vaccine.scheduledDate).toLocaleDateString()}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <AnimatePresence>
                {showAllSchedules
                  ? upcomingVaccinations.map((vaccine) => (
                      <motion.div
                        key={vaccine._id}
                        className="flex justify-between items-center py-2 border-b dark:border-gray-700"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <div>
                          <p
                            className={`font-medium ${
                              darkMode ? "text-gray-100" : "text-gray-900"
                            }`}
                          >
                            {vaccine.childName}
                          </p>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {vaccine.name}
                          </p>
                        </div>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {new Date(vaccine.scheduledDate).toLocaleDateString()}
                        </p>
                      </motion.div>
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
                          <motion.div
                            key={vaccine._id}
                            className="flex justify-between items-center py-2 border-b dark:border-gray-700"
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 },
                            }}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            <div>
                              <p
                                className={`font-medium ${
                                  darkMode ? "text-gray-100" : "text-gray-900"
                                }`}
                              >
                                {vaccine.childName}
                              </p>
                              <p
                                className={`text-sm ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {vaccine.name}
                              </p>
                            </div>
                            <p
                              className={`text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {new Date(
                                vaccine.scheduledDate
                              ).toLocaleDateString()}
                            </p>
                          </motion.div>
                        ));
                    })()}
              </AnimatePresence>
            </>
          );
        })()}
      </motion.div>
    </motion.div>
  );

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
    <motion.div
      className={`p-6 min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {renderStats()}
      {renderAnalytics()}
    </motion.div>
  );
};

export default OverviewTab;
