import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login", { replace: true });
    }
    const fetchPendingProviders = async () => {
      try {
        const response = await axios.get(
          "https://mytest-murex-kappa.vercel.app/api/admin/pending-providers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        // Ensure we're getting an array
        const data = Array.isArray(response.data) ? response.data : [];
        setPendingProviders(data);
      } catch (error) {
        console.error("Error fetching pending providers:", error);
        setError("Failed to load pending providers");
        setPendingProviders([]); // Reset to empty array
      } finally {
        setLoading(false);
      }
    };
    fetchPendingProviders();
  }, []);

  const handleVerifyProvider = async (providerId) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/verify-provider/${providerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setPendingProviders((prev) => prev.filter((p) => p._id !== providerId));
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading pending providers...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Healthcare Providers</h2>
      <div className="space-y-4">
        {/* Safe array mapping */}
        {Array.isArray(pendingProviders) &&
          pendingProviders.map((provider) => (
            <div key={provider._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{provider.hospitalName}</h3>
                  <p className="text-sm text-gray-600">{provider.email}</p>
                  <p className="text-sm text-gray-600">
                    License No: {provider.licenseNumber}
                    Address: {provider.address}
                  </p>
                </div>
                <button
                  onClick={() => handleVerifyProvider(provider._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Verify
                </button>
              </div>
            </div>
          ))}

        {pendingProviders.length === 0 && !loading && (
          <p className="text-gray-500">No pending provider requests</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
