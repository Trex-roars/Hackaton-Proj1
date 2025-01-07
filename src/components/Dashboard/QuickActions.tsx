import React from "react";
import { Zap } from "lucide-react";

const QuickActions = ({ suggestions, onSuggestionClick }) => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {suggestions.map((text, index) => (
      <button
        key={text}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
        className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-gray-200
          hover:text-white hover:bg-blue-900/50 transition-all duration-300
          shadow-md hover:shadow-blue-500/20 transform hover:-translate-y-1
          hover:scale-105 animate-fade-in-up group"
        onClick={() => onSuggestionClick(text)}
      >
        <span className="group-hover:hidden">{text}</span>
        <span className="hidden group-hover:inline flex items-center">
          <Zap className="w-4 h-4 mr-2 inline-block" />
          {text}
        </span>
      </button>
    ))}
  </div>
);

export default QuickActions;
