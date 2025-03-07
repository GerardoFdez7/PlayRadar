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

export function useDislikes() {
  const [userDislikes, setUserDislikes] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user dislikes when page loads
  useEffect(() => {
    const fetchUserDislikes = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserDislikes(userData.disliked || []);
          }
        } catch (error) {
          console.error("Error fetching user dislikes:", error);
        }
      }
    };

    fetchUserDislikes();
  }, [user]);

  // Function to handle the dislikes toggle
  const handleDislikeToggle = async (gameId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      // Primero, obtener el documento actualizado para verificar ambas listas
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) return;

      const userData = userDoc.data();
      const currentDislikes = userData.disliked || [];
      const currentLikes = userData.liked || [];

      if (currentDislikes.includes(gameId)) {
        // Si ya está en dislikes, quitarlo
        await updateDoc(userRef, {
          disliked: arrayRemove(gameId),
        });
        setUserDislikes(currentDislikes.filter((id: string) => id !== gameId));
      } else {
        // Si no está en dislikes, agregarlo
        await updateDoc(userRef, {
          disliked: arrayUnion(gameId),
          // Si está en likes, quitarlo de ahí
          ...(currentLikes.includes(gameId) && { liked: arrayRemove(gameId) }),
        });
        setUserDislikes([...currentDislikes, gameId]);
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  return { userDislikes, handleDislikeToggle };
}
