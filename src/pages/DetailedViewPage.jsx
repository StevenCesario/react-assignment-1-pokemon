import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { getCardById, getCardImage } from '../api/api';
// import CardImage from '../components/CardImage'; Didn't end up getting used
import Card from '../components/Card';
import './DetailedViewPage.css';

const DetailedViewPage = ({ collection, onAdd }) => { // I first thought about having a boolean isInCollection prop here but that can't be calculated without knowing what card we're looking at via the id that is grabbed here on this page from the URL!
  // const params = useParams(); 
  // const id = params.id; // Since we have `<Route path='card/:id' element={<DetailedViewPage />} />`
  const { id } = useParams(); // Neater way to grab it haha
  const location = useLocation(); // This is what allows us to use the Backpack Strat haha!
  let navigate = useNavigate(); // To allow for automatic navigation to Collection page upon clicking "Add to collection"

  // Try to set the initial state using the backpack data. 
  // Using '?.' (optional chaining) to prevent a crash if location.state is null (like on a hard refresh)
  const [card, setCard] = useState(location.state?.cardData || null);
  const [loading, setLoading] = useState(!card); // Our neat starting boolean value: only load if we don't have the card yet
  const [error, setError] = useState(null);
  // const [isInCollection, setIsInColleciton] = useState(collection.includes()) I'll return to this once I know the definitive shape of a collection card object

  // .some() returns true if any item in the array matches the condition
  const isAlreadyOwned = collection.some(c => c.id === card?.id);

  // The "Backpack unpacking" strat, i love it 🎒
  useEffect(() => {
    // If the backpack had the data, we do absolutely nothing! Bypass complete.
    if (card) return;

    // FALLBACK: The backpack was empty (user refreshed or shared the direct link)
    const fetchCardFallback = async () => {
      try {
        setLoading(true);
        const data = await getCardById(id); // Hit the /cards/:id endpoint
        setCard(data);
      } catch (err) {
        setError(err.message || "Failed to fetch card details");
      } finally {
        setLoading(false);
      }
    };

    fetchCardFallback();
  }, [id, card]); // Re-run if the ID changes

  if (loading) return <p>Loading Pokémon data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!card) return <p>No card found.</p>;

  return (
    <div className="detailed-view-container">
      {/* LEFT COLUMN: Card & Main Action */}
      <div className="detailed-card-visual">
        {/* These three lines... */}
        {/* <h1>{card.card_info.name}</h1>
      <p>Set: {card.card_info.set_name}</p>
      < CardImage cardId={card.id} cardName={card.card_info.name} /> */}

        {/* ...can all be replaced with this haha! I didn't even notice this */}
        < Card card={card} />

        {/* Disabled if the card is already in the collection; no logic clause code needed haha! */}
        <button className="add-to-collection-btn" disabled={isAlreadyOwned} onClick={() => {
          onAdd(card);
          navigate('/'); // Redirect to Collection page onClick!
        }
        }>
          {!isAlreadyOwned ? 'Add to Collection!' : 'Already in Collection'}
        </button>
      </div>

      {/* New pricing data! */}
      {/* RIGHT COLUMN: Pricing Data */}
      <div className="market-analysis">
        <div>
          <h3>Want to add it to your real collection?</h3>
          {/* Now with optional chaining implemented across the board! */}
          <p className="market-stat">Current TCGPlayer market price: <span>${card.tcgplayer?.prices?.[0]?.market_price || 'N/A'}</span></p>
          {/* Will lead to card.tcgplayer.url */}
          {/* <button>Buy on tcgplayer.com</button> These are not buttons haha!*/}
          {card.tcgplayer?.url
            ? <a className="external-link-btn" href={card.tcgplayer.url} target="_blank" rel="noopener noreferrer">Buy on tcgplayer.com</a>
            : <p>TCGPlayer link not available</p>}
          <p className="market-stat">Average 30 day price on CardMarket.com: <span>${card.cardmarket?.prices?.[0]?.avg30 || 'N/A'}</span></p>
          {/* Will lead to card.cardmarket.product_url */}
          {/* <button>See card at cardmarket.com</button> */}
          {card.cardmarket?.product_url
            ? <a className="external-link-btn" href={card.cardmarket.product_url} target="_blank" rel="noopener noreferrer">See card at cardmarket.com</a>
            : <p>CardMarket link not available</p>}
        </div>
      </div>
    </div>
  )
}

export default DetailedViewPage