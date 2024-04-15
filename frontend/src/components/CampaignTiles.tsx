import { Campaign } from '../campaignAPI';

export interface CampaignTilesProps {
  items: Campaign[];
}

const CampaignTiles = ({ items }: CampaignTilesProps) => (
  <div className="campaign-tiles">
    {items.map(item => <Tile item={item} key={item.id} />)}
  </div>
);

interface TileProps {
  item: Campaign;
}

const Tile = ({ item }: TileProps) => (
  <div>{item.company.name}</div>
)

export default CampaignTiles;
