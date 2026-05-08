import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getCardById, getCardImage } from '../api/api';
import CardImage from '../components/CardImage';

const DetailedViewPage = () => {
  // const params = useParams(); 
  // const id = params.id; // Since we have `<Route path='card/:id' element={<DetailedViewPage />} />`
  const { id } = useParams(); // Neater way to grab it haha
  const location = useLocation(); // This is what allows us to use the Backpack Strat haha!

  // Try to set the initial state using the backpack data. 
  // Using '?.' (optional chaining) to prevent a crash if location.state is null (like on a hard refresh)
  const [card, setCard] = useState(location.state?.cardData || null);
  const [loading, setLoading] = useState(!card); // Our neat starting boolean value: only load if we don't have the card yet
  const [error, setError] = useState(null);

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
    <div>
      <h1>{card.card_info.name}</h1>
      <p>Set: {card.card_info.set_name}</p>
      < CardImage cardId={card.id} cardName={card.card_info.name} />
    </div>
  )
}

export default DetailedViewPage