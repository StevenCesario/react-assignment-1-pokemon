import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Will do... something haha! To implement debounced search!
  }, [searchTerm]);

  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
    // setSearchTerm(''); We'll see if this is implemented or not in the final product! For now; no!
  }

  return (
    <div>
      {/* This is our nav that will be visible and clickable on *EVERY* page */}
      <nav>
        <Link to="/">My Collection</Link>
        <Link to="/create">Create Custom Card</Link>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={(e) => setSearchTerm(e.target.value)} />
          <button type='submit'>Search</button>
        </form>

        {/* For debugging purposes only, will be removed in the finished product */}
        <p>Search term is currently {searchTerm}</p>
      </nav>

      <main>
        {/* The child page that we are currently looking at (Search, Collection, or Create) will get injected here 🌱 */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;