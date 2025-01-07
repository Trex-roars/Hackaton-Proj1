"use client";

import React, { useState, useRef, useEffect } from "react";
import { Twitter, Github, Zap, Sparkles, X, Send } from "lucide-react";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import { sampleArcs, globeConfig } from "./sample-arcs";
import { GetResponse } from "@/actions/gemini";
import marked from "marked";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function DashboardWithGlobe() {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showGlobe, setShowGlobe] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [globeScale, setGlobeScale] = useState(1);
  const messagesEndRef = useRef(null);
  const globeContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Modified globe animation with more subtle scaling
  useEffect(() => {
    setGlobeScale(1);
    const interval = setInterval(() => {
      setGlobeScale((scale) => (scale === 1 ? 1.02 : 1)); // Reduced scale factor
    }, 4000); // Increased interval
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setIsAnimating(true);
    setIsExpanded(true);

    // Modified globe transition
    setGlobeScale(1.05); // Reduced scale
    setTimeout(() => setGlobeScale(0.9), 300);

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        content: inputValue,
        animate: true,
      },
    ]);

    setTimeout(async () => {
      try {
        // Send input to GetResponse(input) and wait for the response
        const response = await GetResponse(inputValue);

        // Parse the Markdown response to HTML
        const formattedResponse = marked(response);

        setMessages((prev) => [
          ...prev,
          {
            type: "agent",
            content: (
              <div
                className="markdown-response"
                dangerouslySetInnerHTML={{ __html: formattedResponse }}
              />
            ),
            animate: true,
            typing: true,
          },
        ]);
      } catch (error) {
        console.error("Error getting response:", error);
        setMessages((prev) => [
          ...prev,
          {
            type: "agent",
            content: "Sorry, something went wrong. Please try again later.",
            animate: true,
            typing: true,
          },
        ]);
      }
    }, 1000);

    setInputValue("");
    setTimeout(() => {
      setShowGlobe(false);
      setIsAnimating(false);
    }, 800);
  };
  const handleReset = () => {
    setIsAnimating(true);
    setGlobeScale(1);
    setTimeout(() => {
      setIsExpanded(false);
      setInputValue("");
      setMessages([]);
      setShowGlobe(true);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative mt-16 max-h-screen text-white overflow-hidden">
      {/* Modified Globe Container */}
      <div
        ref={globeContainerRef}
        className={`absolute flex justify-center items-center inset-0 z-0 transition-all duration-1000 ${
          showGlobe ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `scale(${globeScale})`,
          transition: "transform 0.8s ease-out",
        }}
      >
        <div className="h-full max-w-[800px] min-w-[800px] aspect-square relative">
          <div
            className="absolute inset-0"
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${globeScale})`,
              transition: "transform 0.8s ease-out",
            }}
          >
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0  transition-all duration-500 ${
          isExpanded ? "bg-black/40" : "bg-black/20"
        } z-10`}
      />

      {/* Main Content */}
      <div className="relative z-20">
        {/* Enhanced Introduction Section */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            isExpanded
              ? "opacity-0 -translate-y-20 pointer-events-none"
              : "opacity-100 translate-y-0 hover:scale-105"
          }`}
        >
          {/* Animated Header Badge */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4 p-4 bg-black/30 border border-gray-700 rounded-full shadow-lg hover:shadow-blue-500/20 hover:bg-black/40 transition-all duration-300 group">
              <Twitter className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                Introducing{" "}
                <span className="text-yellow-500 font-semibold animate-pulse">
                  TheAgent
                </span>
              </span>
            </div>
          </div>

          {/* Enhanced Title Section */}
          <main className="max-w-4xl mx-auto px-6 pt-16 text-center">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              What insights are you looking for?
            </h1>
            <p className="text-gray-300 text-lg mb-12 hover:text-white transition-colors duration-300">
              Analyze, strategize, and optimize your social media presence with
              ease.
            </p>
          </main>
        </div>

        {/* Enhanced Chat Interface */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isExpanded
              ? "fixed inset-0 flex flex-col p-4 md:p-6 max-w-2xl mx-auto"
              : "max-w-4xl mx-auto px-6"
          }`}
        >
          {/* Messages Area with improved animations */}
          {isExpanded && (
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg transform transition-all duration-500 ${
                      message.animate ? "animate-message-slide-in" : ""
                    } ${
                      message.type === "user"
                        ? "bg-blue-600/60 backdrop-blur-sm ml-4 hover:bg-blue-500/60"
                        : "bg-gray-800/60 backdrop-blur-sm mr-4 hover:bg-gray-700/60"
                    } ${
                      message.typing ? "animate-typing" : ""
                    } hover:scale-102 hover:shadow-lg transition-all duration-300`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Enhanced Input Area */}
          <div className={`${isExpanded ? "mt-auto" : ""}`}>
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask TheAgent your social media questions..."
                  className="flex-1 bg-transparent outline-none text-lg placeholder-gray-500 text-white focus:placeholder-blue-400 transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
                <div className="flex items-center space-x-3 text-gray-400">
                  {isExpanded ? (
                    <>
                      <Send
                        className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                        onClick={handleSubmit}
                      />
                      <X
                        className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                        onClick={handleReset}
                      />
                    </>
                  ) : (
                    <Sparkles
                      className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition-all duration-300 transform hover:scale-110 animate-pulse"
                      onClick={handleSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Footer with enhanced animations */}
        <div
          className={`transition-all duration-500 transform ${
            isExpanded
              ? "opacity-0 translate-y-10 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          {/* Enhanced Quick Actions */}
          <div className="max-w-4xl mx-auto px-6 mt-10">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                "Track follower growth",
                "Analyze engagement rates",
                "Identify top-performing posts",
                "Optimize posting schedules",
                "Compare competitor metrics",
                "Generate campaign reports",
              ].map((text, index) => (
                <button
                  key={text}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-gray-200
                    hover:text-white hover:bg-blue-900/50 transition-all duration-300
                    shadow-md hover:shadow-blue-500/20 transform hover:-translate-y-1
                    hover:scale-105 animate-fade-in-up"
                  onClick={() => {
                    setInputValue(text);
                    handleSubmit();
                  }}
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Enhanced Social Media Icons */}
            <div className="flex justify-center space-x-8">
              {[
                {
                  icon: <FaTwitter className="w-10 h-10" />,
                  color: "text-blue-500",
                },
                {
                  icon: <FaGithub className="w-10 h-10" />,
                  color: "text-gray-400",
                },
                {
                  icon: <FaLinkedin className="w-10 h-10" />,
                  color: "text-blue-600",
                },
                {
                  icon: <FaFacebook className="w-10 h-10" />,
                  color: "text-blue-700",
                },
                {
                  icon: <FaInstagram className="w-10 h-10" />,
                  color: "text-pink-500",
                },
              ].map((social, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`${social.color} hover:text-white transition-all duration-300
                    transform hover:scale-125 hover:rotate-6 animate-bounce-in cursor-pointer`}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Footer */}
        </div>
      </div>
    </div>
  );
}

// Add these custom animations to your global CSS or tailwind.config.js
