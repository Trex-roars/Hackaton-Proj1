// Header.jsx
import React from "react";
import { MessageCircle } from "lucide-react";

const Header = ({ isExpanded }) => (
  <div
    className={`transition-all duration-500 ease-out transform ${
      isExpanded
        ? "opacity-0 -translate-y-20 pointer-events-none"
        : "opacity-100 translate-y-0"
    }`}
  >
    <div className="flex justify-center mt-8">
      <div className="flex items-center space-x-4 p-4 bg-black/30 border border-gray-700 rounded-full shadow-lg hover:shadow-blue-500/20 hover:bg-black/40 transition-all duration-300 group">
        <MessageCircle className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
          Powered by{" "}
          <span className="text-yellow-500 font-semibold animate-pulse">
            TheAgent
          </span>
        </span>
      </div>
    </div>
    <main className="max-w-4xl mx-auto px-6 pt-16 text-center">
      <h1 className="text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent">
        Your Social Media Intelligence Hub
      </h1>
      <p className="text-gray-300 text-xl mb-12 hover:text-white transition-colors duration-300">
        Unlock powerful insights and optimize your social media strategy
      </p>
    </main>
  </div>
);

export default Header;
