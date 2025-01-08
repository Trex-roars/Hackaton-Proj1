"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { marked } from "marked";
import DOMPurify from "dompurify";
import Layout from "./Layout";
import Header from "./Header";
import ChatContainer from "./ChatContainer";
import QuickActions from "./QuickActions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GetResponse } from "@/actions/gemini";
import { Button } from "../ui/button";
import CampaignForm from "./CampaignForm";

const Globe = dynamic(() => import("../ui/globe"), {
  ssr: false,
});

// Define types for messages - keep only one definition
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface UIMessage {
  type: "user" | "agent" | "error";
  content: string | JSX.Element;
  animate?: boolean;
  timestamp: string;
}

export default function DashboardWithGlobe() {
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
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

    const userMessage: ChatMessage = {
      role: "user",
      content: inputValue,
    };

    const userUIMessage: UIMessage = {
      type: "user",
      content: inputValue,
      animate: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessages((prev) => [...prev, userUIMessage]);
    setInputValue("");

    try {
      const recentHistory = chatHistory.slice(-2);
      const response = await GetResponse(inputValue, recentHistory);
      const formattedResponse = marked(response);
      const sanitizedResponse = DOMPurify.sanitize(formattedResponse);

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };

      const aiUIMessage: UIMessage = {
        type: "agent",
        content: (
          <div className="markdown-response prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizedResponse }} />
          </div>
        ),
        animate: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory((prev) => [...prev, aiMessage]);
      setMessages((prev) => [...prev, aiUIMessage]);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      const errorMessage: UIMessage = {
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
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setShowGlobe(false);
    }
  };

  const handleCampaignSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    setIsExpanded(true);

    const prompt = `Create a campaign analysis for:
Platform: ${formData.platform}
Campaign Details:
${Object.entries(formData)
  .filter(([key]) => key !== "platform")
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}`;

    const userMessage: ChatMessage = {
      role: "user",
      content: prompt,
    };

    const userUIMessage: UIMessage = {
      type: "user",
      content: prompt,
      animate: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessages((prev) => [...prev, userUIMessage]);
    setShowGlobe(false);

    try {
      const recentHistory = chatHistory.slice(-2);
      const response = await GetResponse(prompt, recentHistory);
      const formattedResponse = marked(response);
      const sanitizedResponse = DOMPurify.sanitize(formattedResponse);

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: response,
      };

      const aiUIMessage: UIMessage = {
        type: "agent",
        content: (
          <div className="markdown-response prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizedResponse }} />
          </div>
        ),
        animate: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setChatHistory((prev) => [...prev, aiMessage]);
      setMessages((prev) => [...prev, aiUIMessage]);
    } catch (error) {
      console.error("Error in handleCampaignSubmit:", error);
      const errorMessage: UIMessage = {
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
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsExpanded(false);
    setInputValue("");
    setMessages([]);
    setChatHistory([]);
    setShowGlobe(true);
  };

  return (
    <Layout>
      {showGlobe && (
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="relative w-[800px] h-[800px]">
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
        <>
          <CampaignForm onSubmit={handleCampaignSubmit} />
          <QuickActions
            suggestions={defaultSuggestions}
            onSuggestionClick={(text) => {
              setInputValue(text);
              handleSubmit();
            }}
          />
        </>
      )}
    </Layout>
  );
}
