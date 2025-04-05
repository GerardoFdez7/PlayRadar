import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image';
import { auth } from '@/lib/connections/firebase';
import { User } from 'firebase/auth';
import { useUsername } from '@/hooks/useUserProfile';
import { Button } from '@/components/ui/Button';
import { useImage } from '@/hooks/useImage';
import { Camera } from 'lucide-react';
import ImageOptions from './ImageOptions';

const getInitials = (user: User | null) => {
  if (!user) return 'U';

  // Get displayName
  if (user.displayName) {
    const names = user.displayName.split(' ');
    return `${names[0][0]}${names.length > 1 ? names[1][0] : ''}`.toUpperCase();
  }

  // If there is no displayName, use email
  if (user.email) {
    return user.email[0].toUpperCase();
  }

  return 'U';
};

interface AvatarProfileProps {
  isEditing?: boolean;
  onImageSelected?: (file: File) => void;
  onImageDeleted?: () => void;
  previewImage?: string | null;
  currentImage?: string | null;
}

export default function AvatarProfile({
  isEditing = false,
  onImageSelected,
  onImageDeleted,
  previewImage = null,
  currentImage,
}: AvatarProfileProps) {
  const [user, loading] = useAuthState(auth);
  const username = useUsername(user || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { image, isLoading: imageLoading } = useImage({
    user: user?.uid || '',
  });

  const getDisplayInitials = () => {
    if (username) {
      const names = username.split(' ');
      return `${names[0][0]}${names.length > 1 ? names[1][0] : ''}`.toUpperCase();
    }
    return getInitials(user || null);
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !onImageSelected) return;

    onImageSelected(file);
  };

  if (loading || imageLoading)
    return (
      <div className="sm:h-40 sm:w-40 h-32 w-32 max-[376px]:h-20 max-[376px]:w-20 aspect-square rounded-full bg-gray-300 animate-pulse dark:bg-gray-600" />
    );

  // Determine which image to display: preview, existing, or none
  const displayImage = previewImage || currentImage || image;

  const avatarContent = (
    <>
      {displayImage ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={displayImage}
            alt="Profile picture"
            width={160}
            height={160}
            className="w-full h-full object-cover rounded-full"
            unoptimized={
              typeof displayImage === 'string' &&
              displayImage.startsWith('blob:')
            }
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 opacity-100 transition-opacity">
              <Camera className="w-12 h-12 text-white" />
            </div>
          )}
        </div>
      ) : (
        <>
          {getDisplayInitials()}
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/70 opacity-100 hover:opacity-100 transition-opacity">
              <Camera className="w-12 h-12 text-white" />
            </div>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {isEditing ? (
        <ImageOptions
          onEditPicture={handleImageClick}
          onDeletePicture={onImageDeleted}
        >
          <Button
            variant="ghost"
            className={`sm:h-40 sm:w-40 h-32 w-32 max-[376px]:h-20 max-[376px]:w-20 aspect-square rounded-full font-bold sm:text-8xl text-[15vw] max-[376px]:text-[10vw]
                ${!displayImage ? 'bg-gradient-to-br from-blue-500 to-purple-600' : ''}            
                transition-all duration-300 shadow-lg 
                relative after:content-[''] after:absolute after:inset-0 
                after:rounded-full after:border-2 after:border-white/20 
                cursor-pointer`}
          >
            {avatarContent}
          </Button>
        </ImageOptions>
      ) : (
        <Button
          variant="ghost"
          className={`sm:h-40 sm:w-40 h-32 w-32 max-[376px]:h-20 max-[376px]:w-20 aspect-square rounded-full font-bold sm:text-8xl text-[15vw] max-[376px]:text-[10vw]
              ${!displayImage ? 'bg-gradient-to-br from-blue-500 to-purple-600' : ''}            
              transition-all duration-300 shadow-lg 
              relative after:content-[''] after:absolute after:inset-0 
              after:rounded-full after:border-2 after:border-white/20 
              cursor-default`}
        >
          {avatarContent}
        </Button>
      )}
    </>
  );
}
