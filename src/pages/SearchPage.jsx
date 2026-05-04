import { useState, useEffect } from 'react'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

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