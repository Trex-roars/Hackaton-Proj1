"use client";
import React from "react";
import { Twitter, Github, Zap, Sparkles } from "lucide-react";
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

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

function DashboardWithGlobe() {
  // Globe configuration from the original component
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

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  // Sample arcs data from the original globe component
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    // Add more arcs as needed from the original data
  ];

  return (
    <div className="relative min-h-screen text-white">
      {/* Globe Background */}
      <div className="fixed inset-0 z-0">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/50 z-10" />

      {/* Dashboard Content */}
      <div className="relative z-20">
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

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 pt-16 text-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight animate-pulse">
            What insights are you looking for?
          </h1>
          <p className="text-gray-300 text-lg mb-12">
            Analyze, strategize, and optimize your social media presence with
            ease.
          </p>

          {/* Input Box */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 mb-12 shadow-md">
            <div className="min-h-[100px] flex items-center justify-between">
              <input
                type="text"
                placeholder="Ask TheAgent your social media questions..."
                className="w-full bg-transparent outline-none text-lg placeholder-gray-500 text-white"
              />
              <div className="flex space-x-3 text-gray-400">
                <Sparkles className="w-5 h-5 hover:text-yellow-500 transition-all duration-200" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
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
              >
                {text}
              </button>
            ))}
          </div>

          <p className="text-gray-400 mb-8">
            or start exploring with a custom query
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            {[
              {
                icon: <FaTwitter className="w-10 h-10 text-blue-500" />,
                link: "https://twitter.com",
              },
              {
                icon: <FaGithub className="w-10 h-10 text-gray-400" />,
                link: "https://github.com",
              },
              {
                icon: <FaLinkedin className="w-10 h-10 text-blue-600" />,
                link: "https://linkedin.com",
              },
              {
                icon: <FaFacebook className="w-10 h-10 text-blue-700" />,
                link: "https://facebook.com",
              },
              {
                icon: <FaInstagram className="w-10 h-10 text-pink-500" />,
                link: "https://instagram.com",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="text-gray-400 hover:text-white transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex justify-center space-x-8">
            {[
              {
                icon: <FaYoutube className="w-10 h-10 text-red-500" />,
                link: "https://youtube.com",
              },
              {
                icon: <FaTiktok className="w-10 h-10 text-white" />,
                link: "https://tiktok.com",
              },
              {
                icon: <FaSnapchat className="w-10 h-10 text-yellow-400" />,
                link: "https://snapchat.com",
              },
              {
                icon: <FaReddit className="w-10 h-10 text-orange-500" />,
                link: "https://reddit.com",
              },
              {
                icon: <FaPinterest className="w-10 h-10 text-red-600" />,
                link: "https://pinterest.com",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="text-gray-400 hover:text-white transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </main>

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
  );
}

export default DashboardWithGlobe;
