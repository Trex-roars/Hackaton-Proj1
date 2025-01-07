"use clinet";

// ChatContainer.jsx
import React, { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const ChatContainer = ({
  messages,
  inputValue,
  setInputValue,
  handleSubmit,
  handleReset,
  isLoading,
  isExpanded,
}: {
  messages: Array<{ role: string; content: string }>;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent<Element>) => void;
  handleReset: () => void;
  isLoading: boolean;
  isExpanded: boolean;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (!messagesContainerRef.current) return;
      const { scrollHeight, scrollTop, clientHeight } =
        messagesContainerRef.current;
      setShowScrollIndicator(scrollHeight - scrollTop - clientHeight > 50);
    };

    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isExpanded
          ? "fixed inset-0 flex flex-col p-4 md:p-6 max-w-3xl mx-auto"
          : "max-w-4xl mx-auto px-6"
      }`}
    >
      {isExpanded && (
        <>
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent p-4"
          >
            {messages.map((message, index: number) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showScrollIndicator && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-blue-600/80 rounded-full p-2 hover:bg-blue-500 transition-all duration-300 animate-bounce"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </>
      )}

      <div className={`${isExpanded ? "mt-auto" : ""} relative`}>
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          isLoading={isLoading}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
