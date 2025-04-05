import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/connections/firebase';
import { addPlatform, getPlatform, delPlatform } from '@/services/requests';

function usePlatforms() {
  const [userPlatforms, setUserPlatforms] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  // Get user Platforms when page loads
  useEffect(() => {
    const fetchUserPlatform = async () => {
      if (user?.uid) {
        try {
          const userPlatformsRes = await getPlatform(user.uid);
          setUserPlatforms(userPlatformsRes.platforms || []);
        } catch (_error) {}
      }
    };
    void fetchUserPlatform();
  }, [user]);

  // Function to handle the Platforms toggle
  const handlePlatformToggle = async (platformSlug: string) => {
    if (!user?.uid) return;
    try {
      if (userPlatforms.includes(platformSlug)) {
        await delPlatform(user.uid, platformSlug);
        setUserPlatforms(userPlatforms.filter((id) => id !== platformSlug));
      } else {
        await addPlatform(user.uid, platformSlug);
        setUserPlatforms([...userPlatforms, platformSlug]);
      }
    } catch (_error) {}
  };

  return { userPlatforms: userPlatforms, handlePlatformToggle };
}

export default usePlatforms;
