import Card from "./Card"

const CollectionItem = ({ card }) => {
  return (
    <div>
      {/* The Card component includes the image */}
      <Card card={card} />
      <button>-</button>
      <span>Amount: {card.amount}</span>
      <button>+</button>
      <button>Remove from collection</button>
    </div>
  )
}

export default CollectionItem