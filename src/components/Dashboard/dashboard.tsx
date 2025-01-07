"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Twitter,
  Github,
  Zap,
  Sparkles,
  X,
  Send,
  MessageCircle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import dynamic from "next/dynamic";
import { sampleArcs, globeConfig } from "./sample-arcs";
// import { GetResponse } from "@/actions/gemini";
import runLangflow from "@/actions/api";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const globeContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if scroll indicator should be shown
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

  // Enhanced globe animation
  useEffect(() => {
    const pulseAnimation = () => {
      setGlobeScale(1);
      setTimeout(() => setGlobeScale(1.02), 100);
      setTimeout(() => setGlobeScale(1), 500);
    };

    const interval = setInterval(pulseAnimation, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setIsAnimating(true);
    setIsExpanded(true);

    // Smooth globe transition
    setGlobeScale(1.1);
    setTimeout(() => setGlobeScale(0.95), 300);
    setTimeout(() => setGlobeScale(1), 600);

    const newMessage = {
      type: "user",
      content: inputValue,
      animate: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      const response = await runLangflow(inputValue);
      const formattedResponse = marked(response);
      const sanitizedResponse = DOMPurify.sanitize(formattedResponse);

      setMessages((prev) => [
        ...prev,
        {
          type: "agent",
          content: (
            <div className="markdown-response prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: sanitizedResponse }} />
            </div>
          ),
          animate: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          animate: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsAnimating(false);
      setShowGlobe(false);
    }
  };

  const handleReset = () => {
    setIsAnimating(true);
    setGlobeScale(1.1);

    setTimeout(() => {
      setIsExpanded(false);
      setInputValue("");
      setMessages([]);
      setShowGlobe(true);
      setIsAnimating(false);
      setGlobeScale(1);
    }, 300);
  };

  // Quick action suggestions based on conversation context
  const getContextualSuggestions = () => {
    if (messages.length === 0) return defaultSuggestions;
    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage.type === "agent" &&
      lastMessage.content.includes("engagement")
    ) {
      return engagementSuggestions;
    }
    return defaultSuggestions;
  };

  const defaultSuggestions = [
    "Track follower growth",
    "Analyze engagement rates",
    "Identify top-performing posts",
    "Optimize posting schedules",
    "Compare competitor metrics",
    "Generate campaign reports",
  ];

  const engagementSuggestions = [
    "Show engagement breakdown",
    "Compare with industry average",
    "Suggest improvement strategies",
    "Analyze best posting times",
    "Review hashtag performance",
    "Generate engagement report",
  ];

  return (
    <div className="relative mt-16 max-h-screen text-white overflow-hidden">
      {/* Enhanced Globe Container */}
      <div
        ref={globeContainerRef}
        className={`absolute flex justify-center items-center inset-0 z-0 transition-all duration-1000 ${
          showGlobe ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `scale(${globeScale})`,
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative h-full max-w-[800px] min-w-[800px] aspect-square">
          <div className="absolute inset-0">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>

      {/* Enhanced Backdrop */}
      <div
        className={`fixed inset-0 transition-all duration-500 ${
          isExpanded ? "bg-black/60 backdrop-blur-sm" : "bg-black/20"
        } z-10`}
      />

      {/* Main Content */}
      <div className="relative z-20">
        {/* Enhanced Introduction */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            isExpanded
              ? "opacity-0 -translate-y-20 pointer-events-none"
              : "opacity-100 translate-y-0 hover:scale-105"
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
            <h1 className="text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-blue-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Your Social Media Intelligence Hub
            </h1>
            <p className="text-gray-300 text-xl mb-12 hover:text-white transition-colors duration-300">
              Unlock powerful insights and optimize your social media strategy
            </p>
          </main>
        </div>

        {/* Enhanced Chat Interface */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isExpanded
              ? "fixed inset-0 flex flex-col p-4 md:p-6 max-w-3xl mx-auto"
              : "max-w-4xl mx-auto px-6"
          }`}
        >
          {/* Messages Area */}
          {isExpanded && (
            <>
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-600/50 scrollbar-track-transparent p-4"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
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

          {/* Enhanced Input Area */}
          <div className={`${isExpanded ? "mt-auto" : ""} relative`}>
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
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
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
                      <Sparkles className="w-6 h-6 group-hover:text-yellow-500 transition-all duration-300 transform group-hover:scale-110 animate-pulse" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions and Footer */}
        <div
          className={`transition-all duration-500 transform ${
            isExpanded
              ? "opacity-0 translate-y-10 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="max-w-4xl mx-auto px-6 mt-10">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {getContextualSuggestions().map((text, index) => (
                <button
                  key={text}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-gray-200
                    hover:text-white hover:bg-blue-900/50 transition-all duration-300
                    shadow-md hover:shadow-blue-500/20 transform hover:-translate-y-1
                    hover:scale-105 animate-fade-in-up group"
                  onClick={() => {
                    setInputValue(text);
                    handleSubmit();
                  }}
                >
                  <span className="group-hover:hidden">{text}</span>
                  <span className="hidden group-hover:inline flex items-center">
                    <Zap className="w-4 h-4 mr-2 inline-block" />
                    {text}
                  </span>
                </button>
              ))}
            </div>

            {/* Enhanced Social Media Links */}
            <div className="flex flex-col items-center space-y-8 mb-12">
              <h3 className="text-xl font-semibold text-gray-300">
                Connect Your Accounts
              </h3>
              <div className="flex justify-center space-x-8">
                {[
                  {
                    icon: <FaTwitter className="w-8 h-8" />,
                    color: "text-blue-400",
                    label: "Twitter",
                    gradient: "from-blue-400 to-blue-600",
                  },
                  {
                    icon: <FaGithub className="w-8 h-8" />,
                    color: "text-gray-400",
                    label: "GitHub",
                    gradient: "from-gray-400 to-gray-600",
                  },
                  {
                    icon: <FaLinkedin className="w-8 h-8" />,
                    color: "text-blue-600",
                    label: "LinkedIn",
                    gradient: "from-blue-500 to-blue-700",
                  },
                  {
                    icon: <FaFacebook className="w-8 h-8" />,
                    color: "text-blue-500",
                    label: "Facebook",
                    gradient: "from-blue-600 to-blue-800",
                  },
                  {
                    icon: <FaInstagram className="w-8 h-8" />,
                    color: "text-pink-500",
                    label: "Instagram",
                    gradient: "from-pink-500 to-purple-600",
                  },
                ].map((social, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <button
                      className={`${social.color} p-4 rounded-full bg-gray-800/50
                                            hover:bg-gradient-to-br ${social.gradient}
                                            transition-all duration-300 transform hover:scale-110
                                            hover:rotate-6 animate-bounce-in relative z-10`}
                    >
                      {social.icon}
                    </button>
                    <div
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                                          opacity-0 group-hover:opacity-100 transition-all duration-300
                                          text-sm whitespace-nowrap text-gray-400 group-hover:text-white"
                    >
                      {social.label}
                    </div>
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-transparent
                                          to-blue-500/20 rounded-full filter blur-xl opacity-0
                                          group-hover:opacity-100 transition-all duration-300 animate-pulse"
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  label: "Total Reach",
                  value: "2.5M+",
                  icon: <Zap className="w-6 h-6" />,
                  color: "blue",
                },
                {
                  label: "Engagement Rate",
                  value: "4.8%",
                  icon: <MessageCircle className="w-6 h-6" />,
                  color: "green",
                },
                {
                  label: "Growth Rate",
                  value: "+12.3%",
                  icon: <Sparkles className="w-6 h-6" />,
                  color: "purple",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6
                                        border border-${stat.color}-500/20 hover:border-${stat.color}-500/50
                                        transition-all duration-300 transform hover:scale-105
                                        hover:shadow-lg hover:shadow-${stat.color}-500/20`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-${stat.color}-500/20`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-400 py-8">
              <p className="text-sm">© 2024 TheAgent. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl flex items-center space-x-4">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
            <span className="text-white">Processing your request...</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Add these custom animations to your tailwind.config.js
