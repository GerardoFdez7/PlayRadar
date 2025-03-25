import { useState, useEffect, useCallback } from "react";
import type { GameDetails, GameMedia } from "@/types/games.types";
import { getGameDetails, getGameMedia } from "@/services/api";

const cache = new Map<string, { gameDetails: GameDetails | null; gameMedia: GameMedia | null }>();

export const useDetailGame = (slug: string) => {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [gameMedia, setGameMedia] = useState<GameMedia | null>(null);
  const [error, setError] = useState<string | null>(null);

  const prefetchGame = useCallback(async () => {
    if (cache.has(slug)) return;
    
    try {
      const [details, media] = await Promise.all([
        getGameDetails(slug),
        getGameMedia(slug),
      ]);

      cache.set(slug, {
        gameDetails: details,
        gameMedia: { short_screenshots: media.screenshots, movies: media.trailers }
      });
    } catch (err) {
      console.error('Prefetch failed:', err);
    }
  }, [slug]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        if (cache.has(slug)) {
          const cached = cache.get(slug)!;
          setGameDetails(cached.gameDetails);
          setGameMedia(cached.gameMedia);
          return;
        }
        const [details, media] = await Promise.all([
          getGameDetails(slug),
          getGameMedia(slug),
        ]);

        if (details) {
          setGameDetails(details);
        }

        if (media) {
          setGameMedia({
            short_screenshots: media.screenshots,
            movies: media.trailers,
          });
        }

        if (!details) {
          setError("Failed to load game data");
        }
      } catch (err) {
        setError("Error fetching game data");
        console.error(err);
      }
    };

    fetchGameData();
  }, [slug]);

  return { gameDetails, gameMedia, error, prefetchGame };
};
