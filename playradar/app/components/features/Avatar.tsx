import Image from 'next/image';
import { useImage } from '@/hooks/useImage';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/ThemeDropdown';
import { logout } from '@/services/authentication';
import { useRouter } from 'next/navigation';
import { useUsername } from '@/hooks/useUserProfile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/connections/firebase';
import type { User } from 'firebase/auth';

const getInitials = (user: User | null) => {
  if (!user) {
    return 'U';
  }

  // Get displayName from Firebase Auth
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

export default function Avatar() {
  const [user, loading] = useAuthState(auth);
  const username = useUsername(user || null);
  const router = useRouter();
  const { image, isLoading: imageLoading } = useImage({
    user: user?.uid || '',
  });

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const getDisplayInitials = () => {
    if (username) {
      const names = username.split(' ');
      return `${names[0][0]}${names.length > 1 ? names[1][0] : ''}`.toUpperCase();
    }
    return getInitials(user || null);
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
    router.refresh();
  };

  if (loading || imageLoading) {
    return <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`rounded-full h-10 w-10 p-0 font-bold text-lg 
          ${!image ? 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : ''}
          transition-all duration-300 shadow-lg hover:shadow-xl
          relative after:content-[''] after:absolute after:inset-0 
          after:rounded-full after:border-2 after:border-white/20 
          after:hover:border-white/30`}
        >
          {image ? (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={image}
                alt="Profile picture"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            getDisplayInitials()
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[200px]">
        {username && (
          <button
            onClick={handleProfileClick}
            className="px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground cursor-pointer w-full text-left"
          >
            {username || user?.email || 'Anonymous User'}
          </button>
        )}
        <DropdownMenuItem
          onClick={() => void handleLogout()}
          className="text-red-600 cursor-pointer hover:bg-accent/50"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
