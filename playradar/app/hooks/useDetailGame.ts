import { useState, useEffect } from "react";
import type { GameDetails, GameMedia } from "@/types/games.types";
import { getGameDetails, getGameMedia } from "@/services/api";

export const useDetailGame = (slug: string) => {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [gameMedia, setGameMedia] = useState<GameMedia | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
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

  return { gameDetails, gameMedia, error };
};
