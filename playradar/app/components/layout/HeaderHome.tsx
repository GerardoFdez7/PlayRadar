import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/ui/Input";
import Avatar from "@/features/Avatar";
import MobileSidebar from "@/layout/MobileSidebar";
import ModeToggle from "@/features/ThemeSelector";
import logo from "@/assets/logo.png";

interface HeaderHomeProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  user: boolean;
  selectedGenreSlug: string | null;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  setSelectedGenreSlug: (slug: string | null) => void;
}

export default function HeaderHome({
  searchTerm,
  setSearchTerm,
  user,
  selectedGenreSlug,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setSelectedGenreSlug,
}: HeaderHomeProps) {
  const router = useRouter();
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="sticky mb-2 top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]">
      <div className="flex justify-between items-center px-4 py-12 max-w-none h-16">
        {/* Logo */}
        <div className="mt-4 mr-4 cursor-pointer">
          <Image
            src={logo}
            alt="Radar"
            width={80}
            height={80}
            onClick={() => window.location.reload()}
          />
        </div>
        {/* Search bar */}
        <div className="flex flex-1 justify-center mt-2 max-w-3xl h-14 bg-gray-100 rounded-full dark:bg-gray-800">
          <div className="flex relative items-center w-full h-full">
            <div className="flex absolute left-2 items-center">
              <Search className="ml-2 w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search games"
              className="pl-8 ml-4 w-full bg-transparent border-0 ring-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* X button to clear search */}
            {searchTerm && (
              <button
                className="absolute right-7 font-semibold"
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
        <div className="items-center hidden gap-4 ml-4 min-[767px]:flex">
          {hasMounted && (user ? (
            <Avatar />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="font-bold bg-transparent text-lg relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:rounded-full"
            >
              LOG IN
            </button>
          ))}
          <ModeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="min-[767px]:hidden pl-2">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <MobileSidebar
              selectedGenreSlug={selectedGenreSlug}
              onGenreSelect={(slug) => {
                setSelectedGenreSlug(slug);
                setIsMobileMenuOpen(false);
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
}