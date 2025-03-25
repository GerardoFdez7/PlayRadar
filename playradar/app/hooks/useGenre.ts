import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function useGenre() {
  const [userGenres, setUserGenres] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user Genres when page loads
  useEffect(() => {
    const fetchUserGenre = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserGenres(userData.genres || []);
          }
        } catch (error) {
          console.error("Error fetching user genres:", error);
        }
      }
    };

    fetchUserGenre();
  }, [user]);

  // Function to handle the Genres toggle
  const handleGenreToggle = async (genreSlug: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      if (userGenres.includes(genreSlug)) {
        // If it's already in genres, remove it
        await updateDoc(userRef, {
          genres: arrayRemove(genreSlug),
        });
        setUserGenres(userGenres.filter((slug) => slug !== genreSlug));
      } else {
        // Add if missing
        await updateDoc(userRef, {
          genres: arrayUnion(genreSlug),
        });
        setUserGenres([...userGenres, genreSlug]);
      }
    } catch (error) {
      console.error("Error updating genres:", error);
    }
  };

  return { userGenres, handleGenreToggle };
}

export default useGenre;