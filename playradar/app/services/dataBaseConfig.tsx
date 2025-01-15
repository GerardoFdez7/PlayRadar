import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export async function addUser(username: string, email: string, password: string) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      username,
      email,
      password,
    });
    console.log('Document written with ID: ', docRef.id);
    return true;
  } catch (error) {
    console.error('Error adding document: ', error);
    return false;
  }
}

export async function checkUser(email: string, password: string): Promise<boolean> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), where("password", "==", password));
    const querySnapshot = await getDocs(q);

    // Si hay al menos un documento, el usuario existe
    if (!querySnapshot.empty) {
      console.log("User found:", querySnapshot.docs[0].data());
      return true;
    } else {
      console.log("No matching user found");
      return false;
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
}

export async function isEmailOrUsernameTaken(email: string, username: string): Promise<boolean> {
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