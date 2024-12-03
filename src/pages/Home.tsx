import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className='text-white bg-gray-100 text-text'>
      <section
        className='relative flex items-center justify-center h-screen bg-center bg-no-repeat bg-cover'
        style={{ backgroundImage: `url(/src/assets/water8.jpeg)` }}
      >
        <div className='absolute inset-0 bg-black opacity-30'></div>
        <div className='relative z-10 max-w-4xl px-6 mx-auto text-center text-extend-primary'>
          <h1 className='text-5xl font-extrabold drop-shadow-md md:text-6xl'>
            Discover Groundwater Insights with HydraQ
          </h1>
          <p className='mt-4 text-lg font-normal drop-shadow-md md:text-2xl'>
            Your personalized chatbot for real-time groundwater monitoring
          </p>

          <Button className='p-5 mt-8 text-lg font-semibold transition duration-300 bg-blue-600 shadow-lg hover:bg-blue-700'>
            Chat with HydraQ
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
