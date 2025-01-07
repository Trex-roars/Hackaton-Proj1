// ChatMessage.jsx
import React from "react";
import { User, MessageCircle } from "lucide-react";

const ChatMessage = ({ message }) => (
  <div
    className={`flex ${
      message.type === "user" ? "justify-end" : "justify-start"
    } items-end space-x-2`}
  >
    {message.type !== "user" && (
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
        <MessageCircle className="w-4 h-4" />
      </div>
    )}
    <div
      className={`max-w-[80%] p-4 rounded-2xl transform transition-all duration-500 ${
        message.animate ? "animate-message-slide-in" : ""
      } ${
        message.type === "user"
          ? "bg-blue-600 ml-4"
          : message.type === "error"
            ? "bg-red-600/60"
            : "bg-gray-800/90"
      } hover:scale-102 hover:shadow-lg group`}
    >
      {message.content}
      <div className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {message.timestamp}
      </div>
    </div>
    {message.type === "user" && (
      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
        <User className="w-4 h-4" />
      </div>
    )}
  </div>
);

export default ChatMessage;
