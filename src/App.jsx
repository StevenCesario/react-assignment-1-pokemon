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

  function addToCollection() {
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