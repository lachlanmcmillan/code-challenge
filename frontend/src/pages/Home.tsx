import { useState, useEffect } from 'react';
import { Campaign, getCampaigns } from '../campaignAPI';
import Hero from "../components/Hero";
import CampaignTiles from '../components/CampaignTiles';

const Home = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const refreshCampaigns = async () => {
    const { data, error } = await getCampaigns();
    if (error) {
      // todo handle error
    } else {
      console.log({ data });
      setCampaigns(data!);
    }
  }

  useEffect(() => {
    refreshCampaigns();
  }, []);

  return (
    <>
      <Hero />
      <div className="campaigns">
        <h1>Live &amp; Recent Campaigns</h1>
        <p className="subtitle">Invest in exciting Australian brands</p>
        <CampaignTiles items={campaigns} />
      </div>
    </>
  );
};

export default Home;
