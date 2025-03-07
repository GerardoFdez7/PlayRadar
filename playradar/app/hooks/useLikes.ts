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

export function useLikes() {
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user likes when page loads
  useEffect(() => {
    const fetchUserLikes = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserLikes(userData.liked || []);
          }
        } catch (error) {
          console.error("Error fetching user likes:", error);
        }
      }
    };

    fetchUserLikes();
  }, [user]);

  // Function to handle the likes toggle
  const handleLikeToggle = async (gameId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      // Primero, obtener el documento actualizado para verificar ambas listas
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) return;

      const userData = userDoc.data();
      const currentLikes = userData.liked || [];
      const currentDislikes = userData.disliked || [];

      if (currentLikes.includes(gameId)) {
        // Si ya está en likes, quitarlo
        await updateDoc(userRef, {
          liked: arrayRemove(gameId),
        });
        setUserLikes(currentLikes.filter((id: string) => id !== gameId));
      } else {
        // Si no está en likes, agregarlo
        await updateDoc(userRef, {
          liked: arrayUnion(gameId),
          // Si está en dislikes, quitarlo de ahí
          ...(currentDislikes.includes(gameId) && {
            disliked: arrayRemove(gameId),
          }),
        });
        setUserLikes([...currentLikes, gameId]);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return { userLikes, handleLikeToggle };
}
