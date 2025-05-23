import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import ChatAssistant from "./components/Dashboard/ChatAssistant";
import AddChildModal from "./components/Dashboard/AddChildModal";
import OverviewTab from "./components/Dashboard/tabs/OverviewTab";
import ProfilesTab from "./components/Dashboard/tabs/ProfilesTab";
import ScheduleTab from "./components/Dashboard/tabs/ScheduleTab";
import HealthCenterTab from "./components/Dashboard/tabs/HealthCenterTab";
import RecordTab from "./components/Dashboard/tabs/RecordTab";

import { jwtDecode } from "jwt-decode";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [showAddChild, setShowAddChild] = useState(false);
  const [children, setChildren] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [newChild, setNewChild] = useState({
    name: "",
    age: "",
    gender: "",
    vaccinations: [],
  });

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBKezR-FrHqUuRlyWN5KpL3MDS5O9Q7UjQ"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    } else {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT
        setUserName(decodedToken.name);
        setUserEmail(decodedToken.email);

        const storedChildren = localStorage.getItem("children");
        if (storedChildren) setChildren(JSON.parse(storedChildren));
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleAddChild = (e) => {
    e.preventDefault();
    const updatedChildren = [...children, newChild];
    setChildren(updatedChildren);
    localStorage.setItem("children", JSON.stringify(updatedChildren));
    setNewChild({
      name: "",
      age: "",
      gender: "",
      vaccinations: [],
    });
    setShowAddChild(false);
  };

  const handleVaccinationChange = (e) => {
    const vaccination = e.target.value;
    setNewChild((prev) => ({
      ...prev,
      vaccinations: prev.vaccinations.includes(vaccination)
        ? prev.vaccinations.filter((v) => v !== vaccination)
        : [...prev.vaccinations, vaccination],
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `You are a highly trained medical professional specializing in vaccinations and immunizations for children. Your goal is to provide accurate, up-to-date, and evidence-based medical information to assist parents in making informed decisions regarding vaccination and child health. Your responses should prioritize clarity, empathy, and professionalism.
      
      Guidelines for your responses:
      1. Focus solely on topics related to vaccinations, immunizations, or child health.
      2. Ensure all information is sourced from reliable and current medical guidelines or research.
      3. Use clear, parent-friendly language without compromising accuracy.
      4. Include important medical disclaimers where necessary, such as advising consultation with a licensed healthcare provider for personalized care.
      5. Address parents' concerns with sensitivity and patience, acknowledging their need for reassurance.
      
      **Current user question:** 
      "${currentMessage}"
      
      Please provide a response that:
      1. Addresses the specific query in a concise, comprehensive manner.
      2. Offers practical advice or resources where applicable.
      3. Avoids technical jargon or overly complex explanations.
      4. Reminds parents of the importance of consulting their pediatrician for tailored medical guidance, if needed.
      
      If the question is unrelated to vaccinations, immunizations, or child health, respond kindly, declining to answer and reminding the user that your expertise is limited to these areas. Maintain a warm, professional tone`; // Keep your existing prompt here
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botMessage = {
        role: "assistant",
        content: response.text(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error...",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } flex`}
    >
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={{
          name: userName,
          email: userEmail,
          handleLogout: () => {
            localStorage.clear();
            navigate("/");
          },
        }}
        closeSidebar={() => setIsSidebarOpen(false)}
        darkMode={darkMode}
      />

      {/* Main Content */}
      <div className="flex-1  lg:ml-72">
        <Header
          openSidebar={() => setIsSidebarOpen(true)}
          toggleAddChild={() => setShowAddChild(true)}
          toggleChat={() => setShowChat(true)}
          user={{ name: userName, email: userEmail }}
          onLogout={() => {
            localStorage.clear();
            navigate("/");
          }}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {["overview", "profiles", "schedule","records","centers"]
                .find((t) => t === activeTab)
                ?.toUpperCase()}
            </h1>
            <p className="text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {activeTab === "overview" && (
            <OverviewTab children={children} darkMode={darkMode} />
          )}
          {activeTab === "profiles" && (
            <ProfilesTab children={children} darkMode={darkMode} />
          )}
          {activeTab === "centers" && (
            <HealthCenterTab children={children} darkMode={darkMode} />
          )}
          {activeTab === "records" && (
            <RecordTab children={children} darkMode={darkMode} />
          )}
          {activeTab === "schedule" && <ScheduleTab darkMode={darkMode} />}
        </main>
      </div>

      <AddChildModal
        show={showAddChild}
        onClose={() => setShowAddChild(false)}
        newChild={newChild}
        setNewChild={setNewChild}
        handleSubmit={handleAddChild}
        handleVaccinationChange={handleVaccinationChange}
        darkMode={darkMode}
      />

      <ChatAssistant
        showChat={showChat}
        setShowChat={setShowChat}
        messages={messages}
        isLoading={isLoading}
        inputMessage={inputMessage}
        handleSendMessage={handleSendMessage}
        setInputMessage={setInputMessage}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        darkMode={darkMode}
      />
    </div>
  );
};

export default DashboardPage;
