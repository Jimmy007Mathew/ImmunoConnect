import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear existing localStorage data
      localStorage.clear();

      const response = await fetch("https://mytest-kk5g.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token, user name, and user ID in local storage
        localStorage.setItem("token", data.token);

        // Navigate to dashboard with user name
        navigate("/dashboard", { state: { name: data.name } });
      } else {
        setFeedback({ message: data.message || "Login failed", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>

          {feedback.message && (
            <div
              className={`p-4 text-sm rounded-md ${
                feedback.type === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFeedback({ message: "", type: "" });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFeedback({ message: "", type: "" });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </button>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="h-full w-full bg-black bg-opacity-25 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">
                Protecting What Matters Most
              </h2>
              <p className="text-lg">
                Keep track of your family's immunization records with ease
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
