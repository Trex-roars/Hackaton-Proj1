import Spline from '@splinetool/react-spline/next';

const HomeSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Enhanced Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />

      {/* Content Container */}
      <div className="absolute inset-0 z-20">
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl">
            {/* Enhanced Decorative Element */}
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-8 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)]" />

            {/* Enhanced Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  The Real
                </span>
              </span>
              <br />
              <span className="inline-block mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  AGENT
                </span>
              </span>
            </h1>

            {/* Enhanced Subheading */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 font-light leading-relaxed max-w-xl">
              Experience the next evolution of
              <span className="font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> intelligent interactions </span>
              powered by cutting-edge AI technology
            </p>

            {/* Enhanced Interactive Buttons */}
            <div className="flex flex-wrap gap-6">
              <button className="group relative inline-flex items-center px-8 py-4 text-lg font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300">
                <span className="relative z-10">Explore Now</span>
                <svg className="w-6 h-6 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button className="relative inline-flex items-center px-8 py-4 text-lg font-medium text-white/90 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-sm">
                <span className="relative z-10">Watch Demo</span>
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Enhanced Feature Tags */}
            <div className="flex flex-wrap gap-4 mt-12">
              {[
                'AI Powered',
                'Real-time',
                'Secure'
              ].map((tag, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/10 hover:border-white/20 transition-colors duration-300"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spline Container */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/esNf0dOq9WIXv3ch/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default HomeSection;
