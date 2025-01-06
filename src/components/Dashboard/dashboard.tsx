"use client";

import React, { useState, useRef, useEffect } from "react";
import { Twitter, Github, Zap, Sparkles, X, Send } from "lucide-react";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaReddit,
  FaPinterest,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import { sampleArcs } from "./sample-arcs";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

function DashboardWithGlobe() {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showGlobe, setShowGlobe] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    setIsExpanded(true);
    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: inputValue }]);

    // Simulate API response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "agent",
          content: `Analysis for "${inputValue}": Here's what I found about your social media query. This is a simulated response that would come from your API with relevant insights and recommendations.`,
        },
      ]);
    }, 1000);

    setInputValue("");
    // Fade out globe after a delay
    setTimeout(() => setShowGlobe(false), 500);
  };

  const handleReset = () => {
    setIsExpanded(false);
    setInputValue("");
    setMessages([]);
    setShowGlobe(true);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Globe Background */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${
          showGlobe ? "opacity-100" : "opacity-0"
        }`}
      >
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/40 z-10" />

      {/* Dashboard Content */}
      <div className="relative z-20">
        {/* Main Content with Fade Transitions */}
        <div
          className={`transition-all duration-500 ${
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Introduction Section */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4 p-4 bg-black/30 border border-gray-700 rounded-full shadow-lg">
              <Twitter className="w-5 h-5 text-blue-400 hover:text-white transition-all duration-200" />
              <span className="text-sm text-gray-300">
                Introducing{" "}
                <span className="text-yellow-500 font-semibold">TheAgent</span>:
                Your AI-Powered Social Media Assistant
              </span>
            </div>
          </div>

          {/* Title and Description */}
          <main className="max-w-4xl mx-auto px-6 pt-16 text-center">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight animate-pulse">
              What insights are you looking for?
            </h1>
            <p className="text-gray-300 text-lg mb-12">
              Analyze, strategize, and optimize your social media presence with
              ease.
            </p>
          </main>
        </div>

        {/* Chat Interface */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isExpanded
              ? "fixed top-0 left-0 right-0 bottom-0 flex flex-col p-6"
              : "max-w-4xl mx-auto px-6"
          }`}
        >
          {/* Messages Area */}
          {isExpanded && (
            <div className="flex-1 overflow-y-auto mb-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600/60 backdrop-blur-sm ml-4"
                        : "bg-gray-800/60 backdrop-blur-sm mr-4"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className={`${isExpanded ? "mt-auto" : ""}`}>
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask TheAgent your social media questions..."
                  className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500 text-white"
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
                <div className="flex items-center space-x-3 text-gray-400">
                  {isExpanded ? (
                    <>
                      <Send
                        className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-all duration-200"
                        onClick={handleSubmit}
                      />
                      <X
                        className="w-5 h-5 hover:text-red-500 cursor-pointer transition-all duration-200"
                        onClick={handleReset}
                      />
                    </>
                  ) : (
                    <Sparkles
                      className="w-5 h-5 hover:text-yellow-500 cursor-pointer transition-all duration-200"
                      onClick={handleSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Footer with Fade Transition */}
        <div
          className={`transition-all duration-500 ${
            isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Quick Actions */}
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "Track follower growth",
                "Analyze engagement rates",
                "Identify top-performing posts",
                "Optimize posting schedules",
                "Compare competitor metrics",
                "Generate campaign reports",
              ].map((text) => (
                <button
                  key={text}
                  className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-gray-200 hover:text-white hover:bg-black/70 transition-all duration-200 shadow-md"
                  onClick={() => {
                    setInputValue(text);
                    handleSubmit();
                  }}
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-8 mb-12">
              {[
                { icon: <FaTwitter className="w-10 h-10 text-blue-500" /> },
                { icon: <FaGithub className="w-10 h-10 text-gray-400" /> },
                { icon: <FaLinkedin className="w-10 h-10 text-blue-600" /> },
                { icon: <FaFacebook className="w-10 h-10 text-blue-700" /> },
                { icon: <FaInstagram className="w-10 h-10 text-pink-500" /> },
              ].map((social, index) => (
                <div
                  key={index}
                  className="text-gray-400 hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-7 p-6 flex justify-between items-center text-gray-400 border-t border-gray-800 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <Twitter className="w-5 h-5 hover:text-blue-400 transition-all duration-200" />
              <Github className="w-5 h-5 hover:text-gray-200 transition-all duration-200" />
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-white">
                Help Center
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <span>•</span>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <span>•</span>
              <span className="flex items-center">TheAGENT</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DashboardWithGlobe;
