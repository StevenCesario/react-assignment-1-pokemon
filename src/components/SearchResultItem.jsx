import Card from "./Card";
import './SearchResultItem.css';

const SearchResultItem = ({ resultItem }) => {
  return (
    <li className="search-result-item">
      < Card card={resultItem} />
      {/* More to be added here? */}
    </li>
  )
}

export default SearchResultItem