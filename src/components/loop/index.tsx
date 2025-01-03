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
            photo: "next.svg",
        },
        {
            quote: "A game-changer for tracking engagement across all platforms in one place.",
            name: "Steve Jobs",
            title: "Twitter",
            photo: "window.svg",
        },
        {
            quote: "The analytics are clear and actionable. It’s helped me improve my content strategy!",
            name: "Steve Jobs",
            title: "LinkedIn",
            photo: "/path/to/photo4.jpg",
        },
    ];

    const items2 = [
        {
            quote: "I now understand my audience better than ever. This platform is a must-have.",
            name: "Steve Jobs",
            title: "Instagram",
            photo: "/path/to/photo1.jpg",
        },
        {
            quote: "The real-time data has made decision-making so much easier and more effective.",
            name: "Winston Churchill",
            title: "WhatsApp",
            photo: "/path/to/photo2.jpg",
        },
        {
            quote: "Incredible insights that have helped boost my social media presence.",
            name: "Steve Jobs",
            title: "LinkedIn",
            photo: "/path/to/photo3.jpg",
        },
        {
            quote: "The dashboard is super user-friendly, and the reports are spot-on!",
            name: "Steve Jobs",
            title: "Facebook",
            photo: "/path/to/photo4.jpg",
        },
        {
            quote: "I’ve seen a significant increase in engagement since I started using this tool.",
            name: "Steve Jobs",
            title: "Pinterest",
            photo: "/path/to/photo4.jpg",
        },
    ];

    const items3 = [
        {
            quote: "The detailed metrics help me fine-tune my social media strategy for better results.",
            name: "Subham Kumar",
            title: "Telegram",
            photo: "/path/to/photo1.jpg",
        },
        {
            quote: "This platform is a lifesaver for anyone serious about growing their social media!",
            name: "Himant",
            title: "Discord",
            photo: "/path/to/photo2.jpg",
        },
        {
            quote: "The analytics are so thorough, I now feel confident in my social media decisions.",
            name: "Steve Jobs",
            title: "Snapchat",
            photo: "/path/to/photo3.jpg",
        },
        {
            quote: "This platform has taken my social media management to the next level",
            name: "Steve Jobs",
            title: "Twitter",
            photo: "/path/to/photo4.jpg",
        },
    ];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="text-center mb-5 w-full max-w-4xl px-4">
                <h2 className="text-3xl font-bold text-foreground">Customer Testimonials</h2>
                <p className="text-lg text-muted-foreground mt-2">
                    See what our users have to say about us
                </p>
            </div>

            <div className="w-full max-w-6xl px-4">
                <InfiniteMovingCards
                    items={items}
                    direction="left"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-4"
                />
            </div>

            <div className="w-full max-w-6xl px-4">
                <InfiniteMovingCards
                    items={items2}
                    direction="right"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-4"
                />
            </div>

            <div className="w-full max-w-6xl px-4">
                <InfiniteMovingCards
                    items={items3}
                    direction="left"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-4"
                />
            </div>
        </main>
    );
};

export default Loop;
