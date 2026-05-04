import { useState } from 'react'

const CollectionPage = () => {
  const [cards, setCards] = useState([]); // Will need to change so that we check a JSON or something on mount

  return (
    <div>
      {cards.length === 0 ? (
        <p>There are no cards in your collection! Add your first card now :)</p>
      ) : (
        cards.map(card => <Card card={card} />)
      )}
    </div>
  )
}

export default CollectionPage