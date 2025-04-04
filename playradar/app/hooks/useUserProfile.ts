import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { getUsername, updateUsername } from '@/services/requests';

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
      return response;
    } catch (_error) {
      throw _error;
    }
  };

  return { updateUsernameFunc };
};
