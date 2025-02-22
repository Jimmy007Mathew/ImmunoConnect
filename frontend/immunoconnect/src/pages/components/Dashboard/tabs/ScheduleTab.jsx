import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ScheduleTab = ({ darkMode }) => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);

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
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/children/${selectedChild}/vaccinations/${vaccineId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state
      setVaccinations((prev) =>
        prev.map((v) =>
          v._id === vaccineId
            ? {
                ...v,
                status,
                vaccineOTP: response.data.otp,
                otpExpires: response.data.otpExpires,
              }
            : v
        )
      );

      if (status === "Completed") {
        alert(`OTP for verification: ${response.data.otp}`);
      }
    } catch (error) {
      console.error("Error updating vaccine:", error);
    }
  };

  const today = new Date();

  // Helper function to check if OTP is still valid
  const isOTPValid = (otpExpires) => {
    if (!otpExpires) return false;
    const now = new Date();
    return new Date(otpExpires) > now;
  };

  // Animation variants for Framer Motion
  const childButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const vaccineCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`space-y-6 p-6 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } min-h-screen`}
    >
      {/* Child selector */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {children.map((child) => (
          <motion.button
            key={child._id}
            onClick={() => setSelectedChild(child._id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedChild === child._id
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
            variants={childButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {child.name}
          </motion.button>
        ))}
      </div>

      {/* Vaccination timeline */}
      <div className="space-y-4">
        <AnimatePresence>
          {vaccinations.map((vaccine) => {
            const isOverdue =
              new Date(vaccine.scheduledDate) < today &&
              vaccine.status === "Pending";
            return (
              <motion.div
                key={vaccine._id}
                className={`p-4 rounded-lg shadow ${
                  isOverdue
                    ? darkMode
                      ? "bg-red-900/30"
                      : "bg-red-100"
                    : darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
                variants={vaccineCardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={`font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {vaccine.name}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Scheduled:{" "}
                      {new Date(vaccine.scheduledDate).toLocaleDateString()}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {vaccine.dosage} • {vaccine.route}
                    </p>
                    {isOverdue && (
                      <p className="text-sm text-red-500 font-semibold">
                        Pending
                      </p>
                    )}
                    {vaccine.status === "Completed" && (
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`text-sm ${
                            vaccine.verified
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {vaccine.verified
                            ? `Verified by ${vaccine.verifiedBy}`
                            : "Pending Verification"}
                        </span>
                        {vaccine.verified && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-500"
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
                    {/* Display OTP if vaccine is completed and OTP exists and is valid */}
                    {vaccine.status === "Completed" &&
                      vaccine.vaccineOTP &&
                      isOTPValid(vaccine.otpExpires) &&
                      !vaccine.verified && (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm text-blue-500">
                            OTP: {vaccine.vaccineOTP}
                          </span>
                        </div>
                      )}
                  </div>
                  <motion.button
                    onClick={() =>
                      handleMarkVaccine(
                        vaccine._id,
                        vaccine.status === "Completed" ? "Pending" : "Completed"
                      )
                    }
                    className={`px-3 py-1 rounded-md transition-colors ${
                      vaccine.status === "Completed"
                        ? darkMode
                          ? "bg-green-900/30 text-green-400 hover:bg-green-900/50"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                        : darkMode
                        ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {vaccine.status === "Completed" ? "Completed" : "Mark Done"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScheduleTab;
