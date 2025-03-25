import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useUsername = (user: User | null) => {
  const [username, setUsername] = useState<string | null>(null);

  // Get username from DB
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      }
    };

    fetchUsername();
  }, [user]);

  return username;
};

// Update username
export const useUpdateUsername = (user: User | null) => {
  const updateUsername = async (newUsername: string) => {
    if (!user) {
      alert("User not authenticated!");
      return;
    }
    try {
      await updateDoc(doc(db, "users", user.uid), { username: newUsername });
    } catch (err) {
      console.error("Error updating username:", err);
    }
  };

  return { updateUsername };
};
