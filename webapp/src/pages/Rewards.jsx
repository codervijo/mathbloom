import Navbar from '../components/Navbar';
import RewardsGrid from '../components/RewardsGrid';
import badges from '../data/mock/rewards.json';

const Rewards = () => {
  return (
    <>
      <Navbar />
      <RewardsGrid badges={badges} />
    </>
  );
};

export default Rewards;
