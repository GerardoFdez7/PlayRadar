import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '@/services/authentication';
import { auth } from '@/lib/connections/firebase';
import { useDeleteUser } from '@/hooks/useUserProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/ThemeDropdown';
import { Ellipsis } from 'lucide-react';

interface ProfileOptionsProps {
  onEditProfile?: () => void;
}

export default function ProfileOptions({ onEditProfile }: ProfileOptionsProps) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { deleteUserAccount, isDeleting } = useDeleteUser(user || null);

  const handleLogout = async () => {
    router.push('/login');
    await logout();
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      const success = await deleteUserAccount();
      if (success) {
        router.push('/login');
        await logout();
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="w-10 h-10" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem
          onClick={onEditProfile}
          className="cursor-pointer hover:bg-accent/50"
        >
          Edit profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void handleLogout()}
          className="cursor-pointer hover:bg-accent/50"
        >
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void handleDeleteAccount()}
          disabled={isDeleting}
          className="text-red-600 cursor-pointer hover:bg-accent/50"
        >
          Delete account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
