"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";

const Loop = () => {
    const items = [
        {
            quote: "I love how quickly I can get detailed insights into my social media performance.",
            name: "Archi",
            title: "Instagram",
            photo: "globe.svg",
        },
        {
            quote: "This tool has completely transformed the way I analyze my social media. So easy to use!",
            name: "Rohit",
            title: "Facebook",
            photo: "next.svg", // Add your photo path
        },
        {
            quote: "A game-changer for tracking engagement across all platforms in one place.",
            name: "Steve Jobs",
            title: "Twitter",
            photo: "window.svg", // Add your photo path
        },
        {
            quote: "The analytics are clear and actionable. It’s helped me improve my content strategy!",
            name: "Steve Jobs",
            title: "LinkedIn",
            photo: "/path/to/photo4.jpg", // Add your photo path
        },
    ];
    const items2 = [
        {
            quote: "I now understand my audience better than ever. This platform is a must-have.",
            name: "Steve Jobs",
            title: "Instagram",
            photo: "/path/to/photo1.jpg", // Add your photo path
        },
        {
            quote: "The real-time data has made decision-making so much easier and more effective.",
            name: "Winston Churchill",
            title: "WhatsApp",
            photo: "/path/to/photo2.jpg", // Add your photo path
        },
        {
            quote: "Incredible insights that have helped boost my social media presence.",
            name: "Steve Jobs",
            title: "LinkedIn",
            photo: "/path/to/photo3.jpg", // Add your photo path
        },
        {
            quote: "The dashboard is super user-friendly, and the reports are spot-on!",
            name: "Steve Jobs",
            title: "Facebook",
            photo: "/path/to/photo4.jpg", // Add your photo path
        },
        {
            quote: "I’ve seen a significant increase in engagement since I started using this tool.",
            name: "Steve Jobs",
            title: "Pinterest",
            photo: "/path/to/photo4.jpg", // Add your photo path
        },
    ];
    const items3 = [
        {
            quote: "The detailed metrics help me fine-tune my social media strategy for better results.",
            name: "Subham Kumar",
            title: "Telegram",
            photo: "/path/to/photo1.jpg", // Add your photo path
        },
        {
            quote: "This platform is a lifesaver for anyone serious about growing their social media!",
            name: "Himant",
            title: "Discord",
            photo: "/path/to/photo2.jpg", // Add your photo path
        },
        {
            quote: "The analytics are so thorough, I now feel confident in my social media decisions.",
            name: "Steve Jobs",
            title: "Snapchat",
            photo: "/path/to/photo3.jpg", // Add your photo path
        },
        {
            quote: "This platform has taken my social media management to the next level",
            name: "Steve Jobs",
            title: "Twitter",
            photo: "/path/to/photo4.jpg", // Add your photo path
        },
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center mb-5">
                <h2 className="text-3xl font-bold text-white">Customer Testimonials</h2>
                <p className="text-lg text-gray-400 mt-2">See what our users have to say about us</p>
            </div>

            <div className="w-full bg-gray-900">
                <InfiniteMovingCards
                    items={items}
                    direction="left"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-1"
                />
            </div>

            <div className="w-full bg-gray-900">
                <InfiniteMovingCards
                    items={items2}
                    direction="right"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-1"
                />
            </div>
            <div className="w-full bg-gray-900">
                <InfiniteMovingCards
                    items={items3}
                    direction="left"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-1"
                />
            </div>
        </main>
    );
};

export default Loop;
