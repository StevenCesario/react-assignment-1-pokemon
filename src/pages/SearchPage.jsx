import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { searchCards } from "../api/api";
import Card from "../components/Card";

const SearchPage = () => {
  // const baseURL = "https://api.pokewallet.io/search"; This isn't gonna live here, it's gonna live in api.js!
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({}); // Initialize as empty object, I guess?
  const [error, setError] = useState(null);
  
  const query = searchParams.get('q'); // The actual results array will be here under the key 'results'
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
        const data = await searchCards(query);
        setSearchResults(data.results); // This should work
        setPagination(data.pagination); // This also feels correct
       } catch (err) {
        setError(err);
       }
    };

    fetchResults();
  }, [query]); // This useEffect runs whenever `q=` changes in our URL

  if (error) return (<p>Error loading page: {error}</p>)

  return (
    <div>
      <p>Showing results for "{query}" - {pagination.total} total results</p>

      <ul>
        {/* Now we can uncomment this and head over to the Card component to see what data will be unpacked from the card prop */}
        {searchResults.map(result => < Card card={result} />)}
      </ul>
    </div>
  )
}

export default SearchPage