"use client";
import React, { useState } from 'react';
import { HoverEffect } from "../ui/card-hover-effect";
import { FaUsers, FaCalendarAlt, FaHashtag, FaRobot, FaChartBar, FaGlobe } from 'react-icons/fa';
import { motion } from "framer-motion";

export function Features() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.5
            }
        }
    };

    const letterAnimation = {
        hidden: { y: 20, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-8xl mx-auto px-8 py-24 relative"
        >
            <motion.div
                className="text-center mb-20 relative z-10"
                variants={item}
            >
                <motion.div
                    className="inline-block mb-4 relative"
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-sm font-light text-zinc-400 tracking-[0.3em] uppercase relative z-10">
                        Discover What's Possible
                    </span>
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-lg"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                </motion.div>

                <motion.div
                    variants={letterContainer}
                    className="relative mb-8"
                >
                    <h2 className="text-7xl font-bold relative inline-block">
                        {"Platform Features".split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                variants={letterAnimation}
                                whileHover={{
                                    y: -8,
                                    scale: 1.1,
                                    color: index % 2 ? '#ec4899' : '#a855f7',
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }
                                }}
                                className="inline-block transition-all duration-200 text-white cursor-pointer"
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </h2>
                    <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent w-full mt-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    />
                </motion.div>

                <motion.p
                    variants={item}
                    className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                >
                    Transform your digital presence with our cutting-edge tools and intelligent features,
                    designed to elevate your content strategy and maximize engagement.
                </motion.p>
            </motion.div>

            <motion.div
                variants={item}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="grid gap-8"
            >
                <HoverEffect
                    items={projects.map((project, index) => ({
                        ...project,
                        onMouseEnter: () => setHoveredIndex(index),
                        onMouseLeave: () => setHoveredIndex(null),
                        className: `transform transition-all duration-300 ${hoveredIndex === index ? 'scale-105' : ''
                            }`
                    }))}
                />
            </motion.div>
        </motion.div>
    );
}

export const projects = [
    {
        title: "Smart Content Scheduling",
        description:
            "Leverage AI-powered timing optimization to automatically schedule content when your audience is most active and engaged.",
        icon: <FaCalendarAlt className="text-3xl text-zinc-300 group-hover:text-pink-500 transition-all duration-300 transform group-hover:rotate-12" />,
    },
    {
        title: "Advanced Competitor Insights",
        description:
            "Stay ahead with real-time competitive analysis, tracking performance metrics and content strategies across your industry.",
        icon: <FaUsers className="text-3xl text-zinc-300 group-hover:text-purple-500 transition-all duration-300 transform group-hover:rotate-12" />,
    },
    {
        title: "Dynamic Hashtag Analytics",
        description:
            "Optimize your reach with real-time hashtag performance tracking and AI-powered recommendations for trending tags.",
        icon: <FaHashtag className="text-3xl text-zinc-300 group-hover:text-pink-500 transition-all duration-300 transform group-hover:-rotate-12" />,
    },
    {
        title: "AI Content Enhancement",
        description:
            "Create engaging content with GPT-powered suggestions for captions, headlines, and engagement hooks that resonate.",
        icon: <FaRobot className="text-3xl text-zinc-300 group-hover:text-purple-500 transition-all duration-300 transform group-hover:-rotate-12" />,
    },
    {
        title: "Comprehensive Analytics",
        description:
            "Make data-driven decisions with interactive dashboards featuring real-time metrics and predictive insights.",
        icon: <FaChartBar className="text-3xl text-zinc-300 group-hover:text-pink-500 transition-all duration-300 transform group-hover:rotate-12" />,
    },
    {
        title: "Global Audience Insights",
        description:
            "Understand your worldwide impact with detailed demographic analysis and regional engagement patterns.",
        icon: <FaGlobe className="text-3xl text-zinc-300 group-hover:text-purple-500 transition-all duration-300 transform group-hover:-rotate-12" />,
    },
];
