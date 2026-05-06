import { useSearchParams } from "react-router-dom"

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <p>Showing results for "{searchParams.get('q')}"</p>
    </div>
  )
}

export default SearchPage