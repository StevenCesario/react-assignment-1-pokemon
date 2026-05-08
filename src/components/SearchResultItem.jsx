import Card from "./Card"

const SearchResultItem = ({ resultItem }) => {
  return (
    <li>
      < Card card={resultItem} />
      {/* More to be added here? */}
    </li>
  )
}

export default SearchResultItem