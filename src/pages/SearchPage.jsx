import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom"
import { searchCards } from "../api/api";
// import Card from "../components/Card"; Not used anymore, now uses SearchResultItem instead
import SearchResultItem from "../components/SearchResultItem";
import './SearchPage.css';

const SearchPage = () => {
  // const baseURL = "https://api.pokewallet.io/search"; This isn't gonna live here, it's gonna live in api.js!
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({}); // Initialize as empty object, I guess?
  const [isLoading, setIsLoading] = useState(true); // Took some time to finally implement this haha
  const [error, setError] = useState(null);

  const query = searchParams.get('q'); // The actual results array will be here under the key 'results'
  // if (!query) {
  //   setError({message: "No search query!"});
  // } This is not the way to handle missing search queries haha, it causes an infinite loop. Cleaner code down in the render part of the file
  // These both need to be numbers! Defaults to sensible defaults 1 and 20 if there is nothing present in the URL
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 20;

  // const pagination = query.get('pagination'); // I think is gonna have to be a state variable that is also set in the useEffect
  // Will look something like
  // "pagination": {
  //       "page": 1,
  //       "limit": 20,
  //       "total": 612,
  //       "total_pages": 31
  //   },

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; // Mount case; when there is no query, return early
      try {
        const data = await searchCards(query, page, limit); // THE MISSING PUZZLE PIECE! This one also needs our new page and limit haha!
        setSearchResults(data.results); // This should work
        setPagination(data.pagination); // This also feels correct
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false); // Important: set isLoading to false no matter the result of the fetch
      }
    };

    fetchResults();
  }, [query, page, limit]); // This useEffect runs whenever `q=` changes in our URL. Now also listens for changes in page and limit! All our "URL" variables

  // I might find a way to mash these two functions together
  function handleNextPage() {
    // Right, so.. like Gemini said. I'm not gonna look at it yet.. this changes the *URL*. 
    // So. We need to use `prev` in conjunction with setSearchParams?
    // setSearchParams(prev => {prev.set('page', page + 1)}); // Like this?? We take whatever `prev` already is.. and we access and change the `page` key.. and increment it by one. Ignoring edge cases for now, let's try it
    // Nope haha. That chaged the URL from `http://localhost:5173/search?q=charizard` to `http://localhost:5173/search`. Hmmmmm. 
    // I don't understand why that doesn't work. It should just ignore all the other keys and only override the `page` key? Let's sit 5 min with this and then ask for a nudge.
    // Looking through all the methods available via Intellisense... set is the only one that makes sense. Is there a nuance to .set() that I'm not considering?
    // (method) URLSearchParams.set(name: string, value: string): void
    // The set() method of the URLSearchParams interface sets the value associated with a given search parameter to the given value. 
    // If there were several matching values, this method deletes the others. If the search parameter doesn't exist, this method creates it.
    // Hmmmm.. alright, I need a nudge.
    // The first one was a good attempt! 
    // setSearchParams(prev => {
    // return prev.set('page', page + 1)
    // }); This looks like it would solve it but nope.
    // It needs to be written like this:
    setSearchParams(prev => {
      prev.set('page', page + 1);
      return prev;
    });

    // // Are both really necessary? 
    // setPagination(prev => {
    //   prev.set('page', pagination.page + 1);
    //   return prev;
    // }); Nope. This is not necessary *at all* haha!
  }

  function handlePrevPage() {
    // Will be super similar to its sibling above!
    setSearchParams(prev => {
      prev.set('page', page - 1); // This is the only difference, isn't it? And the "safety check" lies in the disabled attribute boolean expressions on the buttons
      return prev;
    });
  }

  // 1. The Empty State: If there is no query, don't even bother checking loading or results.
  // Here we handle missing search queries! 🚀
  if (!query) {
    return (
      <div>
        <h2>Looking for Pokémon?</h2>
        <p>Use the search bar above to find cards to add to your collection!</p>
      </div>
    );
  }

  // 2. The Loading State: We have a query, but we are waiting for the API.
  // This intercepts the render BEFORE the empty array can trigger the "Zero Results" state!
  if (isLoading) return (<p>Loading page...</p>) // Will be upgraded if time allows for it

  // 3. The Error State: The API finished loading, but something went wrong.
  if (error) return (<p>Error loading page: {error.message}</p>)

  // 4. The Zero Results State: We have a query, we are done loading, there are no errors, 
  // AND the array is still empty. Now we can safely say nothing was found.
  // Properly handling the "searching for `sdkvjbnds` Zero Results" edge case too with the same pattern! 
  if (searchResults.length === 0) {
    return (
      <div>
        <h2>No Pokémon found in the tall grass!</h2>
        <p>Try with another search query!</p>
      </div>
    );
  }

  return (
    <div>
      <p>Showing results for "{query}" - {pagination.total} total results</p>
      <ul className="search-results-grid">
        {/* Now we can uncomment this and head over to the Card component to see what data will be unpacked from the card prop */}
        {/* Now wrapped in a Link that sends the user to the Detailed view page, of course with the Backpack strat fully intact haha! 🚀 */}
        {/* The outermost child is the one that needs the `key` property when using .map() which now with this wrapping is Link! Good to know */}
        {searchResults.map(result => <Link key={result.id} to={`/card/${result.id}`} state={{ cardData: result }} >< SearchResultItem resultItem={result} /></Link>)}
      </ul>
      {/* The disabled logic.. this needs to be disabled.. if we're on page 1 */}
      <div className="pagination-controls">
        <button className="pagination-btn" disabled={pagination.page === 1} onClick={handlePrevPage}>Previous</button>
        {/* And this one needs to be disabled if we're on page `total_pages`! Sounds good for now */}
        <button className="pagination-btn" disabled={pagination.page === pagination.total_pages} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default SearchPage