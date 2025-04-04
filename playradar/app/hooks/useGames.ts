import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getSearchedGames,
  getGames,
  getRecomendations,
} from '@/app/services/rawg';
import { Game } from '@/types/games.types';
import { sortGames } from '@/app/lib/consts/games.consts';
import useGenre from '@/hooks/useGenre';
import usePlatforms from '@/hooks/usePlatforms';

export default function useGames(
  initialGames: Game[],
  initialNextUrl: string | null,
  isRecommendations: boolean = false,
) {
  const [games, setGames] = useState<Game[]>(
    Array.isArray(initialGames) ? initialGames : [],
  );
  const [nextUrl, setNextUrl] = useState<string | null>(initialNextUrl);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [nextSearchUrl, setNextSearchUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenreSlug, setSelectedGenreSlug] = useState<string | null>(
    null,
  );
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const { userGenres } = useGenre();
  const { userPlatforms } = usePlatforms();

  // Get filtered games or recommendations
  const fetchFilteredGames = useCallback(async () => {
    if (isRecommendations) {
      // Prevent API call if no preferences selected
      if (userGenres.length === 0 || userPlatforms.length === 0) {
        setGames([]);
        setNextUrl(null);
        return;
      }

      const genreFilters = [
        ...userGenres,
        ...(selectedGenreSlug ? [selectedGenreSlug] : []),
      ].filter(Boolean);

      const platformFilters = [
        ...userPlatforms,
        ...(selectedPlatform !== 'all' ? [selectedPlatform] : []),
      ].filter(Boolean);

      setIsLoading(true);
      try {
        const data = await getRecomendations(
          undefined,
          genreFilters.join(','),
          platformFilters.join(','),
        );
        if (data) {
          setGames(data.results);
          setNextUrl(data.next);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      const platformId =
        selectedPlatform !== 'all' ? selectedPlatform : undefined;
      const genreSlug = selectedGenreSlug ?? undefined;

      setIsLoading(true);
      try {
        const data = await getGames(undefined, genreSlug, platformId);
        if (data) {
          setGames(data.results);
          setNextUrl(data.next);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    isRecommendations,
    selectedGenreSlug,
    selectedPlatform,
    userGenres,
    userPlatforms,
  ]);

  // Memoize sorted rendered games
  const sortedGames = useMemo(() => {
    const displayGames = searchTerm.trim() ? searchResults : games;
    return sortGames(displayGames, sortBy);
  }, [searchTerm, searchResults, games, sortBy]);

  // Memoize filtered rendered games
  const filteredGames = useMemo(() => {
    return sortedGames.filter(
      (game) =>
        selectedPlatform === 'all' ||
        game.parent_platforms?.some(
          (p) => p.platform.id.toString() === selectedPlatform,
        ),
    );
  }, [sortedGames, selectedPlatform]);

  // Memoize recommended rendered games
  const recommendedGames = useMemo(() => {
    return sortedGames.filter(
      (game) =>
        selectedPlatform === 'all' ||
        game.parent_platforms?.some(
          (p) => p.platform.id.toString() === selectedPlatform,
        ),
    );
  }, [sortedGames, selectedPlatform]);

  // Load more games when user scrolls to the bottom of the page
  const loadMoreGames = useCallback(async () => {
    if (!nextUrl || isLoading) return;
    setIsLoading(true);
    const data = await getGames(nextUrl);
    if (data?.results) {
      setGames((prev) => [...prev, ...data.results]);
      setNextUrl(data.next);
    }
    setIsLoading(false);
  }, [nextUrl, isLoading]);

  // Get searched games
  useEffect(() => {
    const fetchInitialSearch = async () => {
      if (searchTerm.trim()) {
        setIsLoading(true);
        setSelectedGenreSlug(null);
        setSelectedPlatform('all');

        const data = await getSearchedGames(searchTerm);
        if (data?.results) {
          setSearchResults(data.results);
          setNextSearchUrl(data.next);
        }
        setIsLoading(false);
      } else {
        setSearchResults([]);
        setNextSearchUrl(null);
      }
    };

    const handler = setTimeout(() => void fetchInitialSearch(), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Load more search results when user scrolls to the bottom of the page
  const loadMoreSearchResults = useCallback(async () => {
    if (!nextSearchUrl || isLoading) return;
    setIsLoading(true);
    const data = await getSearchedGames(searchTerm, nextSearchUrl);
    if (data?.results) {
      setSearchResults((prev) => [...prev, ...data.results]);
      setNextSearchUrl(data.next);
    }
    setIsLoading(false);
  }, [nextSearchUrl, searchTerm, isLoading]);

  // Handles the automatic refresh of game filters
  useEffect(() => {
    let isActive = true;
    const debouncer = setTimeout(() => {
      if (!searchTerm.trim() && isActive) {
        void fetchFilteredGames().catch((_error) => {});
      }
    }, 100);

    return () => {
      isActive = false;
      clearTimeout(debouncer);
    };
  }, [searchTerm, fetchFilteredGames]);

  return {
    filteredGames,
    recommendedGames,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedGenreSlug,
    setSelectedGenreSlug,
    selectedPlatform,
    setSelectedPlatform,
    sortBy,
    setSortBy,
    loadMoreGames,
    loadMoreSearchResults,
  };
}
