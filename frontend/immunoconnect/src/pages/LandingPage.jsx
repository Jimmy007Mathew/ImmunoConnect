import { useNavigate } from "react-router-dom";
import {
  Shield,
  Syringe as Hospital,
  Syringe,
  Brain,
  Calendar,
  MapPin,
  BookOpen,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
      {/* Hero Section */}
      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-3xl text-center space-y-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-xl -z-10" />
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            ImmunoConnect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making immunization seamless and accessible for everyone through
            digital innovation and AI-powered support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-blue-600 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate("/hospital-login")}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Hospital className="w-5 h-5 mr-2" />
              Healthcare Center Login
            </button>
            <button
              onClick={() => navigate("/info")}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Syringe className="w-5 h-5 mr-2" />
              Vaccine Info
            </button>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Comprehensive Immunization Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Calendar className="w-12 h-12 text-blue-600" />}
              title="Digital Tracking"
              description="Maintain digital vaccination records and receive timely reminders for upcoming doses."
            />
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-blue-600" />}
              title="AI-Powered Support"
              description="Get instant answers to vaccine-related questions through our Gemini-powered AI assistant."
            />
            <FeatureCard
              icon={<MapPin className="w-12 h-12 text-blue-600" />}
              title="Healthcare Access"
              description="Find nearby vaccination centers and stay updated about local immunization drives."
            />
          </div>
        </div>
      </div>

      {/* Healthcare Centers Section */}
      <div className="bg-blue-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <Hospital className="w-16 h-16 text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                For Healthcare Centers
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Monitor and manage vaccination programs in your region. Access
                real-time data and coordinate community outreach efforts
                effectively.
              </p>
              <button
                onClick={() => navigate("/hospital-login")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Join as Healthcare Center
              </button>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare Center"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Education"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="flex-1">
              <BookOpen className="w-16 h-16 text-blue-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Informed
              </h2>
              <p className="text-gray-600 text-lg">
                Access reliable information about vaccines, get answers to your
                questions through our AI assistant, and make informed decisions
                about your health.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Take Control of Your Immunization Journey
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join ImmunoConnect to manage your vaccination records, stay
            informed, and contribute to a healthier society.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-12 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for feature cards
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 rounded-xl hover:shadow-xl transition-shadow duration-300">
    <div className="flex justify-center mb-6">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
