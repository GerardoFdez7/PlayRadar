const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export const getGames = async () => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&platforms=1,2,3,4,18,7,6,5&page_size=50`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    console.log(`Request to API: ${res.url}`);
    console.log(`Response status code: ${res.status}`);

    const data = await res.json();
    return Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.error('Error en getGames:', error);
    return [];
  }
};

export const getSearchedGames = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=50`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGameDetails = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}?key=${API_KEY}`
    );
    console.log(`Fetch response status: ${res.status}`);
    const data = await res.json();
    console.log(`Fetched game details:`, data);
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

export const getGameScreenshots = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const fetchGameTrailer = async (gameId: number) => {
    try {
    const res = await fetch( 
      `https://api.rawg.io/api/games/${gameId}/movies?key=${API_KEY}`); 
        const data = await res.json();
        return data.results;
      } catch (error) {
        console.error(error);
        return null;
      }
  };