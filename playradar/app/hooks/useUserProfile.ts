import { useEffect, useState } from 'react';
import { User, deleteUser } from 'firebase/auth';
import { getUsername, updateUsername, delUser } from '@/services/requests';

export const useUsername = (user: User | null) => {
  const [username, setUsername] = useState<string | null>(null);

  // Get username from DB
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const response = await getUsername(user.uid);
          if (response.success) {
            setUsername(response.username);
          }
        } catch (_error) {}
      }
    };

    void fetchUsername();
  }, [user]);

  return username;
};

// Update username
export const useUpdateUsername = (user: User | null) => {
  const [username, setUsername] = useState<string | null>(null);

  const updateUsernameFunc = async (newUsername: string) => {
    if (!user) {
      alert('User not authenticated!');
      return;
    }
    try {
      const response = await updateUsername(user.uid, newUsername);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update username');
      }

      setUsername(newUsername);
      return response;
    } catch (_error) {
      throw _error;
    }
  };

  return { updateUsernameFunc, username };
};

export const useDeleteUser = (user: User | null) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUserAccount = async () => {
    if (!user) {
      setError('User not authenticated!');
      return false;
    }

    setIsDeleting(true);
    setError(null);

    try {
      // First delete from your database
      const response = await delUser(user.uid);
      if (!response.success) {
        throw new Error(
          response.error || 'Failed to delete account from database',
        );
      }

      // Then delete from Firebase Auth
      await deleteUser(user);

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteUserAccount, isDeleting, error };
};
