import Spline from "@splinetool/react-spline/next";
import { Btn, Btn2 } from "./csbtn";

const HomeSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-900">
      {/* Enhanced Gradient Overlays - adjusted for better mobile visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10" />

      {/* Content Container - improved padding for different screens */}
      <div className="absolute inset-0 z-20">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
            {/* Enhanced Decorative Element - adjusted size for mobile */}
            <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-6 sm:mb-8 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)]" />

            {/* Enhanced Main Heading - improved responsive sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  The
                </span>
              </span>
              <br />
              <span className="inline-block mt-1 sm:mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  AGENT
                </span>
              </span>
            </h1>

            {/* Enhanced Subheading - adjusted for better readability on mobile */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 font-light leading-relaxed max-w-xl">
              Decode Your Audience Predict the
              <span className="font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Viral
              </span>
              <br></br>
              Master
              <span className="font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Engagement{" "}
              </span>
              powered by Gen AI
            </p>

            {/* Enhanced Interactive Buttons - improved mobile layout */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Btn />

              <Btn2 />
            </div>

            {/* Enhanced Feature Tags - improved mobile wrapping */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-12">
              {["AI Powered", "Real-time", "Secure"].map((tag, index) => (
                <div
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm text-white/90 text-xs sm:text-sm font-medium border border-white/10 hover:border-white/20 transition-colors duration-300"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spline Container - adjusted for better scaling */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="relative w-full h-full"
          style={{
            aspectRatio: "1920/1080",
            maxHeight: "100vh",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <Spline
            scene="https://prod.spline.design/esNf0dOq9WIXv3ch/scene.splinecode"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
