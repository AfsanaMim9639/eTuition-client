import HeroSection from '../components/home/HeroSection';
import LatestTuitions from '../components/home/LatestTuitions';
import LatestTutors from '../components/home/LatestTutors';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <HeroSection />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
};

export default Home;