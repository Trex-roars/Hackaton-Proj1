"use client";

// DashboardWithGlobe.jsx
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Layout from "./Layout";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import QuickActions from "./QuickActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
// import Globe from "../ui/globe";
// import runLangflow from "@/actions/api";
import { GetResponse } from "@/actions/gemini";

const Globe = dynamic(() => import("../ui/globe"), {
  ssr: false,
});

export default function DashboardWithGlobe() {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showGlobe, setShowGlobe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const defaultSuggestions = [
    "Track follower growth",
    "Analyze engagement rates",
    "Identify top-performing posts",
    "Optimize posting schedules",
    "Compare competitor metrics",
    "Generate campaign reports",
  ];

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setIsExpanded(true);

    const newMessage = {
      type: "user",
      content: inputValue,
      animate: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    try {
      const response = await GetResponse(inputValue);
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
          content: (
            <Alert variant="destructive">
              <AlertDescription>
                Sorry, something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          ),
          animate: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setShowGlobe(false);
    }
  };

  const handleReset = () => {
    setIsExpanded(false);
    setInputValue("");
    setMessages([]);
    setShowGlobe(true);
  };

  return (
    <Layout>
      {showGlobe && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative  w-[800px] h-[800px]">
            <Globe width={800} height={800} />
          </div>
        </div>
      )}

      <Header isExpanded={isExpanded} />

      <ChatContainer
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isLoading={isLoading}
        isExpanded={isExpanded}
      />

      {!isExpanded && (
        <QuickActions
          suggestions={defaultSuggestions}
          onSuggestionClick={(text) => {
            setInputValue(text);
            handleSubmit();
          }}
        />
      )}
    </Layout>
  );
}
