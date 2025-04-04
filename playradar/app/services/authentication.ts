import { auth } from '@/app/lib/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { createGoogleUser } from '@/services/requests';

// Email & Password login
export async function checkUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Returns the authenticated user
    return { success: true, user: userCredential.user };
  } catch (_error) {
    return { success: false };
  }
}

// Google login
export async function handleGoogleLogin() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    const data = await createGoogleUser(user, user.displayName ?? '');
    return { success: data.success, user: data.user };
  } catch (_error) {
    return {
      success: false,
      error: _error instanceof Error ? _error.message : 'Unknown error',
    };
  }
}

// Log out
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (_error) {}
};

// Reset password
export const handleForgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (_error) {
    return { success: false };
  }
};
