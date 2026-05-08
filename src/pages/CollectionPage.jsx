import { useState } from 'react'
import CollectionItem from '../components/CollectionItem'

const CollectionPage = ({ collection, onIncrease, onDecrease, onDelete }) => {

  return (
    <div>
      {collection.length === 0 ? (
        <p>There are no cards in your collection! Add your first card now :)</p>
      ) : (
        collection.map(collectionItem =>
          <CollectionItem
            key={collectionItem.id}
            card={collectionItem}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onDelete={onDelete}
          />)
      )}
    </div>
  )
}

export default CollectionPage