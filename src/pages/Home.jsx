import HeroSection from '../components/home/HeroSection';
import LatestTuitions from '../components/home/LatestTuitions';
import LatestTutors from '../components/home/LatestTutors';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* All sections will have proper spacing from navbar */}
      <div className="pt-20"> {/* Padding for fixed navbar */}
        <HeroSection />
        <LatestTuitions />
        <LatestTutors />
        <HowItWorks />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Home;