import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function isEmailOrUsernameTaken(
  email: string,
  username: string
): Promise<boolean> {
  try {
    const usersRef = collection(db, "users");
    const emailQuery = query(usersRef, where("email", "==", email));
    const usernameQuery = query(usersRef, where("username", "==", username));

    const [emailSnapshot, usernameSnapshot] = await Promise.all([
      getDocs(emailQuery),
      getDocs(usernameQuery),
    ]);

    return !emailSnapshot.empty || !usernameSnapshot.empty;
  } catch (error) {
    console.error("Error checking email or username:", error);
    return false;
  }
}
