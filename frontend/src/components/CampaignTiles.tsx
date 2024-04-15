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

const Tile = ({ item }: TileProps) => {
  const closingText = item.status === "CLOSED"
    ? `Closed at ${item.closeDateFormatted}`
    : `Closes in ${Math.floor(item.closingInDays)} days`; 


  const typeText = item.type === 'EOI'
    ? 'Expressions of Interest'
    : item.type;

  return (
    <div className="tile">
      <div className="top">
        <img 
          className="company-main-image"
          src={item.company.mainImage}
        />
      </div>

      <div className="middle">
        <img
          className="company-logo-image"
          src={item.company.logoImage}
        />

        <div className="company-text">
          <span className="company-name">{item.company.name}</span>
          <br />
          <span className="company-industry">{item.company.industry}</span>
        </div>

      </div>

      <div className="bottom">
        <span className="type-text">{typeText}</span>
        <br />
        <span className="closing-text">{closingText}</span>
      </div>
    </div>
  )
}

export default CampaignTiles;
