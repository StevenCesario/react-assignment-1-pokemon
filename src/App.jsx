import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CollectionPage from './pages/CollectionPage';
import SearchPage from './pages/SearchPage';
import EasterEggPage from './pages/EasterEggPage';
import DetailedViewPage from './pages/DetailedViewPage';
import CreatePage from './pages/CreatePage';

function App() {
  const [userCollection, setUserCollection] = useState([]); // Lifting state up!!! The card collection array doesn't live in CollectionPage.jsx, it lives here!!

  function addToCollection(card) {
    // "Will also have guard clause logic to not allow for duplicates."" Not needed!
    // setUserCollection([...userCollection, {id: card.id, name: card.card_info.name, set_name: card.card_info.set_name, amount: 1}]); Attemp 1. It's good but...
    // ... we can do better with a double spread operator haha!
    setUserCollection([...userCollection, { ...card, amount: 1 }]);
  }

  function increaseAmount(id) {
    // Loop over the collection items. If the id matches, update the amount value, else just return the item as-is. This is the new userCollection array
    // setUserCollection(userCollection.map((item, prev) => item.id === id ? {...item, amount: prev.amount + 1} : item)); Attempt 1. Close!
    // The callback `prev` variable can be named anything! Here we call it prevCollection and *THIS* is the array that we run .map() on!
    // Permanent brain chemistry altering moment 🚀
    setUserCollection(prevCollection => prevCollection.map(item => item.id === id ? { ...item, amount: item.amount + 1 } : item));
  }

  function decreaseAmount(id) {
    // Copy paste slightly altering the homework from its sibling above haha
    setUserCollection(prevCollection => prevCollection.map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item));
  }

  function removeCardFromCollection(id) {
    // Simple .filter() implementation just like in the todo and phonebook exercises haha!
    // We're filtering out and keeping only the collection items where id *DOESN'T* match
    setUserCollection(userCollection.filter(item => item.id !== id)); // This is it.. isn't it? 
    // setNotes(notes.filter(note => note.id !== id)); // This is it, isn't it? I made the exact same comment in a mini project hahahaha!
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wrapper is a wrapper around all of our page routes! */}
        <Route path='/' element={<Layout />}>
          <Route index element={
            <CollectionPage
              collection={userCollection}
              onIncrease={increaseAmount}
              onDecrease={decreaseAmount}
              onDelete={removeCardFromCollection}
            />}
          />
          <Route path='search' element={< SearchPage />} />
          <Route path='card' element={<EasterEggPage />} />
          <Route path='card/:id' element={<DetailedViewPage collection={userCollection} onAdd={addToCollection} />} />
          <Route path='create' element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;