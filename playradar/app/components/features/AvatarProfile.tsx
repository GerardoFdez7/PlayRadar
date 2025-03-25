import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { useUsername } from "@/app/hooks/useUserProfile";
import { Button } from "@/components/ui/Button";

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

export default function AvatarProfile() {
  const [user, loading] = useAuthState(auth);
  const username = useUsername(user || null);

  const getDisplayInitials = () => {
    if (username) {
      const names = username.split(" ");
      return `${names[0][0]}${
        names.length > 1 ? names[1][0] : ""
      }`.toUpperCase();
    }
    return getInitials(user || null);
  };

  if (loading)
    return (
      <div className="sm:h-40 sm:w-40 h-32 w-32 max-[376px]:h-20 max-[376px]:w-20 aspect-square bg-gray-300 rounded-full animate-pulse dark:bg-gray-600" />
    );

  return (
    <Button
      variant="ghost"
      className="rounded-full sm:h-40 sm:w-40 h-32 w-32 max-[376px]:h-20 max-[376px]:w-20 aspect-square font-bold sm:text-8xl text-[15vw] max-[376px]:text-[10vw]
            bg-gradient-to-br from-blue-500 to-purple-600            
            transition-all duration-300 shadow-lg 
            relative after:content-[''] after:absolute after:inset-0 
            after:rounded-full after:border-2 after:border-white/20 
            cursor-default"
    >
      {getDisplayInitials()}
    </Button>
  );
}
