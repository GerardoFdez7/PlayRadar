import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/connections/firebase';
import {
  likeGame,
  unlikeGame,
  dislikeGame,
  undislikeGame,
  alldislikeGames,
  alllikeGames,
} from '@/services/requests';

export function useGamePreferences() {
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [userDislikes, setUserDislikes] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user preferences when page loads
  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (user?.uid) {
        try {
          const [likedRes, dislikedRes] = await Promise.all([
            alllikeGames(user.uid),
            alldislikeGames(user.uid),
          ]);

          setUserLikes(likedRes.liked || []);
          setUserDislikes(dislikedRes.disliked || []);
        } catch (_error) {}
      }
    };
    void fetchUserPreferences();
  }, [user]);

  // Function to handle the likes toggle
  const handleLikeToggle = async (gameId: string) => {
    if (!user?.uid) return;

    try {
      if (userLikes.includes(gameId)) {
        await unlikeGame(user.uid, gameId);
        setUserLikes(userLikes.filter((id) => id !== gameId));
      } else {
        await likeGame(user.uid, gameId);
        setUserLikes([...userLikes, gameId]);

        // Remove from dislikes if present
        if (userDislikes.includes(gameId)) {
          await undislikeGame(user.uid, gameId);
          setUserDislikes(userDislikes.filter((id) => id !== gameId));
        }
      }
    } catch (_error) {}
  };

  // Function to handle the dislikes toggle
  const handleDislikeToggle = async (gameId: string) => {
    if (!user?.uid) return;

    try {
      if (userDislikes.includes(gameId)) {
        await undislikeGame(user.uid, gameId);
        setUserDislikes(userDislikes.filter((id) => id !== gameId));
      } else {
        await dislikeGame(user.uid, gameId);
        setUserDislikes([...userDislikes, gameId]);

        // Remove from likes if present
        if (userLikes.includes(gameId)) {
          await unlikeGame(user.uid, gameId);
          setUserLikes(userLikes.filter((id) => id !== gameId));
        }
      }
    } catch (_error) {}
  };

  return { userLikes, userDislikes, handleLikeToggle, handleDislikeToggle };
}
