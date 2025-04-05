import { useState, useEffect } from 'react';
import { updateImage, getImage } from '@/services/requests';

interface UseImageProps {
  user: string;
}

interface UseImageReturn {
  isLoading: boolean;
  error: string | null;
  image: string | null;
  uploadImage: (imageUrl: string) => Promise<void>;
  removeImage: () => Promise<void>;
}

export const useImage = ({ user }: UseImageProps): UseImageReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // Fetch the user's image when the hook is initialized
  useEffect(() => {
    const fetchUserImage = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const userData = await getImage(user);
        setImage(userData.image || null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch user image',
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUserImage().catch((_error) => {});
  }, [user]);

  const uploadImage = async (imageUrl: string): Promise<void> => {
    if (!user) {
      setError('User ID is required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await updateImage(user, imageUrl);
      setImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = async (): Promise<void> => {
    if (!user) {
      setError('User ID is required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await updateImage(user, '');
      setImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove image');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    image,
    uploadImage,
    removeImage,
  };
};

export default useImage;
