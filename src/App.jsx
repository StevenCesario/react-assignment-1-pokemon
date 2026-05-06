import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import CollectionPage from './pages/CollectionPage';
import SearchPage from './pages/SearchPage';
import EasterEggPage from './pages/EasterEggPage';
import DetailedViewPage from './pages/DetailedViewPage';
import CreatePage from './pages/CreatePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wrapper is a wrapper around all of our page routes! */}
        <Route path='/' element={<Layout />}>
          <Route index element={<CollectionPage />} />
          <Route path='search' element={< SearchPage/>} />
          <Route path='card' element={<EasterEggPage />} />
          <Route path='card/:id' element={<DetailedViewPage />} />
          <Route path='create' element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;