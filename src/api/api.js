import axios from "axios";

const pokemonAPI = axios.create({
  baseURL: "https://api.pokewallet.io/", // With the ACTUAL base URL, not /search, right
  headers: {
    'X-API-Key': import.meta.env.VITE_API_KEY // It's up here instead and needs the VITE_ prefix
  }
});

export const searchCards = async (query, page = 1, limit = 20) => {
  try {
    const response = await pokemonAPI.get('/search', {
      // headers: {'X-API-Key': import.meta.env.API_KEY}, Not like this haha
      params: {
        q: query,
        page: page,
        limit: limit
      }
    });

    return response.data; // Axios wraps our API response in a `data` object
  } catch (err) {
    console.log(`Error fetching search data: ${err}`);
    throw err; // Let the component handle the error UI; this is gonna become the error state in searchPage.jsx, right!
  }
};

export const getCardImage = async (id) => {
  try {
    const response = await pokemonAPI.get(`/images/${id}`, {
      responseType: 'blob' // Binary Large Objects! This will be my first time working with them!
    }); // "Does not need params"; it does need a responseType haha!
    return response.data; // I *believe* we can still write like this even tho it will return a jpg? Will be tha actual binary file
  } catch (err) {
    console.log(`Error fetching image for card with id ${id}: ${err}`);
    throw err;
  }
};

export const getCardById = async (id) => {
  try {
    const response = await pokemonAPI.get(`/cards/${id}`);
    return response.data;
  } catch (err) {
    console.log(`Error fetching detailed ifno for card with id ${id}: ${err}`);
    throw err;
  }
};