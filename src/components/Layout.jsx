import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { searchCards } from '../api/api'; // New pivot; we're going for Goodreads style preview dropdown with no automatic navigation

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [isDebounced, setIsDebounced] = useState(false); Ended up not being used. But I love keeping all the brain artifacts 

  // New state variables for Goodreads style search
  const [previews, setPreviews] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const timeoutRef = useRef(); // The secret sauce that we need to access the timeout variable scoped to our useEffect in our handleSubmit!
  let navigate = useNavigate();

  useEffect(() => {
    // Will do... something haha! To implement debounced search! Time to implement it!
    // const timeout = setTimeout(() => ,500); // Something like this right?
    // But what is the first argument?? What did I put in my Tamagotchi project? It's like it has left my brain completely haha
    // Let's sit in this recall struggle for a few moments
    // I genuinely can't intuitively remember. Let's look it up.
    // setIsBeingPetted(true); // Let's use explicit true until !isBeingPetted is proven to serve us more
    // const timeout = setTimeout(() => {}, 10000); First attempt
    // const timeout = setTimeout(() => setIsBeingPetted(false), 10000); // This should be "Set isBeingPetted back to false after 10 seconds"?
    // Right. setTimeout needs to "point" to something together with the time in ms.
    // What would it point to in this case?
    // I think I need to create a boolean state variable for this. Let's call it isDebounced
    // So the *first* thing this useEffect will do is set this new state variabel to true
    // setIsDebounced(true);
    // NOW we set it back to false but ONLY if 500ms have passed BEFORE a new change in the searchTerm state variable!! I hope I understand this correctly haha
    // const timeout = setTimeout(() => setIsDebounced(false), 500); Good attempt but it can be MUCH cleaner

    // Our edge case: Don't navigate to a search result page for an empty string. Now also handles our local state
    if (!searchTerm.trim()) {
      setIsOpen(false);
      setPreviews([]);
      return;
    }

    // Start the timer. The navigation takes place 500ms after a change in the searchTerm state variable IF there is not another change in it before those 500ms
    // const timeout = setTimeout(() => {
    //   navigate(`/search?q=${searchTerm}`);
    // }, 500); And this changes to...
    // timeoutRef.current = setTimeout(() => {
    //   navigate(`/search?q=${searchTerm}`);
    // }, 500); // .. this! Which allows us to...
    // We're not using that now either hahaha. No automatic navigation, I didn't like it. We now have a debounced fetcher:
    timeoutRef.current = setTimeout(async () => { // Now needs to be async!
      // Handle local state
      setIsSearching(true);
      setIsOpen(true);

      // Do the fetching business
      try {
        const data = await searchCards(searchTerm, 1, 5); // Fetch exactly page 1, limit 5 for the preview
        setPreviews(data.results || []);
      } catch (err) {
        console.error("Preview fetch failed", err);
        setPreviews([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    // And then the important cleanup. If the user types again before 500ms, this kills the previous timer
    return () => clearTimeout(timeoutRef.current); // This doesn't clear `timeout` anymore, but timeoutRef.current!
  }, [searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Safety check
    // if (!isDebounced) navigate(`/search?q=${searchTerm}`); // Only navigate to the search result page if we're currently not debounced
    // The navigation doesn't live here anymore! It now lives in the useEffect!
    // All this does now is making it possible to hit Enter or press the Search button BEFORE the 500ms and still navigate to the search page! 
    // ... use it down here!
    clearTimeout(timeoutRef.current);
    // But this is not all. We've killed the automated navigation, now we need to add a manual one haha!
    setIsOpen(false); // Important local state management before we navigate away! Otherwise the curtains would stay open!
    navigate(`/search?q=${searchTerm}`);

    // setSearchTerm(''); We'll see if this is implemented or not in the final product! For now; no!
  }

  return (
    <div>
      {/* This is our nav that will be visible and clickable on *EVERY* page. */}
      <nav className="search-nav">
        <Link to="/">My Collection</Link>
        <Link to="/create">Create Custom Card</Link>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Search Pokémon...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type='submit'>
            {/* To be swapped out with a Poké ball icon later */}
            {isSearching ? '🌀' : '🔍'}
          </button>
        </form>

        {/* For debugging purposes only, won't be visible in the finished product */}
        {/* <p>Search term is currently {searchTerm}</p> */}
        {/* THE DROPDOWN */}
        {isOpen && (
          <div className="search-dropdown">
            {isSearching ? (
              <p className="dropdown-message">Locating Pokémon...</p>
            ) : previews.length > 0 ? (
              <ul className="preview-list">

                {previews.map(card => (
                  <li key={card.id} className="preview-item">
                    {/* Clicking a preview closes the dropdown and goes to detail view */}
                    <Link
                      to={`/card/${card.id}`}
                      state={{ cardData: card }} // Now passes API data in the "backpack" via state haha!
                      onClick={() => setIsOpen(false)}
                      className="preview-link"
                    >
                      {/* Name and Set info only for now, might create a PreviewItem component so that we can see images here too */}
                      <strong>{card.card_info?.name}</strong> <br/>
                      <small className="preview-set-name">{card.card_info.set_name}</small>
                    </Link>
                  </li>
                ))}

                {/* The Goodreads-style "See all results" footer */}
                <li className="preview-footer">
                  <Link 
                    to={`/search?q=${searchTerm}`} 
                    onClick={() => setIsOpen(false)}
                    className="preview-footer-link"
                  >
                    See all results for "{searchTerm}"
                  </Link>
                </li>
              </ul>
            ) : (
              <p className="dropdown-message">No Pokémon found in the tall grass.</p>
            )}
          </div>
        )}
      </nav>

      <main>
        {/* The child page that we are currently looking at (Search, Collection, or Create) will get injected here 🌱 */}
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;