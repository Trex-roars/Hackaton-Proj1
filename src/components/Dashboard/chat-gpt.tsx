"use client";
import React, { useState } from "react";
import { FaComments, FaUser, FaRobot, FaPaperPlane } from "react-icons/fa";

interface Message {
  text: string;
  sender: "user" | "gpt";
}

const ChatGPTInbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendMessage = (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "GPT Response", sender: "gpt" }]);
    }, 1000);
  };

  return (
    <div className="relative">
      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2 z-10"
      >
        <FaComments size={20} />
        Chat
      </button>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-[500px] bg-gradient-to-br from-gray-800 to-black text-white rounded-lg shadow-2xl border border-gray-700 z-20">
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-bold text-xl text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Ask TheAGENT
            </h2>
          </div>
          <div className="h-[400px] overflow-y-auto bg-gray-900 p-4 rounded-t-md shadow-inner">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-center ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-3`}
              >
                {msg.sender === "gpt" ? (
                  <FaRobot className="text-gray-400 mr-2 animate-bounce" />
                ) : (
                  <FaUser className="text-blue-400 mr-2 animate-pulse" />
                )}
                <div
                  className={`p-3 rounded-xl shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 bg-gray-800 rounded-b-md border-t border-gray-700 flex items-center">
            <input
              type="text"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  sendMessage(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector("input") as HTMLInputElement;
                if (input.value) {
                  sendMessage(input.value);
                  input.value = "";
                }
              }}
              className="ml-3 bg-blue-600 text-white p-2  rounded-full hover:bg-blue-500 transition-all"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPTInbox;
