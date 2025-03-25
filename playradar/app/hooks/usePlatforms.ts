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

function usePlatforms() {
  const [userPlatforms, setUserPlatforms] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user Platforms when page loads
  useEffect(() => {
    const fetchUserGenre = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserPlatforms(userData.platforms || []);
          }
        } catch (error) {
          console.error("Error fetching user Platforms:", error);
        }
      }
    };

    fetchUserGenre();
  }, [user]);

  // Function to handle the Platforms toggle
  const handlePlatformToggle = async (platformSlug: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);

      if (userPlatforms.includes(platformSlug)) {
        // If it's already in Platforms, remove it
        await updateDoc(userRef, {
          platforms: arrayRemove(platformSlug),
        });
        setUserPlatforms(userPlatforms.filter((slug) => slug !== platformSlug));
      } else {
        // Add if missing
        await updateDoc(userRef, {
          platforms: arrayUnion(platformSlug),
        });
        setUserPlatforms([...userPlatforms, platformSlug]);
      }
    } catch (error) {
      console.error("Error updating platforms:", error);
    }
  };

  return { userPlatforms: userPlatforms, handlePlatformToggle };
}

export default usePlatforms;