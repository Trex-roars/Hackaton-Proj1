"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";
import { Boxes } from "../ui/background-boxes";

const Loop = () => {
    const items = [
        {
            quote: "I love how quickly I can get detailed insights into my social media performance.",
            name: "Abhijeet Kumar",
            title: "Instagram",
            photo: "/loop/abhi.jpeg",
        },
        {
            quote: "This tool has completely transformed the way I analyze my social media. So easy to use!",
            name: "Rohit",
            title: "Facebook",
            photo: "/loop/rohit.jpeg",
        },
        {
            quote: "A game-changer for tracking engagement across all platforms in one place.",
            name: "Manisha Chaudhary",
            title: "Twitter",
            photo: "/loop/manisha.jpeg",
        },
        {
            quote: "The analytics are clear and actionable. It’s helped me improve my content strategy!",
            name: "Somesh Biswal",
            title: "LinkedIn",
            photo: "/loop/sanu.jpeg",
        },
    ];

    const items2 = [
        {
            quote: "I now understand my audience better than ever. This platform is a must-have.",
            name: "Nisita Subramani",
            title: "Instagram",
            photo: "/loop/nishita.jpeg",
        },
        {
            quote: "The real-time data has made decision-making so much easier and more effective.",
            name: "Punit Kumar",
            title: "WhatsApp",
            photo: "/loop/punit.jpeg",
        },
        {
            quote: "Incredible insights that have helped boost my social media presence.",
            name: "Himant Yadav",
            title: "LinkedIn",
            photo: "/loop/himant.jpeg",
        },
        {
            quote: "The dashboard is super user-friendly, and the reports are spot-on!",
            name: "Kushagra Chaudhary",
            title: "Facebook",
            photo: "/loop/kushagra.jpeg",
        },
        {
            quote: "I’ve seen a significant increase in engagement since I started using this tool.",
            name: "Nainsi Sharma",
            title: "Pinterest",
            photo: "/loop/nainsi.jpeg",
        },
    ];

    const items3 = [
        {
            quote: "The detailed metrics help me fine-tune my social media strategy for better results.",
            name: "Subham Kumar",
            title: "Telegram",
            photo: "/loop/subham.jpeg",
        },
        {
            quote: "This platform is a lifesaver for anyone serious about growing their social media!",
            name: "Himant Yadav",
            title: "Discord",
            photo: "/loop/himant.jpeg",
        },
        {
            quote: "The analytics are so thorough, I now feel confident in my social media decisions.",
            name: "Sriti Sareen",
            title: "Snapchat",
            photo: "/loop/sriti.jpeg",
        },
        {
            quote: "This platform has taken my social media management to the next level.",
            name: "Radha Raman",
            title: "Twitter",
            photo: "/loop/radha.jpeg",
        },
    ];

    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
            <Boxes className="absolute inset-0 z-0" />

            <div className="relative z-10 text-center mb-5 w-full max-w-4xl px-4">
                <h2 className="text-3xl font-bold text-foreground">Customer Testimonials</h2>
                <p className="text-lg text-muted-foreground mt-2">
                    See what our users have to say about us
                </p>
            </div>

            <div className="relative z-10 w-full max-w-6xl px-4">
                <InfiniteMovingCards
                    items={items}
                    direction="left"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-4"
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-4">
                <InfiniteMovingCards
                    items={items2}
                    direction="right"
                    speed="normal"
                    pauseOnHover={true}
                    className="mt-4"
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-4">
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
