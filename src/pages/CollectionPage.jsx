import { useState } from 'react'
import Card from '../components/Card'

const CollectionPage = ({ collection }) => {
  
  return (
    <div>
      {collection.length === 0 ? (
        <p>There are no cards in your collection! Add your first card now :)</p>
      ) : (
        collection.map(card => <Card key={card.id} card={card} />)
      )}
    </div>
  )
}

export default CollectionPage