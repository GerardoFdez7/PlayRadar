import { useState, useEffect } from "react";
import { getGamesByIds } from "@/services/api";
import { Game } from "@/types/games.types";

export function useProfile(
  userLikes: string[],
  userDislikes: string[],
  userPlayLater: string[]
) {
  const [isLoadingLiked, setIsLoadingLiked] = useState(true);
  const [isLoadingDisliked, setIsLoadingDisliked] = useState(true);
  const [isLoadingPlayLater, setIsLoadingPlayLater] = useState(true);
  const [likedGames, setLikedGames] = useState<Game[]>([]);
  const [dislikedGames, setDislikedGames] = useState<Game[]>([]);
  const [playLaterGames, setPlayLaterGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async (ids: string[]) => {
      try {
        if (ids.length === 0) return [];
        const games = await getGamesByIds(ids);
        return games.filter((game: Game | null): game is Game => game !== null);
      } catch (error) {
        console.error("Error fetching games:", error);
        return [];
      } finally {
        if (ids === userLikes) setIsLoadingLiked(false);
        if (ids === userDislikes) setIsLoadingDisliked(false);
        if (ids === userPlayLater) setIsLoadingPlayLater(false);
      }
    };

    const loadGames = async () => {
      setIsLoadingLiked(true);
      setIsLoadingDisliked(true);
      setIsLoadingPlayLater(true);

      if (userLikes.length > 0) {
        fetchGames(userLikes).then(setLikedGames);
      } else {
        setIsLoadingLiked(false);
      }

      if (userDislikes.length > 0) {
        fetchGames(userDislikes).then(setDislikedGames);
      } else {
        setIsLoadingDisliked(false);
      }

      if (userPlayLater.length > 0) {
        fetchGames(userPlayLater).then(setPlayLaterGames);
      } else {
        setIsLoadingPlayLater(false);
      }
    };

    loadGames();
  }, [userLikes, userDislikes, userPlayLater]);

  return {
    likedGames,
    dislikedGames,
    playLaterGames,
    isLoadingLiked,
    isLoadingDisliked,
    isLoadingPlayLater,
  };
}
