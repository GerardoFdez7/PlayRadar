import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import {
  playLaterGame,
  getPlayLaterGames,
  delPlayLaterGame,
} from '@/services/requests';

export function usePlayLater() {
  const [userPlayLater, setUserPlayLater] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user play later games when page loads
  useEffect(() => {
    const fetchUserPlayLater = async () => {
      if (user?.uid) {
        try {
          const userPlayLaterRes = await getPlayLaterGames(user.uid);
          setUserPlayLater(userPlayLaterRes.play_later || []);
        } catch (_error) {}
      }
    };
    void fetchUserPlayLater();
  }, [user]);

  // Function to handle the play later games toggle
  const handlePlayLaterToggle = async (gameId: string) => {
    if (!user?.uid) return;
    try {
      if (userPlayLater.includes(gameId)) {
        await delPlayLaterGame(user.uid, gameId);
        setUserPlayLater(userPlayLater.filter((id) => id !== gameId));
      } else {
        await playLaterGame(user.uid, gameId);
        setUserPlayLater([...userPlayLater, gameId]);
      }
    } catch (_error) {}
  };

  return { userPlayLater, handlePlayLaterToggle };
}
