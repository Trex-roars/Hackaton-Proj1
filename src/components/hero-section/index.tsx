import Spline from '@splinetool/react-spline/next';

const HomeSection = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Overlay to help with text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20">
          <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center h-full max-w-xl">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="inline-block backdrop-blur-sm px-4 py-2 rounded-lg">
                  The Real AGENT
                </span>
              </h1>

              {/* Optional Subheading */}
              <p className="text-lg md:text-xl text-white/90 mb-8 backdrop-blur-sm px-4 py-2 rounded-lg max-w-md">
                Experience the next generation of interactive digital agents
              </p>

              {/* Buttons Container */}
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center px-6 py-3 text-lg bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-400 transition duration-300 transform hover:scale-105">
                  Discover More
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="inline-flex items-center px-6 py-3 text-lg border-2 border-white text-white rounded-full hover:bg-white/10 transition duration-300 backdrop-blur-sm">
                  Learn More
                </button>
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

      {/* Second Section */}
      <div className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              Welcome to the Future
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              Discover how our AI-powered platform is revolutionizing the way we interact with digital agents.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
