import { genres } from '@/components/consts/games.consts';
import Footer from '@/components/layout/Footer';

interface SidebarProps {
  className?: string;
  h2ClassName?: string;
  spanClassName?: string;
  selectedGenreSlug: string | null;
  onGenreSelect: (slug: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  className = '',
  h2ClassName = '',
  spanClassName = '',
  selectedGenreSlug,
  onGenreSelect,
}) => {
  return (
    <aside
      className={`flex overflow-y-auto sticky top-16 flex-col ml-3 sm:w-41 md:w-[12rem] h-[calc(100vh-4rem)] ${className}`}
    >
      <div className="flex-1 p-4">
        <h2 className={`mb-4 text-3xl font-bold ${h2ClassName}`}>Genres</h2>

        <nav className="space-y-2">
          {genres.map((genre) => (
            <button
              key={genre.slug}
              onClick={() =>
                onGenreSelect(
                  selectedGenreSlug === genre.slug ? null : genre.slug,
                )
              }
              className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedGenreSlug === genre.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent/50'
              }`}
            >
              <span className={`flex items-center ${spanClassName}`}>
                <span className="mr-2">{genre.icon}</span>
                {genre.name}
              </span>
            </button>
          ))}
        </nav>
      </div>
      <Footer />
    </aside>
  );
};

export default Sidebar;
