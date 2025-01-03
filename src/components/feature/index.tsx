"use client";
import { HoverEffect } from "../ui/card-hover-effect";
import { FaUsers } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaHashtag } from 'react-icons/fa';
import { FaRobot } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";


export function Features() {
    return (
        <div className="max-w-8xl mx-auto px-8">
            <div className="text-center mb-12">
                <h2 className="text-6xl font-bold text-white">
                    {"Platform".split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            whileHover={{
                                y: -5,
                                transition: { type: "spring", stiffness: 300 },
                            }}
                            className="inline-block transition-all duration-100 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-pink-500"
                        >
                            {letter}
                        </motion.span>
                    ))}
                    <span className="inline-block mx-1"></span>
                    {"Features".split("").map((letter, index) => (
                        <motion.span
                            key={index + "testimonial"}
                            whileHover={{
                                y: -5,
                                transition: { type: "spring", stiffness: 300 },
                            }}
                            className="inline-block transition-all duration-100 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-pink-500"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </h2>
                <p className="text-lg text-zinc-400 mt-4">
                    Explore the innovative features that help you streamline your processes, enhance user experience, and drive growth.
                </p>
            </div>

            <HoverEffect items={projects} />
        </div>
    );
}

export const projects = [
    {
        title: "Content Scheduling Optimization",
        description:
            "Maximize your content's reach by scheduling posts at the most effective times.",
        icon: <FaCalendarAlt />,
    },
    {
        title: "Competitor Analysis",
        description:
            "Keep an eye on competitors' social media strategies and performance.",
        icon: <FaUsers />,
    },
    {
        title: "Hashtag Performance",
        description:
            "Track the effectiveness of hashtags in your posts to boost visibility.",
        icon: <FaHashtag />,
    },
    {
        title: "GPT-powered Insights",
        description:
            "Use AI to optimize content, posting times, and boost engagement.",
        icon: <FaRobot />,
    },
    {
        title: "Real-time Analytics",
        description:
            "Track social media performance instantly with comprehensive analytics and insights.",
        icon: <FaChartBar />,
    },
    {
        title: "Global Reach Analysis",
        description:
            "Analyze audience demographics and platform reach across various regions.",
        icon: <FaGlobe />,
    },
];
