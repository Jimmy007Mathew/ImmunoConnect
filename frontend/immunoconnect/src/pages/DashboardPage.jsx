import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  User,
  Mail,
  Baby,
  Calendar,
  Syringe,
  X,
  Bell,
  Calendar as CalendarIcon,
  BookOpen,
  MapPin,
  Shield,
  Activity,
  Menu,
  Home,
  Settings,
  LogOut,
  ChevronDown,
  Users,
  FileText,
  BarChart,
  Clock,
  AlertCircle,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [showAddChild, setShowAddChild] = useState(false);
  const [children, setChildren] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Upcoming vaccination for MMR due in 2 weeks",
      type: "reminder",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "New vaccination drive in your area",
      type: "info",
      time: "1 day ago",
    },
    {
      id: 3,
      message: "Health record updated for Sarah",
      type: "success",
      time: "2 days ago",
    },
  ]);
  const [newChild, setNewChild] = useState({
    name: "",
    age: "",
    gender: "",
    vaccinations: [],
  });

  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCFOvCB7y-1bcGOje2W0eTg2a0NWTTT-Lk"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    } else {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("userEmail");
      const storedChildren = localStorage.getItem("children");

      if (storedName) setUserName(storedName);
      if (storedEmail) setUserEmail(storedEmail);
      if (storedChildren) setChildren(JSON.parse(storedChildren));
    }
  }, [navigate]);

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
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `
      You are a highly trained medical professional specializing in vaccinations and immunizations for children. Your goal is to provide accurate, up-to-date, and evidence-based medical information to assist parents in making informed decisions regarding vaccination and child health. Your responses should prioritize clarity, empathy, and professionalism.
      
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
      
      If the question is unrelated to vaccinations, immunizations, or child health, respond kindly, declining to answer and reminding the user that your expertise is limited to these areas. Maintain a warm, professional tone.`;

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
          content:
            "I apologize, but I encountered an error. Please try asking your question again. Remember, I can only help with vaccination-related queries.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sidebarItems = [
    { icon: Home, label: "Dashboard", id: "overview" },
    { icon: Users, label: "Family Profiles", id: "profiles" },
    { icon: Calendar, label: "Schedule", id: "schedule" },
    { icon: FileText, label: "Records", id: "records" },
    { icon: BarChart, label: "Analytics", id: "analytics" },
    { icon: MapPin, label: "Health Centers", id: "centers" },
  ];

  const renderOverviewStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <Baby className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-blue-600 font-medium">Total Children</p>
            <p className="text-2xl font-bold text-blue-900">
              {children.length}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg border border-green-100">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm text-green-600 font-medium">Vaccinations</p>
            <p className="text-2xl font-bold text-green-900">
              {children.reduce(
                (acc, child) => acc + child.vaccinations.length,
                0
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
        <div className="flex items-center">
          <CalendarIcon className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm text-purple-600 font-medium">Upcoming</p>
            <p className="text-2xl font-bold text-purple-900">2</p>
          </div>
        </div>
      </div>
      <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-orange-600" />
          <div className="ml-4">
            <p className="text-sm text-orange-600 font-medium">Health Score</p>
            <p className="text-2xl font-bold text-orange-900">92%</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Vaccination Progress</h3>
        <div className="space-y-4">
          {children.map((child, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{child.name}</span>
                <span className="text-sm text-gray-500">
                  {child.vaccinations.length}/8 Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(child.vaccinations.length / 8) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">MMR Vaccine (2nd Dose)</p>
                <p className="text-sm text-gray-600">Sarah - Age 4</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-blue-600">March 15, 2024</p>
              <p className="text-sm text-gray-600">2 weeks away</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium">DPT Booster</p>
                <p className="text-sm text-gray-600">John - Age 5</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-yellow-600">April 1, 2024</p>
              <p className="text-sm text-gray-600">1 month away</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChatInterface = () => {
    const textareaRef = React.useRef(null);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    React.useEffect(() => {
      if (messages.length > 0) {
        scrollToBottom();
      }
    }, [messages.length]);

    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = cursorPosition;
        textareaRef.current.selectionEnd = cursorPosition;
      }
    }, [cursorPosition, inputMessage]);

    return (
      <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50">
        <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
          <div>
            <h3 className="font-semibold">Vaccination Assistant</h3>
            <p className="text-xs text-gray-100">
              Ask questions about vaccines and immunizations
            </p>
          </div>
          <button
            onClick={() => setShowChat(false)}
            className="text-white hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-4 space-y-2">
              <p className="font-medium">
                Welcome to the Vaccination Assistant!
              </p>
              <p className="text-sm">I can help you with:</p>
              <ul className="text-sm list-disc list-inside">
                <li>Vaccination schedules</li>
                <li>Vaccine information and safety</li>
                <li>Side effects and precautions</li>
                <li>Recommended vaccines by age</li>
                <li>General immunization queries</li>
              </ul>
            </div>
          )}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                setCursorPosition(e.target.selectionStart);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              onClick={(e) => {
                setCursorPosition(e.target.selectionStart);
              }}
              onSelect={(e) => {
                setCursorPosition(e.target.selectionStart);
              }}
              placeholder="Ask about vaccinations, immunizations, or child health..."
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="2"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className={`px-4 py-2 rounded-lg ${
                isLoading || !inputMessage.trim()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-colors`}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send. Shift + Enter for new line.
          </p>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-blue-600">
                ImmunoConnect
              </span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() =>
                    setShowNotificationsPanel(!showNotificationsPanel)
                  }
                  className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setShowAddChild(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Child</span>
                </button>
                <button
                  onClick={() => setShowChat(true)}
                  className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <BookOpen className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        {showNotificationsPanel && (
          <div className="absolute right-4 top-16 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border z-50">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <button
                  onClick={() => setShowNotificationsPanel(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border-b hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Bell className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.filter((n) => n.id !== notification.id)
                        )
                      }
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {sidebarItems.find((item) => item.id === activeTab)?.label}
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
            <>
              {renderOverviewStats()}
              {renderAnalytics()}
            </>
          )}

          {activeTab === "profiles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Baby className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {child.name}
                    </h3>
                  </div>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Age: {child.age} years
                    </p>
                    <p className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      Gender: {child.gender}
                    </p>
                    <div>
                      <p className="font-medium mb-2 flex items-center">
                        <Syringe className="h-4 w-4 mr-2 text-gray-400" />
                        Vaccinations:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {child.vaccinations.map((vac, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-full"
                          >
                            {vac}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Upcoming Vaccinations
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Syringe className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">MMR Vaccine (2nd Dose)</p>
                        <p className="text-sm text-gray-600">For: Sarah</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">
                        March 15, 2024
                      </p>
                      <p className="text-sm text-gray-600">2 weeks away</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent History</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Hepatitis B Vaccine</p>
                        <p className="text-sm text-gray-600">For: John</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-600">
                        February 1, 2024
                      </p>
                      <p className="text-sm text-green-600">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Child Modal */}
      {showAddChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Child Profile</h2>
              <button
                onClick={() => setShowAddChild(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddChild} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Child's Name
                </label>
                <input
                  type="text"
                  required
                  value={newChild.name}
                  onChange={(e) =>
                    setNewChild({ ...newChild, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age (years)
                </label>
                <input
                  type="number"
                  required
                  value={newChild.age}
                  onChange={(e) =>
                    setNewChild({ ...newChild, age: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  required
                  value={newChild.gender}
                  onChange={(e) =>
                    setNewChild({ ...newChild, gender: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vaccinations Taken
                </label>
                <div className="space-y-2">
                  {[
                    "BCG",
                    "Hepatitis B",
                    "DPT",
                    "Polio",
                    "MMR",
                    "Rotavirus",
                    "Pneumococcal",
                    "Influenza",
                  ].map((vac) => (
                    <label key={vac} className="flex items-center">
                      <input
                        type="checkbox"
                        value={vac}
                        checked={newChild.vaccinations.includes(vac)}
                        onChange={handleVaccinationChange}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">{vac}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Syringe className="h-5 w-5 mr-2" />
                Add Child Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {showChat && <ChatInterface />}
    </div>
  );
};

export default DashboardPage;
