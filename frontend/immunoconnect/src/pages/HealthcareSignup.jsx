import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthcareSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    hospitalName: "",
    licenseNumber: "",
    address: "",
    phoneNumber: "",
    specialization: "",
  });
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFeedback({ message: "Passwords do not match", type: "error" });
      return;
    }
    try {
      await axios.post("https://loud-gretal-immuno-37d08cf0.koyeb.app/api/auth/healthcare/signup", formData);
      setFeedback({ message: "Signup request submitted! Admin will review your application.", type: "success" });
    } catch (error) {
      setFeedback({ message: error.response?.data?.message || error.message, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Healthcare Provider Signup</h2>
            <p className="mt-2 text-sm text-gray-600">Register your healthcare facility</p>
          </div>

          {feedback.message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 text-sm rounded-md ${
                feedback.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {feedback.message}
            </motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {Object.keys(formData).map((key) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * Object.keys(formData).indexOf(key) }}
                >
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type={key.includes("password") ? "password" : key === "email" ? "email" : "text"}
                    required
                    value={formData[key]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit for Approval
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">Protecting What Matters Most.</h2>
              <p className="text-lg">Keep track of your family's immunization records with ease</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareSignup;
