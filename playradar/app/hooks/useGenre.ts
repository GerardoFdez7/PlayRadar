import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/connections/firebase';
import { addGenre, getGenre, delGenre } from '@/services/requests';

function useGenre() {
  const [userGenres, setUserGenres] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user Genres when page loads
  useEffect(() => {
    const fetchUserGenre = async () => {
      if (user?.uid) {
        try {
          const userGenresRes = await getGenre(user.uid);
          setUserGenres(userGenresRes.genres || []);
        } catch (_error) {}
      }
    };
    void fetchUserGenre();
  }, [user]);

  // Function to handle the Genres toggle
  const handleGenreToggle = async (genreSlug: string) => {
    if (!user?.uid) return;
    try {
      if (userGenres.includes(genreSlug)) {
        await delGenre(user.uid, genreSlug);
        setUserGenres(userGenres.filter((id) => id !== genreSlug));
      } else {
        await addGenre(user.uid, genreSlug);
        setUserGenres([...userGenres, genreSlug]);
      }
    } catch (_error) {}
  };

  return { userGenres, handleGenreToggle };
}

export default useGenre;
