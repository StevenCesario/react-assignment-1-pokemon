import { useState, useEffect } from 'react'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // The main thing I'm gonna have to think about here is... 
  // 1. On the Home/Main page I want debounced search. You should be able to search.. from any page. I want a search bar in the nav! Hmmmm. For next focus block

  useEffect(() => {
    // Will do... something haha!
  }, [searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();

    // To be implemented
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setSearchTerm(e.target.value)} />
        <button type='submit'>Search</button>
      </form>
      <p>Search term is currently {searchTerm}</p>
    </div>
  )
}

export default SearchPage