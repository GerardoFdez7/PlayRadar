import { useState } from "react";
import { genres } from "@/components/consts/games.consts";
import Footer from "@/app/components/layout/Footer";

interface SidebarProps {
  spanClassName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ spanClassName = "" }) => {
  const [selectedGenreSlug, setSelectedGenreSlug] = useState<string | null>(
    null
  );
  
  return (
    <aside
      className={`w-41 h-[calc(100vh-4rem)] ml-3 sticky top-16 overflow-y-auto flex flex-col`}
    >
      <div className="flex-1 p-4">
        <h2 className="mb-4 text-3xl font-bold text-right">Genres</h2>
       
        <nav className="space-y-2">
        {genres.map((genre) => (
            <button
              key={genre.slug}
              onClick={() =>
                setSelectedGenreSlug((prev) =>
                  prev === genre.slug ? null : genre.slug
                )
              }
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedGenreSlug === genre.slug
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent/50"
              }`}
            >
              <span className={`${spanClassName}`}>
                <span className="mr-2">{genre.icon}</span>
                {genre.name}
              </span>
            </button>
          ))}
        </nav>
      </div>
      {/* Footer */}
      <div className="flex justify-center">
        <Footer />
      </div>
    </aside>
  );
};

export default Sidebar;
