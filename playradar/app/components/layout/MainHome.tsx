import { Game } from "@/types/games.types";
import CardGame from "@/ui/CardGame";
import { ChevronDown } from "lucide-react";
import LoadingAnimation from "@/ui/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import Sidebar from "@/layout/Sidebar";
import { platforms } from "@/consts/games.consts";

interface MainHomeProps {
  user: boolean;
  filteredGames: Game[];  
  selectedGenreSlug: string | null;
  setSelectedGenreSlug: (slug: string | null) => void;
  selectedPlatform: string;
  setSelectedPlatform: (value: string) => void;
  setSortBy: (value: string) => void;
  isLoading: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;  
  videoRefs: React.MutableRefObject<{ [key: string]: HTMLVideoElement | null }>;
  trailers: Record<string, string>;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  handleScreenshotHover: (
    e: React.MouseEvent<HTMLDivElement>,
    game: Game
  ) => void;
  currentScreenshotIndex: Record<number, number>;
getTrailerOfHoveredGame: (game: Game) => void;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<
    React.SetStateAction<{ type: string; gameId: number } | null>
  >;
}

export default function MainHome({
  selectedGenreSlug,
  setSelectedGenreSlug,
  filteredGames,
  isLoading,
  sentinelRef,
  setSortBy,
  selectedPlatform,
  setSelectedPlatform,
  videoRefs,
  trailers,
  muted,
  setMuted,
  handleScreenshotHover,
  currentScreenshotIndex,
  getTrailerOfHoveredGame,
  user,  
  activeTooltip,
  setActiveTooltip,
}: MainHomeProps) {
  return (
    <main className="flex">
      <Sidebar
        className="min-[767px]:flex hidden"
        selectedGenreSlug={selectedGenreSlug}
        onGenreSelect={setSelectedGenreSlug}
      />

      {/* Main Content */}
      <div className="flex-1 p-3">
        <h1 className="mb-3 max-[400px]:text-[12vw] text-5xl font-bold font-playRadar ">
          PlayRadar
        </h1>
        <p className="mb-6 text-lg">Scroll, click, play… repeat!</p>
        {/* Filters */}
        <div className="flex gap-4 mb-6 max-[440px]:w-[85vw]">
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px] border border-gray-400">
              <SelectValue placeholder={"Order by"} />
              <ChevronDown className="w-5 h-5 opacity-80" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="likes">Likes</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="release">Release Date</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={
              selectedPlatform === "all"
                ? "all"
                : platforms.find((p) => p.id === selectedPlatform)?.slug
            }
            onValueChange={(value) => {
              const platformId =
                value === "all"
                  ? "all"
                  : platforms.find((p) => p.slug === value)?.id;
              setSelectedPlatform(platformId || "all");
            }}
          >
            <SelectTrigger className="w-[180px] border border-gray-400">
              <SelectValue placeholder="Platforms" />
              <ChevronDown className="w-5 h-5 opacity-80" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pc">Windows</SelectItem>
              <SelectItem value="playstation">PlayStation</SelectItem>
              <SelectItem value="xbox">Xbox</SelectItem>
              <SelectItem value="nintendo">Nintendo</SelectItem>
              <SelectItem value="linux">Linux</SelectItem>
              <SelectItem value="mac">MacOS</SelectItem>
              <SelectItem value="ios">iOS</SelectItem>
              <SelectItem value="android">Android</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Games Grid */}
        <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
          {filteredGames?.map((games) => (
            <CardGame
              key={games.id}
              games={games}
              getTrailerOfHoveredGame={getTrailerOfHoveredGame}
              videoRefs={videoRefs}
              trailers={trailers}
              muted={muted}
              setMuted={setMuted}
              handleScreenshotHover={handleScreenshotHover}
              currentScreenshotIndex={currentScreenshotIndex}
              user={user}
              activeTooltip={activeTooltip}
              setActiveTooltip={setActiveTooltip}
            />
          ))}

          {/* Detect end of the list */}
          <div ref={sentinelRef}></div>
        </div>
        {/* Loading animation */}
        {isLoading && <LoadingAnimation size={50} />}
      </div>
    </main>
  );
}
