import { Game } from '@/types/games.types';
import CardGame from '@/ui/CardGame';
import { ChevronDown } from 'lucide-react';
import LoadingAnimation from '@/ui/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/Select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Smile, Gamepad } from 'lucide-react';
import Sidebar from '@/layout/Sidebar';
import { platforms } from '@/app/lib/consts/games.consts';

interface MainHomeProps {
  user: boolean;
  filteredGames: Game[];
  recommendedGames: Game[];
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
    game: Game,
  ) => void;
  currentScreenshotIndex: Record<number, number>;
  getTrailerOfHoveredGame: (game: Game) => void;
  activeTooltip: { type: string; gameId: number } | null;
  setActiveTooltip: React.Dispatch<
    React.SetStateAction<{ type: string; gameId: number } | null>
  >;
  onTabChange: (tab: 'home' | 'for-you') => void;
}

export default function MainHome({
  selectedGenreSlug,
  setSelectedGenreSlug,
  filteredGames,
  recommendedGames,
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
  onTabChange,
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
        <h1 className="mb-3 max-[400px]:text-[12vw] text-5xl font-bold font-playRadar">
          PlayRadar
        </h1>
        <p className="mb-6 text-lg">Scroll, click, play… repeat!</p>
        {/* Filters */}
        <div className="flex gap-4 mb-6 max-[440px]:w-[85vw]">
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px] border border-gray-400">
              <SelectValue placeholder={'Order by'} />
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
              selectedPlatform === 'all'
                ? 'all'
                : platforms.find((p) => p.id === selectedPlatform)?.slug
            }
            onValueChange={(value) => {
              const platformId =
                value === 'all'
                  ? 'all'
                  : platforms.find((p) => p.slug === value)?.id;
              setSelectedPlatform(platformId || 'all');
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

        <Tabs
          defaultValue="home"
          className="w-full"
          onValueChange={(value) => onTabChange(value as 'home' | 'for-you')}
        >
          <TabsList className="flex justify-center gap-6 mb-6 w-full bg-transparent">
            <TabsTrigger
              value="home"
              className="font-bold text-lg 2xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-500 data-[state=active]:after:scale-x-100 hover:after:scale-x-100 after:rounded-full data-[state=active]:bg-gray-300 dark:bg-gray-900"
            >
              Home
            </TabsTrigger>

            <TabsTrigger
              value="for-you"
              className="font-bold text-lg 2xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px]
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-500 data-[state=active]:after:scale-x-100 hover:after:scale-x-100 after:rounded-full data-[state=active]:bg-gray-300 dark:bg-gray-900"
            >
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
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
            {isLoading && <LoadingAnimation size={50} />}
          </TabsContent>

          <TabsContent value="for-you">
            {!user ? (
              <div className="text-center p-6">
                <p className="text-lg mb-2">
                  Log in so you can start discovering your next new favorite
                  game
                </p>
                <Smile className="w-12 h-12 mx-auto text-primary" />
              </div>
            ) : recommendedGames.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-lg mb-2">
                  Select your favorite genres and platforms in your profile so
                  we can recommend games just for you!
                </p>
                <Gamepad className="w-12 h-12 mx-auto text-primary" />
              </div>
            ) : (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {recommendedGames?.map((games) => (
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
            )}
            {isLoading && <LoadingAnimation size={50} />}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
