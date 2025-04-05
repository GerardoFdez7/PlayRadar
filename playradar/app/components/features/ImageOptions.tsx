import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/connections/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/ThemeDropdown';

interface ImageOptionsProps {
  onEditPicture?: () => void;
  onDeletePicture?: () => void;
  children?: React.ReactNode;
}

export default function ImageOptions({
  onEditPicture,
  onDeletePicture,
  children,
}: ImageOptionsProps) {
  const [user] = useAuthState(auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePicture = async () => {
    if (!user || !onDeletePicture) return;

    setIsDeleting(true);
    try {
      onDeletePicture();
    } catch (_error) {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[200px]">
        <DropdownMenuItem
          onClick={onEditPicture}
          className="cursor-pointer hover:bg-accent/50"
        >
          Update picture
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => void handleDeletePicture()}
          disabled={isDeleting}
          className="text-red-600 cursor-pointer hover:bg-accent/50"
        >
          Delete picture
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
