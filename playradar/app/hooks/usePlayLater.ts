import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function usePlayLater() {
  const [userPlayLater, setUserPlayLater] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user play later games when page loads
  useEffect(() => {
    const fetchUserPlayLater = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserPlayLater(userData.play_later || []);
          }
        } catch (error) {
          console.error("Error fetching user play_later:", error);
        }
      }
    };

    fetchUserPlayLater();
  }, [user]);

  // Function to handle the play later games toggle
  const handlePlayLaterToggle = async (gameId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      // First, get the updated document to verify the list.
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) return;

      const userData = userDoc.data();
      const currentPlayLater = userData.play_later || [];

      if (currentPlayLater.includes(gameId)) {
        // If it is already in play later games, remove it
        await updateDoc(userRef, {
          play_later: arrayRemove(gameId),
        });
        setUserPlayLater(currentPlayLater.filter((id: string) => id !== gameId));
      } else {
        // If it's not in play later games, add it
        await updateDoc(userRef, {
          play_later: arrayUnion(gameId),
        });
        setUserPlayLater([...currentPlayLater, gameId]);
      }
    } catch (error) {
      console.error("Error updating play_later:", error);
    }
  };

  return { userPlayLater, handlePlayLaterToggle };
}
