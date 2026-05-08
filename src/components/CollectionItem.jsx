import Card from "./Card"

const CollectionItem = ({ card, onIncrease, onDecrease }) => {
  return (
    <div>
      {/* The Card component includes the image */}
      <Card card={card} />
      {/* The onClicks need to be arrow functions since we're passing arguments to keep them as function references! 🚀 */}
      <button disabled={card.amount === 1} onClick={() => onDecrease(card.id)}>-</button>
      <span>Amount: {card.amount}</span>
      <button onClick={() => onIncrease(card.id)}>+</button>
      <button>Remove from collection</button>
    </div>
  )
}

export default CollectionItem