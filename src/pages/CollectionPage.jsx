import { useState } from 'react'

const CollectionPage = ({ collection }) => {
  
  return (
    <div>
      {collection.length === 0 ? (
        <p>There are no cards in your collection! Add your first card now :)</p>
      ) : (
        cards.map(card => <Card card={card} />)
      )}
    </div>
  )
}

export default CollectionPage