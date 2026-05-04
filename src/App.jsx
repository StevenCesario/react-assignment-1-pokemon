import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import SearchPage from './pages/SearchPage';
import CollectionPage from './pages/CollectionPage';
import CreatePage from './pages/CreatePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* The Layout wrapper is a wrapper around all of our page routes! */}
        <Route path='/' element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path='collection' element={<CollectionPage />} />
          <Route path='create' element={<CreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;