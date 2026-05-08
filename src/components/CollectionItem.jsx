// import Card from "./Card" Not used anymore
import { Link } from "react-router-dom"
import CardImage from "./CardImage"

const CollectionItem = ({ card, onIncrease, onDecrease, onDelete }) => {
  return (
    <div>
      {/* Now only includes the image! No Card component for the Name or Set! */}
      {/* Now also clickable! 🚀 */}
      <Link to={`/card/${card.id}`} state={{ cardData: card }} ><CardImage cardId={card.id} cardName={card.card_info.name} /></Link>
      {/* The onClicks need to be arrow functions since we're passing arguments to keep them as function references! 🚀 */}
      <button disabled={card.amount === 1} onClick={() => onDecrease(card.id)}>-</button>
      <span>Amount: {card.amount}</span>
      <button onClick={() => onIncrease(card.id)}>+</button>
      <button onClick={() => onDelete(card.id)}>Remove from collection</button>
    </div>
  )
}

export default CollectionItem