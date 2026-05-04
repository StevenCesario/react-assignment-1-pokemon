import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      {/* This is our nav that will be visible and clickable on *EVERY* page */}
      <nav>
        <Link to="/">Search Cards</Link>
        <Link to="/collection">My Collection</Link>
        <Link to="/create">Create Custom Card</Link>
      </nav>

      <main>
        {/* The child page that we are currently looking at (Search, Collection, or Create) will get injected here 🌱 */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;