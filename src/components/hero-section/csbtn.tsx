"use client";
import { useRouter } from "next/navigation";

export const Btn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/dashboard")}
      className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300"
    >
      <span className="relative z-10">Explore Now</span>
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  );
};

export const Btn2 = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.p("https://youtu.be/64n_zymZshw")}
      className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white/90 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-sm"
    >
      <span className="relative z-10">Watch Demo</span>
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};
