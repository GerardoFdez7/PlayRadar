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
        // If it's already in likes, remove it
        await updateDoc(userRef, {
          liked: arrayRemove(gameId),
        });
        setUserLikes(userLikes.filter((id) => id !== gameId));
      } else {
        // If it is not in likes, add it and remove it from dislikes if it exists
        const updates: UpdateData<DocumentData> = {
          liked: arrayUnion(gameId),
        };

        // If it's in dislikes, remove it from there
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
        // If it's already in dislikes, remove it
        await updateDoc(userRef, {
          disliked: arrayRemove(gameId),
        });
        setUserDislikes(userDislikes.filter((id) => id !== gameId));
      } else {
        // If it is not in dislikes, add it and remove it from likes if it exists
        const updates: UpdateData<DocumentData> = {
          disliked: arrayUnion(gameId),
        };

        // If it's in likes, remove it from there
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
