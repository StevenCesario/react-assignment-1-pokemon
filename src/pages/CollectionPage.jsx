import { useState } from 'react'
import CollectionItem from '../components/CollectionItem'
import './CollectionPage.css';

const CollectionPage = ({ collection, onIncrease, onDecrease, onDelete }) => {
  const collectionSize = collection.length;

  return (
    <div className={collectionSize === 0 ? "empty-collection" : "collection-grid"}>
      {collectionSize === 0 ? (
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