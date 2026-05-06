import axios from "axios";

const pokemonAPI = axios.create({
  baseURL: "https://api.pokewallet.io/", // With the ACTUAL base URL, not /search, right
  headers: {
    'X-API-Key': import.meta.env.VITE_API_KEY // It's up here instead and needs the VITE_ prefix
  }
}); 

export const searchCards = async (query) => {
  try {
    const response = await pokemonAPI.get('/search', {
      // headers: {'X-API-Key': import.meta.env.API_KEY}, Not like this haha
      params: {q: query}
    });

    return response.data; // Axios wraps our API response in a `data` object
  } catch (err) {
    console.log(`Error fetching search data: ${err}`);
    throw err; // Let the component handle the error UI; this is gonna become the error state in searchPage.jsx, right!
  }
};