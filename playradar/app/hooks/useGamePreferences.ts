import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  UpdateData,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function useGamePreferences() {
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [userDislikes, setUserDislikes] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user preferences when page loads
  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserLikes(userData.liked || []);
            setUserDislikes(userData.disliked || []);
          }
        } catch (error) {
          console.error("Error fetching user preferences:", error);
        }
      }
    };

    fetchUserPreferences();
  }, [user]);

  // Function to handle the likes toggle
  const handleLikeToggle = async (gameId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      if (userLikes.includes(gameId)) {
        // Si ya está en likes, quitarlo
        await updateDoc(userRef, {
          liked: arrayRemove(gameId),
        });
        setUserLikes(userLikes.filter((id) => id !== gameId));
      } else {
        // Si no está en likes, agregarlo y quitarlo de dislikes si existe
        const updates: UpdateData<DocumentData> = {
          liked: arrayUnion(gameId),
        };

        // Si está en dislikes, quitarlo de ahí
        if (userDislikes.includes(gameId)) {
          updates.disliked = arrayRemove(gameId);
          setUserDislikes(userDislikes.filter((id) => id !== gameId));
        }

        await updateDoc(userRef, updates);
        setUserLikes([...userLikes, gameId]);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Function to handle the dislikes toggle
  const handleDislikeToggle = async (gameId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      if (userDislikes.includes(gameId)) {
        // Si ya está en dislikes, quitarlo
        await updateDoc(userRef, {
          disliked: arrayRemove(gameId),
        });
        setUserDislikes(userDislikes.filter((id) => id !== gameId));
      } else {
        // Si no está en dislikes, agregarlo y quitarlo de likes si existe
        const updates: UpdateData<DocumentData> = {
          disliked: arrayUnion(gameId),
        };

        // Si está en likes, quitarlo de ahí
        if (userLikes.includes(gameId)) {
          updates.liked = arrayRemove(gameId);
          setUserLikes(userLikes.filter((id) => id !== gameId));
        }

        await updateDoc(userRef, updates);
        setUserDislikes([...userDislikes, gameId]);
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };

  return { userLikes, userDislikes, handleLikeToggle, handleDislikeToggle };
}
