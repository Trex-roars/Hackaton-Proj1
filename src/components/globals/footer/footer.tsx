"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FooterSection } from "./footer-section";
import { SocialLinks } from "./social-links";

const sections = {
    quickLinks: [
        { label: "Features", href: "/features" },
        { label: "Team", href: "/team" },
        { label: "Get Started", href: "/get-started" },
    ],
    contact: [
        { label: "Email: trex@gmail.com", href: "mailto:trex@gmail.com" },
        { label: "Location: LPU, Punjab", href: "#" },
    ],
    legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" },
        { label: "Cookies", href: "/cookies" },
    ],
};

export function Footer() {
    return (
        <footer className="border-t bg-muted/40 px-8">
            <div className="container py-8">
                <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex items-center space-x-3 p-3 rounded-lg"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <Image unoptimized src="/t-rex.gif" width={50} height={50} alt="T-Rex Logo" />
                            </motion.div>
                            <div className="flex flex-col">
                                <motion.h1
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-3xl font-extrabold"
                                >
                                    The
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                                        style={{
                                            textShadow: "0 0 8px rgba(255, 0, 150, 0.8), 0 0 15px rgba(255, 0, 150, 0.6)",
                                            
                                        }}
                                    >
                                        AGENT
                                    </span>
                                </motion.h1>
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                    className="text-sm text-pink-300"
                                >
                                    Product by T-Rex
                                </motion.span>
                            </div>
                        </motion.div>
                        <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                            Boost engagement, track trends, and grow smarter with powerful AI insights!
                        </p>
                        <div className="mt-4">
                            <SocialLinks />
                        </div>
                    </div>

                    <FooterSection title="Quick Links" links={sections.quickLinks} delay={0.1} />
                    <FooterSection title="Contact" links={sections.contact} delay={0.2} />

                    <div className="mt-6 lg:mt-0">
                        <h3 className="text-lg font-bold">Stay Updated</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <form className="mt-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-slate-200 text-gray-700 p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="mt-2 w-full p-2 text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                Subscribe
                            </button>

                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t pt-6">
                    <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-y-0">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {sections.legal.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-pink-500"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} TheAGENT. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
