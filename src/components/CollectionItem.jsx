// import Card from "./Card" Not used anymore
import { Link } from "react-router-dom"
import CardImage from "./CardImage"
import './CollectionItem.css';

const CollectionItem = ({ card, onIncrease, onDecrease, onDelete }) => {
  return (
    <div className={`collection-item ${card.isNew ? 'animate-in' : ''}`}>
      {/* Now only includes the image! No Card component for the Name or Set! */}
      {/* Now also clickable! 🚀 */}
      <Link to={`/card/${card.id}`} state={{ cardData: card }} ><CardImage cardId={card.id} cardName={card.card_info.name} /></Link>

      <div className="inventory-controls">
        {/* The onClicks need to be arrow functions since we're passing arguments to keep them as function references! 🚀 */}
        <button className="amount-btn" disabled={card.amount === 1} onClick={() => onDecrease(card.id)}>-</button>
        <span className="amount-display">Amount: {card.amount}</span>
        <button className="amount-btn" onClick={() => onIncrease(card.id)}>+</button>
      </div>
      <button className="remove-btn" onClick={() => onDelete(card.id)}>Remove from collection</button>
    </div>
  )
}

export default CollectionItem