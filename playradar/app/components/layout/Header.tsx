import { useState } from "react";
import ModeToggle from "@/app/components/features/ThemeSelector";
import radarImage from "../../login/radar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { Search } from "lucide-react";
import Avatar from "@/app/components/features/Avatar";
import { Input } from "@/app/components/ui/Input";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAuthState(auth);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter] ${className}`}
    >
      <div className="flex items-center justify-between h-16 px-4 py-12 max-w-none">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 gap-4">
          <div className="w-[85px] h-[85px] cursor-pointer ml-3">
            <Image
              src={radarImage}
              alt="Radar"
              className="object-contain w-full h-full mt-2"
              onClick={() => window.location.reload()}
            />
          </div>
        </div>
        {/* Search bar */}
        <div className="flex justify-center flex-1 max-w-3xl mx-8 mt-2 mr-24 bg-gray-100 rounded-full dark:bg-gray-800 h-14">
          <div className="relative flex items-center w-full h-full">
            <div className="absolute flex items-center left-2">
              <Search className="w-5 h-5 ml-2 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search games"
              className="w-full pl-8 ml-4 bg-transparent border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* X button to clear search */}
            {searchTerm && (
              <button
                className="absolute font-semibold right-7"
                onClick={() => {
                  setSearchTerm("");
                }}
              >
                X
              </button>
            )}
          </div>
        </div>
        {/* LOG IN button*/}
        <div className="absolute mr-20 right-1">
          {user ? (
            <Avatar />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="font-bold bg-transparent text-lg relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:rounded-full"
            >
              LOG IN
            </button>
          )}
        </div>
        {/* Theme button */}
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
