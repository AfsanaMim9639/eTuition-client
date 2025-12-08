import HeroSection from '../components/home/HeroSection';
import LatestTuitions from '../components/home/LatestTuitions';
import LatestTutors from '../components/home/LatestTutors';
import HowItWorks from '../components/home/HowItWorks';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home = () => {
  return (
    <div className="w-full">
      {/* MainLayout already has pt-20 md:pt-24, so NO padding here */}
      <HeroSection />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
};

export default Home;