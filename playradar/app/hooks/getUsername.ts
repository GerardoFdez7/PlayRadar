import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const useUserProfile = (user: User | null) => {
  const [username, setUsername] = useState<string | null>(null);

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

export default useUserProfile;
