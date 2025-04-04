const apiKey = '6037cc7b2ce54502b9cfcd7ddc582d9c';

if (!apiKey) {
  throw new Error('Missing NEXT_PUBLIC_RAWG_apiKey environment variable');
}

// Home Games List
export const getGames = async (
  url?: string,
  genres?: string,
  parent_platforms?: string,
) => {
  try {
    let apiUrl: string;

    if (url) {
      apiUrl = url;
    } else {
      const baseUrl = 'https://api.rawg.io/api/games';
      const params = new URLSearchParams();

      params.append('key', apiKey);
      params.append('ordering', '-metacritic');
      params.append('page_size', '12');
      params.append('dates', '2015-01-01,2027-12-31');

      if (genres) params.append('genres', genres);
      if (parent_platforms) params.append('parent_platforms', parent_platforms);

      apiUrl = `${baseUrl}?${params.toString()}`;
    }

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
};

// For you Games List
export const getRecomendations = async (
  url?: string,
  genres?: string,
  parent_platforms?: string,
) => {
  try {
    let apiUrl: string;

    if (url) {
      apiUrl = url;
    } else {
      const baseUrl = 'https://api.rawg.io/api/games';
      const params = new URLSearchParams();

      params.append('key', apiKey);
      params.append('ordering', '-rating_count');
      params.append('page_size', '12');
      params.append('dates', '2015-01-01,2027-12-31');

      const userGenres = genres?.split(',') || [];
      const userPlatforms = parent_platforms?.split(',') || [];

      if (userGenres.length > 0) params.append('genres', userGenres.join(','));
      if (userPlatforms.length > 0)
        params.append('parent_platforms', userPlatforms.join(','));

      apiUrl = `${baseUrl}?${params.toString()}`;
    }
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
};

// Specific game Search
export const getSearchedGames = async (query: string, url?: string) => {
  try {
    const apiUrl =
      url ??
      `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=8`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data; // { count, next, previous, results }
  } catch (_error) {
    return null;
  }
};

// Profile Games List
export const getGamesByIds = async (ids: string[]) => {
  try {
    const idList = ids.join(',');
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&ids=${idList}&page_size=40`,
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (_error) {
    return [];
  }
};

// Specific Game Details
export const getGameDetails = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}?key=${apiKey}`,
    );
    const data = await res.json();
    return data;
  } catch (_error) {
    return null;
  }
};

// First Trailer
export const getGameTrailer = async (gameId: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`,
    );
    if (!res.ok) throw new Error('Request error');

    const data = await res.json();
    return data.results[0]?.data?.max || null;
  } catch (_error) {
    return null;
  }
};

// List of screenshots
export const getGameScreenshots = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}/screenshots?key=${apiKey}`,
    );
    const data = await res.json();
    return data.results;
  } catch (_error) {
    return null;
  }
};

// List of trailers
export const getGameTrailers = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}/movies?key=${apiKey}`,
    );
    if (!res.ok) throw new Error('Request error');

    const data = await res.json();
    return data.results;
  } catch (_error) {
    return null;
  }
};

export const getGameMedia = async (slug: string) => {
  try {
    const [screenshots, trailers] = await Promise.all([
      getGameScreenshots(slug),
      getGameTrailers(slug),
    ]);

    return {
      screenshots: screenshots || [],
      trailers: trailers || [],
    };
  } catch (_error) {
    return { screenshots: [], trailers: [] };
  }
};
