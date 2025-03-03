import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Email & Password register
export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username,
      email,
      createdAt: new Date(),
      liked: [],
      play_later: [],
    });

    return { success: true, user };
  } catch (error: unknown) {
    console.log("An error occurred while registering:", error);
    return { success: false };
  }
}

// Email & Password login
export async function checkUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Returns the authenticated user
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.log("checkUser: ", error);
    return { success: false };
  }
}

// Create user document in Firestore if it does not exist
async function createUserRecordIfNotExists(
  user: User,
  usernameFallback: string
): Promise<void> {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      username: user.displayName || usernameFallback,
      email: user.email,
      createdAt: new Date(),
      liked: [],
      play_later: [],
    });
  }
}

// Google login
export async function handleGoogleLogin() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    await createUserRecordIfNotExists(user, user.displayName ?? "");
    return { success: true, user };
  } catch (err) {
    console.log("handleGoogleLogin: ", err);
    return { success: false };
  }
}
