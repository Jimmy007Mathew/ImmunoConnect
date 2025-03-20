import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const [email, setEmail] = useState("");
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [selectedVaccinationId, setSelectedVaccinationId] = useState(null); // Track selected vaccination for OTP
  const navigate = useNavigate();

  useEffect(() => {
    const hospitalToken = localStorage.getItem("hospitalToken");
    if (!hospitalToken) {
      navigate("/hospital-login", { replace: true });
    }
  }, []);

  const fetchChildrenByEmail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/vaccinations/search-parent",
        {
          params: { email },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
          },
        }
      );
      setChildren(response.data);
      setError("");
    } catch (error) {
      console.error(
        "Error fetching children:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Failed to fetch children");
      setChildren([]);
    }
  };

  const handleVerify = async (vaccinationId) => {
    try {
      // Send OTP to parent's email
      const response = await axios.post(
        `http://localhost:5000/api/vaccinations/send-otp/${vaccinationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
          },
        }
      );

      // Prompt the user to enter OTP
      const enteredOtp = prompt("Enter the OTP sent to the parent's email:");
      if (!enteredOtp) {
        setError("OTP is required.");
        return;
      }

      // Verify OTP
      const verifyResponse = await axios.post(
        `http://localhost:5000/api/vaccinations/verify-otp/${vaccinationId}`,
        { otp: enteredOtp },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("hospitalToken")}`,
          },
        }
      );

      // Update the UI by removing the verified vaccination
      setChildren((prevChildren) =>
        prevChildren.map((child) => ({
          ...child,
          vaccinations: child.vaccinations.filter(
            (v) => v._id !== vaccinationId
          ),
        }))
      );
      setError("");
    } catch (error) {
      console.error(
        "Verification failed:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hospital Dashboard</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter parent's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchChildrenByEmail}
          className="bg-blue-600 text-white px-4 py-2 rounded ml-2"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Display Children and Vaccinations */}
      <div className="space-y-4">
        {children.map((child) => (
          <div key={child._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{child.name}</h3>
            <p className="text-sm text-gray-600">
              Date of Birth: {new Date(child.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Gender: {child.gender}</p>

            {/* Vaccinations */}
            <div className="mt-2">
              <h4 className="font-semibold">Vaccinations:</h4>
              {child.vaccinations
                .filter((v) => v.status === "Completed" && !v.verified)
                .map((vaccine) => (
                  <div key={vaccine._id} className="mt-2 p-2 border rounded">
                    <p className="text-sm text-gray-600">
                      Vaccine: {vaccine.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Completed on:{" "}
                      {new Date(vaccine.actualDate).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleVerify(vaccine._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                    >
                      Verify
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDashboard;
