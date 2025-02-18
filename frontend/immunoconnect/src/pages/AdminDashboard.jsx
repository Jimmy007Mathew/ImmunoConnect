import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2 } from "lucide-react";

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
          "https://loud-gretal-immuno-37d08cf0.koyeb.app/api/admin/pending-providers",
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
  }, [navigate]);

  const handleVerifyProvider = async (providerId) => {
    try {
      await axios.patch(
        `https://loud-gretal-immuno-37d08cf0.koyeb.app/api/admin/verify-provider/${providerId}`,
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShieldCheck className="h-8 w-8 mr-2 text-blue-600" />
            Pending Healthcare Providers
          </h2>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {Array.isArray(pendingProviders) &&
              pendingProviders.map((provider) => (
                <motion.div
                  key={provider._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {provider.hospitalName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {provider.email}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        License No: {provider.licenseNumber}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Address: {provider.address}
                      </p>
                    </div>
                    <button
                      onClick={() => handleVerifyProvider(provider._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Verify
                    </button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {pendingProviders.length === 0 && !loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-500 text-center"
            >
              No pending provider requests
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
