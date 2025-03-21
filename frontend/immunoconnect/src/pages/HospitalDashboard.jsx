import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Syringe } from "lucide-react";

const HospitalDashboard = () => {
  const [email, setEmail] = useState("");
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentVaccinationId, setCurrentVaccinationId] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const hospitalToken = localStorage.getItem("hospitalToken");
    if (!hospitalToken) {
      navigate("/hospital-login", { replace: true });
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (otpSent && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [otpSent, countdown]);

  const fetchChildrenByEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://loud-gretal-immuno-37d08cf0.koyeb.app/api/vaccinations/search-parent",
        {
          params: { email },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
          },
        }
      );
      setChildren(response.data);
      setError("");
      setSelectedChildIndex(0);
    } catch (error) {
      console.error(
        "Error fetching children:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Failed to fetch children");
      setChildren([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (vaccinationId) => {
    try {
      // Send OTP to parent's email
      await axios.post(
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/vaccinations/send-otp/${vaccinationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
          },
        }
      );

      // Show OTP modal and start countdown
      setCurrentVaccinationId(vaccinationId);
      setShowOtpModal(true);
      setOtpSent(true);
      setCountdown(300); // Reset countdown to 5 minutes
    } catch (error) {
      console.error(
        "Error sending OTP:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      // Verify OTP
      const verifyResponse = await axios.post(
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/vaccinations/verify-otp/${currentVaccinationId}`,
        { otp: enteredOtp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
          },
        }
      );

      // Update the UI by removing the verified vaccination
      setChildren((prevChildren) =>
        prevChildren.map((child, index) =>
          index === selectedChildIndex
            ? {
                ...child,
                vaccinations: child.vaccinations.filter(
                  (v) => v._id !== currentVaccinationId
                ),
              }
            : child
        )
      );
      setError("");
      setShowOtpModal(false);
      setEnteredOtp("");
      setOtpSent(false);
      setCountdown(0); // Reset countdown
    } catch (error) {
      console.error(
        "Verification failed:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Verification failed");
    }
  };

  const getBoxColor = (index) => {
    const colors = ["bg-blue-50", "bg-green-50", "bg-purple-50", "bg-pink-50"];
    return colors[index % colors.length];
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/90 via-white/90 to-blue-300/90 p-4 font-sans">
      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          Hospital Dashboard
        </h2>
        <div className="flex items-center justify-center">
          <input
            type="email"
            placeholder="Enter parent's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchChildrenByEmail}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 text-center mt-4"
        >
          {error}
        </motion.div>
      )}

      {/* Toggle Between Children */}
      {children.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-4"
        >
          <button
            onClick={() =>
              setSelectedChildIndex((prev) =>
                prev > 0 ? prev - 1 : children.length - 1
              )
            }
            className="bg-gray-200 p-2 rounded-l hover:bg-gray-300"
          >
            ◀
          </button>
          <div className="bg-gray-100 p-2 px-4">
            {children[selectedChildIndex].name}
          </div>
          <button
            onClick={() =>
              setSelectedChildIndex((prev) =>
                prev < children.length - 1 ? prev + 1 : 0
              )
            }
            className="bg-gray-200 p-2 rounded-r hover:bg-gray-300"
          >
            ▶
          </button>
        </motion.div>
      )}

      {/* Display Selected Child and Vaccinations */}
      {children.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          <motion.div
            key={children[selectedChildIndex]._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-bold text-lg text-gray-900">
              {children[selectedChildIndex].name}
            </h3>
            <p className="text-sm text-gray-600">
              Date of Birth:{" "}
              {new Date(
                children[selectedChildIndex].dateOfBirth
              ).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              Gender: {children[selectedChildIndex].gender}
            </p>

            {/* Vaccinations */}
            <div className="mt-2">
              <h4 className="font-semibold text-gray-700">Vaccinations:</h4>
              {children[selectedChildIndex].vaccinations
                .filter((v) => v.status === "Completed" && !v.verified)
                .map((vaccine, vIndex) => (
                  <motion.div
                    key={vaccine._id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`mt-2 p-2 border rounded hover:bg-gray-50 transition-colors duration-200 ${
                      vaccine.verified ? getBoxColor(vIndex) : "bg-white"
                    }`}
                  >
                    <p className="text-sm text-gray-600">
                      Vaccine: {vaccine.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Completed on:{" "}
                      {new Date(vaccine.actualDate).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-between">
                      {!vaccine.verified && (
                        <motion.button
                          onClick={() => handleVerify(vaccine._id)}
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Verify
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowOtpModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <p className="text-sm text-gray-600 mb-4">
              OTP has been sent to the parent's email. Expires in:{" "}
              <span className="font-bold">{formatTime(countdown)}</span>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowOtpModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Verify
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default HospitalDashboard;
 
