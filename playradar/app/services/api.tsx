const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export const getGames = async (url?: string) => {
  try {
    const apiUrl =
      url ??
      `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page_size=40&dates=2015-01-01,2027-12-31`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    console.log(`Request to API: ${res.url}`);
    console.log(`Response status code: ${res.status}`);

    const data = await res.json();
    return data; // { count, next, previous, results }
  } catch (error) {
    console.error("Error en getGames:", error);
    return null;
  }
};

export const getSearchedGames = async (query: string, url?: string) => {
  try {
    const apiUrl =
      url ??
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=40`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data; // { count, next, previous, results }
  } catch (error) {
    console.error("Error en getSearchedGamesWithNext:", error);
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

export const fetchGameTrailer = async (gameId: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${gameId}/movies?key=${API_KEY}`
    );
    if (!res.ok) throw new Error("Error en la petición");
    console.log(`Trailer request: ${res.url}`);
    console.log(`Trailer status code: ${res.status}`);

    const data = await res.json();
    console.log("API Response:", data);

    return data.results[0]?.data?.max || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
