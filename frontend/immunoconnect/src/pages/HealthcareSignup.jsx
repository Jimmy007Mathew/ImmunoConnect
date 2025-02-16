import { useState } from "react";
import axios from "axios";

const HealthcareSignup = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/auth/healthcare/signup",
        formData
      );
      alert("Signup request submitted! Admin will review your application.");
    } catch (error) {
      alert(
        "Signup failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">Healthcare Provider Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="licenseNumber"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Hospital Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (e.g., Cardiology, Neurology)"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit for Approval
        </button>
      </form>
    </div>
  );
};

export default HealthcareSignup;
