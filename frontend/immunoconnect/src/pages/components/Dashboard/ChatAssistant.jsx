import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const ChatAssistant = ({
  showChat,
  setShowChat,
  messages,
  isLoading,
  inputMessage,
  handleSendMessage,
  setInputMessage,
}) => {
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = cursorPosition;
      textareaRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, inputMessage]);

  if (!showChat) return null;

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
            <p className="font-medium">Welcome to the Vaccination Assistant!</p>
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

export default ChatAssistant;
