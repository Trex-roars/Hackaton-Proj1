"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    const handleThemeToggle = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleThemeToggle}
            className={`relative flex justify-center items-center rounded-full p-2 overflow-hidden transition-all transform
                hover:scale-110 hover:rotate-6
                focus:outline-none
                ${theme === 'light' ? 'focus:ring-[var(--primary)] dark:focus:ring-[var(--primary)]' : 'focus:ring-[var(--secondary)] dark:focus:ring-[var(--secondary)]'}
                ${theme === 'light' ? 'border-[var(--primary)] dark:border-[var(--primary)]' : 'border-[var(--secondary)] dark:border-[var(--secondary)]'}
            `}
        >
            {/* Sun Icon */}
            <Sun
                className={`absolute h-[1.4rem] w-[1.4rem] transition-all duration-500 ease-in-out transform ${theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                    }`}
            />
            {/* Moon Icon */}
            <Moon
                className={`absolute h-[1.4rem] w-[1.4rem] transition-all duration-500 ease-in-out transform ${theme === "light" ? "rotate-0 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                    }`}
            />
            <span className="sr-only">Toggle theme</span>

            {/* Circular animation background */}
            <span className={`absolute inset-0 bg-[var(--primary)] dark:bg-[var(--secondary)] rounded-full opacity-0 scale-0 transition-all duration-500 ease-in-out
                ${theme === 'light' ? 'animate-expand-light' : 'animate-expand-dark'}`}
            />
        </Button>
    )
}
