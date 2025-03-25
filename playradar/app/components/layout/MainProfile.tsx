import { Game } from "@/types/games.types";
import AvatarProfile from "@/components/features/AvatarProfile";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Pencil, Check, X } from "lucide-react";
import { genres, platforms } from "@/components/consts/games.consts";
import Loader from "@/components/ui/Loader";
import CardGame from "@/ui/CardGame";

interface MainProfileProps {
  username: string | null;
  editingUsername: boolean;
  setEditingUsername: (value: boolean) => void;
  tempUsername: string;
  setTempUsername: (value: string) => void;
  saveUsername: () => Promise<void>;
  cancelEditUsername: () => void;
  userGenres: string[];
  handleGenreToggle: (slug: string) => void;
  userPlatforms: string[];
  handlePlatformToggle: (id: string) => void;
  likedGames: Game[];
  dislikedGames: Game[];
  playLaterGames: Game[];
  isLoadingLiked: boolean;
  isLoadingDisliked: boolean;
  isLoadingPlayLater: boolean;
  userAuthenticated: boolean;
  // Multimedia props
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

export function MainProfile({
  username,
  editingUsername,
  setEditingUsername,
  tempUsername,
  setTempUsername,
  saveUsername,
  cancelEditUsername,
  userGenres,
  handleGenreToggle,
  userPlatforms,
  handlePlatformToggle,
  likedGames,
  dislikedGames,
  playLaterGames,
  isLoadingLiked,
  isLoadingDisliked,
  isLoadingPlayLater,
  userAuthenticated,
  videoRefs,
  trailers,
  muted,
  setMuted,
  handleScreenshotHover,
  currentScreenshotIndex,
  getTrailerOfHoveredGame,
  activeTooltip,
  setActiveTooltip,
}: MainProfileProps) {
  return (
    <main className="mx-10">
      {/* Username Section */}
      <div className="flex gap-4 items-end mb-10">
        <AvatarProfile />
        {editingUsername ? (
          <div className="flex gap-2 items-center">
            <Input
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              className="max-w-xs"
              autoFocus
            />
            <Button size="icon" variant="ghost" onClick={saveUsername}>
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={cancelEditUsername}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-start h-full">
            <h2 className="sm:text-5xl text-[7vw] font-bold">{username}</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setEditingUsername(true)}
            >
              <Pencil className="w-4 h-4" />
              <span className="sr-only">Edit username</span>
            </Button>
          </div>
        )}
      </div>

      <div className="grid relative grid-cols-1 gap-6 mx-auto mb-8 md:grid-cols-2">
        {/* Vertical divider */}
        <div className="hidden absolute left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent md:block dark:via-gray-200" />

        {/* Genres Column */}
        <div className="flex-col items-center md:text-center md:pr-4 lg:pr-8">
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Select your favorite Genres
          </h2>
          <div className="items-center md:flex-col">
            {genres.map((genre) => (
              <Badge
                key={genre.name}
                variant={
                  userGenres.includes(genre.slug) ? "default" : "outline"
                }
                className="m-1 text-sm cursor-pointer xl:text-base 2xl:text-lg"
                onClick={() => handleGenreToggle(genre.slug)}
              >
                <span className="mr-1">{genre.icon}</span>
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Platforms Column */}
        <div className="flex-col items-center md:text-center md:pl-4">
          <h2 className="mb-4 text-xl font-semibold 2xl:text-2xl">
            Select your favorite Platforms
          </h2>
          <div className="items-center md:flex-col">
            {platforms.map((platform) => (
              <Badge
                key={platform.id}
                variant={
                  userPlatforms.includes(platform.id) ? "default" : "outline"
                }
                className="m-1 text-sm cursor-pointer xl:text-base 2xl:text-lg"
                onClick={() => handlePlatformToggle(platform.id)}
              >
                <span className="flex justify-center items-center mr-1">
                  {platform.icon}
                </span>
                {platform.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Game Collections Tabs */}
      <div className="pb-8">
        <h2 className="mb-4 text-xl font-semibold">My Games</h2>
        <Tabs defaultValue="play-later" className="w-full">
          <TabsList className="grid grid-cols-3 gap-6 mb-6 w-full bg-transparent">
            <TabsTrigger
              value="liked"
              className="font-bold max-[387px]:text-xs text-base xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 after:rounded-full"
            >
              Liked
            </TabsTrigger>

            <TabsTrigger
              value="play-later"
              className="font-bold max-[387px]:text-xs text-base xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px]
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 after:rounded-full"
            >
              Play Later
            </TabsTrigger>

            <TabsTrigger
              value="disliked"
              className="font-bold max-[387px]:text-xs text-base xl:text-xl relative after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-[4px] 
            after:bg-current after:transform after:origin-left after:scale-x-0 after:transition-transform after:duration-700 hover:after:scale-x-100 after:rounded-full"
            >
              Disliked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liked">
            {isLoadingLiked ? (
              <Loader />
            ) : likedGames.length > 0 ? (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {likedGames?.map((games) => (
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
                    user={userAuthenticated}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No games in your Liked list
              </div>
            )}
          </TabsContent>

          <TabsContent value="play-later">
            {isLoadingPlayLater ? (
              <Loader />
            ) : playLaterGames.length > 0 ? (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {playLaterGames?.map((games) => (
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
                    user={userAuthenticated}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No games in your Play Later list
              </div>
            )}
          </TabsContent>

          <TabsContent value="disliked">
            {isLoadingDisliked ? (
              <Loader />
            ) : dislikedGames.length > 0 ? (
              <div className="grid px-3 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-[440px]:justify-items-center max-[440px]:px-0">
                {dislikedGames?.map((games) => (
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
                    user={userAuthenticated}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No games in your Disliked list
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
