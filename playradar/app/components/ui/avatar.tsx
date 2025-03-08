"use client";

import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/themeDropdown";
import { logout } from "../../services/authentication";
import { useRouter } from "next/navigation";
import useUserProfile from "../../hooks/useUsername";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { User } from "firebase/auth";

const getInitials = (user: User | null) => {
  if (!user) return "U";

  // Get displayName from Firebase Auth
  if (user.displayName) {
    const names = user.displayName.split(" ");
    return `${names[0][0]}${names.length > 1 ? names[1][0] : ""}`.toUpperCase();
  }

  // If there is no displayName, use email
  if (user.email) {
    return user.email[0].toUpperCase();
  }

  return "U";
};

export default function Avatar() {
  const [user, loading] = useAuthState(auth);
  const username = useUserProfile(user || null);
  const router = useRouter();

  const getDisplayInitials = () => {
    if (username) return username.slice(0, 2).toUpperCase();
    return getInitials(user || null);
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
    router.refresh();
  };

  if (loading)
    return <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full h-10 w-10 p-0 font-bold text-lg 
          bg-gradient-to-br from-blue-500 to-purple-600 
          hover:from-blue-600 hover:to-purple-700 
          transition-all duration-300 shadow-lg hover:shadow-xl
          relative after:content-[''] after:absolute after:inset-0 
          after:rounded-full after:border-2 after:border-white/20 
          after:hover:border-white/30"
        >
          {getDisplayInitials()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[200px]">
        {username && (
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            {username || user?.email || "Anonymous User"}
          </div>
        )}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 hover:bg-red-50/50"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
