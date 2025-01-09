"use client";

import React from "react";
import { Send, X, RefreshCw, Sparkles } from "lucide-react";

const ChatInput = ({
  inputValue,
  setInputValue,
  handleSubmit,
  handleReset,
  isLoading,
  isExpanded,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: () => void;
  handleReset: () => void;
  isLoading: boolean;
  isExpanded: boolean;
}) => (
  <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
    <div className="flex items-center space-x-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={
          isLoading
            ? "Processing..."
            : "Ask TheAgent your social media questions..."
        }
        disabled={isLoading}
        className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500 text-white focus:placeholder-blue-400 transition-all duration-300 disabled:opacity-50"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <div className="flex items-center space-x-3 text-gray-400">
        {isExpanded ? (
          <>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="relative group"
            >
              {isLoading ? (
                <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
              ) : (
                <Send className="w-6 h-6 group-hover:text-blue-500 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" />
              )}
            </button>
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="group"
            >
              <X className="w-6 h-6 group-hover:text-red-500 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-90" />
            </button>
          </>
        ) : (
          <button onClick={handleSubmit} className="group">
            <Sparkles className="w-6 h-6 group-hover:text-yellow-500 transition-all duration-300 transform group-hover:scale-110 " />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ChatInput;
