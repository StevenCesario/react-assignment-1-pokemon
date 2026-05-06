import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import Card from "../components/Card";

const SearchPage = () => {
  // const baseURL = "https://api.pokewallet.io/search"; This isn't gonna live here, it's gonna live in api.js!
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <p>Showing results for "{searchParams.get('q')}"</p>
      <ul>
        {/* {searchResults.map(result => < Card card={} />)} */}
      </ul>
    </div>
  )
}

export default SearchPage