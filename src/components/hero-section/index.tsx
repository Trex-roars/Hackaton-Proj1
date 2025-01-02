import Spline from '@splinetool/react-spline/next';

export default function HomeSection() {
  return (
    <>
      <div className="relative h-screen">
        {/* Container for text and button */}
        <div className="absolute top-0 bottom-0 left-20 flex flex-col justify-center space-y-6 z-50">
          {/* Text */}
          <h1 className="text-4xl font-semibold  shadow-lg">
            The Real AGENT
          </h1>

          {/* Button */}
          <button className="px-6 py-3 text-lg bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-400 transition duration-300">
            Discover More
          </button>
        </div>

        {/* Spline background */}
        <div className="w-full h-full">
          <Spline
            scene="https://prod.spline.design/esNf0dOq9WIXv3ch/scene.splinecode"
          />
        </div>
      </div>
      <div className='h-screen bg-gray-900'>
        <h1 className='text-white'>Hello</h1>



      </div>
    </>
  );
}
