import { useNavigate } from "react-router-dom";
import { Shield, Syringe, Brain, Calendar, MapPin, BookOpen, Lock } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


// Enhanced animations with smoother transitions and spring physics
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      scale: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1]
    },
  },
};

const fadeIn = {
  hidden: { 
    opacity: 0,
    scale: 0.98
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1]
    } 
  },
};

const slideIn = {
  hidden: { 
    x: -60,
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      scale: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }
};

const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1]
  }
};

const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
};

const LandingPage = () => {
  const navigate = useNavigate();

  // Enhanced intersection observer configuration
  const [heroRef, heroInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.2,
    rootMargin: "-50px"
  });
  const [featuresRef, featuresInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.2,
    rootMargin: "-50px"
  });
  const [healthcareRef, healthcareInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.2,
    rootMargin: "-50px"
  });
  const [educationRef, educationInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.2,
    rootMargin: "-50px"
  });
  const [ctaRef, ctaInView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.2,
    rootMargin: "-50px"
  });

  return (
    <div className="relative min-h-screen overflow-hidden">
    
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-blue-100/90 via-white/90 to-blue-300/90">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl text-center space-y-8 relative backdrop-blur-sm bg-white/30 p-8 rounded-2xl"
          >
            <motion.div 
              className="flex justify-center"
              variants={{
                hidden: { scale: 0, rotate: -180 },
                visible: { 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 1.5
                  }
                }
              }}
            >
              <Shield className="h-16 w-16 text-blue-600" />
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-bold text-gray-900"
            >
              ImmunoConnect
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Making immunization seamless, accessible, and empowering for everyone through digital innovation.
            </motion.p>
            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                variants={fadeInUp}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
              >
                Get Started
              </motion.button>
              <motion.button
                variants={fadeInUp}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate("/signup")}
                className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-blue-600 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
              >
                Create Account
              </motion.button>
              <motion.button
                variants={fadeInUp}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate("/hospital-login")}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 flex items-center justify-center"
              >
                <Syringe className="w-5 h-5 mr-2" />
                Healthcare Center Login
              </motion.button>
              <motion.button
                variants={fadeInUp}
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate("/info")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center"
              >
                <Syringe className="w-5 h-5 mr-2" />
                Vaccine Info
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Rest of the sections with enhanced animations */}
        {/* Main Features */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="bg-white/90 backdrop-blur-sm py-24"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center text-gray-900 mb-16"
            >
              Comprehensive Immunization Management
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
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
            </motion.div>
          </div>
        </motion.div>

        {/* Healthcare Centers Section */}
        <motion.div
          ref={healthcareRef}
          initial="hidden"
          animate={healthcareInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="bg-blue-50/90 backdrop-blur-sm py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeIn}
              className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12"
            >
              <motion.div 
                variants={slideIn}
                className="flex-1"
              >
                <Syringe className="w-16 h-16 text-blue-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  For Healthcare Centers
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Monitor and manage vaccination programs in your region. Access real-time data and coordinate community outreach efforts effectively.
                </p>
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={() => navigate("/healthcare-signup")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                >
                  Join as Healthcare Center
                </motion.button>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { x: 60, opacity: 0 },
                  visible: { 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      duration: 1.2,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }
                }}
                className="flex-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare Center"
                  className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          ref={educationRef}
          initial="hidden"
          animate={educationInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="bg-white/90 backdrop-blur-sm py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeIn}
              className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
            >
              <motion.div
                variants={{
                  hidden: { x: -60, opacity: 0 },
                  visible: { 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      duration: 1.2,
                      ease: [0.25, 0.1, 0.25, 1]
                    }
                  }
                }}
                className="flex-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                  alt="Education"
                  className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>
              <motion.div 
                variants={slideIn}
                className="flex-1"
              >
                <BookOpen className="w-16 h-16 text-blue-600 mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Stay Informed
                </h2>
                <p className="text-gray-600 text-lg">
                  Access reliable information about vaccines, get answers to your questions through our AI assistant, and make informed decisions about your health.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="bg-gray-50/90 backdrop-blur-sm py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900 mb-8"
            >
              Take Control of Your Immunization Journey
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Join ImmunoConnect to manage your vaccination records, stay informed, and contribute to a healthier society.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={() => navigate("/signup")}
              className="px-12 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 text-lg"
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Section */}
        <footer className="bg-gray-800/95 backdrop-blur-sm text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">ImmunoConnect</h3>
                <p className="text-gray-400">
                  Making immunization seamless and accessible for everyone.
                </p>
                <p className="text-gray-400 mt-2">
                  &copy; {new Date().getFullYear()} ImmunoConnect. All rights reserved.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-4">
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={() => navigate("/admin-login")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Admin Login
                </motion.button>
                <div className="text-gray-400 text-sm">
                  <a href="/privacy-policy" className="hover:text-gray-300 transition-colors duration-200">
                    Privacy Policy
                  </a>
                  <span className="mx-2">|</span>
                  <a href="/terms-of-service" className="hover:text-gray-300 transition-colors duration-200">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Enhanced FeatureCard component with hover animations
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.2 }
    }}
    className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 bg-white hover:shadow-blue-500/10"
  >
    <motion.div 
      className="flex justify-center mb-6"
      whileHover={{ 
        rotate: 360,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default LandingPage;