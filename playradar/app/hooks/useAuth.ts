import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";

// Force the user to be authenticated before accessing the page
export function useAuth() {
  const [userAuthenticated, setUserAuthenticated] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUserAuthenticated(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authChecked && !userAuthenticated) {
      router.push("/");
    }
  }, [authChecked, userAuthenticated, router]);

  return { userAuthenticated };
}
