import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import CollectionPage from './pages/CollectionPage';
import SearchPage from './pages/SearchPage';
import EasterEggPage from './pages/EasterEggPage';
import DetailedViewPage from './pages/DetailedViewPage';
import CreatePage from './pages/CreatePage';

function App() {
  const [userCollection, setUserCollection] = useState([]); // Lifting state up!!! The card collection array doesn't live in CollectionPage.jsx, it lives here!!

  function addToCollection(card) {
    // Will also have guard clause logic to not allow for duplicates
    // setUserCollection([...userCollection, {id: card.id, name: card.card_info.name, set_name: card.card_info.set_name, amount: 1}]); Attemp 1. It's good but...
    // ... we can do better with a double spread operator haha!
    setUserCollection([...userCollection, {...card, amount: 1}]);
  }

  function updateCardInCollection(id) {
    // To be implemented
  }

  function removeCardFromColletcion(id) {
    // To be implemented
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wrapper is a wrapper around all of our page routes! */}
        <Route path='/' element={<Layout />}>
          <Route index element={<CollectionPage collection={userCollection} />} />
          <Route path='search' element={< SearchPage/>} />
          <Route path='card' element={<EasterEggPage />} />
          <Route path='card/:id' element={<DetailedViewPage collection={userCollection} onAdd={addToCollection} />} />
          <Route path='create' element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;